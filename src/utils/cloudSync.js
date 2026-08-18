/**
 * Free Zero-Cost Live Realtime Cloud Synchronization
 * Supports multiple connected users and store branches via free distributed JSON sync
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

// Free Public JSON storage endpoint for zero-cost team syncing
const CLOUD_SYNC_BASE = 'https://api.jsonbin.io/v3/b';
const FREE_STORAGE_STORE_URL = 'https://kvdb.io/K9wB8QGz8hL92XyRkM6qLp/'; // High speed KV store

/**
 * Push local products to the cloud room
 */
export const pushProductsToCloud = async (roomId, products) => {
  if (!navigator.onLine || !roomId) return false;
  try {
    const cleanRoom = encodeURIComponent(roomId.trim().toLowerCase());
    const payload = JSON.stringify({
      updatedAt: new Date().toISOString(),
      products: products
    });

    const response = await fetch(`https://ntfy.sh/swar_sync_${cleanRoom}`, {
      method: 'POST',
      body: payload,
      headers: {
        'Title': 'SWAR-STOCK-UPDATE',
        'Priority': '1'
      }
    });

    // Also backup to localStorage
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
 * Setup live broadcast channel for instantaneous inter-tab and multi-device sync
 */
export const createLiveSyncChannel = (onRemoteUpdate) => {
  // BroadcastChannel for all open tabs on the same device
  let bc = null;
  try {
    if (typeof BroadcastChannel !== 'undefined') {
      bc = new BroadcastChannel('swar_live_sync_channel');
      bc.onmessage = (event) => {
        if (event.data && event.data.type === 'SYNC_PRODUCTS' && event.data.products) {
          onRemoteUpdate(event.data.products, 'tab');
        }
      };
    }
  } catch (e) {
    console.warn('BroadcastChannel error:', e);
  }

  // Cross-device server-sent event (SSE) listener via free ntfy channel
  let eventSource = null;
  const config = getSyncConfig();
  if (config.enabled && config.roomId) {
    try {
      const cleanRoom = encodeURIComponent(config.roomId.trim().toLowerCase());
      eventSource = new EventSource(`https://ntfy.sh/swar_sync_${cleanRoom}/sse`);
      eventSource.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data);
          if (data.message) {
            const parsedPayload = JSON.parse(data.message);
            if (parsedPayload.products && Array.isArray(parsedPayload.products)) {
              onRemoteUpdate(parsedPayload.products, 'cloud');
            }
          }
        } catch (err) {
          // Ignore non-json notification
        }
      };
    } catch (e) {
      console.warn('EventSource SSE connection warning:', e);
    }
  }

  return {
    broadcastLocalChange: (products) => {
      if (bc) {
        bc.postMessage({ type: 'SYNC_PRODUCTS', products, timestamp: Date.now() });
      }
      if (config.enabled && config.roomId) {
        pushProductsToCloud(config.roomId, products);
      }
    },
    close: () => {
      if (bc) bc.close();
      if (eventSource) eventSource.close();
    }
  };
};
