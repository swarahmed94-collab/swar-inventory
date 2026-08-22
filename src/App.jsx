import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import DashboardStats from './components/DashboardStats';
import ProductList from './components/ProductList';
import AuditModal from './components/AuditModal';
import QuickAuditFlow from './components/QuickAuditFlow';
import ProductFormModal from './components/ProductFormModal';
import ReportModal from './components/ReportModal';
import PurchaseOrderModal from './components/PurchaseOrderModal';
import SyncModal from './components/SyncModal';
import AdminModal from './components/AdminModal';
import InvoiceModal from './components/InvoiceModal';
import DailyJournalModal from './components/DailyJournalModal';
import InvoicePdfImportModal from './components/InvoicePdfImportModal';
import BulkStockImportModal from './components/BulkStockImportModal';
import InventoryResetModal from './components/InventoryResetModal';
import AuditTrailModal from './components/AuditTrailModal';
import { 
  getStoredProducts, 
  saveStoredProducts, 
  getAppSettings, 
  saveAppSettings,
  getStoredInvoices,
  saveStoredInvoices,
  getStoredCustomers,
  saveStoredCustomers,
  getStoredJournal,
  saveStoredJournal
} from './utils/storage';
import { 
  executeAtomicTransaction, 
  generateInvoiceNumber, 
  logAuditEvent 
} from './utils/transactions';
import { getAuth, saveAuth } from './utils/auth';
import { createLiveSyncChannel } from './utils/cloudSync';
import { sounds } from './utils/sound';

export default function App() {
  const [products, setProducts] = useState(getStoredProducts);
  const [invoices, setInvoices] = useState(getStoredInvoices);
  const [customers, setCustomers] = useState(getStoredCustomers);
  const [journal, setJournal] = useState(getStoredJournal);
  const [settings, setSettings] = useState(getAppSettings);
  const [isAdmin, setIsAdmin] = useState(() => getAuth().isAdmin);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeStatusFilter, setActiveStatusFilter] = useState('all');

  // Modals
  const [auditProduct, setAuditProduct] = useState(null);
  const [isQuickAuditOpen, setIsQuickAuditOpen] = useState(false);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [invoiceToEdit, setInvoiceToEdit] = useState(null);
  const [isPurchaseOrderOpen, setIsPurchaseOrderOpen] = useState(false);
  const [isSyncOpen, setIsSyncOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [isPdfImportOpen, setIsPdfImportOpen] = useState(false);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isAuditTrailOpen, setIsAuditTrailOpen] = useState(false);

  const liveChannelRef = useRef(null);

  // Sync theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.theme === 'dark');
    saveAppSettings(settings);
  }, [settings]);

  // Persist products
  useEffect(() => { saveStoredProducts(products); }, [products]);

  // Persist invoices
  useEffect(() => { saveStoredInvoices(invoices); }, [invoices]);

  // Persist customers
  useEffect(() => { saveStoredCustomers(customers); }, [customers]);

  // Persist journal
  useEffect(() => { saveStoredJournal(journal); }, [journal]);

  // Live cloud sync with non-destructive merge
  useEffect(() => {
    liveChannelRef.current = createLiveSyncChannel((remoteState) => {
      if (!remoteState) return;

      // Products update
      if (Array.isArray(remoteState.products) && remoteState.products.length > 0) {
        setProducts(remoteState.products);
      }

      // Safe non-destructive Invoices merge by ID
      if (Array.isArray(remoteState.invoices)) {
        setInvoices(prev => {
          const map = new Map();
          (prev || []).forEach(inv => { if (inv?.id) map.set(inv.id, inv); });
          (remoteState.invoices || []).forEach(inv => {
            if (inv?.id && (!map.has(inv.id) || new Date(inv.createdAt || 0) >= new Date(map.get(inv.id)?.createdAt || 0))) {
              map.set(inv.id, inv);
            }
          });
          return Array.from(map.values()).sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        });
      }

      // Customers update
      if (Array.isArray(remoteState.customers)) {
        setCustomers(remoteState.customers);
      }

      // Journal update
      if (Array.isArray(remoteState.journal)) {
        setJournal(remoteState.journal);
      }
    });
    return () => liveChannelRef.current?.close();
  }, []);

  const broadcast = (updatedProducts, updatedInvoices, updatedCustomers, updatedJournal) => {
    const prods = updatedProducts !== undefined ? updatedProducts : products;
    const invs = updatedInvoices !== undefined ? updatedInvoices : invoices;
    const custs = updatedCustomers !== undefined ? updatedCustomers : customers;
    const jrnl = updatedJournal !== undefined ? updatedJournal : journal;
    liveChannelRef.current?.broadcastLocalChange({
      products: prods,
      invoices: invs,
      customers: custs,
      journal: jrnl
    });
  };

  const toggleTheme = () => {
    sounds.playClick();
    setSettings(prev => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }));
  };

  // ─── CRUD PRODUCTS ──────────────────────────────────────────
  const handleSaveProduct = (productData, existingId) => {
    if (!isAdmin) return;
    let updated;
    if (existingId) {
      updated = products.map(p => p.id === existingId ? { ...p, ...productData, updatedAt: new Date().toISOString() } : p);
    } else {
      const newProd = {
        ...productData,
        id: 'prod-' + Date.now(),
        createdAt: new Date().toISOString(),
        auditHistory: [{
          id: 'aud-' + Date.now(),
          date: new Date().toISOString(),
          quantity: Number(productData.currentStock) || 0,
          delta: Number(productData.currentStock) || 0,
          auditor: settings.auditorName || 'مسؤول الجرد',
          notes: 'الرصيد الافتتاحي'
        }]
      };
      updated = [newProd, ...products];
    }
    
    executeAtomicTransaction({
      updatedProducts: updated,
      auditEvent: {
        action: existingId ? 'PRODUCT_UPDATED' : 'PRODUCT_CREATED',
        actor: settings.auditorName || 'مسؤول النظام',
        title: existingId ? `تعديل صنف: ${productData.name}` : `إضافة صنف جديد: ${productData.name}`,
        details: `السعر: ${productData.price} ج | الرصيد: ${productData.currentStock}`
      }
    });

    setProducts(updated);
    broadcast(updated, invoices, customers, journal);
  };

  const handleDeleteProduct = (productId, productName) => {
    if (!isAdmin) return;
    if (window.confirm(`هل تريد حذف الصنف "${productName}"؟ لا يمكن التراجع.`)) {
      sounds.playWarning();
      const updated = products.filter(p => p.id !== productId);
      executeAtomicTransaction({
        updatedProducts: updated,
        auditEvent: {
          action: 'PRODUCT_DELETED',
          actor: settings.auditorName || 'مسؤول النظام',
          title: `حذف صنف من الكتالوج: ${productName}`,
          details: `كود الصنف: ${productId}`
        }
      });
      setProducts(updated);
      broadcast(updated, invoices, customers, journal);
    }
  };

  const handleQuickUpdateStock = (productId, delta) => {
    if (!isAdmin) return;
    const updated = products.map(p => {
      if (p.id !== productId) return p;
      const newStock = Math.max(0, Number(p.currentStock) + delta);
      const log = {
        id: 'aud-' + Date.now(),
        date: new Date().toISOString(),
        quantity: newStock,
        delta,
        auditor: settings.auditorName || 'مسؤول الجرد',
        notes: delta > 0 ? 'زيادة سريعة (+1)' : 'صرف سريع (-1)'
      };
      return { ...p, currentStock: newStock, auditHistory: [...(p.auditHistory || []), log] };
    });
    setProducts(updated);
    broadcast(updated, invoices, customers, journal);
  };

  const handleAddAuditLog = (productId, auditEntry) => {
    if (!isAdmin) return;
    const updated = products.map(p => {
      if (p.id !== productId) return p;
      return { ...p, currentStock: auditEntry.quantity, auditHistory: [...(p.auditHistory || []), auditEntry] };
    });
    setProducts(updated);
    broadcast(updated, invoices, customers, journal);
    setAuditProduct(prev =>
      prev?.id === productId
        ? { ...prev, currentStock: auditEntry.quantity, auditHistory: [...(prev.auditHistory || []), auditEntry] }
        : prev
    );
  };

  const handleDeleteAuditLog = (productId, logId) => {
    if (!isAdmin) return;
    const updated = products.map(p => {
      if (p.id !== productId) return p;
      const logs = (p.auditHistory || []).filter(l => l.id !== logId);
      const latestQty = logs.length > 0
        ? [...logs].sort((a, b) => new Date(b.date) - new Date(a.date))[0].quantity
        : p.currentStock;
      return { ...p, currentStock: latestQty, auditHistory: logs };
    });
    setProducts(updated);
    broadcast(updated, invoices, customers, journal);
    setAuditProduct(prev => {
      if (prev?.id !== productId) return prev;
      const logs = (prev.auditHistory || []).filter(l => l.id !== logId);
      const latestQty = logs.length > 0
        ? [...logs].sort((a, b) => new Date(b.date) - new Date(a.date))[0].quantity
        : prev.currentStock;
      return { ...prev, currentStock: latestQty, auditHistory: logs };
    });
  };

  const handleBatchAuditComplete = (auditResults) => {
    if (!isAdmin) return;
    const now = new Date().toISOString();
    let changeCount = 0;
    const updated = products.map(p => {
      if (auditResults[p.id] === undefined) return p;
      const qty = Number(auditResults[p.id]);
      changeCount++;
      const log = {
        id: 'aud-' + Date.now() + '-' + p.id,
        date: now,
        quantity: qty,
        delta: qty - Number(p.currentStock),
        auditor: settings.auditorName || 'مسؤول الجرد',
        notes: 'جرد سريع ميداني'
      };
      return { ...p, currentStock: qty, auditHistory: [...(p.auditHistory || []), log] };
    });

    executeAtomicTransaction({
      updatedProducts: updated,
      auditEvent: {
        action: 'QUICK_AUDIT',
        actor: settings.auditorName || 'مسؤول الجرد',
        title: `عملية جرد سريع ميداني (${changeCount} صنف)`,
        details: `تم تحديث الأرصدة الفعلية ميدانياً`
      }
    });

    setProducts(updated);
    broadcast(updated, invoices, customers, journal);
  };

  // ─── INVOICE PROCESSING, STOCK & CUSTOMER DEBT LOGIC ──────────
  const handleProcessInvoice = (invoiceData) => {
    if (!isAdmin) return;
    const now = new Date().toISOString();
    const isSales = invoiceData.type === 'sales';
    const itemsMap = new Map();
    (invoiceData.items || []).forEach(item => {
      itemsMap.set(item.productId, (itemsMap.get(item.productId) || 0) + Number(item.qty));
    });

    // 1. Update Products Stock: Deduct for sales, Add for purchases
    const updatedProds = products.map(p => {
      if (!itemsMap.has(p.id)) return p;
      const changeQty = itemsMap.get(p.id);
      const newStock = isSales
        ? Number(p.currentStock) - changeQty
        : Number(p.currentStock) + changeQty;
      
      const log = {
        id: 'aud-inv-' + Date.now() + '-' + p.id,
        date: now,
        quantity: newStock,
        delta: isSales ? -changeQty : +changeQty,
        auditor: invoiceData.invoiceNumber || (isSales ? 'فاتورة مبيعات' : 'فاتورة مشتريات'),
        notes: invoiceData.customerName
          ? `${isSales ? 'فاتورة مبيعات للعميل: ' : 'فاتورة مشتريات من: '}${invoiceData.customerName}`
          : (isSales ? 'فاتورة مبيعات نقدية' : 'مشتريات بضاعة')
      };
      return {
        ...p,
        currentStock: newStock,
        updatedAt: now,
        auditHistory: [...(p.auditHistory || []), log]
      };
    });

    // 2. Update Customer Record & Outstanding Debt
    let updatedCusts = [...customers];
    const custName = (invoiceData.customerName || '').trim();
    if (custName && isSales) {
      const remainingDebt = Number(invoiceData.remainingBalance) || 0;
      const existingIdx = updatedCusts.findIndex(c => c.name?.trim().toLowerCase() === custName.toLowerCase());

      if (existingIdx >= 0) {
        const existing = updatedCusts[existingIdx];
        updatedCusts[existingIdx] = {
          ...existing,
          phone: invoiceData.customerPhone || existing.phone || '',
          totalDebt: (Number(existing.totalDebt) || 0) + remainingDebt,
          invoicesCount: (Number(existing.invoicesCount) || 0) + 1,
          updatedAt: now
        };
      } else {
        updatedCusts.push({
          id: 'cust-' + Date.now(),
          name: custName,
          phone: invoiceData.customerPhone || '',
          totalDebt: remainingDebt,
          invoicesCount: 1,
          createdAt: now,
          updatedAt: now
        });
      }
    }

    // 3. Record in Daily Cash Journal if amountPaid > 0 and requested
    let updatedJrnl = [...journal];
    const paid = Number(invoiceData.amountPaid);
    if (invoiceData.recordInJournal && paid > 0) {
      const journalEntry = {
        id: 'jrnl-' + Date.now(),
        date: now,
        type: isSales ? 'income' : 'expense',
        amount: paid,
        personName: custName || (isSales ? 'عميل نقدي' : 'مورد بضاعة'),
        category: isSales ? 'تحصيل مبيعات نقدية' : 'مشتريات وتوريد بضاعة',
        notes: `${isSales ? 'فاتورة مبيعات' : 'فاتورة مشتريات'} رقم ${invoiceData.invoiceNumber}`,
        invoiceId: invoiceData.id,
        createdAt: now
      };
      updatedJrnl = [journalEntry, ...updatedJrnl];
    }

    const updatedInvs = [invoiceData, ...invoices];

    // Atomic Transaction with Rollback Protection
    const txResult = executeAtomicTransaction({
      updatedProducts: updatedProds,
      updatedInvoices: updatedInvs,
      updatedCustomers: updatedCusts,
      updatedJournal: updatedJrnl,
      auditEvent: {
        action: isSales ? 'SALES_INVOICE_CREATED' : 'PURCHASE_INVOICE_CREATED',
        actor: settings.auditorName || 'مسؤول النظام',
        title: `إصدار ${isSales ? 'فاتورة مبيعات' : 'فاتورة مشتريات'} (${invoiceData.invoiceNumber})`,
        details: `الطرف: ${invoiceData.customerName || 'نقدي'} | الإجمالي: ${invoiceData.total} ج | الأصناف: ${(invoiceData.items || []).length} صنف`,
        metadata: { invoiceId: invoiceData.id, invoiceNumber: invoiceData.invoiceNumber }
      }
    });

    if (!txResult.success) {
      alert(`⚠️ تعذر حفظ الفاتورة: ${txResult.error}`);
      return;
    }

    setProducts(updatedProds);
    setInvoices(updatedInvs);
    setCustomers(updatedCusts);
    setJournal(updatedJrnl);

    broadcast(updatedProds, updatedInvs, updatedCusts, updatedJrnl);
    sounds.playSuccess();
  };

  const handleEditInvoice = (invoiceId) => {
    if (!isAdmin) return;
    setIsInvoiceOpen(true);
    setInvoiceToEdit(invoices.find(i => i.id === invoiceId) || null);
  };

  const handleDeleteInvoice = (invoiceId, restoreStock = false) => {
    if (!isAdmin) return;
    const invToDelete = invoices.find(i => i.id === invoiceId);
    let updatedProds = products;
    let updatedCusts = customers;

    if (invToDelete && invToDelete.deductedFromStock && restoreStock) {
      const now = new Date().toISOString();
      const isSales = invToDelete.type === 'sales';
      const itemsMap = new Map();
      (invToDelete.items || []).forEach(item => {
        itemsMap.set(item.productId, (itemsMap.get(item.productId) || 0) + Number(item.qty));
      });

      // Rollback products stock
      updatedProds = products.map(p => {
        if (!itemsMap.has(p.id)) return p;
        const changeQty = itemsMap.get(p.id);
        const newStock = isSales
          ? Number(p.currentStock) + changeQty
          : Math.max(0, Number(p.currentStock) - changeQty);
        
        const log = {
          id: 'aud-del-inv-' + Date.now() + '-' + p.id,
          date: now,
          quantity: newStock,
          delta: isSales ? +changeQty : -changeQty,
          auditor: 'إلغاء ' + (invToDelete.invoiceNumber || 'فاتورة'),
          notes: `استرجاع بعد حذف الفاتورة ${invToDelete.invoiceNumber || ''}`
        };
        return {
          ...p,
          currentStock: newStock,
          updatedAt: now,
          auditHistory: [...(p.auditHistory || []), log]
        };
      });

      // Rollback customer debt
      if (isSales && invToDelete.customerName) {
        const debtAdded = Number(invToDelete.remainingBalance) || 0;
        updatedCusts = customers.map(c => {
          if (c.name?.trim().toLowerCase() === invToDelete.customerName.trim().toLowerCase()) {
            return {
              ...c,
              totalDebt: Math.max(0, (Number(c.totalDebt) || 0) - debtAdded),
              invoicesCount: Math.max(0, (Number(c.invoicesCount) || 1) - 1),
              updatedAt: now
            };
          }
          return c;
        });
      }
    }

    const updatedInvs = invoices.filter(i => i.id !== invoiceId);

    executeAtomicTransaction({
      updatedProducts: updatedProds,
      updatedInvoices: updatedInvs,
      updatedCustomers: updatedCusts,
      auditEvent: {
        action: 'INVOICE_DELETED',
        actor: settings.auditorName || 'مسؤول النظام',
        title: `حذف الفاتورة (${invToDelete?.invoiceNumber || invoiceId})`,
        details: restoreStock ? 'تم استرجاع كميات المخزون وتعديل حساب العميل' : 'حذف سجل الفاتورة بدون تعديل المخزون'
      }
    });

    setProducts(updatedProds);
    setInvoices(updatedInvs);
    setCustomers(updatedCusts);
    broadcast(updatedProds, updatedInvs, updatedCusts, journal);
  };

  // ─── PDF INVOICE IMPORT HANDLER (Feature 1) ───────────────────
  const handlePdfInvoiceImport = ({
    items,
    vendorName,
    paymentType,
    recordInJournal,
    updateProductPrices,
    totalAmount,
    totalUnits,
    fileName
  }) => {
    if (!isAdmin) return;
    const now = new Date().toISOString();
    const invoiceNum = generateInvoiceNumber('purchase', invoices);

    const itemsMap = new Map();
    items.forEach(item => {
      itemsMap.set(item.productId, {
        qty: (itemsMap.get(item.productId)?.qty || 0) + Number(item.qty),
        price: Number(item.price) || 0
      });
    });

    // 1. Update product quantities & optional price updates
    const updatedProds = products.map(p => {
      if (!itemsMap.has(p.id)) return p;
      const { qty: addQty, price: newPrice } = itemsMap.get(p.id);
      const newStock = Number(p.currentStock) + addQty;
      
      const log = {
        id: 'aud-pdf-' + Date.now() + '-' + p.id,
        date: now,
        quantity: newStock,
        delta: +addQty,
        auditor: invoiceNum,
        notes: `استيراد من فاتورة PDF (${vendorName})`
      };

      return {
        ...p,
        currentStock: newStock,
        price: (updateProductPrices && newPrice > 0) ? newPrice : p.price,
        updatedAt: now,
        auditHistory: [...(p.auditHistory || []), log]
      };
    });

    // 2. Create Purchase Invoice Record
    const newPurchaseInvoice = {
      id: 'inv-pdf-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      invoiceNumber: invoiceNum,
      type: 'purchase',
      customerName: vendorName || 'مورد بضاعة (استيراد PDF)',
      customerPhone: '',
      paymentType: paymentType || 'cash',
      items: items.map(it => ({
        productId: it.productId,
        name: it.name,
        unit: it.unit || 'وحدة',
        price: Number(it.price) || 0,
        qty: Number(it.qty) || 0
      })),
      total: totalAmount,
      totalUnits,
      amountPaid: paymentType === 'cash' ? totalAmount : 0,
      remainingBalance: paymentType === 'credit' ? totalAmount : 0,
      recordInJournal,
      notes: `استيراد آلي من ملف: ${fileName || 'فاتورة PDF'}`,
      deductedFromStock: true,
      createdAt: now
    };

    const updatedInvs = [newPurchaseInvoice, ...invoices];

    // 3. Record in Cash Journal if cash
    let updatedJrnl = journal;
    if (recordInJournal && paymentType === 'cash' && totalAmount > 0) {
      const journalEntry = {
        id: 'jrnl-pdf-' + Date.now(),
        date: now,
        type: 'expense',
        amount: totalAmount,
        personName: vendorName,
        category: 'مشتريات وتوريد بضاعة (PDF)',
        notes: `سداد فاتورة مشتريات رقم ${invoiceNum}`,
        invoiceId: newPurchaseInvoice.id,
        createdAt: now
      };
      updatedJrnl = [journalEntry, ...journal];
    }

    // Atomic Transaction
    const tx = executeAtomicTransaction({
      updatedProducts: updatedProds,
      updatedInvoices: updatedInvs,
      updatedJournal: updatedJrnl,
      auditEvent: {
        action: 'PDF_INVOICE_IMPORT',
        actor: settings.auditorName || 'مسؤول النظام',
        title: `استيراد فاتورة PDF ومطابقتها (${invoiceNum})`,
        details: `المورد: ${vendorName} | الأصناف: ${items.length} صنف | الإجمالي: ${totalAmount.toFixed(2)} ج`
      }
    });

    if (!tx.success) {
      alert(`⚠️ تعذر استيراد الفاتورة: ${tx.error}`);
      return;
    }

    setProducts(updatedProds);
    setInvoices(updatedInvs);
    setJournal(updatedJrnl);

    broadcast(updatedProds, updatedInvs, customers, updatedJrnl);
    sounds.playSuccess();
  };

  // ─── BULK STOCK IMPORT HANDLER (Feature 2) ────────────────────
  const handleBulkStockImport = ({ items, mode, sourceName }) => {
    if (!isAdmin) return;
    const now = new Date().toISOString();
    const itemsMap = new Map();
    items.forEach(item => {
      itemsMap.set(item.productId, item);
    });

    const updatedProds = products.map(p => {
      if (!itemsMap.has(p.id)) return p;
      const imp = itemsMap.get(p.id);
      const newStock = Number(imp.newStock);
      const delta = Number(imp.delta);

      const log = {
        id: 'aud-bulk-' + Date.now() + '-' + p.id,
        date: now,
        quantity: newStock,
        delta,
        auditor: 'استيراد مجمع',
        notes: mode === 'add' ? `إضافة رصيد من ملف: ${sourceName}` : `تحديث الرصيد الفعلي من ملف: ${sourceName}`
      };

      return {
        ...p,
        currentStock: newStock,
        updatedAt: now,
        auditHistory: [...(p.auditHistory || []), log]
      };
    });

    const tx = executeAtomicTransaction({
      updatedProducts: updatedProds,
      auditEvent: {
        action: 'BULK_IMPORT',
        actor: settings.auditorName || 'مسؤول النظام',
        title: `استيراد وتحديث مجمع للمخزون (${items.length} صنف)`,
        details: `النمط: ${mode === 'add' ? 'إضافة للرصيد' : 'تعيين رصيد جديد'} | المصدر: ${sourceName}`
      }
    });

    if (!tx.success) {
      alert(`⚠️ تعذر تحديث المخزون المجمع: ${tx.error}`);
      return;
    }

    setProducts(updatedProds);
    broadcast(updatedProds, invoices, customers, journal);
    sounds.playSuccess();
  };

  // ─── FULL INVENTORY RESET HANDLER (Feature 4) ─────────────────
  const handleFullInventoryReset = ({ resetNotes, totalProductsCount, previousTotalStock }) => {
    if (!isAdmin) return;
    const now = new Date().toISOString();

    const updatedProds = products.map(p => {
      const prevQty = Number(p.currentStock) || 0;
      const log = {
        id: 'aud-reset-' + Date.now() + '-' + p.id,
        date: now,
        quantity: 0,
        delta: -prevQty,
        auditor: settings.auditorName || 'مسؤول النظام',
        notes: `تصفير شامل للمخزون: ${resetNotes}`
      };

      return {
        ...p,
        currentStock: 0,
        updatedAt: now,
        auditHistory: [...(p.auditHistory || []), log]
      };
    });

    const tx = executeAtomicTransaction({
      updatedProducts: updatedProds,
      auditEvent: {
        action: 'STOCK_RESET',
        actor: settings.auditorName || 'مسؤول النظام',
        title: `⚠️ تصفير شامل لكامل المخزون (Zero All Stock)`,
        details: `تم تصفير كميات ${totalProductsCount} صنف (إجمالي الكميات المصفرة: ${previousTotalStock.toFixed(2)} وحدة) - الملاحظة: ${resetNotes}`
      }
    });

    if (!tx.success) {
      alert(`⚠️ تعذر تصفير المخزون: ${tx.error}`);
      return;
    }

    setProducts(updatedProds);
    broadcast(updatedProds, invoices, customers, journal);
    sounds.playSuccess();
    alert('✅ تم تصفير كميات جميع الأصناف بنجاح مع توثيق الحركة في سجل التدقيق.');
  };

  // ─── DAILY CASH JOURNAL HANDLERS ────────────────────────────
  const handleAddJournalEntry = (newEntry) => {
    if (!isAdmin) return;
    const updatedJrnl = [newEntry, ...journal];
    setJournal(updatedJrnl);
    broadcast(products, invoices, customers, updatedJrnl);
  };

  const handleDeleteJournalEntry = (entryId) => {
    if (!isAdmin) return;
    const updatedJrnl = journal.filter(j => j.id !== entryId);
    setJournal(updatedJrnl);
    broadcast(products, invoices, customers, updatedJrnl);
  };

  const handleSettleCustomerDebt = (custName, paidAmount) => {
    if (!isAdmin) return;
    const now = new Date().toISOString();
    const num = Number(paidAmount);
    if (!num || num <= 0) return;

    // 1. Reduce Customer Debt
    const updatedCusts = customers.map(c => {
      if (c.name?.trim().toLowerCase() === custName.trim().toLowerCase()) {
        return {
          ...c,
          totalDebt: Math.max(0, (Number(c.totalDebt) || 0) - num),
          updatedAt: now
        };
      }
      return c;
    });

    // 2. Add Journal Entry for this collection
    const journalEntry = {
      id: 'jrnl-settle-' + Date.now(),
      date: now,
      type: 'income',
      amount: num,
      personName: custName,
      category: 'سداد دفعة مديونية من عميل',
      notes: `تحصيل دفعة نقدية وسداد مديونية للعميل ${custName}`,
      createdAt: now
    };

    const updatedJrnl = [journalEntry, ...journal];

    executeAtomicTransaction({
      updatedCustomers: updatedCusts,
      updatedJournal: updatedJrnl,
      auditEvent: {
        action: 'DEBT_SETTLED',
        actor: settings.auditorName || 'مسؤول النظام',
        title: `سداد دفعة مديونية للعميل: ${custName}`,
        details: `المبلغ المسدد: ${num} ج`
      }
    });

    setCustomers(updatedCusts);
    setJournal(updatedJrnl);
    broadcast(products, invoices, updatedCusts, updatedJrnl);
  };

  // ─── RENDER ─────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-sky-500 selection:text-white transition-colors duration-200">

      <Navbar
        theme={settings.theme}
        toggleTheme={toggleTheme}
        isAdmin={isAdmin}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onOpenAddModal={() => {
          if (!isAdmin) {
            setIsAdminModalOpen(true);
            return;
          }
          setProductToEdit(null);
          setIsProductFormOpen(true);
        }}
        onOpenQuickAudit={() => setIsQuickAuditOpen(true)}
        onOpenReport={() => setIsReportOpen(true)}
        onOpenPurchaseOrder={() => setIsPurchaseOrderOpen(true)}
        onOpenSync={() => setIsSyncOpen(true)}
        onOpenInvoice={() => setIsInvoiceOpen(true)}
        onOpenJournal={() => setIsJournalOpen(true)}
        onOpenPdfImport={() => setIsPdfImportOpen(true)}
        onOpenBulkImport={() => setIsBulkImportOpen(true)}
        onOpenAuditTrail={() => setIsAuditTrailOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <DashboardStats
          products={products}
          activeFilter={activeStatusFilter}
          onSelectFilter={setActiveStatusFilter}
        />
        <ProductList
          products={products}
          isAdmin={isAdmin}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          activeStatusFilter={activeStatusFilter}
          onSelectStatusFilter={setActiveStatusFilter}
          onOpenAudit={setAuditProduct}
          onEditProduct={(p) => {
            if (!isAdmin) {
              setIsAdminModalOpen(true);
              return;
            }
            setProductToEdit(p);
            setIsProductFormOpen(true);
          }}
          onDeleteProduct={handleDeleteProduct}
          onQuickUpdateStock={handleQuickUpdateStock}
          onOpenAddModal={() => {
            if (!isAdmin) {
              setIsAdminModalOpen(true);
              return;
            }
            setProductToEdit(null);
            setIsProductFormOpen(true);
          }}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 py-5 no-print mt-auto bg-slate-100/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <span>منظومة <span className="font-black text-sky-600 dark:text-sky-400">صِـوار (SWAR)</span> لإدارة وجرد مخزون المجمدات والمبيعات</span>
          <div className="font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
            💻 Developed By <span className="text-sky-600 dark:text-sky-400 font-bold">Ahmed Swar</span> & <span className="text-sky-600 dark:text-sky-400 font-bold">Zyad Elleathy</span>
          </div>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            مزامنة سحابية حية — مجاني 100%
          </span>
        </div>
      </footer>

      {/* ─── MODALS ─────────────────────────────────────── */}
      {auditProduct && (
        <AuditModal
          product={auditProduct}
          isAdmin={isAdmin}
          onClose={() => setAuditProduct(null)}
          onAddAuditLog={handleAddAuditLog}
          onDeleteAuditLog={handleDeleteAuditLog}
          defaultAuditor={settings.auditorName}
        />
      )}

      {isQuickAuditOpen && isAdmin && (
        <QuickAuditFlow
          products={products}
          onClose={() => setIsQuickAuditOpen(false)}
          onBatchAuditComplete={handleBatchAuditComplete}
          defaultAuditor={settings.auditorName}
        />
      )}

      <ProductFormModal
        isOpen={isProductFormOpen && isAdmin}
        productToEdit={productToEdit}
        onClose={() => { setIsProductFormOpen(false); setProductToEdit(null); }}
        onSaveProduct={handleSaveProduct}
      />

      <ReportModal
        isOpen={isReportOpen}
        products={products}
        onClose={() => setIsReportOpen(false)}
      />

      <PurchaseOrderModal
        isOpen={isPurchaseOrderOpen}
        products={products}
        onClose={() => setIsPurchaseOrderOpen(false)}
      />

      <SyncModal
        isOpen={isSyncOpen}
        products={products}
        invoices={invoices}
        onClose={() => setIsSyncOpen(false)}
        onForceSync={() => broadcast(products, invoices, customers, journal)}
      />

      <AdminModal
        isOpen={isAdminModalOpen}
        isAdmin={isAdmin}
        onClose={() => setIsAdminModalOpen(false)}
        onAuthChange={(val) => setIsAdmin(val)}
        onOpenInventoryReset={() => setIsResetModalOpen(true)}
        onOpenAuditTrail={() => setIsAuditTrailOpen(true)}
      />

      <InvoiceModal
        isOpen={isInvoiceOpen}
        products={products}
        invoices={invoices}
        customers={customers}
        isAdmin={isAdmin}
        invoiceToEdit={invoiceToEdit}
        onClose={() => { setIsInvoiceOpen(false); setInvoiceToEdit(null); }}
        onProcessInvoice={(inv) => {
          if (invoiceToEdit) {
            handleDeleteInvoice(invoiceToEdit.id, true);
            setInvoiceToEdit(null);
          }
          handleProcessInvoice(inv);
        }}
        onDeleteInvoice={handleDeleteInvoice}
        onEditInvoice={handleEditInvoice}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onSettleCustomerDebt={handleSettleCustomerDebt}
        onOpenPdfImport={() => setIsPdfImportOpen(true)}
      />

      <DailyJournalModal
        isOpen={isJournalOpen}
        journal={journal}
        customers={customers}
        isAdmin={isAdmin}
        onClose={() => setIsJournalOpen(false)}
        onAddJournalEntry={handleAddJournalEntry}
        onDeleteJournalEntry={handleDeleteJournalEntry}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Feature 1: PDF Invoice Reader & Auto-Matching */}
      <InvoicePdfImportModal
        isOpen={isPdfImportOpen}
        products={products}
        isAdmin={isAdmin}
        onClose={() => setIsPdfImportOpen(false)}
        onImportComplete={handlePdfInvoiceImport}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onAddNewProduct={(newProdData) => handleSaveProduct(newProdData, null)}
      />

      {/* Feature 2: Bulk Purchase Stock Import */}
      <BulkStockImportModal
        isOpen={isBulkImportOpen}
        products={products}
        isAdmin={isAdmin}
        onClose={() => setIsBulkImportOpen(false)}
        onBulkUpdateStock={handleBulkStockImport}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Feature 4: One-Click Full Inventory Reset */}
      <InventoryResetModal
        isOpen={isResetModalOpen}
        products={products}
        isAdmin={isAdmin}
        onClose={() => setIsResetModalOpen(false)}
        onConfirmReset={handleFullInventoryReset}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Feature 3: Full Audit Trail / History */}
      <AuditTrailModal
        isOpen={isAuditTrailOpen}
        invoices={invoices}
        onClose={() => setIsAuditTrailOpen(false)}
        onViewInvoice={(inv) => {
          setIsAuditTrailOpen(false);
          setIsInvoiceOpen(true);
        }}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
      />

    </div>
  );
}
