import React, { useState } from 'react';
import { 
  X, 
  ShoppingCart, 
  Copy, 
  Check, 
  Send, 
  AlertTriangle,
  TrendingDown
} from 'lucide-react';
import { getStockStatus } from '../utils/storage';
import { sounds } from '../utils/sound';

export default function PurchaseOrderModal({ products, isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Filter items that are critical or warning
  const needyProducts = products.filter(p => {
    const s = getStockStatus(p);
    return s.status === 'critical' || s.status === 'warning';
  });

  const generateOrderText = () => {
    const dateStr = new Date().toLocaleDateString('ar-EG');
    let text = `📦 *طلبية توريد ونواقص مجمدات - صِـوار*\n📅 التاريخ: ${dateStr}\n------------------------------\n`;
    
    if (needyProducts.length === 0) {
      text += 'جميع الأصناف متوفرة ولا توجد نواقص حالياً. ✅';
      return text;
    }

    needyProducts.forEach((p, idx) => {
      const neededQty = Math.max(1, (p.healthyThreshold || 20) - p.currentStock);
      const isCrit = p.currentStock <= p.minCriticalThreshold;
      text += `${idx + 1}. ${p.emoji || '🧊'} *${p.name}*\n   - المتوفر حالياً: ${p.currentStock} ${p.unit}\n   - المطلوب توريده: *${neededQty} ${p.unit}* ${isCrit ? '⚠️ (عاجل جداً)' : ''}\n`;
    });

    text += `\n------------------------------\nيرجى تأكيد موعد التوريد. شكراً!`;
    return text;
  };

  const handleCopy = () => {
    sounds.playSuccess();
    navigator.clipboard.writeText(generateOrderText());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleWhatsApp = () => {
    sounds.playClick();
    const encoded = encodeURIComponent(generateOrderText());
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in no-print">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto animate-slide-up">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-amber-600 to-yellow-600 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black">
                طلبية الشراء وتوريد النواقص
              </h2>
              <p className="text-xs text-amber-100">توليد قائمة الطلبات بضغطة زر وإرسالها للمورد</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4">
          
          {needyProducts.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🎉</div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">المخزون مكتمل وممتاز</h4>
              <p className="text-xs text-slate-500 mt-1">لا توجد أي نواقص حرجة تحتاج إلى طلب توريد في الوقت الحالي.</p>
            </div>
          ) : (
            <>
              <div className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center justify-between">
                <span>الأصناف المطلوب شراؤها ({needyProducts.length}):</span>
                <span className="text-rose-600 dark:text-rose-400">نواقص حرجة ومخزون منخفض</span>
              </div>

              <div className="max-h-60 overflow-y-auto space-y-2 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 bg-slate-50 dark:bg-slate-950">
                {needyProducts.map((p) => {
                  const neededQty = Math.max(1, (p.healthyThreshold || 20) - p.currentStock);
                  const isCrit = p.currentStock <= p.minCriticalThreshold;

                  return (
                    <div key={p.id} className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{p.emoji || '🧊'}</span>
                        <div>
                          <div className="text-xs font-black text-slate-900 dark:text-white">{p.name}</div>
                          <div className="text-[10px] text-slate-500">المتوفر: {p.currentStock} {p.unit}</div>
                        </div>
                      </div>
                      <div className="text-left">
                        <span className={`inline-block text-xs font-black px-2.5 py-1 rounded-lg ${
                          isCrit ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}>
                          اطلب +{neededQty} {p.unit}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleWhatsApp}
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-black text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال عبر WhatsApp</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'تم النسخ!' : 'نسخ القائمة'}</span>
                </button>
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
}
