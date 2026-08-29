import { INITIAL_PRODUCTS } from '../data/defaultProducts.js';
import { HARDCODED_COST_PRICES } from '../data/hardcodedCostPrices.js';

const STORAGE_KEY = 'swar_frozen_inventory_v2';
const SCHEMA_KEY = 'swar_schema_version';
const CURRENT_SCHEMA = 'v5_hardcoded_cost_prices_aug2026';
const SETTINGS_KEY = 'swar_app_settings_v1';
const INVOICES_KEY = 'swar_invoices_v1';
const CUSTOMERS_KEY = 'swar_customers_v1';
const JOURNAL_KEY = 'swar_journal_v1';

// Build fast lookup map for initial catalog cost prices
const initialCostMap = new Map();
INITIAL_PRODUCTS.forEach(item => {
  if (item?.id && item.cost_price !== undefined) {
    initialCostMap.set(item.id, Number(item.cost_price));
  }
});

export const normalizeProduct = (p) => {
  if (!p || typeof p !== 'object') return p;
  const selling_price = Number(p.selling_price ?? p.price ?? 0);
  
  // 1. Direct cost_price from product
  let cost_price = Number(p.cost_price ?? p.costPrice ?? 0);

  // 2. If missing or 0, fallback to hardcoded PDF dataset lookup by barcode or name
  if (cost_price === 0) {
    if (p.barcode && HARDCODED_COST_PRICES[p.barcode] !== undefined) {
      cost_price = Number(HARDCODED_COST_PRICES[p.barcode]);
    } else if (p.name && HARDCODED_COST_PRICES[p.name] !== undefined) {
      cost_price = Number(HARDCODED_COST_PRICES[p.name]);
    } else if (p.id && initialCostMap.has(p.id)) {
      cost_price = initialCostMap.get(p.id);
    }
  }

  return {
    ...p,
    selling_price,
    cost_price,
    price: selling_price // backward compatibility alias for selling_price
  };
};

export const getStoredProducts = () => {
  try {
    const existingSchema = localStorage.getItem(SCHEMA_KEY);
    if (existingSchema !== CURRENT_SCHEMA) {
      // Migrate stored products to v5 schema: populate hardcoded cost prices while preserving existing stock and audit logs
      localStorage.setItem(SCHEMA_KEY, CURRENT_SCHEMA);
      const data = localStorage.getItem(STORAGE_KEY);
      let existingProducts = [];
      try {
        if (data) existingProducts = JSON.parse(data);
      } catch (_) {}

      const existingMap = new Map();
      if (Array.isArray(existingProducts)) {
        existingProducts.forEach(p => { if (p?.id) existingMap.set(p.id, p); });
      }

      const merged = INITIAL_PRODUCTS.map(initProd => {
        const stored = existingMap.get(initProd.id);
        if (stored) {
          const customCost = Number(stored.cost_price ?? stored.costPrice ?? 0);
          const finalCost = customCost > 0 ? customCost : Number(initProd.cost_price ?? 0);
          const finalSelling = Number(stored.selling_price ?? stored.price ?? initProd.selling_price ?? initProd.price ?? 0);

          return {
            ...initProd,
            currentStock: stored.currentStock !== undefined ? stored.currentStock : initProd.currentStock,
            auditHistory: Array.isArray(stored.auditHistory) && stored.auditHistory.length > 0 ? stored.auditHistory : initProd.auditHistory,
            cost_price: finalCost,
            selling_price: finalSelling,
            price: finalSelling,
            notes: stored.notes || initProd.notes,
            freezerLocation: stored.freezerLocation || initProd.freezerLocation
          };
        }
        return normalizeProduct(initProd);
      });

      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return merged;
    }

    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      const normalizedInitial = INITIAL_PRODUCTS.map(normalizeProduct);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedInitial));
      return normalizedInitial;
    }

    const stored = JSON.parse(data);
    if (!Array.isArray(stored) || stored.length === 0) {
      const normalizedInitial = INITIAL_PRODUCTS.map(normalizeProduct);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedInitial));
      return normalizedInitial;
    }

    return stored.map(normalizeProduct);
  } catch (err) {
    console.error('Error loading products from localStorage:', err);
    return INITIAL_PRODUCTS.map(normalizeProduct);
  }
};

export const resetProductsToNewDataset = () => {
  try {
    localStorage.setItem(SCHEMA_KEY, CURRENT_SCHEMA);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  } catch (err) {
    console.error('Error resetting products:', err);
    return INITIAL_PRODUCTS;
  }
};

export const saveStoredProducts = (products) => {
  try {
    if (Array.isArray(products)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }
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
        auditWarningDays: 3,
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
    if (settings) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    }
  } catch (err) {
    console.error('Error saving app settings:', err);
  }
};

export const getStoredInvoices = () => {
  try {
    const data = localStorage.getItem(INVOICES_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error loading invoices from storage:', err);
    return [];
  }
};

export const saveStoredInvoices = (invoices) => {
  try {
    if (Array.isArray(invoices)) {
      localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
    }
  } catch (err) {
    console.error('Error saving invoices to storage:', err);
  }
};

export const getStoredCustomers = () => {
  try {
    const data = localStorage.getItem(CUSTOMERS_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error loading customers from storage:', err);
    return [];
  }
};

export const saveStoredCustomers = (customers) => {
  try {
    if (Array.isArray(customers)) {
      localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));
    }
  } catch (err) {
    console.error('Error saving customers to storage:', err);
  }
};

export const getStoredJournal = () => {
  try {
    const data = localStorage.getItem(JOURNAL_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error loading journal from storage:', err);
    return [];
  }
};

export const saveStoredJournal = (entries) => {
  try {
    if (Array.isArray(entries)) {
      localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries));
    }
  } catch (err) {
    console.error('Error saving journal to storage:', err);
  }
};

/**
 * Calculate stock health status
 */
export const getStockStatus = (product) => {
  if (!product) {
    return {
      status: 'healthy',
      label: 'غير محدد',
      color: 'slate',
      bgColor: 'bg-slate-100 text-slate-700',
      badgeBg: 'bg-slate-500 text-white',
      ringColor: '',
      dotColor: 'bg-slate-500',
      progressColor: 'bg-slate-500',
    };
  }

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
  const audits = product?.auditHistory || [];
  if (audits.length === 0) {
    return {
      needsAudit: true,
      lastAuditDate: null,
      daysAgo: Infinity,
      formattedText: 'لم يجرد بعد',
      badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
    };
  }

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
    if (isNaN(d.getTime())) return String(isoDate);
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
    return String(isoDate || '-');
  }
};
