import { INITIAL_PRODUCTS } from '../data/defaultProducts';

const STORAGE_KEY = 'swar_frozen_inventory_v1';
const SETTINGS_KEY = 'swar_app_settings_v1';

export const getStoredProducts = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Error loading products from localStorage:', err);
    return INITIAL_PRODUCTS;
  }
};

export const saveStoredProducts = (products) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (err) {
    console.error('Error saving products to localStorage:', err);
  }
};

export const getAppSettings = () => {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    if (!data) {
      const defaultSettings = {
        theme: 'light',
        soundEnabled: true,
        auditorName: 'مسؤول الجرد',
        auditWarningDays: 3, // flag item as needing audit if > 3 days
      };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings));
      return defaultSettings;
    }
    return JSON.parse(data);
  } catch (err) {
    return { theme: 'light', soundEnabled: true, auditorName: 'مسؤول الجرد', auditWarningDays: 3 };
  }
};

export const saveAppSettings = (settings) => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Error saving app settings:', err);
  }
};

/**
 * Calculate stock health status
 * Returns: 'critical' (red) | 'warning' (yellow) | 'healthy' (green)
 */
export const getStockStatus = (product) => {
  const stock = Number(product.currentStock) || 0;
  const minCrit = Number(product.minCriticalThreshold) || 5;
  const healthy = Number(product.healthyThreshold) || 20;

  if (stock <= minCrit) {
    return {
      status: 'critical',
      label: stock === 0 ? 'نافد تماماً' : 'حرج / نقص حاد',
      color: 'red',
      bgColor: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-900/50',
      badgeBg: 'bg-red-500 text-white',
      ringColor: 'ring-red-500/20',
      dotColor: 'bg-red-500',
      progressColor: 'bg-red-500',
    };
  } else if (stock <= healthy) {
    return {
      status: 'warning',
      label: 'مخزون متوسط (يحتاج طلب)',
      color: 'amber',
      bgColor: 'bg-amber-500/10 text-amber-800 dark:text-amber-400 border-amber-200 dark:border-amber-900/50',
      badgeBg: 'bg-amber-500 text-white',
      ringColor: 'ring-amber-500/20',
      dotColor: 'bg-amber-500',
      progressColor: 'bg-amber-500',
    };
  } else {
    return {
      status: 'healthy',
      label: 'مخزون كافي وممتاز',
      color: 'emerald',
      bgColor: 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50',
      badgeBg: 'bg-emerald-500 text-white',
      ringColor: 'ring-emerald-500/20',
      dotColor: 'bg-emerald-500',
      progressColor: 'bg-emerald-500',
    };
  }
};

/**
 * Check if a product is due/delayed for audit
 */
export const getAuditRecency = (product, maxDays = 3) => {
  const audits = product.auditHistory || [];
  if (audits.length === 0) {
    return {
      needsAudit: true,
      lastAuditDate: null,
      daysAgo: Infinity,
      formattedText: 'لم يجرد بعد',
      badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
    };
  }

  // Sort descending by date
  const sorted = [...audits].sort((a, b) => new Date(b.date) - new Date(a.date));
  const lastDate = new Date(sorted[0].date);
  const now = new Date();
  const diffTime = Math.abs(now - lastDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  let formattedText = '';
  if (diffDays === 0) {
    formattedText = 'تم الجرد اليوم';
  } else if (diffDays === 1) {
    formattedText = 'تم الجرد بالأمس';
  } else if (diffDays === 2) {
    formattedText = 'منذ يومين';
  } else {
    formattedText = `منذ ${diffDays} أيام`;
  }

  const needsAudit = diffDays >= maxDays;

  return {
    needsAudit,
    lastAuditDate: lastDate,
    daysAgo: diffDays,
    formattedText,
    badgeClass: needsAudit
      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 animate-pulse'
      : 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300'
  };
};

/**
 * Format Arabic date & time
 */
export const formatArabicDateTime = (isoDate) => {
  if (!isoDate) return '-';
  try {
    const d = new Date(isoDate);
    const dateStr = d.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    const timeStr = d.toLocaleTimeString('ar-EG', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    return `${dateStr} - ${timeStr}`;
  } catch {
    return isoDate;
  }
};
