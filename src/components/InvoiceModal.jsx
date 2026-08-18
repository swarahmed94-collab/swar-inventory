import React, { useState, useRef, useMemo } from 'react';
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
  Users,
  Phone,
  ShieldAlert,
  ShoppingBag,
  Truck,
  ArrowDownLeft,
  ArrowUpRight,
  DollarSign,
  CreditCard,
  Building2,
  Calendar
} from 'lucide-react';
import { formatArabicDateTime } from '../utils/storage';
import { sounds } from '../utils/sound';

export default function InvoiceModal({ 
  isOpen, 
  products, 
  invoices = [], 
  customers = [],
  isAdmin = false,
  onClose, 
  onProcessInvoice,
  onDeleteInvoice,
  onOpenAdminModal,
  onSettleCustomerDebt
}) {
  const [activeTab, setActiveTab] = useState('create'); // 'create' | 'history' | 'customers'
  const [invoiceType, setInvoiceType] = useState('sales'); // 'sales' (خصم) | 'purchase' (إضافة)
  
  // Customer fields
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);

  // Items & payment
  const [items, setItems] = useState([]);
  const [paymentType, setPaymentType] = useState('cash'); // 'cash' | 'credit' | 'transfer'
  const [amountPaid, setAmountPaid] = useState('');
  const [recordInJournal, setRecordInJournal] = useState(true);
  const [notes, setNotes] = useState('');
  const [search, setSearch] = useState('');
  
  // History & Customers tab states
  const [historySearch, setHistorySearch] = useState('');
  const [historyTypeFilter, setHistoryTypeFilter] = useState('all'); // 'all' | 'sales' | 'purchase'
  const [customerSearch, setCustomerSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null); // invoice to delete
  const [settleModal, setSettleModal] = useState(null); // customer to settle debt
  const [settleAmount, setSettleAmount] = useState('');
  const [successToast, setSuccessToast] = useState('');

  if (!isOpen) return null;

  // Find matched customer
  const matchedCustomer = useMemo(() => {
    if (!customerName.trim()) return null;
    return customers.find(c => c.name?.trim().toLowerCase() === customerName.trim().toLowerCase());
  }, [customerName, customers]);

  const customerDebt = Number(matchedCustomer?.totalDebt) || 0;

  // Filtered customer suggestions
  const customerSuggestions = useMemo(() => {
    if (!customerName.trim()) return customers.slice(0, 6);
    const q = customerName.trim().toLowerCase();
    return customers.filter(c => c.name.toLowerCase().includes(q) || (c.phone && c.phone.includes(q))).slice(0, 6);
  }, [customerName, customers]);

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

  // Remaining balance calculation
  const effectivePaid = amountPaid === '' ? (paymentType === 'credit' ? 0 : total) : Number(amountPaid) || 0;
  const remainingBalance = Math.max(0, total - effectivePaid);
  const projectedDebt = invoiceType === 'sales' ? customerDebt + remainingBalance : 0;

  // Stock warning for sales invoices
  const stockWarnings = invoiceType === 'sales' ? items.filter(i => {
    const prod = products.find(p => p.id === i.productId);
    const currentStock = prod ? Number(prod.currentStock) : i.availableStock;
    return i.qty > currentStock;
  }) : [];

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.emoji && p.emoji.includes(search)) ||
    (p.freezerLocation && p.freezerLocation.toLowerCase().includes(search.toLowerCase()))
  ).slice(0, 8);

  const filteredInvoices = invoices.filter(inv => {
    if (historyTypeFilter !== 'all' && (inv.type || 'sales') !== historyTypeFilter) return false;
    const q = historySearch.trim().toLowerCase();
    if (!q) return true;
    return (
      (inv.invoiceNumber && inv.invoiceNumber.toLowerCase().includes(q)) ||
      (inv.customerName && inv.customerName.toLowerCase().includes(q)) ||
      (inv.notes && inv.notes.toLowerCase().includes(q))
    );
  });

  const filteredCustomers = customers.filter(c => {
    const q = customerSearch.trim().toLowerCase();
    if (!q) return true;
    return c.name.toLowerCase().includes(q) || (c.phone && c.phone.includes(q));
  });

  const printInvoiceContent = (inv) => {
    const win = window.open('', '_blank');
    const invItems = inv.items || [];
    const invTotal = Number(inv.total) || invItems.reduce((s, x) => s + (x.qty * x.price), 0);
    const invPaid = inv.amountPaid !== undefined ? Number(inv.amountPaid) : invTotal;
    const invRemaining = inv.remainingBalance !== undefined ? Number(inv.remainingBalance) : 0;
    const isPurchase = inv.type === 'purchase';
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
          .header { text-align: center; margin-bottom: 20px; border-bottom: 3px solid ${isPurchase ? '#059669' : '#0284c7'}; padding-bottom: 16px; }
          .header h1 { font-size: 26px; font-weight: 900; color: ${isPurchase ? '#065f46' : '#0369a1'}; }
          .header .sub { font-size: 13px; color: #64748b; margin-top: 2px; }
          .meta { display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 13px; color: #475569; background: #f8fafc; padding: 14px 16px; border-radius: 10px; border: 1px solid #e2e8f0; }
          .meta strong { color: #0f172a; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px; }
          thead tr { background: ${isPurchase ? '#059669' : '#0284c7'}; color: white; }
          th, td { padding: 10px 12px; text-align: right; border-bottom: 1px solid #e2e8f0; }
          tfoot tr { font-weight: 900; background: #f1f5f9; }
          tfoot td { border-top: 2px solid #e2e8f0; font-size: 15px; }
          .total-row td { color: #0f172a; font-size: 17px; }
          .paid-row td { color: #16a34a; }
          .rem-row td { color: #dc2626; }
          .notes { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; font-size: 13px; color: #475569; margin-bottom: 16px; }
          .footer { text-align: center; font-size: 11px; color: #94a3b8; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 15px; }
          .status-badge { display: inline-block; padding: 2px 8px; border-radius: 6px; font-size: 11px; font-weight: bold; background: ${isPurchase ? '#d1fae5' : '#e0f2fe'}; color: ${isPurchase ? '#065f46' : '#0369a1'}; }
          @media print { body { padding: 15px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🧊 منظومة صِـوار (SWAR)</h1>
          <div class="sub">إدارة المخزون والمبيعات والمشتريات</div>
        </div>
        <div class="meta">
          <div>
            <div><strong>نوع الفاتورة:</strong> <span class="status-badge">${isPurchase ? '📦 فاتورة مشتريات وتوريد' : '🛒 فاتورة مبيعات'}</span></div>
            <div><strong>رقم الفاتورة:</strong> ${inv.invoiceNumber || 'مسودة'}</div>
            <div><strong>${isPurchase ? 'المورد:' : 'العميل:'}</strong> ${inv.customerName || 'نقدي'}</div>
            ${inv.customerPhone ? `<div><strong>الهاتف:</strong> ${inv.customerPhone}</div>` : ''}
          </div>
          <div style="text-align: left;">
            <div><strong>التاريخ:</strong> ${invDate}</div>
            <div><strong>طريقة الدفع:</strong> ${inv.paymentType === 'credit' ? 'آجل' : inv.paymentType === 'transfer' ? 'تحويل' : 'نقدي'}</div>
            <div><strong>حالة المخزن:</strong> ${inv.deductedFromStock ? (isPurchase ? '✅ تمت إضافة البضاعة للمخزن' : '✅ تم الخصم من المخزن') : '📄 مسودة'}</div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>الصنف</th>
              <th>الوحدة</th>
              <th>الكمية</th>
              <th>السعر</th>
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
              <td colspan="5">💰 إجمالي الفاتورة:</td>
              <td>${invTotal.toFixed(2)} جنيه</td>
            </tr>
            <tr class="paid-row">
              <td colspan="5">💵 المبلغ المدفوع:</td>
              <td>${invPaid.toFixed(2)} جنيه</td>
            </tr>
            ${invRemaining > 0 ? `
              <tr class="rem-row">
                <td colspan="5">⚠️ المتبقي (آجل / مديونية):</td>
                <td>${invRemaining.toFixed(2)} جنيه</td>
              </tr>
            ` : ''}
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

  const handlePrintDraft = () => {
    if (items.length === 0) return;
    printInvoiceContent({
      invoiceNumber: 'INV-DRAFT-' + Date.now().toString().slice(-4),
      type: invoiceType,
      customerName,
      customerPhone,
      paymentType,
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

    if (invoiceType === 'sales' && stockWarnings.length > 0) {
      const names = stockWarnings.map(i => i.name).join('، ');
      if (!window.confirm(`تنبيه: الكميات المطلوبة للأصناف التالية (${names}) تتجاوز المتوفر بالمخزن. هل ترغب في المتابعة والخصم بالسالب؟`)) {
        return;
      }
    }

    const prefix = invoiceType === 'sales' ? 'INV-' : 'PUR-';
    const newInvoice = {
      id: 'inv-' + Date.now(),
      invoiceNumber: prefix + (invoices.length + 1).toString().padStart(4, '0'),
      type: invoiceType,
      customerName: customerName.trim() || (invoiceType === 'sales' ? 'عميل نقدي' : 'مورد عام'),
      customerPhone: customerPhone.trim(),
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
      amountPaid: effectivePaid,
      remainingBalance,
      recordInJournal,
      notes: notes.trim(),
      deductedFromStock: true,
      createdAt: new Date().toISOString(),
    };

    if (onProcessInvoice) {
      onProcessInvoice(newInvoice);
    }

    // Print invoice automatically
    printInvoiceContent(newInvoice);

    setSuccessToast(`✅ تم حفظ وإصدار ${invoiceType === 'sales' ? 'فاتورة المبيعات' : 'فاتورة المشتريات'} (${newInvoice.invoiceNumber}) وتحديث المخزون بنجاح!`);
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
  };

  const executeDelete = (restoreStock) => {
    if (!deleteConfirm) return;
    if (onDeleteInvoice) {
      onDeleteInvoice(deleteConfirm.id, restoreStock);
    }
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

    if (onSettleCustomerDebt) {
      onSettleCustomerDebt(settleModal.name, num);
    }
    sounds.playSuccess();
    setSuccessToast(`✅ تم تسجيل سداد دفعة ${num} ج من حساب العميل ${settleModal.name}`);
    setTimeout(() => setSuccessToast(''), 4000);
    setSettleModal(null);
    setSettleAmount('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-sm animate-fade-in no-print overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 my-auto flex flex-col max-h-[95vh] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 text-white rounded-t-3xl shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center shadow-inner">
              <Receipt className="w-5 h-5 text-violet-200" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black">منظومة الفواتير والحسابات</h2>
              <p className="text-xs text-violet-300">مبيعات، مشتريات وتوريد، حسابات الديون، وأرشيف الفواتير</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 px-4 pt-2 gap-2 shrink-0 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('create')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl font-bold text-xs sm:text-sm border-t-2 transition-all whitespace-nowrap ${
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
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl font-bold text-xs sm:text-sm border-t-2 transition-all whitespace-nowrap ${
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

          <button
            onClick={() => setActiveTab('customers')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl font-bold text-xs sm:text-sm border-t-2 transition-all whitespace-nowrap ${
              activeTab === 'customers'
                ? 'bg-white dark:bg-slate-900 text-violet-600 dark:text-violet-400 border-violet-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 border-transparent'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>دليل وحسابات العملاء</span>
            <span className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full text-xs font-black">
              {customers.length}
            </span>
          </button>
        </div>

        {/* Success alert banner */}
        {successToast && (
          <div className="bg-emerald-50 dark:bg-emerald-950/80 border-b border-emerald-200 dark:border-emerald-800 px-4 py-2.5 text-xs sm:text-sm text-emerald-800 dark:text-emerald-200 font-bold flex items-center gap-2 animate-fade-in shrink-0">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successToast}</span>
          </div>
        )}

        {/* TAB 1: CREATE NEW INVOICE */}
        {activeTab === 'create' && (
          <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-4">

            {/* Invoice Type Selector: Sales vs Purchase */}
            <div className="flex p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setInvoiceType('sales')}
                className={`flex-1 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                  invoiceType === 'sales'
                    ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>🛒 فاتورة مبيعات (خصم من المخزون)</span>
              </button>

              <button
                type="button"
                onClick={() => setInvoiceType('purchase')}
                className={`flex-1 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                  invoiceType === 'purchase'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>📦 فاتورة مشتريات وتوريد (إضافة للمخزون)</span>
              </button>
            </div>

            {/* Customer Live Debt Alert Banner */}
            {customerDebt > 0 && invoiceType === 'sales' && (
              <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border-2 border-amber-400 dark:border-amber-600 text-amber-900 dark:text-amber-200 flex items-center justify-between gap-2 animate-bounce-short shadow-sm">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-black">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>تنبيه مديونية سابقة: العميل ({matchedCustomer.name}) عليه رصيد مستحق بقيمة:</span>
                </div>
                <div className="text-base sm:text-lg font-black text-amber-700 dark:text-amber-400 px-3 py-1 bg-white dark:bg-slate-900 rounded-xl border border-amber-300 dark:border-amber-700 shrink-0">
                  {customerDebt.toFixed(2)} ج
                </div>
              </div>
            )}

            {/* Customer and Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Customer Name with Autocomplete */}
              <div className="sm:col-span-2 relative">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  {invoiceType === 'sales' ? 'اسم العميل / الجهة' : 'اسم المورد / المصنع'}
                </label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={customerName}
                    onFocus={() => setShowCustomerDropdown(true)}
                    onChange={e => { setCustomerName(e.target.value); setShowCustomerDropdown(true); }}
                    placeholder={invoiceType === 'sales' ? 'ابحث أو اكتب اسم العميل...' : 'اسم المورد أو الشركة...'}
                    className="w-full pr-9 pl-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm font-bold outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                {/* Autocomplete Dropdown */}
                {showCustomerDropdown && customerSuggestions.length > 0 && (
                  <div className="absolute z-30 top-full left-0 right-0 mt-1 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">
                    {customerSuggestions.map(cust => (
                      <button
                        key={cust.id}
                        type="button"
                        onClick={() => {
                          setCustomerName(cust.name);
                          if (cust.phone) setCustomerPhone(cust.phone);
                          setShowCustomerDropdown(false);
                        }}
                        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-violet-50 dark:hover:bg-slate-800 text-sm border-b border-slate-100 dark:border-slate-800 last:border-0 transition-colors text-right"
                      >
                        <div>
                          <span className="font-black text-slate-900 dark:text-white">{cust.name}</span>
                          {cust.phone && <span className="text-xs text-slate-400 mr-2">({cust.phone})</span>}
                        </div>
                        {cust.totalDebt > 0 && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                            مديونية: {cust.totalDebt} ج
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Customer Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">رقم الهاتف (اختياري)</label>
                <div className="relative">
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={e => setCustomerPhone(e.target.value)}
                    placeholder="010xxxxxxxx"
                    className="w-full pr-9 pl-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

            </div>

            {/* Product Search & Add */}
            <div className="relative">
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                🔍 ابحث عن صنف لإضافته ({invoiceType === 'sales' ? 'بيع وخصم' : 'شراء وتوريد'})
              </label>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="ابحث باسم المنتج أو مكان الفريزر..."
                  className="w-full pr-9 pl-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              {search && filteredProducts.length > 0 && (
                <div className="absolute z-20 top-full left-0 right-0 mt-1 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
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
                          <div className="text-[11px] text-slate-500">
                            الرصيد الحالي بالمخزن: <strong className="text-sky-600">{p.currentStock} {p.unit}</strong>
                          </div>
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

            {/* Items Table */}
            {items.length === 0 ? (
              <div className="py-10 text-center text-slate-400 text-sm border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                <Receipt className="w-12 h-12 mx-auto mb-2 opacity-30 text-violet-500" />
                <p className="font-bold text-slate-600 dark:text-slate-400">الفاتورة فارغة حالياً</p>
                <p className="text-xs text-slate-400 mt-1">ابحث بالأعلى عن الأصناف لإضافتها للفاتورة</p>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-950 text-xs text-slate-600 dark:text-slate-400 font-bold">
                    <tr>
                      <th className="text-right px-3 py-2.5">الصنف</th>
                      <th className="text-center px-2 py-2.5 w-36">الكمية</th>
                      <th className="text-center px-2 py-2.5 w-28">السعر (ج)</th>
                      <th className="text-center px-2 py-2.5 w-28">الإجمالي</th>
                      <th className="w-8"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                    {items.map(item => {
                      const prod = products.find(p => p.id === item.productId);
                      const currentStock = prod ? Number(prod.currentStock) : item.availableStock;
                      const isOverStock = invoiceType === 'sales' && item.qty > currentStock;

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
                </table>
              </div>
            )}

            {/* Financial Summary & Debt Calculation Box */}
            <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Total */}
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400">💰 إجمالي الفاتورة</div>
                  <div className="text-xl font-black text-slate-900 dark:text-white mt-1">
                    {total.toFixed(2)} <span className="text-xs font-normal">ج</span>
                  </div>
                </div>

                {/* Amount Paid */}
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <label className="block text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1 text-center">
                    💵 المبلغ المدفوع حالياً
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={total}
                    value={amountPaid}
                    onChange={e => setAmountPaid(e.target.value)}
                    placeholder={paymentType === 'credit' ? '0.00' : total.toFixed(2)}
                    className="w-full py-1 text-center text-lg font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-xl border border-emerald-300 dark:border-emerald-700 outline-none"
                  />
                </div>

                {/* Remaining Balance / Debt */}
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                  <div className="text-xs font-bold text-rose-600 dark:text-rose-400">⚠️ المتبقي (آجل / مديونية)</div>
                  <div className="text-xl font-black text-rose-600 dark:text-rose-400 mt-1">
                    {remainingBalance.toFixed(2)} <span className="text-xs font-normal">ج</span>
                  </div>
                </div>
              </div>

              {/* Debt update projection note */}
              {invoiceType === 'sales' && customerName.trim() && (
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 px-1">
                  <span>📊 إجمالي مديونية ({customerName}) بعد هذه الفاتورة:</span>
                  <span className="font-black text-sm text-slate-900 dark:text-white">{projectedDebt.toFixed(2)} ج</span>
                </div>
              )}

              {/* Option to record in daily cash journal */}
              <div className="flex items-center gap-2 pt-1 px-1">
                <input
                  type="checkbox"
                  id="recordJournal"
                  checked={recordInJournal}
                  onChange={e => setRecordInJournal(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="recordJournal" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                  تسجيل المبلغ المدفوع ({effectivePaid} ج) في <strong>دفتر اليومية والخزينة</strong> تلقائياً
                </label>
              </div>

            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">ملاحظات الفاتورة (اختياري)</label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={2}
                placeholder="شروط التسليم، ملاحظات النقل، أو أي تفاصيل إضافية..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-violet-500 resize-none"
              />
            </div>

            {!isAdmin && (
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600" />
                  <span>أنت حالياً في <strong>وضع المشاهدة</strong>. لتحديث المخزون والديون فعلياً، يلزم تسجيل الدخول كمسؤول.</span>
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
            
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-1 w-full">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={historySearch}
                  onChange={e => setHistorySearch(e.target.value)}
                  placeholder="ابحث برقم الفاتورة، اسم العميل، أو الملاحظات..."
                  className="w-full pr-9 pl-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div className="flex items-center gap-1 w-full sm:w-auto">
                <button
                  onClick={() => setHistoryTypeFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    historyTypeFilter === 'all' ? 'bg-violet-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  الكل
                </button>
                <button
                  onClick={() => setHistoryTypeFilter('sales')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    historyTypeFilter === 'sales' ? 'bg-sky-600 text-white' : 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300'
                  }`}
                >
                  مبيعات 🛒
                </button>
                <button
                  onClick={() => setHistoryTypeFilter('purchase')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    historyTypeFilter === 'purchase' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                  }`}
                >
                  مشتريات 📦
                </button>
              </div>
            </div>

            {filteredInvoices.length === 0 ? (
              <div className="py-16 text-center text-slate-400 text-sm border border-slate-200 dark:border-slate-800 rounded-3xl">
                <FileText className="w-12 h-12 mx-auto mb-2 opacity-30 text-slate-400" />
                <p className="font-bold text-slate-600 dark:text-slate-400">لا توجد فواتير مطابقة للبحث</p>
                <p className="text-xs text-slate-400 mt-1">عند إصدار الفواتير ستظهر وتُحفظ هنا تلقائياً وتتزامن مع كافة الأجهزة</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredInvoices.map((inv) => {
                  const isPurch = inv.type === 'purchase';
                  return (
                    <div
                      key={inv.id}
                      className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 hover:bg-white dark:hover:bg-slate-900 transition-all shadow-sm space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-800/60 pb-2.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`font-black font-mono text-sm px-2.5 py-1 rounded-lg ${
                            isPurch ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' : 'bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300'
                          }`}>
                            {inv.invoiceNumber}
                          </span>
                          <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                            {inv.customerName}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            isPurch ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300'
                          }`}>
                            {isPurch ? '📦 مشتريات وتوريد' : '🛒 مبيعات'}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{formatArabicDateTime(inv.createdAt)}</span>
                        </div>
                      </div>

                      {/* Items Chips */}
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

                      {/* Financial info & action buttons */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                        <div className="flex items-center gap-3 text-xs sm:text-sm flex-wrap">
                          <span className="font-black text-slate-900 dark:text-white">
                            الإجمالي: <strong className="text-violet-600 dark:text-violet-400">{Number(inv.total).toFixed(2)} ج</strong>
                          </span>
                          {inv.amountPaid !== undefined && (
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                              المدفوع: {Number(inv.amountPaid).toFixed(2)} ج
                            </span>
                          )}
                          {Number(inv.remainingBalance) > 0 && (
                            <span className="text-rose-600 dark:text-rose-400 font-black">
                              المتبقي: {Number(inv.remainingBalance).toFixed(2)} ج
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 justify-end">
                          <button
                            onClick={() => printInvoiceContent(inv)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-50 dark:bg-violet-950/60 hover:bg-violet-100 text-violet-700 dark:text-violet-300 text-xs font-bold transition-colors"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>طباعة</span>
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
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* TAB 3: CUSTOMERS & BALANCES */}
        {activeTab === 'customers' && (
          <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-4">
            
            <div className="flex items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={customerSearch}
                  onChange={e => setCustomerSearch(e.target.value)}
                  placeholder="ابحث باسم العميل أو رقم الهاتف..."
                  className="w-full pr-9 pl-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>

            {filteredCustomers.length === 0 ? (
              <div className="py-16 text-center text-slate-400 text-sm border border-slate-200 dark:border-slate-800 rounded-3xl">
                <Users className="w-12 h-12 mx-auto mb-2 opacity-30 text-slate-400" />
                <p className="font-bold text-slate-600 dark:text-slate-400">لا يوجد عملاء مسجلين بعد</p>
                <p className="text-xs text-slate-400 mt-1">يتم حفظ العملاء وتتبع ديونهم تلقائياً فور إصدار فواتير مبيعات باسمهم</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {filteredCustomers.map(cust => (
                  <div
                    key={cust.id}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center font-black text-base">
                          {cust.name.slice(0, 1)}
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900 dark:text-white text-sm sm:text-base">{cust.name}</h4>
                          {cust.phone && (
                            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3" />
                              <span>{cust.phone}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[11px] text-slate-400 font-bold">المديونية المستحقة:</div>
                        <div className={`text-base font-black ${Number(cust.totalDebt) > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                          {Number(cust.totalDebt || 0).toFixed(2)} ج
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                      <span className="text-slate-500">عدد الفواتير: <strong>{cust.invoicesCount || 0}</strong></span>
                      
                      {isAdmin && Number(cust.totalDebt) > 0 && (
                        <button
                          onClick={() => { setSettleModal(cust); setSettleAmount(String(cust.totalDebt)); }}
                          className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1 shadow-sm transition-all"
                        >
                          <DollarSign className="w-3.5 h-3.5" />
                          <span>تحصيل دفعة نقدية</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* Settle Debt Modal */}
        {settleModal && (
          <div className="fixed inset-0 z-60 bg-black/70 flex items-center justify-center p-4">
            <form onSubmit={handleSettleSubmit} className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-2xl space-y-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">تحصيل دفعة من العميل</h3>
                <p className="text-xs text-slate-500 mt-1">{settleModal.name} — إجمالي المديونية الحالية: <strong>{settleModal.totalDebt} ج</strong></p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">المبلغ المحصل (ج):</label>
                <input
                  type="number"
                  min="1"
                  max={settleModal.totalDebt}
                  required
                  autoFocus
                  value={settleAmount}
                  onChange={e => setSettleAmount(e.target.value)}
                  className="w-full text-center text-xl font-black py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-emerald-600 outline-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
                >
                  تأكيد التحصيل والخصم
                </button>
                <button
                  type="button"
                  onClick={() => setSettleModal(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold text-xs"
                >
                  إلغاء
                </button>
              </div>
            </form>
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
                  هل تريد التراجع عن تأثير الفاتورة على المخزن والديون، أم حذف السجل فقط؟
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => executeDelete(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
                >
                  <RotateCcw className="w-4 h-4" />
                  حذف واسترجاع المخزون وتعديل المديونية
                </button>

                <button
                  onClick={() => executeDelete(false)}
                  className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4" />
                  حذف سجل الفاتورة فقط
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
              onClick={handlePrintDraft}
              disabled={items.length === 0}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-violet-300 dark:border-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950/40 disabled:opacity-40 disabled:cursor-not-allowed text-violet-700 dark:text-violet-300 text-sm font-bold transition-all"
            >
              <Printer className="w-4 h-4" />
              طباعة مسودة
            </button>

            <button
              onClick={handleConfirmAndProcess}
              disabled={items.length === 0}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-black shadow-lg transition-all ${
                invoiceType === 'sales'
                  ? 'bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-600 hover:from-violet-500 hover:to-sky-500 shadow-violet-600/25'
                  : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:from-emerald-500 hover:to-sky-500 shadow-emerald-600/25'
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {invoiceType === 'sales'
                  ? '⚡ إصدار الفاتورة وخصم المخزون والطباعة'
                  : '📦 توريد البضاعة وإضافة المخزون والطباعة'}
              </span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
