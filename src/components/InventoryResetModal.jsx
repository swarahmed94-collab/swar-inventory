import React, { useState } from 'react';
import { X, AlertOctagon, RotateCcw, ShieldAlert, CheckCircle2, Lock } from 'lucide-react';
import { sounds } from '../utils/sound';

export default function InventoryResetModal({
  isOpen,
  products = [],
  isAdmin = false,
  onClose,
  onConfirmReset, // ({ resetNotes, auditorName }) => void
  onOpenAdminModal
}) {
  const [confirmInput, setConfirmInput] = useState('');
  const [resetNotes, setResetNotes] = useState('تصفير وتدوير شامل للمخزون (Clear All Stock)');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const CONFIRM_WORD_AR = 'تأكيد';
  const CONFIRM_WORD_EN = 'CONFIRM';

  const isConfirmed = confirmInput.trim().toUpperCase() === CONFIRM_WORD_EN || confirmInput.trim() === CONFIRM_WORD_AR;
  const totalStockCount = (products || []).reduce((sum, p) => sum + (Number(p.currentStock) || 0), 0);

  const handleExecuteReset = () => {
    if (!isAdmin) {
      if (onOpenAdminModal) onOpenAdminModal();
      return;
    }

    if (!isConfirmed) {
      alert(`يرجى كتابة كلمة "${CONFIRM_WORD_AR}" أو "${CONFIRM_WORD_EN}" لتأكيد التنفيذ.`);
      return;
    }

    sounds.playWarning();
    setIsProcessing(true);

    if (onConfirmReset) {
      onConfirmReset({
        resetNotes: resetNotes.trim() || 'تصفير شامل للكميات',
        totalProductsCount: products.length,
        previousTotalStock: totalStockCount
      });
    }

    setIsProcessing(false);
    setConfirmInput('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-fade-in no-print">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl border-2 border-rose-500/50 overflow-hidden">
        
        {/* Danger Header */}
        <div className="p-5 bg-gradient-to-r from-rose-900 via-red-950 to-slate-950 text-white flex items-center justify-between border-b border-rose-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-300 flex items-center justify-center">
              <AlertOctagon className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base font-black">تصفير كامل المخزون (Zero All Stock)</h2>
              <p className="text-xs text-rose-300">إجراء حرج وإعادة ضبط لجميع الكميات</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          
          {/* Warning Banner */}
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-900 dark:text-rose-200 space-y-2">
            <div className="flex items-center gap-2 font-black text-rose-700 dark:text-rose-400">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>تحذير هام جداً:</span>
            </div>
            <p>
              • سيتم تصفير كميات <strong>جميع الأصناف ({products.length} صنف)</strong> لتصبح <span className="font-bold underline text-rose-600 dark:text-rose-400">0 وحدة</span> فوراً.
            </p>
            <p>
              • <strong>لن يتم حذف أي صنف من الكتالوج</strong>، بل ستبقى جميع بيانات الأسعار، الفئات والأماكن كما هي.
            </p>
            <p>
              • سيتم تسجيل هذه الحركة بالوقت واسم المسؤول في سجل التدقيق والأثر الرجعي (Audit Log).
            </p>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="text-[10px] text-slate-500 font-bold">الأصناف المتأثرة</div>
              <div className="text-sm font-black text-slate-800 dark:text-white">{products.length} صنف</div>
            </div>
            <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900">
              <div className="text-[10px] text-rose-600 font-bold">الرصيد الحالي الذي سيُصفر</div>
              <div className="text-sm font-black text-rose-700 dark:text-rose-400">{totalStockCount.toFixed(2)} وحدة</div>
            </div>
          </div>

          {/* Reason notes */}
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">سبب أو ملاحظة التصفير</label>
            <input
              type="text"
              value={resetNotes}
              onChange={e => setResetNotes(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          {/* Confirmation Prompt */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-black text-slate-800 dark:text-slate-200 text-center">
              للتأكيد، اكتب كلمة <span className="font-mono text-rose-600 dark:text-rose-400 font-black">تأكيد</span> أو <span className="font-mono text-rose-600 dark:text-rose-400 font-black">CONFIRM</span> بالأسفل:
            </label>
            <input
              type="text"
              value={confirmInput}
              onChange={e => setConfirmInput(e.target.value)}
              placeholder="اكتب تأكيد هنا..."
              className="w-full text-center font-bold text-base py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-700 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              إلغاء التراجع
            </button>

            <button
              type="button"
              disabled={!isConfirmed || isProcessing}
              onClick={handleExecuteReset}
              className="flex-1 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 disabled:opacity-30 disabled:pointer-events-none text-white font-black text-xs shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>تصفير المخزون الآن</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
