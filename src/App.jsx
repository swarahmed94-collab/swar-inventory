import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardStats from './components/DashboardStats';
import ProductList from './components/ProductList';
import AuditModal from './components/AuditModal';
import QuickAuditFlow from './components/QuickAuditFlow';
import ProductFormModal from './components/ProductFormModal';
import ReportModal from './components/ReportModal';
import BackupModal from './components/BackupModal';
import { 
  getStoredProducts, 
  saveStoredProducts, 
  getAppSettings, 
  saveAppSettings 
} from './utils/storage';
import { INITIAL_PRODUCTS } from './data/defaultProducts';
import { sounds } from './utils/sound';

export default function App() {
  // State
  const [products, setProducts] = useState(getStoredProducts);
  const [settings, setSettings] = useState(getAppSettings);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeStatusFilter, setActiveStatusFilter] = useState('all');
  
  // Modals
  const [auditProduct, setAuditProduct] = useState(null);
  const [isQuickAuditOpen, setIsQuickAuditOpen] = useState(false);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isBackupOpen, setIsBackupOpen] = useState(false);

  // Sync theme
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveAppSettings(settings);
  }, [settings]);

  // Sync products with localStorage
  useEffect(() => {
    saveStoredProducts(products);
  }, [products]);

  const toggleTheme = () => {
    sounds.playClick();
    setSettings(prev => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark'
    }));
  };

  // --- CRUD Operations ---
  const handleSaveProduct = (productData, existingId) => {
    if (existingId) {
      // Edit
      setProducts(prev => prev.map(p => {
        if (p.id === existingId) {
          return {
            ...p,
            ...productData,
            updatedAt: new Date().toISOString()
          };
        }
        return p;
      }));
    } else {
      // New Product
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
      setProducts(prev => [newProduct, ...prev]);
    }
  };

  const handleDeleteProduct = (productId, productName) => {
    if (window.confirm(`هل أنت متأكد من حذف الصنف "${productName}" بالكامل؟ لا يمكن التراجع عن هذا الإجراء.`)) {
      sounds.playWarning();
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  // --- Quick Stepper (+/- 1) on Card ---
  const handleQuickUpdateStock = (productId, delta) => {
    setProducts(prev => prev.map(p => {
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
    }));
  };

  // --- Audit Modal Actions ---
  const handleAddAuditLog = (productId, auditEntry) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const currentLogs = p.auditHistory || [];
        return {
          ...p,
          currentStock: auditEntry.quantity,
          auditHistory: [...currentLogs, auditEntry]
        };
      }
      return p;
    }));

    // Update active audit modal product data so it re-renders instantaneously
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
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const updatedLogs = (p.auditHistory || []).filter(l => l.id !== logId);
        // Latest stock becomes the last log quantity or fallback
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
    }));

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
    const nowIso = new Date().toISOString();
    setProducts(prev => prev.map(p => {
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
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-sky-500 selection:text-white transition-colors duration-200">
      
      {/* Navbar */}
      <Navbar
        theme={settings.theme}
        toggleTheme={toggleTheme}
        onOpenAddModal={() => {
          setProductToEdit(null);
          setIsProductFormOpen(true);
        }}
        onOpenQuickAudit={() => setIsQuickAuditOpen(true)}
        onOpenReport={() => setIsReportOpen(true)}
        onOpenBackup={() => setIsBackupOpen(true)}
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
      <footer className="border-t border-slate-200 dark:border-slate-800/80 py-6 text-center text-xs text-slate-500 dark:text-slate-400 no-print mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            منظومة <span className="font-bold text-sky-600 dark:text-sky-400">سِـوار (SWAR)</span> لإدارة وجرد مخزون الأغذية المجمدة
          </div>
          <div className="flex items-center gap-4">
            <span>❄️ يعمل بدون إنترنت (Offline Ready)</span>
            <span>🔒 مجاني 100% بدون خوادم</span>
          </div>
        </div>
      </footer>

      {/* --- MODALS --- */}
      
      {/* 1. Audit History Modal (سجل الجرد) */}
      {auditProduct && (
        <AuditModal
          product={auditProduct}
          onClose={() => setAuditProduct(null)}
          onAddAuditLog={handleAddAuditLog}
          onDeleteAuditLog={handleDeleteAuditLog}
          defaultAuditor={settings.auditorName}
        />
      )}

      {/* 2. Quick Sequential Audit Mode (وضع الجرد السريع للهواتف) */}
      {isQuickAuditOpen && (
        <QuickAuditFlow
          products={products}
          onClose={() => setIsQuickAuditOpen(false)}
          onBatchAuditComplete={handleBatchAuditComplete}
          defaultAuditor={settings.auditorName}
        />
      )}

      {/* 3. Product Create / Edit Modal */}
      <ProductFormModal
        isOpen={isProductFormOpen}
        productToEdit={productToEdit}
        onClose={() => {
          setIsProductFormOpen(false);
          setProductToEdit(null);
        }}
        onSaveProduct={handleSaveProduct}
      />

      {/* 4. Report & Print Modal */}
      <ReportModal
        isOpen={isReportOpen}
        products={products}
        onClose={() => setIsReportOpen(false)}
      />

      {/* 5. Backup, Restore & Reset Modal */}
      <BackupModal
        isOpen={isBackupOpen}
        products={products}
        onClose={() => setIsBackupOpen(false)}
        onRestoreProducts={(imported) => setProducts(imported)}
        onResetToDefaults={() => setProducts(INITIAL_PRODUCTS)}
      />

    </div>
  );
}
