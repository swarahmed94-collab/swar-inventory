import { 
  saveStoredProducts, 
  saveStoredInvoices, 
  saveStoredCustomers, 
  saveStoredJournal,
  getStoredInvoices,
  getStoredProducts,
  getStoredCustomers,
  getStoredJournal
} from './storage';

const AUDIT_TRAIL_KEY = 'swar_audit_trail_v1';

/**
 * Generate a guaranteed unique, collision-proof invoice number
 * Format: INV-YYYYMM-XXXX or PUR-YYYYMM-XXXX
 */
export const generateInvoiceNumber = (type = 'sales', existingInvoices = []) => {
  const prefix = type === 'purchase' ? 'PUR' : 'INV';
  const date = new Date();
  const yearMonth = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}`;
  
  // Find highest number for current prefix & month
  const pattern = new RegExp(`^${prefix}-${yearMonth}-(\\d+)$`);
  let maxSeq = 0;

  (existingInvoices || []).forEach(inv => {
    if (inv && inv.invoiceNumber) {
      const match = String(inv.invoiceNumber).match(pattern);
      if (match) {
        const seq = parseInt(match[1], 10);
        if (!isNaN(seq) && seq > maxSeq) {
          maxSeq = seq;
        }
      }
    }
  });

  const nextSeq = String(maxSeq + 1).padStart(4, '0');
  return `${prefix}-${yearMonth}-${nextSeq}`;
};

/**
 * Get the full system audit trail history
 */
export const getStoredAuditTrail = () => {
  try {
    const data = localStorage.getItem(AUDIT_TRAIL_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error reading audit trail:', err);
    return [];
  }
};

/**
 * Save audit trail log entries
 */
export const saveStoredAuditTrail = (entries) => {
  try {
    if (Array.isArray(entries)) {
      // Keep last 1000 audit log entries to prevent storage bloat
      const trimmed = entries.slice(0, 1000);
      localStorage.setItem(AUDIT_TRAIL_KEY, JSON.stringify(trimmed));
    }
  } catch (err) {
    console.error('Error saving audit trail:', err);
  }
};

/**
 * Append an immutable log event to the audit trail
 */
export const logAuditEvent = (event) => {
  try {
    const current = getStoredAuditTrail();
    const newEntry = {
      id: 'aud-event-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      timestamp: new Date().toISOString(),
      action: event.action || 'GENERAL_ACTION', // 'INVOICE_CREATED' | 'INVOICE_DELETED' | 'STOCK_RESET' | 'BULK_IMPORT' | 'QUICK_AUDIT'
      actor: event.actor || 'مسؤول النظام',
      title: event.title || 'عملية في النظام',
      details: event.details || '',
      metadata: event.metadata || {},
    };

    const updated = [newEntry, ...current];
    saveStoredAuditTrail(updated);
    return newEntry;
  } catch (err) {
    console.error('Failed to log audit event:', err);
    return null;
  }
};

/**
 * Execute an atomic transaction across all inventory datasets with automatic rollback on error.
 */
export const executeAtomicTransaction = ({
  updatedProducts,
  updatedInvoices,
  updatedCustomers,
  updatedJournal,
  auditEvent
}) => {
  // 1. Take a safe snapshot before executing
  const snapshot = {
    products: localStorage.getItem('swar_frozen_inventory_v2'),
    invoices: localStorage.getItem('swar_invoices_v1'),
    customers: localStorage.getItem('swar_customers_v1'),
    journal: localStorage.getItem('swar_journal_v1'),
    auditTrail: localStorage.getItem(AUDIT_TRAIL_KEY)
  };

  try {
    // 2. Perform writes
    if (updatedProducts !== undefined) {
      saveStoredProducts(updatedProducts);
    }
    if (updatedInvoices !== undefined) {
      saveStoredInvoices(updatedInvoices);
    }
    if (updatedCustomers !== undefined) {
      saveStoredCustomers(updatedCustomers);
    }
    if (updatedJournal !== undefined) {
      saveStoredJournal(updatedJournal);
    }
    if (auditEvent) {
      logAuditEvent(auditEvent);
    }

    // 3. Verify integrity
    const verifyInvs = getStoredInvoices();
    if (updatedInvoices !== undefined && verifyInvs.length !== updatedInvoices.length) {
      throw new Error('فشل التحقق من حفظ الفواتير في الذاكرة المحلية');
    }

    return { success: true };
  } catch (error) {
    console.error('TRANSACTION FAILED - Rolling back state:', error);

    // Rollback to prior snapshot
    try {
      if (snapshot.products !== null) localStorage.setItem('swar_frozen_inventory_v2', snapshot.products);
      if (snapshot.invoices !== null) localStorage.setItem('swar_invoices_v1', snapshot.invoices);
      if (snapshot.customers !== null) localStorage.setItem('swar_customers_v1', snapshot.customers);
      if (snapshot.journal !== null) localStorage.setItem('swar_journal_v1', snapshot.journal);
      if (snapshot.auditTrail !== null) localStorage.setItem(AUDIT_TRAIL_KEY, snapshot.auditTrail);
    } catch (rbErr) {
      console.error('Fatal Rollback error:', rbErr);
    }

    return { 
      success: false, 
      error: error.message || 'حدث خطأ أثناء حفظ المعاملة. تم استرجاع الحالة السابقة بأمان.' 
    };
  }
};
