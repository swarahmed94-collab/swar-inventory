import React, { useRef } from 'react';
import { 
  X, 
  Download, 
  Upload, 
  RotateCcw, 
  Database, 
  CheckCircle, 
  AlertCircle,
  HardDrive
} from 'lucide-react';
import { INITIAL_PRODUCTS } from '../data/defaultProducts';
import { sounds } from '../utils/sound';

export default function BackupModal({
  products,
  isOpen,
  onClose,
  onRestoreProducts,
  onResetToDefaults
}) {
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // Download JSON Backup
  const handleExportJSON = () => {
    sounds.playSuccess();
    const dataStr = JSON.stringify({
      app: 'SWAR-Frozen-Inventory',
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      products: products
    }, null, 2);

    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('href', url);
    link.setAttribute('download', `نسخة_احتياطية_سوار_${dateStr}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Upload and restore JSON Backup
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        const importedProducts = Array.isArray(parsed) ? parsed : parsed.products;

        if (Array.isArray(importedProducts) && importedProducts.length > 0) {
          sounds.playSuccess();
          onRestoreProducts(importedProducts);
          alert(`تم استعادة بيانات ${importedProducts.length} صنف بنجاح!`);
          onClose();
        } else {
          alert('ملف النسخة الاحتياطية غير صالح.');
        }
      } catch (err) {
        alert('حدث خطأ أثناء قراءة الملف. تأكد من أنه ملف JSON صحيح.');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm('هل أنت متأكد من استعادة البيانات الافتراضية؟ سيتم استبدال البيانات الحالية بالبيانات النموذجية.')) {
      sounds.playSuccess();
      onResetToDefaults();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in no-print">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto animate-slide-up">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white">
                إدارة البيانات والنسخ الاحتياطي
              </h2>
              <p className="text-xs text-slate-500">حفظ ونقل البيانات مجاناً 100% بدون خوادم</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-4">
          
          {/* Storage status */}
          <div className="p-3.5 rounded-2xl bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 flex items-start gap-3">
            <HardDrive className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-sky-950 dark:text-sky-200">
                البيانات محفوظة محلياً في متصفحك
              </div>
              <div className="text-[11px] text-sky-700 dark:text-sky-300 mt-0.5">
                يمكنك تحميل نسخة احتياطية لنقلها لجهاز آخر أو استعادتها في أي وقت.
              </div>
            </div>
          </div>

          {/* Download JSON */}
          <button
            onClick={handleExportJSON}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-sky-500 dark:hover:border-sky-500 bg-white dark:bg-slate-950 flex items-center justify-between group transition-all text-right"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                  تحميل نسخة احتياطية (JSON)
                </div>
                <div className="text-[11px] text-slate-500">
                  تنزيل ملف يحتوي على كل الأصناف وسجلات الجرد
                </div>
              </div>
            </div>
          </button>

          {/* Restore JSON */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".json"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 bg-white dark:bg-slate-950 flex items-center justify-between group transition-all text-right"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                  استعادة نسخة احتياطية
                </div>
                <div className="text-[11px] text-slate-500">
                  رفع ملف JSON تم تصديره سابقاً
                </div>
              </div>
            </div>
          </button>

          {/* Reset to Samples */}
          <button
            onClick={handleReset}
            className="w-full p-3.5 rounded-2xl border border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/20 flex items-center justify-between group transition-all text-right"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black text-rose-600 dark:text-rose-400">
                  استعادة الأصناف الافتراضية
                </div>
                <div className="text-[11px] text-slate-500">
                  إعادة تحميل الأصناف النموذجية الجاهزة للمجمدات
                </div>
              </div>
            </div>
          </button>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
}
