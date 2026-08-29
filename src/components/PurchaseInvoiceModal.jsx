import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Search,
  History,
  Truck,
  Building2,
  DollarSign,
  RotateCcw,
  Receipt,
  Package,
  FileText,
  Upload,
  ShieldAlert
} from 'lucide-react';
import { formatArabicDateTime } from '../utils/storage';
import { generateInvoiceNumber } from '../utils/transactions';
import { sounds } from '../utils/sound';

// ─── PURCHASE INVOICE MODAL ──────────────────────────────────────────────────
// This component is STRICTLY for Purchase Invoices (فاتورة مشتريات وتوريد).
// It ONLY reads product.cost_price. It NEVER touches selling_price.
// Items search shows cost_price as the displayed price.
// ─────────────────────────────────────────────────────────────────────────────

export default function PurchaseInvoiceModal({
  isOpen,
  products = [],
  invoices = [],
  isAdmin = false,
  onClose,
  onProcessInvoice,
  onDeleteInvoice,
  onOpenAdminModal,
  onOpenPdfImport,
}) {
  const safeProducts = Array.isArray(products) ? products : [];
  const safeInvoices = Array.isArray(invoices) ? invoices : [];

  // PURCHASE invoices only in history
  const purchaseInvoices = useMemo(
    () => safeInvoices.filter(inv => (inv.type || 'sales') === 'purchase'),
    [safeInvoices]
  );

  const [activeTab, setActiveTab] = useState('create'); // 'create' | 'history'
  const [vendorName, setVendorName] = useState('');
  const [vendorPhone, setVendorPhone] = useState('');
  const [items, setItems] = useState([]);
  const [paymentType, setPaymentType] = useState('cash');
  const [amountPaid, setAmountPaid] = useState('');
  const [recordInJournal, setRecordInJournal] = useState(true);
  const [notes, setNotes] = useState('');
  const [search, setSearch] = useState('');
  const [historySearch, setHistorySearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [successToast, setSuccessToast] = useState('');

  // ── STRICTLY reads cost_price ─────────────────────────────────────────────
  const addItem = (product) => {
    if (!product) return;
    sounds.playClick();
    // STRICTLY use cost_price — never selling_price
    const cost_price = Number(product.cost_price ?? 0);
    const existing = items.find(i => i.productId === product.id);
    if (existing) {
      setItems(items.map(i => i.productId === product.id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setItems([...items, {
        productId: product.id,
        name: `${product.emoji || ''} ${product.name || 'صنف'}`,
        unit: product.unit || 'وحدة',
        cost_price,               // from cost_price ONLY
        price: cost_price,        // invoice line price = cost_price
        qty: 1,
        currentStock: Number(product.currentStock) || 0,
      }]);
    }
    setSearch('');
  };

  const updateQty = (productId, delta) => {
    sounds.playClick();
    setItems(prev => prev
      .map(i => i.productId === productId ? { ...i, qty: Math.max(0, i.qty + delta) } : i)
      .filter(i => i.qty > 0)
    );
  };

  const setQtyDirect = (productId, val) => {
    const num = Math.max(0, Number(val) || 0);
    setItems(prev => prev.map(i => i.productId === productId ? { ...i, qty: num } : i));
  };

  const updatePrice = (productId, val) => {
    setItems(prev => prev.map(i => i.productId === productId ? { ...i, price: Number(val) || 0 } : i));
  };

  const removeItem = (productId) => {
    sounds.playClick();
    setItems(prev => prev.filter(i => i.productId !== productId));
  };

  const total = items.reduce((sum, i) => sum + (i.qty * i.price), 0);
  const totalUnits = items.reduce((sum, i) => sum + i.qty, 0);
  const effectivePaid = amountPaid === '' ? total : Number(amountPaid) || 0;
  const remainingBalance = Math.max(0, total - effectivePaid);

  const filteredProducts = safeProducts.filter(p => {
    if (!p) return false;
    const q = search.toLowerCase();
    return (
      String(p.name || '').toLowerCase().includes(q) ||
      (p.emoji && String(p.emoji).includes(q)) ||
      (p.freezerLocation && String(p.freezerLocation).toLowerCase().includes(q))
    );
  }).slice(0, 8);

  const filteredPurchaseInvoices = purchaseInvoices.filter(inv => {
    if (!inv) return false;
    const q = historySearch.trim().toLowerCase();
    if (!q) return true;
    return (
      String(inv.invoiceNumber || '').toLowerCase().includes(q) ||
      String(inv.customerName || inv.vendorName || '').toLowerCase().includes(q) ||
      String(inv.notes || '').toLowerCase().includes(q)
    );
  });

  if (!isOpen) return null;

  const printInvoiceContent = (inv) => {
    const win = window.open('', '_blank');
    if (!win) { window.print(); return; }
    const invItems = Array.isArray(inv.items) ? inv.items : [];
    const invTotal = Number(inv.total) || invItems.reduce((s, x) => s + (x.qty * (x.cost_price ?? x.price)), 0);
    const invPaid = inv.amountPaid !== undefined ? Number(inv.amountPaid) : invTotal;
    const invDate = inv.createdAt ? formatArabicDateTime(inv.createdAt) : formatArabicDateTime(new Date().toISOString());
    const vendor = inv.vendorName || inv.customerName || 'مورد';

    win.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8">
<title>فاتورة مشتريات ${inv.invoiceNumber || ''} - صِوار SWAR</title>
<style>@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}body{font-family:'Cairo',sans-serif;direction:rtl;padding:30px;color:#1e293b;background:white;}
.header{text-align:center;margin-bottom:20px;border-bottom:3px solid #16a34a;padding-bottom:16px;}
.header h1{font-size:26px;font-weight:900;color:#15803d;}.header .sub{font-size:13px;color:#64748b;margin-top:2px;}
.badge{display:inline-block;padding:3px 10px;border-radius:6px;font-size:11px;font-weight:bold;background:#dcfce7;color:#16a34a;}
.meta{display:flex;justify-content:space-between;margin-bottom:20px;font-size:13px;color:#475569;background:#f0fdf4;padding:14px 16px;border-radius:10px;border:1px solid #bbf7d0;}
table{width:100%;border-collapse:collapse;margin-bottom:20px;font-size:14px;}
thead tr{background:#16a34a;color:white;}th,td{padding:10px 12px;text-align:right;border-bottom:1px solid #e2e8f0;}
tfoot tr{font-weight:900;background:#f0fdf4;}.total-row td{color:#0f172a;font-size:17px;}.paid-row td{color:#16a34a;}
.footer{text-align:center;font-size:11px;color:#94a3b8;margin-top:30px;border-top:1px solid #e2e8f0;padding-top:15px;}
@media print{body{padding:15px;}}</style></head><body>
<div class="header"><h1>🧊 منظومة صِـوار (SWAR)</h1><div class="sub">إدارة المخزون والمشتريات</div></div>
<div class="meta"><div>
<div><strong>نوع الفاتورة:</strong> <span class="badge">📦 فاتورة مشتريات وتوريد</span></div>
<div><strong>رقم الفاتورة:</strong> ${inv.invoiceNumber || 'مسودة'}</div>
<div><strong>المورد:</strong> ${vendor}</div>
</div><div style="text-align:left;">
<div><strong>التاريخ:</strong> ${invDate}</div>
<div><strong>طريقة الدفع:</strong> ${inv.paymentType === 'credit' ? 'آجل' : inv.paymentType === 'transfer' ? 'تحويل' : 'نقدي'}</div>
<div><strong>حالة المخزن:</strong> ${inv.deductedFromStock ? '✅ تمت إضافة للمخزون' : '📄 مسودة'}</div>
</div></div>
<table><thead><tr><th>#</th><th>الصنف</th><th>الوحدة</th><th>الكمية</th><th>سعر التكلفة (ج)</th><th>الإجمالي</th></tr></thead>
<tbody>${invItems.map((item, idx) => `<tr>
<td>${idx + 1}</td><td>${item.name || '-'}</td><td>${item.unit || '-'}</td>
<td><strong>${item.qty || 0}</strong></td>
<td>${Number(item.cost_price ?? item.price ?? 0).toFixed(2)} ج</td>
<td>${(Number(item.qty || 0) * Number(item.cost_price ?? item.price ?? 0)).toFixed(2)} ج</td>
</tr>`).join('')}</tbody>
<tfoot>
<tr class="total-row"><td colspan="5">📦 إجمالي فاتورة الشراء (بسعر التكلفة):</td><td>${invTotal.toFixed(2)} جنيه</td></tr>
<tr class="paid-row"><td colspan="5">💵 المبلغ المسدد للمورد:</td><td>${invPaid.toFixed(2)} جنيه</td></tr>
</tfoot></table>
${inv.notes ? `<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:12px;font-size:13px;color:#475569;margin-bottom:16px;">📝 <strong>ملاحظات:</strong> ${inv.notes}</div>` : ''}
<div class="footer">تم الإصدار عبر منظومة صِـوار SWAR • Developed By Ahmed Swar & Zyad Elleathy</div>
<script>window.onload = function() { window.print(); }</script></body></html>`);
    win.document.close();
  };

  const handlePrintDraft = () => {
    if (items.length === 0) return;
    printInvoiceContent({
      invoiceNumber: 'PINV-DRAFT-' + Date.now().toString().slice(-4),
      type: 'purchase',
      vendorName, customerName: vendorName, paymentType,
      items,
      total,
      amountPaid: effectivePaid,
      notes,
      deductedFromStock: false,
      createdAt: new Date().toISOString()
    });
  };

  const handleConfirmAndProcess = () => {
    if (items.length === 0) return;
    if (!isAdmin) {
      sounds.playWarning();
      if (onOpenAdminModal) onOpenAdminModal();
      return;
    }

    const invoiceNum = generateInvoiceNumber('purchase', safeInvoices);
    const newInvoice = {
      id: 'inv-purch-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      invoiceNumber: invoiceNum,
      type: 'purchase',
      vendorName: vendorName.trim() || 'مورد غير محدد',
      customerName: vendorName.trim() || 'مورد غير محدد', // backward compat
      vendorPhone: vendorPhone.trim(),
      paymentType,
      items: items.map(i => ({
        productId: i.productId,
        name: i.name,
        unit: i.unit,
        cost_price: Number(i.price) || 0,  // STRICTLY cost_price
        price: Number(i.price) || 0,
        qty: Number(i.qty) || 0
      })),
      total,
      totalUnits,
      amountPaid: effectivePaid,
      remainingBalance,
      recordInJournal,
      notes: notes.trim(),
      deductedFromStock: true,  // adds to stock
      createdAt: new Date().toISOString(),
    };

    if (onProcessInvoice) onProcessInvoice(newInvoice);
    printInvoiceContent(newInvoice);
    setSuccessToast(`✅ تم حفظ وإصدار فاتورة الشراء (${newInvoice.invoiceNumber}) وإضافة الكميات للمخزون!`);
    setTimeout(() => setSuccessToast(''), 4000);
    handleReset();
  };

  const handleReset = () => {
    setItems([]);
    setVendorName('');
    setVendorPhone('');
    setPaymentType('cash');
    setAmountPaid('');
    setNotes('');
    setSearch('');
  };

  const executeDelete = (restoreStock) => {
    if (!deleteConfirm) return;
    if (onDeleteInvoice) onDeleteInvoice(deleteConfirm.id, restoreStock);
    sounds.playSuccess();
    setSuccessToast(restoreStock ? '✅ تم حذف الفاتورة وخصم الكميات من المخزن' : '✅ تم حذف سجل الفاتورة فقط');
    setTimeout(() => setSuccessToast(''), 4000);
    setDeleteConfirm(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-sm animate-fade-in no-print overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 my-auto flex flex-col max-h-[95vh] overflow-hidden">

        {/* Header - Emerald Green for Purchases */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-emerald-700 via-teal-800 to-slate-900 text-white rounded-t-3xl shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center shadow-inner">
              <Package className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black">📦 فاتورة مشتريات وتوريد</h2>
              <p className="text-xs text-emerald-300">يستخدم سعر التكلفة فقط — يضيف للمخزون</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onOpenPdfImport && (
              <button onClick={() => { onClose(); setTimeout(() => onOpenPdfImport(), 100); }}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200 text-xs font-bold transition-colors flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5" />
                استيراد PDF
              </button>
            )}
            <button onClick={onClose} className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 px-4 pt-2 gap-2 shrink-0 overflow-x-auto scrollbar-none">
          {[
            { key: 'create', icon: Plus, label: 'إنشاء فاتورة شراء', count: items.length > 0 ? items.length : null },
            { key: 'history', icon: History, label: 'سجل المشتريات', count: purchaseInvoices.length },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl font-bold text-xs sm:text-sm border-t-2 transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 border-emerald-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 border-transparent'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-black ${
                  activeTab === tab.key
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}>{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Toast */}
        {successToast && (
          <div className="bg-emerald-50 dark:bg-emerald-950/80 border-b border-emerald-200 px-4 py-2.5 text-xs sm:text-sm text-emerald-800 dark:text-emerald-200 font-bold flex items-center gap-2 animate-fade-in shrink-0">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successToast}</span>
          </div>
        )}

        {/* ── TAB: CREATE ── */}
        {activeTab === 'create' && (
          <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-4">

            {/* Cost mode notice */}
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-300">
              <DollarSign className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>هذه الفاتورة تستخدم <strong>سعر التكلفة (cost_price)</strong> فقط — لا تتأثر بأسعار البيع. الكميات ستُضاف للمخزون.</span>
            </div>

            {/* Vendor Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">اسم المورد / الشركة المورّدة</label>
                <div className="relative">
                  <Building2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" value={vendorName} onChange={e => setVendorName(e.target.value)}
                    placeholder="اسم المورد أو الشركة..."
                    className="w-full pr-9 pl-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">هاتف المورد (اختياري)</label>
                <input type="tel" value={vendorPhone} onChange={e => setVendorPhone(e.target.value)} placeholder="010xxxxxxxx"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Product Search */}
            <div className="relative">
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">🔍 ابحث عن صنف — سعر التكلفة</label>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="ابحث باسم المنتج لإضافة توريد..."
                  className="w-full pr-9 pl-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              {search && filteredProducts.length > 0 && (
                <div className="absolute z-20 top-full left-0 right-0 mt-1 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
                  {filteredProducts.map(p => (
                    <button key={p.id} type="button" onClick={() => addItem(p)}
                      className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-emerald-50 dark:hover:bg-slate-800 text-sm border-b border-slate-100 dark:border-slate-800 last:border-0 transition-colors text-right">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">{p.emoji || '🧊'}</span>
                        <div>
                          <div className="font-bold text-slate-800 dark:text-white">{p.name || 'صنف'}</div>
                          <div className="text-[11px] text-slate-500">
                            رصيد المخزن الحالي: <strong className="text-teal-600">{p.currentStock || 0} {p.unit || ''}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {Number(p.cost_price) > 0 ? (
                          <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-1 rounded-lg">
                            📦 تكلفة: {Number(p.cost_price).toFixed(2)} ج
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-1 rounded-lg">
                            ⚠️ لا يوجد سعر تكلفة
                          </span>
                        )}
                        <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                          <Plus className="w-4 h-4" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* PDF Import Hint */}
            {onOpenPdfImport && (
              <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/40 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-800 dark:text-teal-300">
                  <FileText className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>عندك فاتورة PDF من المورد؟ استخدم الاستيراد الذكي لاستخراج الأسعار تلقائياً!</span>
                </div>
                <button onClick={() => { onClose(); setTimeout(() => onOpenPdfImport(), 100); }}
                  className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1">
                  <Upload className="w-3 h-3" /> استيراد PDF
                </button>
              </div>
            )}

            {/* Items Table */}
            {items.length === 0 ? (
              <div className="py-10 text-center text-slate-400 text-sm border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                <Package className="w-12 h-12 mx-auto mb-2 opacity-30 text-emerald-500" />
                <p className="font-bold text-slate-600 dark:text-slate-400">قائمة التوريد فارغة</p>
                <p className="text-xs text-slate-400 mt-1">ابحث عن الأصناف لإضافتها — الكميات ستُضاف للمخزون</p>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-950 text-xs text-slate-600 dark:text-slate-400 font-bold">
                    <tr>
                      <th className="text-right px-3 py-2.5">الصنف</th>
                      <th className="text-center px-2 py-2.5 w-36">الكمية الواردة</th>
                      <th className="text-center px-2 py-2.5 w-28">سعر التكلفة (ج)</th>
                      <th className="text-center px-2 py-2.5 w-28">الإجمالي</th>
                      <th className="w-8"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                    {items.map(item => (
                      <tr key={item.productId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                        <td className="px-3 py-2.5">
                          <div className="font-bold text-slate-800 dark:text-white">{item.name}</div>
                          <div className="text-[11px] text-slate-500">
                            مخزن حالي: <span className="text-teal-600 font-bold">{item.currentStock} {item.unit}</span>
                            <span className="text-emerald-600 mr-2">← بعد الإضافة: {item.currentStock + item.qty}</span>
                          </div>
                        </td>
                        <td className="px-2 py-2.5">
                          <div className="flex items-center justify-center gap-1">
                            <button onClick={() => updateQty(item.productId, -1)} className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-950/60 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors">
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <input type="number" min="1" value={item.qty}
                              onChange={e => setQtyDirect(item.productId, e.target.value)}
                              className="w-14 text-center text-sm font-black bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-1.5 py-1 outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                            <button onClick={() => updateQty(item.productId, 1)} className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-950/60 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors">
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                        <td className="px-2 py-2.5">
                          <input type="number" min="0" step="0.5" value={item.price}
                            onChange={e => updatePrice(item.productId, e.target.value)}
                            className="w-full text-center text-sm font-black bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/60 rounded-lg px-2 py-1.5 outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </td>
                        <td className="px-2 py-2.5 text-center font-black text-slate-900 dark:text-white">
                          {(item.qty * item.price).toFixed(2)} ج
                        </td>
                        <td className="px-1">
                          <button onClick={() => removeItem(item.productId)} className="w-7 h-7 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center justify-center transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Payment Summary */}
            {items.length > 0 && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">طريقة دفع المورد</label>
                    <select value={paymentType} onChange={e => setPaymentType(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm font-bold outline-none">
                      <option value="cash">💵 نقدي</option>
                      <option value="credit">📄 آجل / ائتمان</option>
                      <option value="transfer">🏦 تحويل بنكي</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">المبلغ المدفوع للمورد</label>
                    <input type="number" min="0" step="0.5" value={amountPaid}
                      onChange={e => setAmountPaid(e.target.value)}
                      placeholder={`الإجمالي: ${total.toFixed(2)} ج`}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">ملاحظات</label>
                    <input type="text" value={notes} onChange={e => setNotes(e.target.value)} placeholder="رقم أمر الشراء / ملاحظات..."
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-2">
                  <div className="flex items-center justify-between text-sm font-bold text-slate-700 dark:text-slate-300">
                    <span>إجمالي المشتريات (بالتكلفة):</span>
                    <span className="text-xl font-black text-emerald-700 dark:text-emerald-400">{total.toFixed(2)} ج</span>
                  </div>
                  {amountPaid !== '' && (
                    <>
                      <div className="flex items-center justify-between text-sm font-bold text-sky-700 dark:text-sky-400">
                        <span>المدفوع للمورد:</span><span>{effectivePaid.toFixed(2)} ج</span>
                      </div>
                      {remainingBalance > 0 && (
                        <div className="flex items-center justify-between text-sm font-bold text-amber-700 dark:text-amber-400">
                          <span>المتبقي للمورد (دين شراء):</span><span>{remainingBalance.toFixed(2)} ج</span>
                        </div>
                      )}
                    </>
                  )}
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-emerald-200 dark:border-emerald-900/40">
                    <span>إجمالي الوحدات الواردة:</span>
                    <span className="font-bold">{totalUnits} وحدة</span>
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={recordInJournal} onChange={e => setRecordInJournal(e.target.checked)}
                    className="w-4 h-4 rounded accent-emerald-600" />
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">تسجيل المدفوع للمورد في دفتر اليومية (مصروف)</span>
                </label>

                <div className="flex items-center gap-3">
                  <button onClick={handlePrintDraft}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />طباعة مسودة
                  </button>
                  <button onClick={handleReset}
                    className="px-4 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />مسح الكل
                  </button>
                  <button onClick={handleConfirmAndProcess}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-black shadow-md active:scale-95 transition-all flex items-center justify-center gap-2">
                    <Truck className="w-5 h-5" />
                    تأكيد توريد وإصدار فاتورة الشراء
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── TAB: PURCHASE HISTORY ── */}
        {activeTab === 'history' && (
          <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" value={historySearch} onChange={e => setHistorySearch(e.target.value)}
                placeholder="بحث في سجل المشتريات..."
                className="w-full pr-9 pl-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            {filteredPurchaseInvoices.length === 0 ? (
              <div className="py-16 text-center text-slate-400">
                <History className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p className="font-bold text-slate-500">لا توجد فواتير شراء مسجلة</p>
                <p className="text-xs mt-1">سيتم عرض فواتير المشتريات هنا</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredPurchaseInvoices.slice().sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)).map(inv => {
                  const vendor = inv.vendorName || inv.customerName || 'مورد';
                  return (
                    <div key={inv.id} className="p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-black text-slate-900 dark:text-white text-sm">📦 {inv.invoiceNumber || 'بلا رقم'}</span>
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">مشتريات</span>
                          </div>
                          <div className="text-xs text-slate-500 mt-1 flex flex-wrap gap-2">
                            <span>المورد: <strong>{vendor}</strong></span>
                            <span>التاريخ: {formatArabicDateTime(inv.createdAt)}</span>
                          </div>
                          {Array.isArray(inv.items) && (
                            <div className="text-[11px] text-teal-700 dark:text-teal-400 mt-1">
                              {inv.items.length} صنف • {(inv.totalUnits || inv.items.reduce((s, x) => s + (x.qty || 0), 0))} وحدة
                            </div>
                          )}
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-lg font-black text-emerald-700 dark:text-emerald-400">{Number(inv.total || 0).toFixed(2)} ج</div>
                          <div className="text-[11px] text-slate-500">تكلفة إجمالية</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => printInvoiceContent(inv)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors">
                          🖨️ طباعة
                        </button>
                        {isAdmin && (
                          <button onClick={() => setDeleteConfirm(inv)}
                            className="px-3 py-1.5 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-600 dark:text-rose-400 rounded-lg text-xs font-bold border border-rose-200 dark:border-rose-900 transition-colors">
                            <Trash2 className="w-3 h-3 inline mr-1" />حذف
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Delete Confirm Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-rose-200 dark:border-rose-900 p-6 max-w-md w-full">
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">حذف فاتورة الشراء؟</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">فاتورة رقم: <strong>{deleteConfirm.invoiceNumber}</strong></p>
              <div className="flex flex-col gap-2">
                <button onClick={() => executeDelete(true)} className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-black text-sm transition-colors">
                  🔄 حذف وخصم الكميات من المخزون
                </button>
                <button onClick={() => executeDelete(false)} className="w-full py-2.5 border border-rose-300 text-rose-600 rounded-xl font-black text-sm hover:bg-rose-50 transition-colors">
                  📋 حذف السجل فقط
                </button>
                <button onClick={() => setDeleteConfirm(null)} className="w-full py-2.5 border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors">
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
