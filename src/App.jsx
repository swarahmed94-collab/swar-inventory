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

  // Live cloud sync
  useEffect(() => {
    liveChannelRef.current = createLiveSyncChannel((remoteState) => {
      if (!remoteState) return;
      if (Array.isArray(remoteState.products) && remoteState.products.length > 0) {
        setProducts(remoteState.products);
      }
      if (Array.isArray(remoteState.invoices)) {
        setInvoices(remoteState.invoices);
      }
      if (Array.isArray(remoteState.customers)) {
        setCustomers(remoteState.customers);
      }
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
    setProducts(updated);
    broadcast(updated, invoices, customers, journal);
  };

  const handleDeleteProduct = (productId, productName) => {
    if (!isAdmin) return;
    if (window.confirm(`هل تريد حذف الصنف "${productName}"؟ لا يمكن التراجع.`)) {
      sounds.playWarning();
      const updated = products.filter(p => p.id !== productId);
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
    const updated = products.map(p => {
      if (auditResults[p.id] === undefined) return p;
      const qty = Number(auditResults[p.id]);
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

    setProducts(updatedProds);
    setInvoices(updatedInvs);
    setCustomers(updatedCusts);
    setJournal(updatedJrnl);

    broadcast(updatedProds, updatedInvs, updatedCusts, updatedJrnl);
    sounds.playSuccess();
  };

  const handleEditInvoice = (invoiceId) => {
    if (!isAdmin) return;
    // Just open the invoice modal with the invoice to edit — InvoiceModal handles the rest
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

      setProducts(updatedProds);
      setCustomers(updatedCusts);
    }

    const updatedInvs = invoices.filter(i => i.id !== invoiceId);
    setInvoices(updatedInvs);
    broadcast(updatedProds, updatedInvs, updatedCusts, journal);
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
          // If editing, first delete the old invoice (with stock restore), then process new one
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

    </div>
  );
}
