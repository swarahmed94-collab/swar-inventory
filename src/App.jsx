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
import RoleManagementModal from './components/RoleManagementModal';
import { 
  getStoredProducts, 
  saveStoredProducts, 
  getAppSettings, 
  saveAppSettings 
} from './utils/storage';
import { getRolesConfig, saveRolesConfig, getRolePermissions, verifyRolePin } from './utils/roles';
import { createLiveSyncChannel } from './utils/cloudSync';
import { INITIAL_PRODUCTS } from './data/defaultProducts';
import { sounds } from './utils/sound';

export default function App() {
  // State
  const [products, setProducts] = useState(getStoredProducts);
  const [settings, setSettings] = useState(getAppSettings);
  const [rolesConfig, setRolesConfig] = useState(getRolesConfig);
  const [currentRole, setCurrentRole] = useState(getRolesConfig().currentDeviceRole || 'owner');
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
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  const liveChannelRef = useRef(null);
  const permissions = getRolePermissions(currentRole);

  // Auto-login via URL invite query (e.g. ?role=manager&pin=5566)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlRole = params.get('role');
      const urlPin = params.get('pin');
      if (urlPin) {
        const verified = verifyRolePin(urlPin);
        if (verified.valid) {
          const updated = { ...rolesConfig, currentDeviceRole: verified.role };
          saveRolesConfig(updated);
          setRolesConfig(updated);
          setCurrentRole(verified.role);
          // Clean URL without refresh
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
    } catch (e) {
      console.warn('URL invite parse error:', e);
    }
  }, []);

  // Sync theme
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveAppSettings(settings);
  }, [settings]);

  // Save to localStorage
  useEffect(() => {
    saveStoredProducts(products);
  }, [products]);

  // Initialize Realtime Live Cloud / Tab Sync
  useEffect(() => {
    liveChannelRef.current = createLiveSyncChannel((remoteProducts, source) => {
      if (Array.isArray(remoteProducts) && remoteProducts.length > 0) {
        setProducts(remoteProducts);
      }
    });

    return () => {
      if (liveChannelRef.current) {
        liveChannelRef.current.close();
      }
    };
  }, []);

  const broadcastChange = (updatedProducts) => {
    if (liveChannelRef.current) {
      liveChannelRef.current.broadcastLocalChange(updatedProducts);
    }
  };

  const toggleTheme = () => {
    sounds.playClick();
    setSettings(prev => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark'
    }));
  };

  // --- CRUD Operations ---
  const handleSaveProduct = (productData, existingId) => {
    if (!permissions.canEditProducts) {
      alert('عفواً، يتطلب هذا الإجراء صلاحيات المدير أو المالك.');
      return;
    }
    let updated;
    if (existingId) {
      updated = products.map(p => {
        if (p.id === existingId) {
          return {
            ...p,
            ...productData,
            updatedAt: new Date().toISOString()
          };
        }
        return p;
      });
    } else {
      const newProduct = {
        ...productData,
        id: 'prod-' + Date.now(),
        createdAt: new Date().toISOString(),
        auditHistory: [
          {
            id: 'aud-' + Date.now(),
            date: new Date().toISOString(),
            quantity: Number(productData.currentStock) || 0,
            delta: Number(productData.currentStock) || 0,
            auditor: settings.auditorName || 'مسؤول الجرد',
            notes: 'تسجيل الصنف وإدخال الرصيد الافتتاحي'
          }
        ]
      };
      updated = [newProduct, ...products];
    }
    setProducts(updated);
    broadcastChange(updated);
  };

  const handleDeleteProduct = (productId, productName) => {
    if (!permissions.canDeleteProducts) {
      alert('عفواً، صلاحية حذف الأصناف محصورة للمالك الرئيسي فقط.');
      return;
    }
    if (window.confirm(`هل أنت متأكد من حذف الصنف "${productName}" بالكامل؟ لا يمكن التراجع عن هذا الإجراء.`)) {
      sounds.playWarning();
      const updated = products.filter(p => p.id !== productId);
      setProducts(updated);
      broadcastChange(updated);
    }
  };

  // --- Quick Stepper (+/- 1) on Card ---
  const handleQuickUpdateStock = (productId, delta) => {
    if (!permissions.canAudit) return;
    const updated = products.map(p => {
      if (p.id === productId) {
        const newStock = Math.max(0, Number(p.currentStock) + delta);
        const newLog = {
          id: 'aud-' + Date.now(),
          date: new Date().toISOString(),
          quantity: newStock,
          delta: delta,
          auditor: settings.auditorName || 'مسؤول الجرد',
          notes: delta > 0 ? 'زيادة سريعة (+1)' : 'صرف سريع (-1)'
        };
        const currentLogs = p.auditHistory || [];
        return {
          ...p,
          currentStock: newStock,
          auditHistory: [...currentLogs, newLog]
        };
      }
      return p;
    });
    setProducts(updated);
    broadcastChange(updated);
  };

  // --- Audit Modal Actions ---
  const handleAddAuditLog = (productId, auditEntry) => {
    if (!permissions.canAudit) {
      alert('عفواً، يتطلب تسجيل الجرد صلاحيات مأمور جرد أو مدير.');
      return;
    }
    const updated = products.map(p => {
      if (p.id === productId) {
        const currentLogs = p.auditHistory || [];
        return {
          ...p,
          currentStock: auditEntry.quantity,
          auditHistory: [...currentLogs, auditEntry]
        };
      }
      return p;
    });

    setProducts(updated);
    broadcastChange(updated);

    setAuditProduct(prev => {
      if (prev && prev.id === productId) {
        const currentLogs = prev.auditHistory || [];
        return {
          ...prev,
          currentStock: auditEntry.quantity,
          auditHistory: [...currentLogs, auditEntry]
        };
      }
      return prev;
    });
  };

  const handleDeleteAuditLog = (productId, logId) => {
    if (!permissions.canDeleteProducts) return;
    const updated = products.map(p => {
      if (p.id === productId) {
        const updatedLogs = (p.auditHistory || []).filter(l => l.id !== logId);
        const latestQty = updatedLogs.length > 0
          ? [...updatedLogs].sort((a, b) => new Date(b.date) - new Date(a.date))[0].quantity
          : p.currentStock;

        return {
          ...p,
          currentStock: latestQty,
          auditHistory: updatedLogs
        };
      }
      return p;
    });

    setProducts(updated);
    broadcastChange(updated);

    setAuditProduct(prev => {
      if (prev && prev.id === productId) {
        const updatedLogs = (prev.auditHistory || []).filter(l => l.id !== logId);
        const latestQty = updatedLogs.length > 0
          ? [...updatedLogs].sort((a, b) => new Date(b.date) - new Date(a.date))[0].quantity
          : prev.currentStock;
        return {
          ...prev,
          currentStock: latestQty,
          auditHistory: updatedLogs
        };
      }
      return prev;
    });
  };

  // --- Batch Quick Audit Completion ---
  const handleBatchAuditComplete = (auditResults) => {
    if (!permissions.canAudit) return;
    const nowIso = new Date().toISOString();
    const updated = products.map(p => {
      if (auditResults[p.id] !== undefined) {
        const targetQty = Number(auditResults[p.id]);
        const delta = targetQty - (Number(p.currentStock) || 0);
        const newLog = {
          id: 'aud-' + Date.now() + '-' + p.id,
          date: nowIso,
          quantity: targetQty,
          delta: delta,
          auditor: settings.auditorName || 'مسؤول الجرد',
          notes: 'جرد ميداني دوري سريع'
        };
        return {
          ...p,
          currentStock: targetQty,
          auditHistory: [...(p.auditHistory || []), newLog]
        };
      }
      return p;
    });
    setProducts(updated);
    broadcastChange(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-sky-500 selection:text-white transition-colors duration-200">
      
      {/* Navbar */}
      <Navbar
        theme={settings.theme}
        toggleTheme={toggleTheme}
        currentRole={currentRole}
        onOpenRoleModal={() => setIsRoleModalOpen(true)}
        onOpenAddModal={() => {
          setProductToEdit(null);
          setIsProductFormOpen(true);
        }}
        onOpenQuickAudit={() => setIsQuickAuditOpen(true)}
        onOpenReport={() => setIsReportOpen(true)}
        onOpenPurchaseOrder={() => setIsPurchaseOrderOpen(true)}
        onOpenSync={() => setIsSyncOpen(true)}
        totalItems={products.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Dashboard Stats */}
        <DashboardStats
          products={products}
          activeFilter={activeStatusFilter}
          onSelectFilter={(filterKey) => setActiveStatusFilter(filterKey)}
        />

        {/* Product Catalog & List */}
        <ProductList
          products={products}
          permissions={permissions}
          selectedCategory={selectedCategory}
          onSelectCategory={(catId) => setSelectedCategory(catId)}
          activeStatusFilter={activeStatusFilter}
          onSelectStatusFilter={(status) => setActiveStatusFilter(status)}
          onOpenAudit={(product) => setAuditProduct(product)}
          onEditProduct={(product) => {
            setProductToEdit(product);
            setIsProductFormOpen(true);
          }}
          onDeleteProduct={handleDeleteProduct}
          onQuickUpdateStock={handleQuickUpdateStock}
          onOpenAddModal={() => {
            setProductToEdit(null);
            setIsProductFormOpen(true);
          }}
        />

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 py-6 text-center text-xs text-slate-500 dark:text-slate-400 no-print mt-auto bg-slate-100/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span>منظومة <span className="font-black text-sky-600 dark:text-sky-400">صِـوار (SWAR)</span> لإدارة وجرد مخزون المجمدات</span>
          </div>
          
          <div className="font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-1.5">
            <span>💻</span>
            <span>Developed By <span className="text-sky-600 dark:text-sky-400 font-bold">Ahmed Swar</span> & <span className="text-sky-600 dark:text-sky-400 font-bold">Zyad Elleathy</span></span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              مزامنة سحابية حية
            </span>
            <span>🔒 مجاني 100% بدون خوادم</span>
          </div>
        </div>
      </footer>

      {/* --- MODALS --- */}
      
      {/* 1. Audit History Modal */}
      {auditProduct && (
        <AuditModal
          product={auditProduct}
          canAudit={permissions.canAudit}
          canDelete={permissions.canDeleteProducts}
          onClose={() => setAuditProduct(null)}
          onAddAuditLog={handleAddAuditLog}
          onDeleteAuditLog={handleDeleteAuditLog}
          defaultAuditor={settings.auditorName}
        />
      )}

      {/* 2. Quick Sequential Audit Mode */}
      {isQuickAuditOpen && permissions.canAudit && (
        <QuickAuditFlow
          products={products}
          onClose={() => setIsQuickAuditOpen(false)}
          onBatchAuditComplete={handleBatchAuditComplete}
          defaultAuditor={settings.auditorName}
        />
      )}

      {/* 3. Product Create / Edit Modal */}
      <ProductFormModal
        isOpen={isProductFormOpen && permissions.canEditProducts}
        productToEdit={productToEdit}
        onClose={() => {
          setIsProductFormOpen(false);
          setProductToEdit(null);
        }}
        onSaveProduct={handleSaveProduct}
      />

      {/* 4. Report & Direct PDF Modal */}
      <ReportModal
        isOpen={isReportOpen}
        products={products}
        onClose={() => setIsReportOpen(false)}
      />

      {/* 5. Purchase Order Generator & WhatsApp */}
      <PurchaseOrderModal
        isOpen={isPurchaseOrderOpen}
        products={products}
        onClose={() => setIsPurchaseOrderOpen(false)}
      />

      {/* 6. Live Cloud Sync Settings */}
      <SyncModal
        isOpen={isSyncOpen}
        products={products}
        onClose={() => setIsSyncOpen(false)}
        onForceSync={() => broadcastChange(products)}
      />

      {/* 7. Multi-Tier Role Management Modal */}
      <RoleManagementModal
        isOpen={isRoleModalOpen}
        currentRole={currentRole}
        onClose={() => setIsRoleModalOpen(false)}
        onRoleChanged={(newRole) => setCurrentRole(newRole)}
      />

    </div>
  );
}
