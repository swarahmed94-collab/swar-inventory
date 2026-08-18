import React from 'react';
import { Plus, Moon, Sun, FileSpreadsheet, Smartphone, Cloud, ShoppingCart, Shield, Lock, Receipt } from 'lucide-react';

export default function Navbar({
  theme, toggleTheme,
  isAdmin,
  onOpenAdminModal,
  onOpenAddModal,
  onOpenQuickAudit,
  onOpenReport,
  onOpenPurchaseOrder,
  onOpenSync,
  onOpenInvoice,
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 dark:border-slate-800/80 glass-panel no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">

          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-sky-600 via-sky-500 to-cyan-400 text-white shadow-lg shadow-sky-500/25">
              <span className="font-black text-2xl sm:text-3xl font-mono select-none">S</span>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                صِـوار <span className="text-sky-600 dark:text-sky-400 text-sm font-mono">SWAR</span>
              </h1>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                منظومة جرد المجمدات السحابية
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-end">

            {/* Admin/Viewer Badge */}
            <button
              onClick={onOpenAdminModal}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all ${
                isAdmin
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
              }`}
              title="إدارة الصلاحيات"
            >
              {isAdmin ? <Shield className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isAdmin ? 'Admin' : 'مشاهد'}</span>
            </button>

            {/* Cloud Sync */}
            <button onClick={onOpenSync} className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 text-xs font-bold transition-colors" title="مزامنة حية">
              <Cloud className="w-4 h-4 text-sky-500" />
              <span className="hidden md:inline">مزامنة</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </button>

            {/* Invoice */}
            <button onClick={onOpenInvoice} className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-violet-50 dark:bg-violet-950/50 hover:bg-violet-100 text-violet-800 dark:text-violet-300 border border-violet-200 dark:border-violet-800 text-xs font-bold transition-colors" title="إنشاء فاتورة وطباعتها">
              <Receipt className="w-4 h-4" />
              <span className="hidden sm:inline">فاتورة</span>
            </button>

            {/* Purchase Order */}
            <button onClick={onOpenPurchaseOrder} className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold transition-colors" title="طلبية شراء">
              <ShoppingCart className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="hidden lg:inline">طلبية</span>
            </button>

            {/* Quick Audit - Admin only */}
            {isAdmin && (
              <button onClick={onOpenQuickAudit} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-bold shadow-md active:scale-95 transition-all" title="جرد سريع">
                <Smartphone className="w-4 h-4" />
                <span className="hidden xs:inline">جرد سريع</span>
              </button>
            )}

            {/* Add Product - Admin only */}
            {isAdmin && (
              <button onClick={onOpenAddModal} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-md active:scale-95 transition-all">
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>إضافة</span>
              </button>
            )}

            {/* Report */}
            <button onClick={onOpenReport} className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors" title="التقرير والـ PDF">
              <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </button>

            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors" title="تبديل الوضع">
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-600" />}
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}
