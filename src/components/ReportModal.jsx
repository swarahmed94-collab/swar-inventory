import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  FileSpreadsheet, 
  Snowflake, 
  CheckCircle, 
  AlertTriangle,
  Clock
} from 'lucide-react';
import { getStockStatus, getAuditRecency, formatArabicDateTime } from '../utils/storage';
import { exportToCSV, printInventoryReport } from '../utils/export';

export default function ReportModal({ products, isOpen, onClose }) {
  if (!isOpen) return null;

  let totalItems = products.length;
  let totalStock = 0;
  let criticalCount = 0;
  let warningCount = 0;
  let healthyCount = 0;

  products.forEach(p => {
    totalStock += Number(p.currentStock) || 0;
    const s = getStockStatus(p);
    if (s.status === 'critical') criticalCount++;
    else if (s.status === 'warning') warningCount++;
    else healthyCount++;
  });

  const currentDate = new Date().toLocaleDateString('ar-EG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto flex flex-col max-h-[94vh]">
        
        {/* Modal Controls Header (Hidden during print) */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950 no-print">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              تقرير الجرد الشامل للمخزون
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => exportToCSV(products)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>تصدير Excel (CSV)</span>
            </button>
            <button
              onClick={printInventoryReport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-bold shadow-sm transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة / حفظ PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-white dark:bg-slate-900 print:p-2 print:text-black">
          
          {/* Printable Header */}
          <div className="border-b-2 border-slate-200 pb-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-black text-xl">
                ❄️
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-900 dark:text-white print:text-black">
                  سِـوار | تقرير جرد وحالة مخزون المجمدات
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 print:text-gray-600 mt-0.5">
                  تاريخ استخراج التقرير: {currentDate}
                </p>
              </div>
            </div>
            <div className="text-left font-mono text-xs text-slate-400">
              SWAR-AUDIT-REPORT
            </div>
          </div>

          {/* KPI Summary Cards */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-center">
              <div className="text-xs font-bold text-slate-500">إجمالي الأصناف</div>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">{totalItems}</div>
            </div>
            <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-center">
              <div className="text-xs font-bold text-slate-500">إجمالي الوحدات</div>
              <div className="text-2xl font-black text-sky-600 mt-1">{totalStock}</div>
            </div>
            <div className="p-3 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50 dark:bg-rose-950/20 text-center">
              <div className="text-xs font-bold text-rose-600">نواقص حرجة 🔴</div>
              <div className="text-2xl font-black text-rose-600 mt-1">{criticalCount}</div>
            </div>
            <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-950/20 text-center">
              <div className="text-xs font-bold text-emerald-600">مخزون كافي 🟢</div>
              <div className="text-2xl font-black text-emerald-600 mt-1">{healthyCount}</div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-right text-xs sm:text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">اسم المنتج المجمد</th>
                  <th className="p-3">مكان التخزين</th>
                  <th className="p-3 text-center">المخزون الفعلي</th>
                  <th className="p-3 text-center">الحد الحرج</th>
                  <th className="p-3 text-center">الحالة</th>
                  <th className="p-3">آخر جرد</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {products.map((p, idx) => {
                  const status = getStockStatus(p);
                  const lastAudit = p.auditHistory?.length > 0 ? p.auditHistory[p.auditHistory.length - 1] : null;

                  return (
                    <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-mono text-slate-400">{idx + 1}</td>
                      <td className="p-3 font-bold text-slate-900 dark:text-white">{p.name}</td>
                      <td className="p-3 text-slate-500 dark:text-slate-400">{p.freezerLocation || '-'}</td>
                      <td className="p-3 text-center font-black text-base text-slate-900 dark:text-white">
                        {p.currentStock} <span className="text-[11px] font-normal text-slate-500">{p.unit}</span>
                      </td>
                      <td className="p-3 text-center font-bold text-rose-600">
                        {p.minCriticalThreshold} {p.unit}
                      </td>
                      <td className="p-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-bold ${status.badgeBg}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="p-3 text-slate-600 dark:text-slate-400 text-xs">
                        {lastAudit ? formatArabicDateTime(lastAudit.date) : 'لم يجرد'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer signature line */}
          <div className="mt-12 pt-6 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500 print:text-black">
            <div>
              توقيع مسؤول المخزن: .......................................
            </div>
            <div>
              اعتماد مدير التشغيل: .......................................
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
