import React, { useState } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Plus, 
  Minus, 
  Sparkles, 
  MapPin, 
  CheckCheck,
  RotateCcw
} from 'lucide-react';
import { getStockStatus } from '../utils/storage';
import { sounds } from '../utils/sound';
import confetti from 'canvas-confetti';

export default function QuickAuditFlow({
  products,
  onClose,
  onBatchAuditComplete,
  defaultAuditor = 'مسؤول الجرد'
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [auditResults, setAuditResults] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  if (!products || products.length === 0) return null;

  const currentProduct = products[currentIndex];
  const initialCount = auditResults[currentProduct?.id] ?? currentProduct?.currentStock ?? 0;
  const [tempQty, setTempQty] = useState(initialCount);

  // Sync tempQty when changing slide
  React.useEffect(() => {
    if (currentProduct) {
      setTempQty(auditResults[currentProduct.id] ?? currentProduct.currentStock ?? 0);
    }
  }, [currentIndex, currentProduct, auditResults]);

  const handleAdjust = (delta) => {
    sounds.playClick();
    setTempQty(prev => Math.max(0, Number(prev) + delta));
  };

  const handleSaveAndNext = () => {
    sounds.playSuccess();
    const updated = {
      ...auditResults,
      [currentProduct.id]: tempQty
    };
    setAuditResults(updated);

    if (currentIndex < products.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Completed all items!
      setIsCompleted(true);
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleFinishBatch = () => {
    onBatchAuditComplete(auditResults);
    onClose();
  };

  const progressPercent = Math.round(((currentIndex + 1) / products.length) * 100);
  const status = currentProduct ? getStockStatus({ ...currentProduct, currentStock: tempQty }) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto no-print">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col my-auto">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <h2 className="text-base sm:text-lg font-black">وضع الجرد الميداني السريع</h2>
            </div>
            <p className="text-xs text-emerald-100 mt-0.5">
              مصمم خصيصاً للجرد السريع والتنقل بين ثلاجات التجميد
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2">
          <div 
            className="bg-emerald-500 h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Body Content */}
        {!isCompleted ? (
          <div className="p-5 sm:p-6 space-y-6">
            
            {/* Step indicator */}
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
              <span>الصنف {currentIndex + 1} من {products.length}</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                {progressPercent}% مكتمل
              </span>
            </div>

            {/* Product Card Highlight */}
            <div className={`p-4 sm:p-5 rounded-2xl border text-center ${status?.bgColor}`}>
              {currentProduct.freezerLocation && (
                <div className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-400 bg-white/80 dark:bg-slate-900/80 px-2.5 py-1 rounded-full mb-2">
                  <MapPin className="w-3.5 h-3.5 text-sky-500" />
                  {currentProduct.freezerLocation}
                </div>
              )}

              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-1">
                {currentProduct.name}
              </h3>
              
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                المخزون المسجل سابقاً: <span className="font-bold text-slate-800 dark:text-slate-200">{currentProduct.currentStock} {currentProduct.unit}</span>
              </div>

              {/* Giant Stepper & Numeric Input */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => handleAdjust(-5)}
                  className="w-12 h-12 rounded-2xl bg-rose-100 hover:bg-rose-200 dark:bg-rose-950/60 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-300 font-black text-sm flex items-center justify-center active:scale-90 transition-transform shadow-sm"
                >
                  -5
                </button>
                <button
                  onClick={() => handleAdjust(-1)}
                  className="w-12 h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-black text-lg flex items-center justify-center active:scale-90 transition-transform shadow-sm"
                >
                  <Minus className="w-5 h-5" />
                </button>

                <div className="min-w-[110px] py-2 px-3 bg-white dark:bg-slate-950 rounded-2xl border-2 border-emerald-500 shadow-inner flex flex-col items-center justify-center">
                  <input
                    type="number"
                    min="0"
                    value={tempQty}
                    onChange={(e) => setTempQty(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full text-center text-3xl font-black text-slate-900 dark:text-white bg-transparent outline-none"
                  />
                  <span className="text-xs font-bold text-slate-500">{currentProduct.unit}</span>
                </div>

                <button
                  onClick={() => handleAdjust(1)}
                  className="w-12 h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-black text-lg flex items-center justify-center active:scale-90 transition-transform shadow-sm"
                >
                  <Plus className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleAdjust(5)}
                  className="w-12 h-12 rounded-2xl bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950/60 dark:hover:bg-emerald-900 text-emerald-700 dark:text-emerald-300 font-black text-sm flex items-center justify-center active:scale-90 transition-transform shadow-sm"
                >
                  +5
                </button>
              </div>

              {/* Status preview */}
              <div className="mt-3">
                <span className={`inline-block text-xs font-black px-3 py-1 rounded-full ${status?.badgeBg}`}>
                  {status?.label}
                </span>
              </div>
            </div>

            {/* Step Controls */}
            <div className="flex items-center gap-3">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(prev => prev - 1)}
                className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-30 disabled:pointer-events-none hover:bg-slate-100 dark:hover:bg-slate-800"
                title="السابق"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <button
                onClick={handleSaveAndNext}
                className="flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-[0.99] text-white font-black text-base shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5 stroke-[3]" />
                <span>
                  {currentIndex === products.length - 1 ? 'اعتماد وإنهاء الجرد' : 'حفظ والانتقال للتالي'}
                </span>
              </button>
            </div>

          </div>
        ) : (
          /* Completion Screen */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCheck className="w-8 h-8 stroke-[2.5]" />
            </div>

            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              تم إتمام جرد جميع الأصناف بنجاح! 🎉
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
              تم تحديث الكميات وحفظ سجلات الجرد لكل منتج مع التاريخ والوقت الحالي تلقائياً.
            </p>

            <div className="pt-4 flex flex-col gap-2">
              <button
                onClick={handleFinishBatch}
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-base shadow-md shadow-emerald-600/20"
              >
                حفظ العودة للوحة التحكم
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
