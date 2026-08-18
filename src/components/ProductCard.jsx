import React from 'react';
import { 
  ClipboardList, 
  MapPin, 
  Clock, 
  Edit3, 
  Trash2, 
  Plus, 
  Minus,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { getStockStatus, getAuditRecency, formatArabicDateTime } from '../utils/storage';
import { sounds } from '../utils/sound';

export default function ProductCard({
  product,
  onOpenAudit,
  onEditProduct,
  onDeleteProduct,
  onQuickUpdateStock
}) {
  const status = getStockStatus(product);
  const recency = getAuditRecency(product);
  const auditLogs = product.auditHistory || [];
  const lastAudit = auditLogs.length > 0 ? auditLogs[auditLogs.length - 1] : null;

  // Calculate percentage of healthy stock for visual bar
  const healthyThreshold = product.healthyThreshold || 20;
  const stockPercentage = Math.min(100, Math.max(0, (product.currentStock / healthyThreshold) * 100));

  const handleQuickDelta = (delta) => {
    sounds.playClick();
    onQuickUpdateStock(product.id, delta);
  };

  return (
    <div className={`relative bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between overflow-hidden group ${status.bgColor} ${status.ringColor}`}>
      
      {/* Top Status Bar & Indicators */}
      <div className="p-4 sm:p-5 pb-3">
        <div className="flex items-start justify-between gap-2 mb-3">
          
          {/* Status Badge */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black shadow-sm ${status.badgeBg}`}>
              <span className="w-2 h-2 rounded-full bg-white animate-ping-slow inline-block"></span>
              {status.label}
            </span>

            {/* Audit recency badge */}
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${recency.badgeClass}`}>
              <Clock className="w-3 h-3" />
              {recency.formattedText}
            </span>
          </div>

          {/* Quick Edit/Delete Menu */}
          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEditProduct(product)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors"
              title="تعديل بيانات الصنف"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDeleteProduct(product.id, product.name)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 transition-colors"
              title="حذف الصنف"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
          {product.name}
        </h3>

        {/* Location & Details */}
        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 mb-3 flex-wrap">
          {product.freezerLocation && (
            <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md font-medium">
              <MapPin className="w-3 h-3 text-sky-500" />
              {product.freezerLocation}
            </span>
          )}
          <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md font-medium">
            الوحدة: {product.unit}
          </span>
        </div>

        {/* Main Stock Quantity Display */}
        <div className="bg-slate-50 dark:bg-slate-950/60 rounded-xl p-3 border border-slate-200/70 dark:border-slate-800/80 mb-3">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">الكمية الفعلية بالمخزن:</span>
            <div className="flex items-baseline gap-1.5">
              <span className={`text-3xl font-black tracking-tight ${
                status.status === 'critical' ? 'text-red-600 dark:text-red-400' :
                status.status === 'warning' ? 'text-amber-600 dark:text-amber-400' :
                'text-emerald-600 dark:text-emerald-400'
              }`}>
                {product.currentStock}
              </span>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                {product.unit}
              </span>
            </div>
          </div>

          {/* Stock Level Bar */}
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${status.progressColor}`}
              style={{ width: `${stockPercentage}%` }}
            />
          </div>

          {/* Thresholds guidance */}
          <div className="flex justify-between items-center text-[10px] text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
            <span>الحد الحرج: {product.minCriticalThreshold} {product.unit}</span>
            <span>الحد الآمن: {product.healthyThreshold} {product.unit}</span>
          </div>
        </div>

        {/* Last Audit Quick Info */}
        <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 pt-2">
          <span>آخر جرد: {lastAudit ? formatArabicDateTime(lastAudit.date) : 'لا يوجد'}</span>
          {lastAudit && (
            <span className="font-bold text-slate-700 dark:text-slate-300">
              بواسطة: {lastAudit.auditor || 'المسؤول'}
            </span>
          )}
        </div>
      </div>

      {/* Action Footer: Quick adjust & Open Audit History */}
      <div className="p-3 bg-slate-100/80 dark:bg-slate-950/80 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-2">
        
        {/* Quick Stepper for physical freezer counting */}
        <div className="flex items-center gap-1 bg-white dark:bg-slate-900 rounded-xl p-1 border border-slate-200 dark:border-slate-800 shadow-sm">
          <button
            onClick={() => handleQuickDelta(-1)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:bg-rose-500 active:text-white transition-colors"
            title="تقليل 1"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleQuickDelta(1)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:bg-emerald-500 active:text-white transition-colors"
            title="زيادة 1"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Primary Action Button: Open Audit History (سجل الجرد) */}
        <button
          onClick={() => {
            sounds.playClick();
            onOpenAudit(product);
          }}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white font-bold text-xs sm:text-sm shadow-sm active:scale-95 transition-all"
        >
          <ClipboardList className="w-4 h-4" />
          <span>سجل الجرد ({auditLogs.length})</span>
        </button>
      </div>

    </div>
  );
}
