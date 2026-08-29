import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  Receipt,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Search,
  History,
  User,
  Users,
  Phone,
  ShoppingBag,
  DollarSign,
  Pencil,
  Clock,
  RotateCcw
} from 'lucide-react';
import { formatArabicDateTime } from '../utils/storage';
import { generateInvoiceNumber } from '../utils/transactions';
import { sounds } from '../utils/sound';
import VoiceInvoiceButton from './VoiceInvoiceButton';

// ─── SALES INVOICE MODAL ─────────────────────────────────────────────────────
// This component is STRICTLY for Sales Invoices (فاتورة مبيعات).
// It ONLY reads product.selling_price. It NEVER touches cost_price.
// ─────────────────────────────────────────────────────────────────────────────

export default function SalesInvoiceModal({
  isOpen,
  products = [],
  invoices = [],
  customers = [],
  isAdmin = false,
  invoiceToEdit = null,
  onClose,
  onProcessInvoice,
  onDeleteInvoice,
  onEditInvoice,
  onOpenAdminModal,
  onSettleCustomerDebt,
}) {
  const safeProducts = Array.isArray(products) ? products : [];
  const safeInvoices = Array.isArray(invoices) ? invoices : [];
  const safeCustomers = Array.isArray(customers) ? customers : [];

  // SALES invoices only in history
  const salesInvoices = useMemo(
    () => safeInvoices.filter(inv => (inv.type || 'sales') === 'sales'),
    [safeInvoices]
  );

  const [activeTab, setActiveTab] = useState('create'); // 'create' | 'history' | 'customers'
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [items, setItems] = useState([]);
  const [paymentType, setPaymentType] = useState('cash');
  const [amountPaid, setAmountPaid] = useState('');
  const [recordInJournal, setRecordInJournal] = useState(true);
  const [notes, setNotes] = useState('');
  const [search, setSearch] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [historySearch, setHistorySearch] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [settleModal, setSettleModal] = useState(null);
  const [settleAmount, setSettleAmount] = useState('');
  const [successToast, setSuccessToast] = useState('');

  useEffect(() => {
    if (invoiceToEdit) {
      setIsEditMode(true);
      setActiveTab('create');
      setCustomerName(invoiceToEdit.customerName || '');
      setCustomerPhone(invoiceToEdit.customerPhone || '');
      setPaymentType(invoiceToEdit.paymentType || 'cash');
      setAmountPaid(invoiceToEdit.amountPaid !== undefined ? String(invoiceToEdit.amountPaid) : '');
      setNotes(invoiceToEdit.notes || '');
      setItems((invoiceToEdit.items || []).map(it => {
        const prod = safeProducts.find(pr => pr.id === it.productId);
        return {
          productId: it.productId,
          name: it.name,
          unit: it.unit,
          selling_price: Number(it.price) || Number(prod?.selling_price ?? prod?.price ?? 0),
          price: Number(it.price) || Number(prod?.selling_price ?? prod?.price ?? 0),
          qty: Number(it.qty) || 1,
          availableStock: prod ? Number(prod.currentStock) : 0,
        };
      }));
      setRecordInJournal(false);
    } else {
      setIsEditMode(false);
    }
  }, [invoiceToEdit]);

  const matchedCustomer = useMemo(() => {
    if (!customerName?.trim()) return null;
    const clean = customerName.trim().toLowerCase();
    return safeCustomers.find(c => String(c?.name || '').trim().toLowerCase() === clean) || null;
  }, [customerName, safeCustomers]);

  const customerDebt = Number(matchedCustomer?.totalDebt) || 0;

  const customerSuggestions = useMemo(() => {
    if (!customerName.trim()) return safeCustomers.slice(0, 6);
    const q = customerName.trim().toLowerCase();
    return safeCustomers.filter(c =>
      String(c?.name || '').toLowerCase().includes(q) ||
      (c?.phone && String(c.phone).includes(q))
    ).slice(0, 6);
  }, [customerName, safeCustomers]);

  // ── STRICTLY reads selling_price ──────────────────────────────────────────
  const addItem = (product) => {
    if (!product) return;
    sounds.playClick();
    const selling_price = Number(product.selling_price ?? product.price ?? 0);
    const existing = items.find(i => i.productId === product.id);
    if (existing) {
      setItems(items.map(i => i.productId === product.id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setItems([...items, {
        productId: product.id,
        name: `${product.emoji || ''} ${product.name || 'صنف'}`,
        unit: product.unit || 'وحدة',
        selling_price,           // from selling_price ONLY
        price: selling_price,    // invoice line price = selling_price
        qty: 1,
        availableStock: Number(product.currentStock) || 0,
      }]);
    }
    setSearch('');
  };

  const handleVoiceAddItems = (voiceItems) => {
    if (!Array.isArray(voiceItems) || voiceItems.length === 0) return;
    voiceItems.forEach(({ product, qty }) => {
      if (!product) return;
      const targetQty = Math.max(0.25, Number(qty) || 1);
      const selling_price = Number(product.selling_price ?? product.price ?? 0);
      setItems(prev => {
        const existing = prev.find(i => i.productId === product.id);
        if (existing) {
          return prev.map(i => i.productId === product.id ? { ...i, qty: i.qty + targetQty } : i);
        }
        return [...prev, {
          productId: product.id,
          name: `${product.emoji || ''} ${product.name || 'صنف'}`,
          unit: product.unit || 'وحدة',
          selling_price,
          price: selling_price,
          qty: targetQty,
          availableStock: Number(product.currentStock) || 0,
        }];
      });
    });
    sounds.playSuccess?.();
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
  const effectivePaid = amountPaid === '' ? (paymentType === 'credit' ? 0 : total) : Number(amountPaid) || 0;
  const remainingBalance = Math.max(0, total - effectivePaid);
  const projectedDebt = customerDebt + remainingBalance;

  const stockWarnings = items.filter(i => {
    const prod = safeProducts.find(p => p.id === i.productId);
    const currentStock = prod ? Number(prod.currentStock) : i.availableStock;
    return i.qty > currentStock;
  });

  const filteredProducts = safeProducts.filter(p => {
    if (!p) return false;
    const q = search.toLowerCase();
    return (
      String(p.name || '').toLowerCase().includes(q) ||
      (p.emoji && String(p.emoji).includes(q)) ||
      (p.freezerLocation && String(p.freezerLocation).toLowerCase().includes(q))
    );
  }).slice(0, 8);

  const filteredSalesInvoices = salesInvoices.filter(inv => {
    if (!inv) return false;
    const q = historySearch.trim().toLowerCase();
    if (!q) return true;
    return (
      String(inv.invoiceNumber || '').toLowerCase().includes(q) ||
      String(inv.customerName || '').toLowerCase().includes(q) ||
      String(inv.notes || '').toLowerCase().includes(q)
    );
  });

  const filteredCustomers = safeCustomers.filter(c => {
    if (!c) return false;
    const q = customerSearch.trim().toLowerCase();
    if (!q) return true;
    return String(c.name || '').toLowerCase().includes(q) || (c.phone && String(c.phone).includes(q));
  });

  if (!isOpen) return null;

  const printInvoiceContent = (inv) => {
    const win = window.open('', '_blank');
    if (!win) { window.print(); return; }
    const invItems = Array.isArray(inv.items) ? inv.items : [];
    const invTotal = Number(inv.total) || invItems.reduce((s, x) => s + (x.qty * x.price), 0);
    const invPaid = inv.amountPaid !== undefined ? Number(inv.amountPaid) : invTotal;
    const invRemaining = inv.remainingBalance !== undefined ? Number(inv.remainingBalance) : 0;
    const invDate = inv.createdAt ? formatArabicDateTime(inv.createdAt) : formatArabicDateTime(new Date().toISOString());

    win.document.write(`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8">
<title>فاتورة مبيعات ${inv.invoiceNumber || ''} - صِوار SWAR</title>
<style>@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}body{font-family:'Cairo',sans-serif;direction:rtl;padding:30px;color:#1e293b;background:white;}
.header{text-align:center;margin-bottom:20px;border-bottom:3px solid #0284c7;padding-bottom:16px;}
.header h1{font-size:26px;font-weight:900;color:#0369a1;}.header .sub{font-size:13px;color:#64748b;margin-top:2px;}
.badge{display:inline-block;padding:3px 10px;border-radius:6px;font-size:11px;font-weight:bold;background:#e0f2fe;color:#0369a1;}
.meta{display:flex;justify-content:space-between;margin-bottom:20px;font-size:13px;color:#475569;background:#f8fafc;padding:14px 16px;border-radius:10px;border:1px solid #e2e8f0;}
table{width:100%;border-collapse:collapse;margin-bottom:20px;font-size:14px;}
thead tr{background:#0284c7;color:white;}th,td{padding:10px 12px;text-align:right;border-bottom:1px solid #e2e8f0;}
tfoot tr{font-weight:900;background:#f1f5f9;}.total-row td{color:#0f172a;font-size:17px;}.paid-row td{color:#16a34a;}.rem-row td{color:#dc2626;}
.footer{text-align:center;font-size:11px;color:#94a3b8;margin-top:30px;border-top:1px solid #e2e8f0;padding-top:15px;}
@media print{body{padding:15px;}}</style></head><body>
<div class="header"><h1>🧊 منظومة صِـوار (SWAR)</h1><div class="sub">إدارة المخزون والمبيعات</div></div>
<div class="meta"><div>
<div><strong>نوع الفاتورة:</strong> <span class="badge">🛒 فاتورة مبيعات</span></div>
<div><strong>رقم الفاتورة:</strong> ${inv.invoiceNumber || 'مسودة'}</div>
<div><strong>العميل:</strong> ${inv.customerName || 'نقدي'}</div>
${inv.customerPhone ? `<div><strong>الهاتف:</strong> ${inv.customerPhone}</div>` : ''}
</div><div style="text-align:left;">
<div><strong>التاريخ:</strong> ${invDate}</div>
<div><strong>طريقة الدفع:</strong> ${inv.paymentType === 'credit' ? 'آجل' : inv.paymentType === 'transfer' ? 'تحويل' : 'نقدي'}</div>
<div><strong>حالة المخزن:</strong> ${inv.deductedFromStock ? '✅ تم الخصم من المخزن' : '📄 مسودة'}</div>
</div></div>
<table><thead><tr><th>#</th><th>الصنف</th><th>الوحدة</th><th>الكمية</th><th>سعر البيع (ج)</th><th>الإجمالي</th></tr></thead>
<tbody>${invItems.map((item, idx) => `<tr>
<td>${idx + 1}</td><td>${item.name || '-'}</td><td>${item.unit || '-'}</td>
<td><strong>${item.qty || 0}</strong></td>
<td>${Number(item.price || 0).toFixed(2)} ج</td>
<td>${(Number(item.qty || 0) * Number(item.price || 0)).toFixed(2)} ج</td>
</tr>`).join('')}</tbody>
<tfoot>
<tr class="total-row"><td colspan="5">💰 إجمالي فاتورة المبيعات:</td><td>${invTotal.toFixed(2)} جنيه</td></tr>
<tr class="paid-row"><td colspan="5">💵 المبلغ المدفوع:</td><td>${invPaid.toFixed(2)} جنيه</td></tr>
${invRemaining > 0 ? `<tr class="rem-row"><td colspan="5">⚠️ المتبقي (آجل / مديونية):</td><td>${invRemaining.toFixed(2)} جنيه</td></tr>` : ''}
</tfoot></table>
${inv.notes ? `<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px;font-size:13px;color:#475569;margin-bottom:16px;">📝 <strong>ملاحظات:</strong> ${inv.notes}</div>` : ''}
<div class="footer">تم الإصدار عبر منظومة صِـوار SWAR • Developed By Ahmed Swar & Zyad Elleathy</div>
<script>window.onload = function() { window.print(); }</script></body></html>`);
    win.document.close();
  };

  const handlePrintDraft = () => {
    if (items.length === 0) return;
    printInvoiceContent({
      invoiceNumber: 'INV-DRAFT-' + Date.now().toString().slice(-4),
      type: 'sales',
      customerName, customerPhone, paymentType,
      items,
      total,
      amountPaid: effectivePaid,
      remainingBalance,
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
    if (stockWarnings.length > 0) {
      const names = stockWarnings.map(i => i.name).join('، ');
      if (!window.confirm(`تنبيه: الكميات المطلوبة للأصناف التالية (${names}) تتجاوز المتوفر بالمخزن. هل ترغب في المتابعة؟`)) return;
    }

    const invoiceNum = generateInvoiceNumber('sales', safeInvoices);
    const newInvoice = {
      id: 'inv-sales-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      invoiceNumber: invoiceNum,
      type: 'sales',
      customerName: customerName.trim() || 'عميل نقدي',
      customerPhone: customerPhone.trim(),
      paymentType,
      items: items.map(i => ({
        productId: i.productId,
        name: i.name,
        unit: i.unit,
        price: Number(i.price) || 0,      // selling_price
        qty: Number(i.qty) || 0
      })),
      total,
      totalUnits,
      amountPaid: effectivePaid,
      remainingBalance,
      recordInJournal,
      notes: notes.trim(),
      deductedFromStock: true,
      createdAt: new Date().toISOString(),
    };

    if (onProcessInvoice) onProcessInvoice(newInvoice);
    printInvoiceContent(newInvoice);
    setSuccessToast(`✅ تم حفظ وإصدار فاتورة المبيعات (${newInvoice.invoiceNumber}) وتحديث المخزون!`);
    setTimeout(() => setSuccessToast(''), 4000);
    handleReset();
  };

  const handleReset = () => {
    setItems([]);
    setCustomerName('');
    setCustomerPhone('');
    setPaymentType('cash');
    setAmountPaid('');
    setNotes('');
    setSearch('');
    setIsEditMode(false);
  };

  const executeDelete = (restoreStock) => {
    if (!deleteConfirm) return;
    if (onDeleteInvoice) onDeleteInvoice(deleteConfirm.id, restoreStock);
    sounds.playSuccess();
    setSuccessToast(restoreStock ? '✅ تم حذف الفاتورة وتعديل كميات المخزون وحساب العميل' : '✅ تم حذف سجل الفاتورة');
    setTimeout(() => setSuccessToast(''), 4000);
    setDeleteConfirm(null);
  };

  const handleSettleSubmit = (e) => {
    e.preventDefault();
    if (!settleModal) return;
    const num = Number(settleAmount);
    if (!num || num <= 0) return;
    if (onSettleCustomerDebt) onSettleCustomerDebt(settleModal.name, num);
    sounds.playSuccess();
    setSuccessToast(`✅ تم تسجيل سداد دفعة ${num} ج من حساب العميل ${settleModal.name}`);
    setTimeout(() => setSuccessToast(''), 4000);
    setSettleModal(null);
    setSettleAmount('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-sm animate-fade-in no-print overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 my-auto flex flex-col max-h-[95vh] overflow-hidden">

        {/* Header - Sky Blue for Sales */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-sky-700 via-indigo-800 to-slate-900 text-white rounded-t-3xl shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center shadow-inner">
              <ShoppingBag className="w-5 h-5 text-sky-200" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black">🛒 فاتورة مبيعات</h2>
              <p className="text-xs text-sky-300">يستخدم سعر البيع فقط — يخصم من المخزون</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 px-4 pt-2 gap-2 shrink-0 overflow-x-auto scrollbar-none">
          {[
            { key: 'create', icon: Plus, label: 'إنشاء فاتورة مبيعات', count: items.length > 0 ? items.length : null },
            { key: 'history', icon: History, label: 'سجل المبيعات', count: salesInvoices.length },
            { key: 'customers', icon: Users, label: 'حسابات العملاء', count: safeCustomers.length },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl font-bold text-xs sm:text-sm border-t-2 transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 border-sky-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 border-transparent'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-black ${
                  activeTab === tab.key
                    ? 'bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300'
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

            {isEditMode && (
              <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border-2 border-amber-400 text-amber-900 dark:text-amber-200 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-black">
                  <Pencil className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>وضع التعديل — عدّل بيانات الفاتورة وسيتم استرجاع المخزون القديم وإعادة احتسابه.</span>
                </div>
                <button onClick={() => { handleReset(); if (onClose) onClose(); }}
                  className="px-3 py-1 bg-amber-600 text-white rounded-lg font-bold text-[11px] hover:bg-amber-500 shrink-0">إلغاء</button>
              </div>
            )}

            {/* Cost mode notice */}
            <div className="p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 flex items-center gap-2 text-xs font-bold text-sky-900 dark:text-sky-300">
              <DollarSign className="w-4 h-4 text-sky-600 shrink-0" />
              <span>هذه الفاتورة تستخدم <strong>سعر البيع (selling_price)</strong> فقط — لا تتأثر بأسعار التكلفة.</span>
            </div>

            {/* Customer Debt Alert */}
            {customerDebt > 0 && (
              <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border-2 border-amber-400 text-amber-900 dark:text-amber-200 flex items-center justify-between gap-2 shadow-sm">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-black">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>تنبيه مديونية: العميل ({matchedCustomer?.name || customerName}) عليه رصيد مستحق:</span>
                </div>
                <div className="text-base font-black text-amber-700 dark:text-amber-400 px-3 py-1 bg-white dark:bg-slate-900 rounded-xl border border-amber-300 shrink-0">
                  {customerDebt.toFixed(2)} ج
                </div>
              </div>
            )}

            {/* Customer Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2 relative">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">اسم العميل / الجهة</label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" value={customerName}
                    onFocus={() => setShowCustomerDropdown(true)}
                    onChange={e => { setCustomerName(e.target.value); setShowCustomerDropdown(true); }}
                    placeholder="ابحث أو اكتب اسم العميل..."
                    className="w-full pr-9 pl-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm font-bold outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                {showCustomerDropdown && customerSuggestions.length > 0 && (
                  <div className="absolute z-30 top-full left-0 right-0 mt-1 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">
                    {customerSuggestions.map(cust => (
                      <button key={cust.id} type="button"
                        onClick={() => { setCustomerName(cust.name || ''); if (cust.phone) setCustomerPhone(cust.phone); setShowCustomerDropdown(false); }}
                        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-sky-50 dark:hover:bg-slate-800 text-sm border-b border-slate-100 dark:border-slate-800 last:border-0 transition-colors text-right">
                        <div>
                          <span className="font-black text-slate-900 dark:text-white">{cust.name || 'عميل'}</span>
                          {cust.phone && <span className="text-xs text-slate-400 mr-2">({cust.phone})</span>}
                        </div>
                        {Number(cust.totalDebt) > 0 && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                            مديونية: {cust.totalDebt} ج
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">رقم الهاتف (اختياري)</label>
                <div className="relative">
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="tel" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} placeholder="010xxxxxxxx"
                    className="w-full pr-9 pl-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            </div>

            {/* Product Search */}
            <div className="relative">
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">🔍 ابحث عن صنف — سعر البيع</label>
                <VoiceInvoiceButton products={safeProducts} onAddItems={handleVoiceAddItems} />
              </div>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="ابحث باسم المنتج أو مكان الفريزر..."
                  className="w-full pr-9 pl-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              {search && filteredProducts.length > 0 && (
                <div className="absolute z-20 top-full left-0 right-0 mt-1 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
                  {filteredProducts.map(p => (
                    <button key={p.id} type="button" onClick={() => addItem(p)}
                      className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-sky-50 dark:hover:bg-slate-800 text-sm border-b border-slate-100 dark:border-slate-800 last:border-0 transition-colors text-right">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">{p.emoji || '🧊'}</span>
                        <div>
                          <div className="font-bold text-slate-800 dark:text-white">{p.name || 'صنف'}</div>
                          <div className="text-[11px] text-slate-500">
                            رصيد المخزن: <strong className="text-sky-600">{p.currentStock || 0} {p.unit || ''}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-1 rounded-lg">
                          💰 {Number(p.selling_price ?? p.price ?? 0).toFixed(2)} ج
                        </span>
                        <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center">
                          <Plus className="w-4 h-4" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Items Table */}
            {items.length === 0 ? (
              <div className="py-10 text-center text-slate-400 text-sm border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                <ShoppingBag className="w-12 h-12 mx-auto mb-2 opacity-30 text-sky-500" />
                <p className="font-bold text-slate-600 dark:text-slate-400">الفاتورة فارغة حالياً</p>
                <p className="text-xs text-slate-400 mt-1">ابحث عن الأصناف لإضافتها — سيتم خصمها من المخزون</p>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-950 text-xs text-slate-600 dark:text-slate-400 font-bold">
                    <tr>
                      <th className="text-right px-3 py-2.5">الصنف</th>
                      <th className="text-center px-2 py-2.5 w-36">الكمية</th>
                      <th className="text-center px-2 py-2.5 w-28">سعر البيع (ج)</th>
                      <th className="text-center px-2 py-2.5 w-28">الإجمالي</th>
                      <th className="w-8"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                    {items.map(item => {
                      const prod = safeProducts.find(p => p.id === item.productId);
                      const currentStock = prod ? Number(prod.currentStock) : item.availableStock;
                      const isOverStock = item.qty > currentStock;
                      return (
                        <tr key={item.productId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                          <td className="px-3 py-2.5">
                            <div className="font-bold text-slate-800 dark:text-white">{item.name}</div>
                            <div className="text-[11px] text-slate-500">
                              رصيد المخزن: <span className={isOverStock ? 'text-rose-600 font-bold' : 'text-slate-600 dark:text-slate-400'}>{currentStock} {item.unit}</span>
                            </div>
                          </td>
                          <td className="px-2 py-2.5">
                            <div className="flex items-center justify-center gap-1">
                              <button onClick={() => updateQty(item.productId, -1)} className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-950/60 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors">
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <input type="number" min="1" value={item.qty}
                                onChange={e => setQtyDirect(item.productId, e.target.value)}
                                className="w-14 text-center text-sm font-black bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-1.5 py-1 outline-none focus:ring-2 focus:ring-sky-500"
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
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Payment Summary */}
            {items.length > 0 && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">طريقة الدفع</label>
                    <select value={paymentType} onChange={e => setPaymentType(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm font-bold outline-none">
                      <option value="cash">💵 نقدي</option>
                      <option value="credit">📄 آجل / دين</option>
                      <option value="transfer">🏦 تحويل بنكي</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">المبلغ المدفوع (اختياري)</label>
                    <input type="number" min="0" step="0.5" value={amountPaid}
                      onChange={e => setAmountPaid(e.target.value)}
                      placeholder={`الإجمالي: ${total.toFixed(2)} ج`}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm font-bold outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">ملاحظات</label>
                    <input type="text" value={notes} onChange={e => setNotes(e.target.value)} placeholder="ملاحظات الفاتورة..."
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 space-y-2">
                  <div className="flex items-center justify-between text-sm font-bold text-slate-700 dark:text-slate-300">
                    <span>إجمالي الفاتورة:</span>
                    <span className="text-xl font-black text-sky-700 dark:text-sky-400">{total.toFixed(2)} ج</span>
                  </div>
                  {amountPaid !== '' && (
                    <>
                      <div className="flex items-center justify-between text-sm font-bold text-emerald-700 dark:text-emerald-400">
                        <span>المدفوع:</span><span>{effectivePaid.toFixed(2)} ج</span>
                      </div>
                      {remainingBalance > 0 && (
                        <div className="flex items-center justify-between text-sm font-bold text-rose-700 dark:text-rose-400">
                          <span>المتبقي (مديونية):</span><span>{remainingBalance.toFixed(2)} ج</span>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={recordInJournal} onChange={e => setRecordInJournal(e.target.checked)}
                    className="w-4 h-4 rounded accent-sky-600" />
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">تسجيل المبلغ المدفوع في دفتر اليومية</span>
                </label>

                {stockWarnings.length > 0 && (
                  <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-900 flex items-center gap-2 text-xs font-bold text-rose-800 dark:text-rose-300">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>تحذير: {stockWarnings.map(i => i.name).join('، ')} — الكمية المطلوبة تتجاوز المخزون المتاح</span>
                  </div>
                )}

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
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-sm font-black shadow-md active:scale-95 transition-all flex items-center justify-center gap-2">
                    <Receipt className="w-5 h-5" />
                    {isEditMode ? 'تحديث وإعادة إصدار الفاتورة' : 'تأكيد وإصدار فاتورة المبيعات'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── TAB: SALES HISTORY ── */}
        {activeTab === 'history' && (
          <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" value={historySearch} onChange={e => setHistorySearch(e.target.value)}
                placeholder="بحث في سجل المبيعات..."
                className="w-full pr-9 pl-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            {filteredSalesInvoices.length === 0 ? (
              <div className="py-16 text-center text-slate-400">
                <History className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p className="font-bold text-slate-500">لا توجد فواتير مبيعات مسجلة</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredSalesInvoices.slice().sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)).map(inv => (
                  <div key={inv.id} className="p-4 rounded-2xl border border-sky-100 dark:border-sky-900/50 bg-sky-50/50 dark:bg-sky-950/20">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-black text-slate-900 dark:text-white text-sm">🛒 {inv.invoiceNumber || 'بلا رقم'}</span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300">مبيعات</span>
                          {Number(inv.remainingBalance) > 0 && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">آجل</span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 mt-1 flex flex-wrap gap-2">
                          <span>العميل: <strong>{inv.customerName || 'نقدي'}</strong></span>
                          <span>التاريخ: {formatArabicDateTime(inv.createdAt)}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-lg font-black text-sky-700 dark:text-sky-400">{Number(inv.total || 0).toFixed(2)} ج</div>
                        {Number(inv.remainingBalance) > 0 && (
                          <div className="text-xs font-bold text-rose-600">آجل: {Number(inv.remainingBalance).toFixed(2)} ج</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => printInvoiceContent(inv)}
                        className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold transition-colors">
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
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TAB: CUSTOMERS ── */}
        {activeTab === 'customers' && (
          <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" value={customerSearch} onChange={e => setCustomerSearch(e.target.value)}
                placeholder="بحث في العملاء..."
                className="w-full pr-9 pl-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            {filteredCustomers.length === 0 ? (
              <div className="py-16 text-center text-slate-400">
                <Users className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p className="font-bold text-slate-500">لا يوجد عملاء مسجلون</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredCustomers.map(cust => (
                  <div key={cust.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="font-black text-slate-900 dark:text-white">{cust.name}</div>
                        {cust.phone && <div className="text-xs text-slate-500">{cust.phone}</div>}
                        <div className="text-xs text-slate-500">فواتير: {cust.invoicesCount || 0}</div>
                      </div>
                      <div className="text-right">
                        {Number(cust.totalDebt) > 0 ? (
                          <div className="text-lg font-black text-rose-600">{Number(cust.totalDebt).toFixed(2)} ج</div>
                        ) : (
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-lg">✅ لا مديونية</span>
                        )}
                        {isAdmin && Number(cust.totalDebt) > 0 && (
                          <button onClick={() => setSettleModal(cust)}
                            className="mt-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors block w-full">
                            💰 تسجيل سداد
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Delete Confirm Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-rose-200 dark:border-rose-900 p-6 max-w-md w-full">
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">حذف فاتورة المبيعات؟</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">فاتورة رقم: <strong>{deleteConfirm.invoiceNumber}</strong> — العميل: {deleteConfirm.customerName}</p>
              <div className="flex flex-col gap-2">
                <button onClick={() => executeDelete(true)} className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-black text-sm transition-colors">
                  🔄 حذف وإعادة كميات المخزون
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

        {/* Settle Modal */}
        {settleModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-emerald-200 dark:border-emerald-900 p-6 max-w-sm w-full">
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">تسجيل سداد دفعة</h3>
              <p className="text-sm text-slate-600 mb-4">العميل: <strong>{settleModal.name}</strong> | المديونية: {Number(settleModal.totalDebt || 0).toFixed(2)} ج</p>
              <form onSubmit={handleSettleSubmit} className="space-y-3">
                <input type="number" min="1" required value={settleAmount} onChange={e => setSettleAmount(e.target.value)}
                  placeholder="المبلغ المسدد بالجنيه..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-emerald-200 dark:border-emerald-900/60 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <div className="flex gap-2">
                  <button type="submit" className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-sm transition-colors">✅ تأكيد السداد</button>
                  <button type="button" onClick={() => setSettleModal(null)} className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors">إلغاء</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
