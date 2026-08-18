import React, { useState, useRef } from 'react';
import { 
  X, 
  Receipt, 
  Plus, 
  Minus, 
  Trash2, 
  Printer, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Search, 
  History, 
  FileText,
  User,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { formatArabicDateTime } from '../utils/storage';
import { sounds } from '../utils/sound';

export default function InvoiceModal({ 
  isOpen, 
  products, 
  invoices = [], 
  isAdmin = false,
  onClose, 
  onProcessInvoice,
  onDeleteInvoice,
  onOpenAdminModal
}) {
  const [activeTab, setActiveTab] = useState('create'); // 'create' | 'history'
  const [items, setItems] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [paymentType, setPaymentType] = useState('cash'); // 'cash' | 'credit' | 'transfer'
  const [notes, setNotes] = useState('');
  const [search, setSearch] = useState('');
  const [historySearch, setHistorySearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null); // invoice object to delete
  const [successToast, setSuccessToast] = useState('');

  if (!isOpen) return null;

  const addItem = (product) => {
    sounds.playClick();
    const existing = items.find(i => i.productId === product.id);
    if (existing) {
      setItems(items.map(i => i.productId === product.id
        ? { ...i, qty: i.qty + 1 }
        : i
      ));
    } else {
      setItems([...items, {
        productId: product.id,
        name: `${product.emoji || ''} ${product.name}`,
        unit: product.unit || 'وحدة',
        price: Number(product.price) || 0,
        qty: 1,
        availableStock: Number(product.currentStock) || 0,
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

  // Check if any item exceeds available inventory
  const stockWarnings = items.filter(i => {
    const prod = products.find(p => p.id === i.productId);
    const currentStock = prod ? Number(prod.currentStock) : i.availableStock;
    return i.qty > currentStock;
  });

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.emoji && p.emoji.includes(search)) ||
    (p.freezerLocation && p.freezerLocation.toLowerCase().includes(search.toLowerCase()))
  ).slice(0, 8);

  const filteredInvoices = invoices.filter(inv => {
    const q = historySearch.trim().toLowerCase();
    if (!q) return true;
    return (
      (inv.invoiceNumber && inv.invoiceNumber.toLowerCase().includes(q)) ||
      (inv.customerName && inv.customerName.toLowerCase().includes(q)) ||
      (inv.notes && inv.notes.toLowerCase().includes(q))
    );
  });

  const printInvoiceContent = (inv) => {
    const win = window.open('', '_blank');
    const invItems = inv.items || [];
    const invTotal = inv.total || invItems.reduce((s, x) => s + (x.qty * x.price), 0);
    const invDate = inv.createdAt ? formatArabicDateTime(inv.createdAt) : formatArabicDateTime(new Date().toISOString());

    win.document.write(`
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <title>فاتورة ${inv.invoiceNumber || ''} - صِوار SWAR</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: 'Cairo', sans-serif; direction: rtl; padding: 30px; color: #1e293b; background: white; }
          .header { text-align: center; margin-bottom: 20px; border-bottom: 3px solid #0ea5e9; padding-bottom: 16px; }
          .header h1 { font-size: 26px; font-weight: 900; color: #0369a1; }
          .header .sub { font-size: 13px; color: #64748b; margin-top: 2px; }
          .meta { display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 13px; color: #475569; background: #f8fafc; padding: 12px 16px; border-radius: 10px; border: 1px solid #e2e8f0; }
          .meta strong { color: #0f172a; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px; }
          thead tr { background: #0ea5e9; color: white; }
          th, td { padding: 10px 12px; text-align: right; border-bottom: 1px solid #e2e8f0; }
          tfoot tr { font-weight: 900; background: #f1f5f9; }
          tfoot td { border-top: 2px solid #0ea5e9; font-size: 16px; }
          .total-row td { color: #0369a1; font-size: 18px; }
          .notes { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; font-size: 13px; color: #475569; margin-bottom: 16px; }
          .footer { text-align: center; font-size: 11px; color: #94a3b8; margin-top: 28px; }
          .status-badge { display: inline-block; padding: 2px 8px; border-radius: 6px; font-size: 11px; font-weight: bold; background: #e0f2fe; color: #0369a1; }
          @media print { body { padding: 15px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🧊 منظومة صِـوار (SWAR)</h1>
          <div class="sub">إدارة وجرد مخزون المجمدات والمبيعات</div>
        </div>
        <div class="meta">
          <div>
            <div><strong>رقم الفاتورة:</strong> <span class="status-badge">${inv.invoiceNumber || 'مسودة'}</span></div>
            <div><strong>العميل:</strong> ${inv.customerName || 'عميل نقدي'}</div>
            <div><strong>نوع الدفع:</strong> ${inv.paymentType === 'credit' ? 'آجل' : inv.paymentType === 'transfer' ? 'تحويل بنكي' : 'نقدي'}</div>
          </div>
          <div style="text-align: left;">
            <div><strong>التاريخ:</strong> ${invDate}</div>
            <div><strong>حالة المخزن:</strong> ${inv.deductedFromStock ? '✅ تم الخصم من المخزون' : '📄 مسودة طباعة'}</div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>الصنف</th>
              <th>الوحدة</th>
              <th>الكمية</th>
              <th>سعر الوحدة</th>
              <th>الإجمالي</th>
            </tr>
          </thead>
          <tbody>
            ${invItems.map((item, idx) => `
              <tr>
                <td>${idx + 1}</td>
                <td>${item.name}</td>
                <td>${item.unit}</td>
                <td><strong>${item.qty}</strong></td>
                <td>${Number(item.price).toFixed(2)} ج</td>
                <td>${(item.qty * item.price).toFixed(2)} ج</td>
              </tr>
            `).join('')}
          </tbody>
          <tfoot>
            <tr class="total-row">
              <td colspan="5">💰 الإجمالي الكلي</td>
              <td>${invTotal.toFixed(2)} جنيه</td>
            </tr>
          </tfoot>
        </table>
        ${inv.notes ? `<div class="notes">📝 <strong>ملاحظات:</strong> ${inv.notes}</div>` : ''}
        <div class="footer">
          تم الإصدار عبر منظومة صِـوار SWAR • Developed By Ahmed Swar & Zyad Elleathy
        </div>
        <script>window.onload = function() { window.print(); }</script>
      </body>
      </html>
    `);
    win.document.close();
  };

  const handlePrintOnly = () => {
    if (items.length === 0) return;
    printInvoiceContent({
      invoiceNumber: 'INV-DRAFT-' + Date.now().toString().slice(-4),
      customerName,
      paymentType,
      items,
      total,
      notes,
      deductedFromStock: false,
      createdAt: new Date().toISOString()
    });
  };

  const handleConfirmAndDeduct = () => {
    if (items.length === 0) return;

    if (!isAdmin) {
      sounds.playWarning();
      if (onOpenAdminModal) onOpenAdminModal();
      return;
    }

    if (stockWarnings.length > 0) {
      const names = stockWarnings.map(i => i.name).join('، ');
      if (!window.confirm(`تنبيه: الكميات المطلوبة للأصناف التالية (${names}) تتجاوز المتوفر بالمخزن. هل ترغب في المتابعة والخصم بالسالب؟`)) {
        return;
      }
    }

    const newInvoice = {
      id: 'inv-' + Date.now(),
      invoiceNumber: 'INV-' + (invoices.length + 1).toString().padStart(4, '0'),
      customerName: customerName.trim() || 'عميل نقدي',
      paymentType,
      items: items.map(i => ({
        productId: i.productId,
        name: i.name,
        unit: i.unit,
        price: Number(i.price) || 0,
        qty: Number(i.qty) || 0
      })),
      total,
      totalUnits,
      notes: notes.trim(),
      deductedFromStock: true,
      createdAt: new Date().toISOString(),
    };

    if (onProcessInvoice) {
      onProcessInvoice(newInvoice);
    }

    // Print invoice
    printInvoiceContent(newInvoice);

    // Show toast and reset form
    setSuccessToast(`✅ تم إصدار الفاتورة ${newInvoice.invoiceNumber} وخصم ${totalUnits} وحدة من المخزن بنجاح!`);
    setTimeout(() => setSuccessToast(''), 4000);
    handleReset();
  };

  const handleReset = () => {
    setItems([]);
    setCustomerName('');
    setPaymentType('cash');
    setNotes('');
    setSearch('');
  };

  const executeDelete = (restoreStock) => {
    if (!deleteConfirm) return;
    if (onDeleteInvoice) {
      onDeleteInvoice(deleteConfirm.id, restoreStock);
    }
    sounds.playSuccess();
    setSuccessToast(restoreStock ? '✅ تم حذف الفاتورة واسترجاع كمياتها للمخزن' : '✅ تم حذف سجل الفاتورة');
    setTimeout(() => setSuccessToast(''), 4000);
    setDeleteConfirm(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-fade-in no-print overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 my-auto flex flex-col max-h-[95vh] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 text-white rounded-t-3xl shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center shadow-inner">
              <Receipt className="w-5 h-5 text-violet-200" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black">إدارة فواتير المبيعات</h2>
              <p className="text-xs text-violet-300">إنشاء، خصم مباشر من المخزن، وأرشيف الفواتير</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 px-4 pt-2 gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('create')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl font-bold text-xs sm:text-sm border-t-2 transition-all ${
              activeTab === 'create'
                ? 'bg-white dark:bg-slate-900 text-violet-600 dark:text-violet-400 border-violet-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 border-transparent'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>إنشاء فاتورة جديدة</span>
            {items.length > 0 && (
              <span className="bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 px-2 py-0.5 rounded-full text-xs font-black">
                {items.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl font-bold text-xs sm:text-sm border-t-2 transition-all ${
              activeTab === 'history'
                ? 'bg-white dark:bg-slate-900 text-violet-600 dark:text-violet-400 border-violet-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 border-transparent'
            }`}
          >
            <History className="w-4 h-4" />
            <span>سجل الفواتير السابقة</span>
            <span className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-full text-xs font-black">
              {invoices.length}
            </span>
          </button>
        </div>

        {/* Success alert banner */}
        {successToast && (
          <div className="bg-emerald-50 dark:bg-emerald-950/80 border-b border-emerald-200 dark:border-emerald-800 px-4 py-2.5 text-xs sm:text-sm text-emerald-800 dark:text-emerald-200 font-bold flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successToast}</span>
          </div>
        )}

        {/* TAB 1: CREATE NEW INVOICE */}
        {activeTab === 'create' && (
          <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-4">

            {/* Customer info & payment type */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">اسم العميل / الجهة</label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="مثال: مطعم النجمة / عميل نقدي..."
                    className="w-full pr-9 pl-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">طريقة الدفع</label>
                <select
                  value={paymentType}
                  onChange={e => setPaymentType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm font-bold outline-none focus:ring-2 focus:ring-violet-500"
                >
                  <option value="cash">💵 نقدي (Cash)</option>
                  <option value="credit">📝 آجل (Credit)</option>
                  <option value="transfer">📱 تحويل / محفظة</option>
                </select>
              </div>
            </div>

            {/* Product Search & Add */}
            <div className="relative">
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">🔍 ابحث عن صنف لإضافته للفاتورة</label>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="ابحث باسم المنتج أو مكان التخزين..."
                  className="w-full pr-9 pl-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              {search && filteredProducts.length > 0 && (
                <div className="absolute z-20 top-full left-0 right-0 mt-1 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl overflow-hidden max-h-60 overflow-y-auto">
                  {filteredProducts.map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => addItem(p)}
                      className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-violet-50 dark:hover:bg-slate-800 text-sm border-b border-slate-100 dark:border-slate-800 last:border-0 transition-colors text-right"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">{p.emoji || '🧊'}</span>
                        <div>
                          <div className="font-bold text-slate-800 dark:text-white">{p.name}</div>
                          <div className="text-[11px] text-slate-500">المتوفر بالمخزن: <strong className="text-sky-600">{p.currentStock} {p.unit}</strong></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-1 rounded-lg">
                          {p.price ? `${p.price} ج` : 'بدون سعر'}
                        </span>
                        <div className="w-7 h-7 rounded-lg bg-violet-600 text-white flex items-center justify-center">
                          <Plus className="w-4 h-4" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Warning if quantities exceed inventory */}
            {stockWarnings.length > 0 && (
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-2xl flex items-center gap-2.5 text-xs text-amber-800 dark:text-amber-300">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                <div>
                  <strong>تنبيه كميات:</strong> الأصناف التالية كميتها المطلوبة أكبر من المتوفر الفعلي بالمخزن ({stockWarnings.map(w => w.name).join('، ')}).
                </div>
              </div>
            )}

            {/* Items Table */}
            {items.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-sm border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                <Receipt className="w-12 h-12 mx-auto mb-2 opacity-30 text-violet-500" />
                <p className="font-bold text-slate-600 dark:text-slate-400">الفاتورة فارغة حالياً</p>
                <p className="text-xs text-slate-400 mt-1">ابحث بالأعلى عن الأصناف المطلوبة لإضافتها</p>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-950 text-xs text-slate-600 dark:text-slate-400 font-bold">
                    <tr>
                      <th className="text-right px-3 py-2.5">الصنف</th>
                      <th className="text-center px-2 py-2.5 w-36">الكمية المباعة</th>
                      <th className="text-center px-2 py-2.5 w-28">السعر (ج)</th>
                      <th className="text-center px-2 py-2.5 w-28">الإجمالي</th>
                      <th className="w-8"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                    {items.map(item => {
                      const prod = products.find(p => p.id === item.productId);
                      const currentStock = prod ? Number(prod.currentStock) : item.availableStock;
                      const isOverStock = item.qty > currentStock;

                      return (
                        <tr key={item.productId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                          <td className="px-3 py-2.5">
                            <div className="font-bold text-slate-800 dark:text-white">{item.name}</div>
                            <div className="text-[11px] text-slate-500">
                              مخزون: <span className={isOverStock ? 'text-rose-600 font-bold' : 'text-slate-600 dark:text-slate-400'}>{currentStock} {item.unit}</span>
                            </div>
                          </td>
                          <td className="px-2 py-2.5">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => updateQty(item.productId, -1)}
                                className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-950/60 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <input
                                type="number"
                                min="1"
                                value={item.qty}
                                onChange={e => setQtyDirect(item.productId, e.target.value)}
                                className={`w-14 text-center font-black text-sm py-1 rounded-lg border outline-none ${
                                  isOverStock
                                    ? 'bg-rose-50 border-rose-300 text-rose-700 dark:bg-rose-950 dark:border-rose-800 dark:text-rose-300'
                                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700'
                                }`}
                              />
                              <button
                                onClick={() => updateQty(item.productId, 1)}
                                className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-950/60 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                          <td className="px-2 py-2.5">
                            <input
                              type="number"
                              min="0"
                              value={item.price}
                              onChange={e => updatePrice(item.productId, e.target.value)}
                              className="w-full text-center font-bold py-1 px-1 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 outline-none text-xs"
                            />
                          </td>
                          <td className="px-2 py-2.5 text-center font-black text-amber-700 dark:text-amber-400">
                            {(item.qty * item.price).toFixed(2)} ج
                          </td>
                          <td className="px-1 py-2.5 text-center">
                            <button
                              onClick={() => removeItem(item.productId)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                              title="حذف الصنف"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-violet-50 dark:bg-violet-950/40 border-t-2 border-violet-200 dark:border-violet-900">
                      <td colSpan={2} className="px-3 py-3 font-black text-violet-900 dark:text-violet-200 text-xs sm:text-sm">
                        💰 الإجمالي الكلي ({items.length} أصناف • {totalUnits} وحدة)
                      </td>
                      <td colSpan={2} className="px-2 py-3 text-center font-black text-violet-900 dark:text-violet-200 text-base sm:text-lg">
                        {total.toFixed(2)} ج
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">ملاحظات إضافية على الفاتورة (اختياري)</label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={2}
                placeholder="شروط التسليم، رقم الهاتف، أو ملاحظات خاصة..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-violet-500 resize-none"
              />
            </div>

            {!isAdmin && (
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600" />
                  <span>أنت حالياً في <strong>وضع المشاهدة</strong>. لخصم الكميات فعلياً من المخزن وحفظ الفاتورة، يلزم تسجيل الدخول كمسؤول.</span>
                </div>
                <button
                  onClick={onOpenAdminModal}
                  className="px-3 py-1 bg-amber-600 text-white rounded-lg font-bold text-[11px] hover:bg-amber-500 shrink-0"
                >
                  دخول الأدمن
                </button>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: INVOICES ARCHIVE / HISTORY */}
        {activeTab === 'history' && (
          <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-4">
            
            {/* Search history */}
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={historySearch}
                onChange={e => setHistorySearch(e.target.value)}
                placeholder="ابحث برقم الفاتورة، اسم العميل، أو الملاحظات..."
                className="w-full pr-9 pl-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            {filteredInvoices.length === 0 ? (
              <div className="py-16 text-center text-slate-400 text-sm border border-slate-200 dark:border-slate-800 rounded-3xl">
                <FileText className="w-12 h-12 mx-auto mb-2 opacity-30 text-slate-400" />
                <p className="font-bold text-slate-600 dark:text-slate-400">لا توجد فواتير محفوظة بعد</p>
                <p className="text-xs text-slate-400 mt-1">عند إصدار الفواتير واختيار الخصم من المخزن ستظهر وتُحفظ هنا تلقائياً</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredInvoices.map((inv) => (
                  <div
                    key={inv.id}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 hover:bg-white dark:hover:bg-slate-900 transition-all shadow-sm space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-800/60 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-black font-mono text-sm px-2.5 py-1 rounded-lg bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300">
                          {inv.invoiceNumber}
                        </span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                          {inv.customerName}
                        </span>
                        {inv.deductedFromStock && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                            مخصومة من المخزن
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{formatArabicDateTime(inv.createdAt)}</span>
                      </div>
                    </div>

                    {/* Invoice items chips preview */}
                    <div className="flex flex-wrap gap-1.5 text-xs">
                      {inv.items?.map((it, idx) => (
                        <span
                          key={idx}
                          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-lg text-slate-700 dark:text-slate-300 font-medium"
                        >
                          {it.name} × <strong>{it.qty} {it.unit}</strong>
                        </span>
                      ))}
                    </div>

                    {/* Total & Action buttons */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="text-sm font-black text-violet-700 dark:text-violet-300">
                        الإجمالي: <span>{Number(inv.total).toFixed(2)} ج</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => printInvoiceContent(inv)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-50 dark:bg-violet-950/60 hover:bg-violet-100 text-violet-700 dark:text-violet-300 text-xs font-bold transition-colors"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>طباعة / عرض</span>
                        </button>

                        {isAdmin && (
                          <button
                            onClick={() => setDeleteConfirm(inv)}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-700 dark:text-rose-300 text-xs font-bold transition-colors"
                            title="حذف الفاتورة"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>حذف</span>
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

        {/* Delete confirmation modal overlay */}
        {deleteConfirm && (
          <div className="fixed inset-0 z-60 bg-black/70 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-2xl space-y-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  حذف الفاتورة ({deleteConfirm.invoiceNumber})
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  هل تريد استرجاع الكميات المباعة في هذه الفاتورة وإضافتها مرة أخرى للمخزن، أم حذف السجل فقط؟
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => executeDelete(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
                >
                  <RotateCcw className="w-4 h-4" />
                  حذف واسترجاع الكميات للمخزن (إلغاء المبيعات)
                </button>

                <button
                  onClick={() => executeDelete(false)}
                  className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4" />
                  حذف سجل الفاتورة فقط (دون تعديل المخزن)
                </button>

                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="w-full py-2 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold text-xs"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions (Only for Tab 1) */}
        {activeTab === 'create' && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-2 shrink-0 bg-slate-50/80 dark:bg-slate-950/80 rounded-b-3xl">
            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-sm font-bold transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              مسح
            </button>

            <button
              onClick={handlePrintOnly}
              disabled={items.length === 0}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-violet-300 dark:border-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950/40 disabled:opacity-40 disabled:cursor-not-allowed text-violet-700 dark:text-violet-300 text-sm font-bold transition-all"
            >
              <Printer className="w-4 h-4" />
              طباعة مسودة فقط
            </button>

            <button
              onClick={handleConfirmAndDeduct}
              disabled={items.length === 0}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-600 hover:from-violet-500 hover:to-sky-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-black shadow-lg shadow-violet-600/25 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              ⚡ إصدار وخصم من المخزن والطباعة
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
