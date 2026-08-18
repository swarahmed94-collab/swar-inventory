import React, { useState, useRef } from 'react';
import { X, Receipt, Plus, Minus, Trash2, Printer, RotateCcw } from 'lucide-react';

export default function InvoiceModal({ isOpen, products, onClose }) {
  const [items, setItems] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [notes, setNotes] = useState('');
  const [search, setSearch] = useState('');
  const printRef = useRef();

  if (!isOpen) return null;

  const addItem = (product) => {
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
        price: product.price || 0,
        qty: 1,
      }]);
    }
    setSearch('');
  };

  const updateQty = (productId, delta) => {
    setItems(prev => prev
      .map(i => i.productId === productId ? { ...i, qty: Math.max(0, i.qty + delta) } : i)
      .filter(i => i.qty > 0)
    );
  };

  const updatePrice = (productId, val) => {
    setItems(prev => prev.map(i => i.productId === productId ? { ...i, price: Number(val) || 0 } : i));
  };

  const removeItem = (productId) => {
    setItems(prev => prev.filter(i => i.productId !== productId));
  };

  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.emoji && p.emoji.includes(search))
  ).slice(0, 8);

  const handlePrint = () => {
    const content = printRef.current;
    const win = window.open('', '_blank');
    win.document.write(`
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <title>فاتورة - صِوار SWAR</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: 'Cairo', sans-serif; direction: rtl; padding: 30px; color: #1e293b; background: white; }
          .header { text-align: center; margin-bottom: 24px; border-bottom: 3px solid #0ea5e9; padding-bottom: 16px; }
          .header h1 { font-size: 28px; font-weight: 900; color: #0369a1; letter-spacing: -1px; }
          .header .sub { font-size: 13px; color: #64748b; margin-top: 4px; }
          .meta { display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 13px; color: #475569; }
          .meta strong { color: #1e293b; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px; }
          thead tr { background: #0ea5e9; color: white; }
          th, td { padding: 10px 12px; text-align: right; border-bottom: 1px solid #e2e8f0; }
          tfoot tr { font-weight: 900; background: #f1f5f9; }
          tfoot td { border-top: 2px solid #0ea5e9; font-size: 16px; }
          .total-row td { color: #0369a1; font-size: 18px; }
          .notes { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; font-size: 13px; color: #475569; margin-bottom: 16px; }
          .footer { text-align: center; font-size: 11px; color: #94a3b8; margin-top: 30px; }
          @media print { body { padding: 15px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🧊 صِـوار SWAR</h1>
          <div class="sub">منظومة جرد وإدارة المجمدات</div>
        </div>
        <div class="meta">
          <div>
            <div>📋 فاتورة مبيعات</div>
            ${customerName ? `<div><strong>العميل:</strong> ${customerName}</div>` : ''}
          </div>
          <div>
            <div><strong>التاريخ:</strong> ${new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            <div><strong>الوقت:</strong> ${new Date().toLocaleTimeString('ar-EG')}</div>
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
            ${items.map((item, idx) => `
              <tr>
                <td>${idx + 1}</td>
                <td>${item.name}</td>
                <td>${item.unit}</td>
                <td>${item.qty}</td>
                <td>${item.price.toFixed(2)} ج</td>
                <td>${(item.qty * item.price).toFixed(2)} ج</td>
              </tr>
            `).join('')}
          </tbody>
          <tfoot>
            <tr class="total-row">
              <td colspan="5">💰 الإجمالي الكلي</td>
              <td>${total.toFixed(2)} جنيه</td>
            </tr>
          </tfoot>
        </table>
        ${notes ? `<div class="notes">📝 ملاحظات: ${notes}</div>` : ''}
        <div class="footer">Developed By Ahmed Swar & Zyad Elleathy — صِـوار SWAR Inventory System</div>
        <script>window.onload = function() { window.print(); }</script>
      </body>
      </html>
    `);
    win.document.close();
  };

  const handleReset = () => {
    setItems([]);
    setCustomerName('');
    setNotes('');
    setSearch('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-fade-in no-print overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 my-auto flex flex-col max-h-[95vh]">

        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-violet-900 to-indigo-900 text-white rounded-t-3xl shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
              <Receipt className="w-5 h-5 text-violet-200" />
            </div>
            <div>
              <h2 className="text-base font-black">إنشاء فاتورة</h2>
              <p className="text-xs text-violet-300">أضف الأصناف وحدد الكميات والأسعار</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20"><X className="w-5 h-5" /></button>
        </div>

        <div className="overflow-y-auto flex-1 p-4 sm:p-5 space-y-4">

          {/* Customer Name */}
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">اسم العميل (اختياري)</label>
            <input
              type="text"
              value={customerName}
              onChange={e => setCustomerName(e.target.value)}
              placeholder="اسم العميل أو الجهة..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {/* Product Search & Add */}
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">🔍 ابحث وأضف صنفاً للفاتورة</label>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="ابحث باسم المنتج..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-violet-500"
            />
            {search && filteredProducts.length > 0 && (
              <div className="mt-1 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg overflow-hidden max-h-52 overflow-y-auto">
                {filteredProducts.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => addItem(p)}
                    className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-violet-50 dark:hover:bg-slate-800 text-sm border-b border-slate-100 dark:border-slate-800 last:border-0 transition-colors"
                  >
                    <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-white">
                      <span className="text-lg">{p.emoji || '🧊'}</span>
                      <span>{p.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      {p.price ? <span className="text-amber-600 font-bold">{p.price} ج</span> : <span>بدون سعر</span>}
                      <Plus className="w-4 h-4 text-violet-600" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Items Table */}
          {items.length === 0 ? (
            <div className="py-10 text-center text-slate-400 text-sm">
              <Receipt className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p>ابدأ بالبحث وإضافة الأصناف للفاتورة</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-950 text-xs text-slate-500 font-bold">
                  <tr>
                    <th className="text-right px-3 py-2">الصنف</th>
                    <th className="text-center px-2 py-2 w-28">الكمية</th>
                    <th className="text-center px-2 py-2 w-28">السعر</th>
                    <th className="text-center px-2 py-2 w-24">الإجمالي</th>
                    <th className="w-8"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item.productId} className="border-t border-slate-100 dark:border-slate-800">
                      <td className="px-3 py-2 font-bold text-slate-800 dark:text-white">{item.name}</td>
                      <td className="px-2 py-2">
                        <div className="flex items-center justify-center gap-1">
                          <button onClick={() => updateQty(item.productId, -1)} className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 flex items-center justify-center">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-black">{item.qty}</span>
                          <button onClick={() => updateQty(item.productId, 1)} className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 flex items-center justify-center">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                      <td className="px-2 py-2">
                        <input
                          type="number"
                          min="0"
                          value={item.price}
                          onChange={e => updatePrice(item.productId, e.target.value)}
                          className="w-full text-center font-bold py-1 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 outline-none text-xs"
                        />
                      </td>
                      <td className="px-2 py-2 text-center font-black text-amber-700 dark:text-amber-400">
                        {(item.qty * item.price).toFixed(0)} ج
                      </td>
                      <td className="px-1 py-2">
                        <button onClick={() => removeItem(item.productId)} className="p-1 text-slate-400 hover:text-rose-600">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-violet-50 dark:bg-violet-950/30 border-t-2 border-violet-200 dark:border-violet-900">
                    <td colSpan={3} className="px-3 py-3 font-black text-violet-800 dark:text-violet-300">💰 الإجمالي الكلي</td>
                    <td className="px-2 py-3 text-center font-black text-violet-900 dark:text-violet-200 text-base">{total.toFixed(0)} ج</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">ملاحظات (اختياري)</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={2}
              placeholder="ملاحظات إضافية للفاتورة..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-violet-500 resize-none"
            />
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex gap-2 shrink-0 bg-slate-50/80 dark:bg-slate-950/80 rounded-b-3xl">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-sm font-bold transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            مسح الفاتورة
          </button>
          <button
            onClick={handlePrint}
            disabled={items.length === 0}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-black shadow-md transition-all"
          >
            <Printer className="w-4 h-4" />
            🖨️ طباعة الفاتورة
          </button>
        </div>

      </div>
    </div>
  );
}
