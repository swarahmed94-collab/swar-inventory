/**
 * Free Zero-Cost Live Realtime Cloud Synchronization
 * Supports multiple connected users, viewer devices, and store branches
 */

const SYNC_CONFIG_KEY = 'swar_cloud_sync_config_v1';
const DEFAULT_ROOM = 'swar-main-freezer';

export const getSyncConfig = () => {
  try {
    const data = localStorage.getItem(SYNC_CONFIG_KEY);
    if (!data) {
      const initial = {
        enabled: true,
        roomId: DEFAULT_ROOM,
        lastSyncTime: null,
        isOnline: navigator.onLine,
        status: 'synced', // 'synced' | 'syncing' | 'offline' | 'error'
      };
      localStorage.setItem(SYNC_CONFIG_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(data);
  } catch {
    return { enabled: true, roomId: DEFAULT_ROOM, lastSyncTime: null, isOnline: true, status: 'synced' };
  }
};

export const saveSyncConfig = (config) => {
  try {
    localStorage.setItem(SYNC_CONFIG_KEY, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save sync config:', err);
  }
};

/**
 * Push full state (products & invoices) to the cloud room
 */
export const pushStateToCloud = async (roomId, state) => {
  if (!navigator.onLine || !roomId) return false;
  try {
    const cleanRoom = encodeURIComponent(roomId.trim().toLowerCase());
    const payload = JSON.stringify({
      updatedAt: new Date().toISOString(),
      products: state.products || [],
      invoices: state.invoices || [],
      version: 2
    });

    await fetch(`https://ntfy.sh/swar_sync_${cleanRoom}`, {
      method: 'POST',
      body: payload,
      headers: {
        'Title': 'SWAR-DATA-SYNC',
        'Priority': '1'
      }
    });

    const now = new Date().toISOString();
    const config = getSyncConfig();
    saveSyncConfig({ ...config, lastSyncTime: now, status: 'synced' });
    return true;
  } catch (e) {
    console.warn('Cloud sync push notice error:', e);
    return false;
  }
};

/**
 * Fetch latest state from cloud room on app load or reconnection
 */
export const fetchLatestCloudState = async (roomId) => {
  if (!navigator.onLine || !roomId) return null;
  try {
    const cleanRoom = encodeURIComponent(roomId.trim().toLowerCase());
    const res = await fetch(`https://ntfy.sh/swar_sync_${cleanRoom}/json?poll=1`);
    if (!res.ok) return null;
    const text = await res.text();
    const lines = text.split('\n').filter(l => l.trim().startsWith('{'));
    if (lines.length === 0) return null;

    const messages = lines
      .map(l => {
        try { return JSON.parse(l); } catch { return null; }
      })
      .filter(m => m && m.event === 'message');

    if (messages.length === 0) return null;

    // Get the latest published message
    const latest = messages[messages.length - 1];

    if (latest.attachment && latest.attachment.url) {
      const attachRes = await fetch(latest.attachment.url);
      if (attachRes.ok) {
        return await attachRes.json();
      }
    }

    if (latest.message) {
      try {
        return JSON.parse(latest.message);
      } catch {
        return null;
      }
    }
    return null;
  } catch (err) {
    console.warn('Error fetching latest cloud state:', err);
    return null;
  }
};

/**
 * Setup live broadcast channel for instantaneous multi-device and multi-tab sync
 */
export const createLiveSyncChannel = (onRemoteUpdate) => {
  // 1. BroadcastChannel for tabs on same device
  let bc = null;
  try {
    if (typeof BroadcastChannel !== 'undefined') {
      bc = new BroadcastChannel('swar_live_sync_channel');
      bc.onmessage = (event) => {
        if (event.data && event.data.type === 'SYNC_STATE' && event.data.state) {
          onRemoteUpdate(event.data.state, 'tab');
        }
      };
    }
  } catch (e) {
    console.warn('BroadcastChannel error:', e);
  }

  const config = getSyncConfig();

  // 2. Fetch initial cloud state immediately on startup so new viewers get latest admin data
  if (config.enabled && config.roomId) {
    fetchLatestCloudState(config.roomId).then(cloudData => {
      if (cloudData && (Array.isArray(cloudData.products) || Array.isArray(cloudData.invoices))) {
        onRemoteUpdate(cloudData, 'initial-cloud');
      }
    }).catch(e => console.warn('Initial cloud sync error:', e));
  }

  // 3. Server-Sent Events (SSE) for live push across all remote devices
  let eventSource = null;
  if (config.enabled && config.roomId) {
    try {
      const cleanRoom = encodeURIComponent(config.roomId.trim().toLowerCase());
      eventSource = new EventSource(`https://ntfy.sh/swar_sync_${cleanRoom}/sse`);
      eventSource.onmessage = async (e) => {
        try {
          const data = JSON.parse(e.data);
          if (data.event === 'message') {
            let payload = null;
            if (data.attachment && data.attachment.url) {
              const res = await fetch(data.attachment.url);
              if (res.ok) payload = await res.json();
            } else if (data.message) {
              payload = JSON.parse(data.message);
            }
            if (payload && (Array.isArray(payload.products) || Array.isArray(payload.invoices))) {
              onRemoteUpdate(payload, 'cloud');
            }
          }
        } catch (err) {
          // ignore
        }
      };
    } catch (e) {
      console.warn('EventSource SSE connection warning:', e);
    }
  }

  return {
    broadcastLocalChange: (state) => {
      if (bc) {
        bc.postMessage({ type: 'SYNC_STATE', state, timestamp: Date.now() });
      }
      if (config.enabled && config.roomId) {
        pushStateToCloud(config.roomId, state);
      }
    },
    close: () => {
      if (bc) bc.close();
      if (eventSource) eventSource.close();
    }
  };
};
