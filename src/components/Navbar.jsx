import React from 'react';
import { 
  Plus, 
  Moon, 
  Sun, 
  FileSpreadsheet, 
  Smartphone,
  Cloud,
  ShoppingCart,
  Wifi
} from 'lucide-react';

export default function Navbar({
  theme,
  toggleTheme,
  onOpenAddModal,
  onOpenQuickAudit,
  onOpenReport,
  onOpenPurchaseOrder,
  onOpenSync,
  isCloudSynced,
  totalItems
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 dark:border-slate-800/80 glass-panel no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand with letter 'S' */}
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-sky-600 via-sky-500 to-cyan-400 text-white shadow-lg shadow-sky-500/25">
              {/* Premium 'S' Monogram Logo */}
              <span className="font-black text-2xl sm:text-3xl font-mono tracking-tighter select-none">
                S
              </span>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  صِـوار <span className="text-sky-600 dark:text-sky-400 font-extrabold text-sm sm:text-base font-mono">SWAR</span>
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                  إدارة المجمدات
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden xs:block">
                المنظومة السحابية الذكية لجرد ومتابعة مخزون الأغذية المجمدة
              </p>
            </div>
          </div>

          {/* Actions & Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* Live Cloud Sync Status Button */}
            <button
              onClick={onOpenSync}
              className="flex items-center gap-1.5 px-2.5 py-2 sm:px-3 sm:py-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 text-xs sm:text-sm font-bold transition-colors"
              title="حالة المزامنة السحابية المباشرة"
            >
              <Cloud className="w-4 h-4 text-sky-500" />
              <span className="hidden md:inline">مزامنة حية</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </button>

            {/* Purchase Order (طلبيات الشراء) */}
            <button
              onClick={onOpenPurchaseOrder}
              className="flex items-center gap-1.5 px-2.5 py-2 sm:px-3 sm:py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs sm:text-sm font-bold transition-colors"
              title="طلبية النواقص عبر WhatsApp"
            >
              <ShoppingCart className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="hidden lg:inline">طلبية شراء</span>
            </button>

            {/* Quick Mobile Audit Mode */}
            <button
              onClick={onOpenQuickAudit}
              className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
              title="بدء وضع الجرد السريع للهواتف"
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden xs:inline">جرد سريع</span>
            </button>

            {/* Add Product Button */}
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-sky-600/20 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>إضافة صنف</span>
            </button>

            {/* Reports Modal */}
            <button
              onClick={onOpenReport}
              className="p-2 sm:px-3 sm:py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5"
              title="تقرير الجرد والـ PDF"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden md:inline">التقرير والـ PDF</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
              title={theme === 'dark' ? 'الوضع الفاتح' : 'الوضع الليلي'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-sky-600" />
              )}
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}
