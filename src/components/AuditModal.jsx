import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Calendar, 
  Clock, 
  User, 
  FileText, 
  Trash2, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  CheckCircle2, 
  AlertTriangle,
  History,
  Sparkles,
  MapPin,
  Eye,
  Lock
} from 'lucide-react';
import { getStockStatus, formatArabicDateTime } from '../utils/storage';
import { sounds } from '../utils/sound';
import confetti from 'canvas-confetti';

export default function AuditModal({
  product,
  isAdmin = false,
  onClose,
  onAddAuditLog,
  onDeleteAuditLog,
  defaultAuditor = 'مسؤول الجرد'
}) {
  if (!product) return null;

  const status = getStockStatus(product);
  const auditLogs = product.auditHistory ? [...product.auditHistory].sort((a, b) => new Date(b.date) - new Date(a.date)) : [];

  // Form State
  const [newQuantity, setNewQuantity] = useState(product.currentStock);
  const [auditor, setAuditor] = useState(defaultAuditor);
  const [notes, setNotes] = useState('');
  const [customDateTime, setCustomDateTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate delta against current stock
  const currentQty = Number(product.currentStock) || 0;
  const targetQty = Number(newQuantity) || 0;
  const delta = targetQty - currentQty;

  const handleAdjustQuick = (amount) => {
    sounds.playClick();
    setNewQuantity(prev => Math.max(0, Number(prev) + amount));
  };

  const handleAuditSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    sounds.playSuccess();

    // Trigger subtle confetti if stock is replenished
    if (delta > 0 && targetQty >= (product.healthyThreshold || 20)) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    }

    const auditEntry = {
      id: 'aud-' + Date.now(),
      date: customDateTime ? new Date(customDateTime).toISOString() : new Date().toISOString(),
      quantity: targetQty,
      delta: delta,
      auditor: auditor.trim() || 'مسؤول الجرد',
      notes: notes.trim()
    };

    onAddAuditLog(product.id, auditEntry);
    setIsSubmitting(false);
    setNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in no-print">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto animate-slide-up flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className={`p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between ${status.bgColor}`}>
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-md ${status.badgeBg}`}>
              <History className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/80 dark:bg-slate-900/80 shadow-sm text-slate-800 dark:text-slate-200">
                  سجل الجرد والمتابعة
                </span>
                <span className={`text-xs font-black px-2 py-0.5 rounded-full ${status.badgeBg}`}>
                  {status.label}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-1">
                {product.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with Scroll */}
        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Current Stock Banner & Quick Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-950/70 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <div>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">المخزون الحالي:</span>
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {product.currentStock} <span className="text-xs font-normal text-slate-500">{product.unit}</span>
              </span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">الحد الحرج:</span>
              <span className="text-lg font-black text-rose-600 dark:text-rose-400">
                {product.minCriticalThreshold} <span className="text-xs font-normal text-slate-500">{product.unit}</span>
              </span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">الحد الآمن:</span>
              <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                {product.healthyThreshold} <span className="text-xs font-normal text-slate-500">{product.unit}</span>
              </span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">مكان الحفظ:</span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate block mt-1" title={product.freezerLocation}>
                {product.freezerLocation || 'غير محدد'}
              </span>
            </div>
          </div>

          {/* New Audit Entry Form */}
          {isAdmin ? (
            <div className="bg-gradient-to-br from-sky-50 to-blue-50/50 dark:from-slate-800/60 dark:to-slate-900/60 p-4 sm:p-5 rounded-2xl border border-sky-200/80 dark:border-sky-900/50 shadow-sm">
              <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>تسجيل جرد فعلي جديد</span>
              </h3>

              <form onSubmit={handleAuditSubmit} className="space-y-4">
                
                {/* Quantity Input & Fast Steppers */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    الكمية الفعلية المتوفرة الآن في الفريزر ({product.unit}):
                  </label>

                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input
                        type="number"
                        min="0"
                        step="1"
                        required
                        value={newQuantity}
                        onChange={(e) => setNewQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full text-center text-2xl font-black py-2.5 px-3 rounded-xl bg-white dark:bg-slate-900 border-2 border-sky-400 dark:border-sky-500 text-slate-900 dark:text-white focus:ring-4 focus:ring-sky-500/20 outline-none transition-all"
                      />
                    </div>

                    {/* Quick Preset Add/Minus Buttons */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleAdjustQuick(-5)}
                        className="px-2 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100"
                      >
                        -5
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAdjustQuick(-1)}
                        className="px-2.5 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100"
                      >
                        -1
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAdjustQuick(1)}
                        className="px-2.5 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100"
                      >
                        +1
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAdjustQuick(5)}
                        className="px-2 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100"
                      >
                        +5
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAdjustQuick(10)}
                        className="px-2 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100"
                      >
                        +10
                      </button>
                    </div>
                  </div>

                  {/* Delta calculation indicator */}
                  <div className="flex items-center justify-between text-xs mt-2 font-bold">
                    <span className="text-slate-600 dark:text-slate-400">الفارق عن آخر جرد مسجل:</span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg ${
                      delta > 0 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                      delta < 0 ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' :
                      'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {delta > 0 && <TrendingUp className="w-3.5 h-3.5" />}
                      {delta < 0 && <TrendingDown className="w-3.5 h-3.5" />}
                      {delta === 0 && <Minus className="w-3.5 h-3.5" />}
                      {delta > 0 ? `زيادة (+${delta} ${product.unit})` : delta < 0 ? `عجز (${delta} ${product.unit})` : `مطابق للكمية السابقة`}
                    </span>
                  </div>
                </div>

                {/* Auditor Name & Notes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      القائم بالجرد:
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={auditor}
                        onChange={(e) => setAuditor(e.target.value)}
                        placeholder="اسم مدخل الجرد"
                        className="w-full pr-9 pl-3 py-2 text-xs sm:text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      ملاحظات الجرد (اختياري):
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="مثال: وصول شحنة، هالك، سحب مطعم..."
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 sm:py-3 rounded-xl bg-sky-600 hover:bg-sky-500 active:scale-[0.99] text-white font-black text-sm sm:text-base shadow-md shadow-sky-600/25 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>حفظ وتحديث الجرد</span>
                </button>

              </form>
            </div>
          ) : (
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Eye className="w-4 h-4 shrink-0" />
              <span>وضع المشاهدة — يمكنك الاطلاع على سجل الجرد بالكامل أدناه.</span>
            </div>
          )}

          {/* Audit History Timeline / Table */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <History className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>سجل عمليات الجرد السابقة ({auditLogs.length})</span>
              </h3>
            </div>

            {auditLogs.length === 0 ? (
              <div className="text-center py-8 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                <Clock className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  لم يتم تسجيل أي عمليات جرد لهذا الصنف حتى الآن.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {auditLogs.map((log, index) => {
                  // Determine status for this historical quantity
                  const isCrit = log.quantity <= (product.minCriticalThreshold || 5);
                  const isWarn = !isCrit && log.quantity <= (product.healthyThreshold || 20);

                  const logStatusColor = isCrit
                    ? 'border-red-300 dark:border-red-900/60 bg-red-50/50 dark:bg-red-950/20'
                    : isWarn
                    ? 'border-amber-300 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20'
                    : 'border-emerald-300 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20';

                  const badgeColor = isCrit
                    ? 'bg-red-500 text-white'
                    : isWarn
                    ? 'bg-amber-500 text-white'
                    : 'bg-emerald-500 text-white';

                  return (
                    <div
                      key={log.id || index}
                      className={`p-3 sm:p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${logStatusColor}`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Quantity Pill with Smart Color */}
                        <div className={`px-3 py-1.5 rounded-xl font-black text-center min-w-[70px] shadow-sm ${badgeColor}`}>
                          <div className="text-lg leading-tight">{log.quantity}</div>
                          <div className="text-[10px] font-bold opacity-90">{product.unit}</div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                              {formatArabicDateTime(log.date)}
                            </span>
                            
                            {/* Delta Tag */}
                            {log.delta !== undefined && (
                              <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-md ${
                                log.delta > 0 ? 'bg-emerald-200 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200' :
                                log.delta < 0 ? 'bg-rose-200 text-rose-900 dark:bg-rose-900 dark:text-rose-200' :
                                'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                              }`}>
                                {log.delta > 0 ? `+${log.delta}` : log.delta} {product.unit}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 mt-1 flex-wrap">
                            <span className="flex items-center gap-1 font-medium">
                              <User className="w-3 h-3 text-slate-400" />
                              {log.auditor || 'مسؤول الجرد'}
                            </span>
                            {log.notes && (
                              <span className="text-slate-700 dark:text-slate-300 bg-white/70 dark:bg-slate-900/70 px-2 py-0.5 rounded-md border border-slate-200/50 dark:border-slate-800">
                                💬 {log.notes}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Delete Log Button (Admin Only) */}
                      {isAdmin && (
                        <button
                          onClick={() => {
                            if (window.confirm('هل أنت متأكد من رغبتك في حذف حركة الجرد هذه؟')) {
                              onDeleteAuditLog(product.id, log.id);
                            }
                          }}
                          className="self-end sm:self-center p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-white/80 dark:hover:bg-slate-800 transition-colors"
                          title="حذف هذا السجل"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
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
