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
import { 
  getStoredProducts, 
  saveStoredProducts, 
  getAppSettings, 
  saveAppSettings,
  getStoredInvoices,
  saveStoredInvoices
} from './utils/storage';
import { getAuth, saveAuth } from './utils/auth';
import { createLiveSyncChannel } from './utils/cloudSync';
import { sounds } from './utils/sound';

export default function App() {
  const [products, setProducts] = useState(getStoredProducts);
  const [invoices, setInvoices] = useState(getStoredInvoices);
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
  const [isPurchaseOrderOpen, setIsPurchaseOrderOpen] = useState(false);
  const [isSyncOpen, setIsSyncOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  const liveChannelRef = useRef(null);

  // Sync theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.theme === 'dark');
    saveAppSettings(settings);
  }, [settings]);

  // Save products
  useEffect(() => { saveStoredProducts(products); }, [products]);

  // Save invoices
  useEffect(() => { saveStoredInvoices(invoices); }, [invoices]);


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
    });
    return () => liveChannelRef.current?.close();
  }, []);

  const broadcast = (updatedProducts, updatedInvoices) => {
    const prods = updatedProducts !== undefined ? updatedProducts : products;
    const invs = updatedInvoices !== undefined ? updatedInvoices : invoices;
    liveChannelRef.current?.broadcastLocalChange({
      products: prods,
      invoices: invs
    });
  };

  const toggleTheme = () => {
    sounds.playClick();
    setSettings(prev => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }));
  };

  // ─── CRUD ───────────────────────────────────────────────────
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
    broadcast(updated, invoices);
  };

  const handleDeleteProduct = (productId, productName) => {
    if (!isAdmin) return;
    if (window.confirm(`هل تريد حذف الصنف "${productName}"؟ لا يمكن التراجع.`)) {
      sounds.playWarning();
      const updated = products.filter(p => p.id !== productId);
      setProducts(updated);
      broadcast(updated, invoices);
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
    broadcast(updated, invoices);
  };

  const handleAddAuditLog = (productId, auditEntry) => {
    if (!isAdmin) return;
    const updated = products.map(p => {
      if (p.id !== productId) return p;
      return { ...p, currentStock: auditEntry.quantity, auditHistory: [...(p.auditHistory || []), auditEntry] };
    });
    setProducts(updated);
    broadcast(updated, invoices);
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
    broadcast(updated, invoices);
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
    broadcast(updated, invoices);
  };

  // ─── INVOICE PROCESSING & STOCK DEDUCTION ──────────────────
  const handleProcessInvoice = (invoiceData) => {
    if (!isAdmin) return;
    const now = new Date().toISOString();
    const itemsMap = new Map();
    (invoiceData.items || []).forEach(item => {
      itemsMap.set(item.productId, (itemsMap.get(item.productId) || 0) + Number(item.qty));
    });

    const updatedProds = products.map(p => {
      if (!itemsMap.has(p.id)) return p;
      const soldQty = itemsMap.get(p.id);
      const newStock = Number(p.currentStock) - soldQty;
      const log = {
        id: 'aud-inv-' + Date.now() + '-' + p.id,
        date: now,
        quantity: newStock,
        delta: -soldQty,
        auditor: invoiceData.invoiceNumber || 'فاتورة مبيعات',
        notes: invoiceData.customerName
          ? `فاتورة مبيعات للعميل: ${invoiceData.customerName}`
          : 'فاتورة مبيعات نقدية'
      };
      return {
        ...p,
        currentStock: newStock,
        updatedAt: now,
        auditHistory: [...(p.auditHistory || []), log]
      };
    });

    const updatedInvs = [invoiceData, ...invoices];
    setProducts(updatedProds);
    setInvoices(updatedInvs);
    broadcast(updatedProds, updatedInvs);
    sounds.playSuccess();
  };

  const handleDeleteInvoice = (invoiceId, restoreStock = false) => {
    if (!isAdmin) return;
    const invToDelete = invoices.find(i => i.id === invoiceId);
    let updatedProds = products;

    if (restoreStock && invToDelete && invToDelete.deductedFromStock) {
      const now = new Date().toISOString();
      const itemsMap = new Map();
      (invToDelete.items || []).forEach(item => {
        itemsMap.set(item.productId, (itemsMap.get(item.productId) || 0) + Number(item.qty));
      });

      updatedProds = products.map(p => {
        if (!itemsMap.has(p.id)) return p;
        const restoredQty = itemsMap.get(p.id);
        const newStock = Number(p.currentStock) + restoredQty;
        const log = {
          id: 'aud-del-inv-' + Date.now() + '-' + p.id,
          date: now,
          quantity: newStock,
          delta: +restoredQty,
          auditor: 'إلغاء ' + (invToDelete.invoiceNumber || 'فاتورة'),
          notes: `استرجاع كميات بعد حذف الفاتورة ${invToDelete.invoiceNumber || ''}`
        };
        return {
          ...p,
          currentStock: newStock,
          updatedAt: now,
          auditHistory: [...(p.auditHistory || []), log]
        };
      });

      setProducts(updatedProds);
    }

    const updatedInvs = invoices.filter(i => i.id !== invoiceId);
    setInvoices(updatedInvs);
    broadcast(updatedProds, updatedInvs);
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
          <span>منظومة <span className="font-black text-sky-600 dark:text-sky-400">صِـوار (SWAR)</span> لإدارة وجرد مخزون المجمدات</span>
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
        onForceSync={() => broadcast(products, invoices)}
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
        isAdmin={isAdmin}
        onClose={() => setIsInvoiceOpen(false)}
        onProcessInvoice={handleProcessInvoice}
        onDeleteInvoice={handleDeleteInvoice}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
      />

    </div>
  );
}

