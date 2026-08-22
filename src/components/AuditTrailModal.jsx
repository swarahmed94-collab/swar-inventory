import React, { useState, useMemo } from 'react';
import { 
  X, 
  History, 
  Search, 
  Filter, 
  Receipt, 
  RotateCcw, 
  Layers, 
  FileText, 
  Calendar, 
  User, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CheckCircle2, 
  Clock, 
  Printer, 
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { formatArabicDateTime } from '../utils/storage';
import { getStoredAuditTrail } from '../utils/transactions';

export default function AuditTrailModal({
  isOpen,
  invoices = [],
  onClose,
  onViewInvoice,
  onOpenAdminModal
}) {
  const [filterType, setFilterType] = useState('all'); // 'all' | 'sales' | 'purchase' | 'reset' | 'bulk'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('invoices'); // 'invoices' | 'system_logs'

  const auditEvents = useMemo(() => getStoredAuditTrail(), [isOpen]);

  if (!isOpen) return null;

  // Filtered invoices
  const filteredInvoices = invoices.filter(inv => {
    if (!inv) return false;
    if (filterType === 'sales' && inv.type !== 'sales') return false;
    if (filterType === 'purchase' && inv.type !== 'purchase') return false;
    
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      const matchNum = String(inv.invoiceNumber || '').toLowerCase().includes(q);
      const matchCust = String(inv.customerName || '').toLowerCase().includes(q);
      const matchNotes = String(inv.notes || '').toLowerCase().includes(q);
      return matchNum || matchCust || matchNotes;
    }
    return true;
  });

  // Filtered system audit logs
  const filteredLogs = auditEvents.filter(log => {
    if (!log) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      const matchTitle = String(log.title || '').toLowerCase().includes(q);
      const matchDetails = String(log.details || '').toLowerCase().includes(q);
      const matchActor = String(log.actor || '').toLowerCase().includes(q);
      return matchTitle || matchDetails || matchActor;
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/75 backdrop-blur-sm animate-fade-in no-print overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 my-auto flex flex-col max-h-[95vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-t-3xl shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center shadow-inner">
              <History className="w-6 h-6 text-indigo-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black">أرشيف وسجل الفواتير والحركات (Audit Trail)</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> موثق ومؤرخ
                </span>
              </div>
              <p className="text-xs text-indigo-200/80">توثيق كامل لكل فاتورة مبيعات، مشتريات، استيراد بضاعة وتصفير مخزون بالوقت واسم المسؤول</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation & Search */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          
          {/* Tabs */}
          <div className="flex p-1 rounded-2xl bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveTab('invoices')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                activeTab === 'invoices'
                  ? 'bg-white dark:bg-slate-800 shadow text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Receipt className="w-3.5 h-3.5" />
              <span>سجل الفواتير ({invoices.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('system_logs')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                activeTab === 'system_logs'
                  ? 'bg-white dark:bg-slate-800 shadow text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>سجل عمليات النظام ({auditEvents.length})</span>
            </button>
          </div>

          {/* Search & Filters */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {activeTab === 'invoices' && (
              <select
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
                className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold outline-none"
              >
                <option value="all">جميع الفواتير</option>
                <option value="sales">🛒 مبيعات فقط</option>
                <option value="purchase">📦 مشتريات وتوريد</option>
              </select>
            )}

            <div className="relative flex-1 sm:w-64">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="ابحث برقم الفاتورة، الاسم، أو الملاحظات..."
                className="w-full pr-9 pl-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          
          {/* TAB 1: INVOICES CHRONOLOGICAL LOG */}
          {activeTab === 'invoices' && (
            <>
              {filteredInvoices.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-sm border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                  <Receipt className="w-12 h-12 mx-auto mb-2 opacity-30 text-indigo-500" />
                  <p className="font-bold text-slate-600 dark:text-slate-400">لا توجد فواتير مطابقة للبحث</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredInvoices.map((inv) => {
                    const isSales = inv.type === 'sales';
                    const itemsCount = (inv.items || []).length;
                    const formattedDate = formatArabicDateTime(inv.createdAt);

                    return (
                      <div
                        key={inv.id}
                        className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700/60 transition-all shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                            isSales 
                              ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400' 
                              : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          }`}>
                            {isSales ? <ArrowDownLeft className="w-6 h-6" /> : <ArrowUpRight className="w-6 h-6" />}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-black text-sm text-slate-900 dark:text-white">
                                {inv.invoiceNumber || 'بدون رقم'}
                              </span>
                              <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                                isSales 
                                  ? 'bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300' 
                                  : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                              }`}>
                                {isSales ? 'فاتورة مبيعات' : 'فاتورة مشتريات'}
                              </span>
                              {inv.deductedFromStock && (
                                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                                  <CheckCircle2 className="w-3 h-3" /> تم التحديث بالمخزن
                                </span>
                              )}
                            </div>

                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex flex-wrap items-center gap-3">
                              <span><strong>الطرف:</strong> {inv.customerName || (isSales ? 'عميل نقدي' : 'مورد')}</span>
                              <span>•</span>
                              <span><strong>عدد الأصناف:</strong> {itemsCount} صنف ({inv.totalUnits || 0} وحدة)</span>
                              <span>•</span>
                              <span className="flex items-center gap-1 font-mono text-[11px]">
                                <Clock className="w-3 h-3" /> {formattedDate}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 dark:border-slate-800">
                          <div className="text-left">
                            <div className="text-sm font-black text-slate-900 dark:text-white">
                              {Number(inv.total || 0).toFixed(2)} ج
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {inv.paymentType === 'credit' ? 'آجل' : inv.paymentType === 'transfer' ? 'تحويل' : 'نقدي'}
                            </div>
                          </div>

                          {onViewInvoice && (
                            <button
                              type="button"
                              onClick={() => onViewInvoice(inv)}
                              className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 rounded-xl text-xs font-bold transition-colors"
                            >
                              عرض وطباعة
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* TAB 2: SYSTEM AUDIT LOGS */}
          {activeTab === 'system_logs' && (
            <>
              {filteredLogs.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-sm border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                  <History className="w-12 h-12 mx-auto mb-2 opacity-30 text-indigo-500" />
                  <p className="font-bold text-slate-600 dark:text-slate-400">لا توجد سجلات نظام مسجلة حالياً</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {filteredLogs.map(log => {
                    const isReset = log.action === 'STOCK_RESET';
                    const isBulk = log.action === 'BULK_IMPORT';
                    const isPdf = log.action === 'PDF_INVOICE_IMPORT';

                    return (
                      <div
                        key={log.id}
                        className={`p-3.5 rounded-2xl border transition-all text-xs flex items-start justify-between gap-3 ${
                          isReset 
                            ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60' 
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                            isReset ? 'bg-rose-500 text-white' : isBulk ? 'bg-sky-500 text-white' : isPdf ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-white'
                          }`}>
                            {isReset ? <RotateCcw className="w-4 h-4" /> : isBulk ? <Layers className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                          </div>

                          <div>
                            <div className="font-black text-slate-900 dark:text-white text-xs sm:text-sm">
                              {log.title}
                            </div>
                            <div className="text-slate-600 dark:text-slate-400 mt-0.5">
                              {log.details}
                            </div>
                            <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2 font-mono">
                              <span>بواسطة: <strong>{log.actor}</strong></span>
                              <span>•</span>
                              <span>{formatArabicDateTime(log.timestamp)}</span>
                            </div>
                          </div>
                        </div>

                        <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-500 shrink-0">
                          {log.action}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

        </div>

      </div>
    </div>
  );
}
