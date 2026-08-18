import React, { useState, useMemo } from 'react';
import { 
  X, 
  Wallet, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Plus, 
  Trash2, 
  Printer, 
  Calendar, 
  Search, 
  Download, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle,
  Filter,
  User,
  Tag,
  Clock
} from 'lucide-react';
import { formatArabicDateTime } from '../utils/storage';
import { sounds } from '../utils/sound';
import html2pdf from 'html2pdf.js';

export default function DailyJournalModal({
  isOpen,
  journal = [],
  customers = [],
  isAdmin = false,
  onClose,
  onAddJournalEntry,
  onDeleteJournalEntry,
  onOpenAdminModal
}) {
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [dateFilterMode, setDateFilterMode] = useState('day'); // 'today' | 'day' | 'month' | 'all'
  const [typeFilter, setTypeFilter] = useState('all'); // 'all' | 'income' | 'expense'
  const [searchQuery, setSearchQuery] = useState('');
  
  // New entry form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [entryType, setEntryType] = useState('income'); // 'income' | 'expense'
  const [personName, setPersonName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('تحصيل مبيعات');
  const [notes, setNotes] = useState('');
  const [customDateTime, setCustomDateTime] = useState(() => new Date().toISOString().slice(0, 16));
  const [successToast, setSuccessToast] = useState('');

  if (!isOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];

  const incomeCategories = [
    'تحصيل مبيعات نقدية',
    'سداد دفعة مديونية من عميل',
    'إيداع خزينة / رأس مال',
    'إيرادات أخرى'
  ];

  const expenseCategories = [
    'مشتريات وتوريد بضاعة',
    'مصاريف نقل وشحن',
    'أجور ويوميات عمال',
    'كهرباء وصيانة ثلاجات',
    'إيجار',
    'مسحوبات شخصية',
    'مصاريف نثرية وبوفيه',
    'مصروفات أخرى'
  ];

  // Filter journal entries
  const filteredJournal = useMemo(() => {
    return journal.filter(entry => {
      const entryDate = entry.date ? entry.date.split('T')[0] : '';

      // Date filtering
      if (dateFilterMode === 'today' && entryDate !== todayStr) return false;
      if (dateFilterMode === 'day' && selectedDate && entryDate !== selectedDate) return false;
      if (dateFilterMode === 'month' && selectedDate) {
        const monthPrefix = selectedDate.slice(0, 7);
        if (!entryDate.startsWith(monthPrefix)) return false;
      }

      // Type filtering
      if (typeFilter !== 'all' && entry.type !== typeFilter) return false;

      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = (entry.personName || '').toLowerCase().includes(q);
        const matchCat = (entry.category || '').toLowerCase().includes(q);
        const matchNotes = (entry.notes || '').toLowerCase().includes(q);
        if (!matchName && !matchCat && !matchNotes) return false;
      }

      return true;
    }).sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
  }, [journal, selectedDate, dateFilterMode, typeFilter, searchQuery, todayStr]);

  // Aggregate sums
  const stats = useMemo(() => {
    let totalIncome = 0;
    let totalExpense = 0;

    filteredJournal.forEach(item => {
      const amt = Number(item.amount) || 0;
      if (item.type === 'income') totalIncome += amt;
      else if (item.type === 'expense') totalExpense += amt;
    });

    const netCash = totalIncome - totalExpense;
    return {
      totalIncome,
      totalExpense,
      netCash,
      count: filteredJournal.length
    };
  }, [filteredJournal]);

  const handleCreateEntry = (e) => {
    e.preventDefault();
    if (!isAdmin) {
      sounds.playWarning();
      if (onOpenAdminModal) onOpenAdminModal();
      return;
    }

    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) {
      sounds.playWarning();
      return;
    }

    const newEntry = {
      id: 'jrnl-' + Date.now(),
      date: customDateTime ? new Date(customDateTime).toISOString() : new Date().toISOString(),
      type: entryType,
      amount: numAmount,
      personName: personName.trim() || (entryType === 'income' ? 'عميل نقدي' : 'مصروفات عامة'),
      category: category || (entryType === 'income' ? 'تحصيل مبيعات' : 'مصروفات'),
      notes: notes.trim(),
      createdAt: new Date().toISOString()
    };

    if (onAddJournalEntry) {
      onAddJournalEntry(newEntry);
    }

    sounds.playSuccess();
    setSuccessToast(`✅ تم تسجيل حركة ${entryType === 'income' ? 'قبض' : 'صرف'} بمبلغ ${numAmount} ج`);
    setTimeout(() => setSuccessToast(''), 3500);

    // Reset form
    setPersonName('');
    setAmount('');
    setNotes('');
    setIsFormOpen(false);
  };

  const handleDelete = (id) => {
    if (!isAdmin) return;
    if (window.confirm('هل تريد بالتأكيد حذف هذه الحركة من دفتر اليومية؟')) {
      if (onDeleteJournalEntry) onDeleteJournalEntry(id);
      sounds.playClick();
    }
  };

  // Direct Print Collection Sheet
  const handlePrintSheet = () => {
    const win = window.open('', '_blank');
    const displayDate = dateFilterMode === 'today' 
      ? 'اليوم (' + todayStr + ')'
      : dateFilterMode === 'day' 
      ? selectedDate 
      : dateFilterMode === 'month' 
      ? 'شهر ' + (selectedDate?.slice(0, 7) || '') 
      : 'كافة الحركات المسجلة';

    win.document.write(`
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <title>كشف يومية الخزينة - صِوار SWAR</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: 'Cairo', sans-serif; direction: rtl; padding: 25px; color: #1e293b; background: white; }
          .header { text-align: center; margin-bottom: 20px; border-bottom: 3px solid #0284c7; padding-bottom: 14px; }
          .header h1 { font-size: 24px; font-weight: 900; color: #0369a1; }
          .header .sub { font-size: 13px; color: #64748b; margin-top: 2px; }
          .kpis { display: flex; justify-content: space-between; gap: 10px; margin-bottom: 20px; }
          .kpi-box { flex: 1; padding: 12px; border-radius: 10px; text-align: center; border: 1px solid #e2e8f0; }
          .kpi-inc { background: #f0fdf4; border-color: #bbf7d0; color: #166534; }
          .kpi-exp { background: #fef2f2; border-color: #fecaca; color: #991b1b; }
          .kpi-net { background: #f0f9ff; border-color: #bae6fd; color: #0369a1; }
          .kpi-title { font-size: 11px; font-weight: bold; }
          .kpi-val { font-size: 18px; font-weight: 900; margin-top: 2px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px; }
          thead tr { background: #0ea5e9; color: white; }
          th, td { padding: 9px 10px; text-align: right; border-bottom: 1px solid #e2e8f0; }
          .inc-amt { color: #16a34a; font-weight: bold; }
          .exp-amt { color: #dc2626; font-weight: bold; }
          .badge { display: inline-block; padding: 2px 7px; border-radius: 6px; font-size: 11px; font-weight: bold; }
          .badge-inc { background: #dcfce7; color: #15803d; }
          .badge-exp { background: #fee2e2; color: #b91c1c; }
          .footer { margin-top: 30px; display: flex; justify-content: space-between; font-size: 11px; color: #64748b; border-top: 1px dashed #cbd5e1; padding-top: 15px; }
          @media print { body { padding: 10px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>💵 دفتر يومية الخزينة وحركة النقدية</h1>
          <div class="sub">منظومة صِـوار (SWAR) • الفترة: <strong>${displayDate}</strong></div>
        </div>

        <div class="kpis">
          <div class="kpi-box kpi-inc">
            <div class="kpi-title">📥 إجمالي المقبوضات (الوارد)</div>
            <div class="kpi-val">+ ${stats.totalIncome.toFixed(2)} ج</div>
          </div>
          <div class="kpi-box kpi-exp">
            <div class="kpi-title">📤 إجمالي المصروفات (المنصرف)</div>
            <div class="kpi-val">- ${stats.totalExpense.toFixed(2)} ج</div>
          </div>
          <div class="kpi-box kpi-net">
            <div class="kpi-title">💰 صافي رصيد الخزينة</div>
            <div class="kpi-val">${stats.netCash >= 0 ? '+' : ''}${stats.netCash.toFixed(2)} ج</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>التاريخ والوقت</th>
              <th>النوع</th>
              <th>الطرف / الدافع / المستلم</th>
              <th>البند والتصنيف</th>
              <th>المبلغ</th>
              <th>ملاحظات</th>
            </tr>
          </thead>
          <tbody>
            ${filteredJournal.map((item, idx) => `
              <tr>
                <td>${idx + 1}</td>
                <td>${formatArabicDateTime(item.date || item.createdAt)}</td>
                <td>
                  <span class="badge ${item.type === 'income' ? 'badge-inc' : 'badge-exp'}">
                    ${item.type === 'income' ? '📥 قبض / وارد' : '📤 صرف / منصرف'}
                  </span>
                </td>
                <td><strong>${item.personName || '-'}</strong></td>
                <td>${item.category || '-'}</td>
                <td class="${item.type === 'income' ? 'inc-amt' : 'exp-amt'}">
                  ${item.type === 'income' ? '+' : '-'}${Number(item.amount).toFixed(2)} ج
                </td>
                <td>${item.notes || '-'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="footer">
          <div>توقيع أمين الخزينة / المسؤول: .....................................</div>
          <div>اعتماد الإدارة: .....................................</div>
        </div>
        <script>window.onload = function() { window.print(); }</script>
      </body>
      </html>
    `);
    win.document.close();
  };

  // PDF Export
  const handleExportPDF = async () => {
    const container = document.createElement('div');
    container.style.direction = 'rtl';
    container.style.fontFamily = "'Cairo', sans-serif";
    container.style.padding = '20px';
    container.style.backgroundColor = '#ffffff';

    const displayDate = dateFilterMode === 'today' ? todayStr : selectedDate || 'كافة الفترات';

    container.innerHTML = `
      <div style="border-bottom: 2px solid #0284c7; padding-bottom: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h1 style="margin: 0; font-size: 20px; font-weight: 900; color: #0f172a;">💵 كشف يومية الخزينة والحركات النقدية</h1>
          <p style="margin: 3px 0 0 0; font-size: 11px; color: #64748b;">الفترة: ${displayDate} | منظومة صِـوار SWAR</p>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 16px;">
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 8px; text-align: center;">
          <div style="font-size: 10px; color: #166534;">المقبوضات</div>
          <div style="font-size: 16px; font-weight: 900; color: #166534;">+ ${stats.totalIncome.toFixed(2)} ج</div>
        </div>
        <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 8px; text-align: center;">
          <div style="font-size: 10px; color: #991b1b;">المصروفات</div>
          <div style="font-size: 16px; font-weight: 900; color: #991b1b;">- ${stats.totalExpense.toFixed(2)} ج</div>
        </div>
        <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 8px; text-align: center;">
          <div style="font-size: 10px; color: #0369a1;">صافي الخزينة</div>
          <div style="font-size: 16px; font-weight: 900; color: #0369a1;">${stats.netCash.toFixed(2)} ج</div>
        </div>
      </div>
      <table style="width: 100%; border-collapse: collapse; text-align: right; font-size: 10px;">
        <thead>
          <tr style="background: #0284c7; color: white;">
            <th style="padding: 6px;">#</th>
            <th style="padding: 6px;">التاريخ</th>
            <th style="padding: 6px;">النوع</th>
            <th style="padding: 6px;">الطرف</th>
            <th style="padding: 6px;">البند</th>
            <th style="padding: 6px;">المبلغ</th>
            <th style="padding: 6px;">ملاحظات</th>
          </tr>
        </thead>
        <tbody>
          ${filteredJournal.map((item, idx) => `
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 5px;">${idx + 1}</td>
              <td style="padding: 5px;">${formatArabicDateTime(item.date || item.createdAt)}</td>
              <td style="padding: 5px; font-weight: bold; color: ${item.type === 'income' ? '#16a34a' : '#dc2626'};">
                ${item.type === 'income' ? 'قبض' : 'صرف'}
              </td>
              <td style="padding: 5px;">${item.personName || '-'}</td>
              <td style="padding: 5px;">${item.category || '-'}</td>
              <td style="padding: 5px; font-weight: bold;">${item.type === 'income' ? '+' : '-'}${item.amount} ج</td>
              <td style="padding: 5px;">${item.notes || '-'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    const opt = {
      margin: [10, 10, 10, 10],
      filename: `يومية_الخزينة_${displayDate}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      await html2pdf().set(opt).from(container).save();
    } catch {
      handlePrintSheet();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-sm animate-fade-in no-print overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 my-auto flex flex-col max-h-[95vh] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-t-3xl shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center shadow-inner">
              <Wallet className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black flex items-center gap-2">
                <span>دفتر اليومية والخزينة</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  مقبوضات ومصروفات
                </span>
              </h2>
              <p className="text-xs text-emerald-200/80">تسجيل ومتابعة حركة النقدية اليومية وكشوف الحساب</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toast alert */}
        {successToast && (
          <div className="bg-emerald-50 dark:bg-emerald-950/80 border-b border-emerald-200 dark:border-emerald-800 px-4 py-2.5 text-xs sm:text-sm text-emerald-800 dark:text-emerald-200 font-bold flex items-center gap-2 animate-fade-in shrink-0">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Main Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-5">

          {/* Quick Date Filters & Actions Bar */}
          <div className="bg-slate-50 dark:bg-slate-950/70 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3">
            
            {/* Date buttons */}
            <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
              <button
                onClick={() => { setDateFilterMode('today'); setSelectedDate(todayStr); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  dateFilterMode === 'today'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                اليوم
              </button>
              <button
                onClick={() => setDateFilterMode('day')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  dateFilterMode === 'day'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                يوم محدد
              </button>
              <button
                onClick={() => setDateFilterMode('month')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  dateFilterMode === 'month'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                هذا الشهر
              </button>
              <button
                onClick={() => setDateFilterMode('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  dateFilterMode === 'all'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                الكل
              </button>

              {(dateFilterMode === 'day' || dateFilterMode === 'month') && (
                <input
                  type="date"
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  className="px-2.5 py-1 text-xs font-bold rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white outline-none"
                />
              )}
            </div>

            {/* Print & Export tools */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <button
                onClick={handlePrintSheet}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
                title="طباعة كشف الحساب"
              >
                <Printer className="w-3.5 h-3.5 text-emerald-600" />
                <span>طباعة الكشف</span>
              </button>

              <button
                onClick={handleExportPDF}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
                title="تصدير ملف PDF"
              >
                <Download className="w-3.5 h-3.5 text-sky-600" />
                <span>PDF</span>
              </button>

              {isAdmin && (
                <button
                  onClick={() => setIsFormOpen(!isFormOpen)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-md transition-all active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isFormOpen ? 'إغلاق النموذج' : 'تسجيل حركة'}</span>
                </button>
              )}
            </div>

          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Income */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-900/60 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">📥 إجمالي المقبوضات (الوارد)</span>
                <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                + {stats.totalIncome.toFixed(2)} <span className="text-xs font-normal">ج</span>
              </div>
            </div>

            {/* Expense */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-950/40 dark:to-orange-950/20 border border-rose-200 dark:border-rose-900/60 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-rose-800 dark:text-rose-300">📤 إجمالي المصروفات (المنصرف)</span>
                <ArrowUpRight className="w-4 h-4 text-rose-600" />
              </div>
              <div className="text-2xl font-black text-rose-700 dark:text-rose-400">
                - {stats.totalExpense.toFixed(2)} <span className="text-xs font-normal">ج</span>
              </div>
            </div>

            {/* Net Cash */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-sky-950/40 dark:to-indigo-950/20 border border-sky-200 dark:border-sky-900/60 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-sky-800 dark:text-sky-300">💰 صافي رصيد الخزينة</span>
                <DollarSign className="w-4 h-4 text-sky-600" />
              </div>
              <div className={`text-2xl font-black ${stats.netCash >= 0 ? 'text-sky-700 dark:text-sky-300' : 'text-rose-600 dark:text-rose-400'}`}>
                {stats.netCash >= 0 ? '+' : ''}{stats.netCash.toFixed(2)} <span className="text-xs font-normal">ج</span>
              </div>
            </div>

          </div>

          {/* Collapsible New Transaction Form */}
          {isFormOpen && isAdmin && (
            <form onSubmit={handleCreateEntry} className="p-4 sm:p-5 rounded-3xl bg-slate-50 dark:bg-slate-950 border-2 border-emerald-500/30 dark:border-emerald-700/50 space-y-4 animate-slide-up shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5">
                <h3 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-2">
                  <span>➕ تسجيل حركة مالية جديدة في اليومية</span>
                </h3>
                <div className="flex gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => { setEntryType('income'); setCategory('تحصيل مبيعات نقدية'); }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      entryType === 'income' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    📥 مقبوضات (وارد)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setEntryType('expense'); setCategory('مشتريات وتوريد بضاعة'); }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      entryType === 'expense' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    📤 مصروفات (منصرف)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Person / Party Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    {entryType === 'income' ? 'اسم الدافع / العميل' : 'اسم المستلم / المورد / البند'}
                  </label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={personName}
                      onChange={e => setPersonName(e.target.value)}
                      placeholder={entryType === 'income' ? 'مثال: مطعم النجمة / عميل نقدي' : 'مثال: شركة الهدى / كهرباء'}
                      className="w-full pr-9 pl-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">المبلغ (بالجنيه)</label>
                  <input
                    type="number"
                    step="any"
                    min="0.1"
                    required
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-black text-center outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">التصنيف / البند</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {(entryType === 'income' ? incomeCategories : expenseCategories).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Custom date time */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">التاريخ والوقت</label>
                  <input
                    type="datetime-local"
                    value={customDateTime}
                    onChange={e => setCustomDateTime(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold outline-none"
                  />
                </div>

                {/* Notes */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">ملاحظات وبيان إضافي</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="ملاحظات توضيحية..."
                    className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-400"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-md flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>حفظ في اليومية</span>
                </button>
              </div>
            </form>
          )}

          {/* Search & Type Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="relative flex-1 w-full">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="ابحث بالاسم، التصنيف، أو الملاحظات..."
                className="w-full pr-9 pl-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <button
                onClick={() => setTypeFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  typeFilter === 'all' ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                الكل ({journal.length})
              </button>
              <button
                onClick={() => setTypeFilter('income')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  typeFilter === 'income' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                }`}
              >
                وارد 📥
              </button>
              <button
                onClick={() => setTypeFilter('expense')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  typeFilter === 'expense' ? 'bg-rose-600 text-white' : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                }`}
              >
                منصرف 📤
              </button>
            </div>
          </div>

          {/* Transactions Table / List */}
          {filteredJournal.length === 0 ? (
            <div className="py-14 text-center text-slate-400 text-sm border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
              <Wallet className="w-12 h-12 mx-auto mb-2 opacity-30 text-emerald-500" />
              <p className="font-bold text-slate-600 dark:text-slate-400">لا توجد حركات مسجلة للفترة المحددة</p>
              <p className="text-xs text-slate-400 mt-1">اضغط على زر "تسجيل حركة" بالأعلى لإضافة مقبوضات أو مصروفات</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <table className="w-full text-xs sm:text-sm">
                <thead className="bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 font-bold">
                  <tr>
                    <th className="text-right px-3 py-2.5">الوقت والطرف</th>
                    <th className="text-right px-3 py-2.5">التصنيف والبيان</th>
                    <th className="text-center px-3 py-2.5">النوع</th>
                    <th className="text-center px-3 py-2.5 w-32">المبلغ</th>
                    {isAdmin && <th className="w-10"></th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                  {filteredJournal.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-3 py-2.5">
                        <div className="font-bold text-slate-800 dark:text-white">{item.personName || 'طرف غير محدد'}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatArabicDateTime(item.date || item.createdAt)}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md text-[11px]">
                          {item.category || '-'}
                        </span>
                        {item.notes && <div className="text-[11px] text-slate-400 mt-0.5">{item.notes}</div>}
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black ${
                          item.type === 'income'
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                            : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                        }`}>
                          {item.type === 'income' ? '📥 قبض' : '📤 صرف'}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-center font-black text-sm sm:text-base">
                        <span className={item.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>
                          {item.type === 'income' ? '+' : '-'}{Number(item.amount).toFixed(2)} ج
                        </span>
                      </td>
                      {isAdmin && (
                        <td className="px-2 py-2.5 text-center">
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                            title="حذف الحركة"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
