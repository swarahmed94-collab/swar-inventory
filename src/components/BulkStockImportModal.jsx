import React, { useState, useMemo } from 'react';
import { 
  X, 
  Upload, 
  FileSpreadsheet, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  TrendingUp, 
  Layers, 
  Check, 
  Trash2, 
  Edit3, 
  Search, 
  Sparkles,
  Sliders
} from 'lucide-react';
import { extractTextFromPDF, parseRawInvoiceData } from '../utils/pdfParser';
import { autoMatchProduct } from '../utils/fuzzyMatcher';
import { INITIAL_PRODUCTS } from '../data/defaultProducts';
import { sounds } from '../utils/sound';
import confetti from 'canvas-confetti';

export default function BulkStockImportModal({
  isOpen,
  products = [],
  isAdmin = false,
  onClose,
  onBulkUpdateStock, // ({ items, mode: 'add' | 'set', sourceName }) => void
  onOpenAdminModal
}) {
  const catalog = (Array.isArray(products) && products.length > 0) ? products : INITIAL_PRODUCTS;
  const [step, setStep] = useState('upload'); // 'upload' | 'preview'
  const [importMode, setImportMode] = useState('add'); // 'add' (إضافة على الحالي) | 'set' (تعيين كرصيد فعلي جديد)
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fileName, setFileName] = useState('');
  const [pastedText, setPastedText] = useState('');
  const [showPaste, setShowPaste] = useState(false);

  const [parsedItems, setParsedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRemapIdx, setActiveRemapIdx] = useState(null);

  if (!isOpen) return null;

  const processImportData = (rawList) => {
    if (!rawList || rawList.length === 0) {
      setErrorMsg('لم يتم التعرف على أصناف في الملف. يرجى مراجعة تنسيق البيانات.');
      setIsLoading(false);
      return;
    }

    const rows = rawList.map((item, idx) => {
      const match = autoMatchProduct(item.rawName, catalog);
      const currentStock = match.matchedProduct ? Number(match.matchedProduct.currentStock) || 0 : 0;
      const importedQty = Number(item.qty) || 0;

      return {
        id: 'bulk-row-' + idx + '-' + Date.now(),
        rawName: item.rawName,
        matchedProduct: match.matchedProduct,
        matchConfidence: match.confidence,
        matchScore: match.score,
        currentStock,
        importQty: importedQty,
        unit: match.matchedProduct ? match.matchedProduct.unit : 'وحدة',
        selected: true
      };
    });

    setParsedItems(rows);
    setStep('preview');
    setIsLoading(false);
    sounds.playSuccess();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setErrorMsg('');
    setFileName(file.name);

    try {
      if (file.name.toLowerCase().endsWith('.pdf')) {
        const lines = await extractTextFromPDF(file);
        const list = parseRawInvoiceData(lines);
        processImportData(list);
      } else {
        const text = await file.text();
        const list = parseRawInvoiceData(text);
        processImportData(list);
      }
    } catch (err) {
      setErrorMsg(err.message || 'فشل في قراءة ملف المخزون.');
      setIsLoading(false);
    }
  };

  const handlePasteSubmit = () => {
    if (!pastedText.trim()) return;
    setIsLoading(true);
    setErrorMsg('');
    setFileName('بيانات مضافة يدوياً');

    try {
      const list = parseRawInvoiceData(pastedText);
      processImportData(list);
    } catch (err) {
      setErrorMsg('فشل في معالجة النص.');
      setIsLoading(false);
    }
  };

  const handleRemap = (rowIndex, product) => {
    setParsedItems(prev => prev.map((r, i) => {
      if (i !== rowIndex) return r;
      return {
        ...r,
        matchedProduct: product,
        matchConfidence: 'high',
        matchScore: 1.0,
        currentStock: Number(product.currentStock) || 0,
        unit: product.unit || r.unit
      };
    }));
    setActiveRemapIdx(null);
  };

  const handleQtyChange = (index, val) => {
    setParsedItems(prev => prev.map((r, i) => i === index ? { ...r, importQty: Number(val) || 0 } : r));
  };

  const handleToggleSelectAll = (checked) => {
    setParsedItems(prev => prev.map(r => ({ ...r, selected: checked })));
  };

  const handleRemove = (index) => {
    setParsedItems(prev => prev.filter((_, i) => i !== index));
  };

  // Calculations
  const selectedItems = parsedItems.filter(r => r.selected);
  const matchedSelected = selectedItems.filter(r => r.matchedProduct);
  const totalImportQuantity = selectedItems.reduce((s, r) => s + (Number(r.importQty) || 0), 0);

  const handleCommitBulkImport = () => {
    if (!isAdmin) {
      if (onOpenAdminModal) onOpenAdminModal();
      return;
    }

    if (matchedSelected.length === 0) {
      alert('يرجى اختيار أصناف مربوطة بنجاح مع النظام.');
      return;
    }

    const payload = matchedSelected.map(r => ({
      productId: r.matchedProduct.id,
      name: r.matchedProduct.name,
      currentStock: r.currentStock,
      importQty: r.importQty,
      newStock: importMode === 'add' ? (r.currentStock + r.importQty) : r.importQty,
      delta: importMode === 'add' ? r.importQty : (r.importQty - r.currentStock),
      unit: r.unit
    }));

    if (onBulkUpdateStock) {
      onBulkUpdateStock({
        items: payload,
        mode: importMode,
        sourceName: fileName || 'استيراد بضاعة مجمع'
      });
    }

    confetti({ particleCount: 70, spread: 60 });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/75 backdrop-blur-sm animate-fade-in no-print overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 my-auto flex flex-col max-h-[95vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-sky-900 via-indigo-900 to-slate-900 text-white rounded-t-3xl shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center shadow-inner">
              <Layers className="w-6 h-6 text-sky-300" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black">الاستيراد والتحديث المجمع للمخزون</h2>
              <p className="text-xs text-sky-200/80">استيراد ملف بضاعة أو جرد خارجي كامل وتحديث كميات المخزن بضغطة واحدة</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: UPLOAD */}
        {step === 'upload' && (
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h3 className="text-lg font-black text-slate-800 dark:text-white">ارفع ملف البضاعة المستخرج من نظامك الآخر</h3>
              <p className="text-xs text-slate-500">
                يدعم ملفات PDF، ملفات Excel المصدرة كـ CSV، أو الجداول النصية. ستتم مراجعة الفروقات والكميات قبل الاعتماد النهائي.
              </p>
            </div>

            {/* Dropzone */}
            <div className="relative border-2 border-dashed border-sky-300 dark:border-sky-700/60 hover:border-sky-500 rounded-3xl p-8 sm:p-12 text-center bg-sky-50/40 dark:bg-sky-950/20 transition-all cursor-pointer group">
              <input
                type="file"
                accept=".pdf,.txt,.csv"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-3xl bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-sm font-black text-slate-800 dark:text-slate-200">
                    اضغط لاختيار ملف البضاعة أو اسحبه هنا
                  </span>
                  <p className="text-xs text-slate-400 mt-1">PDF, CSV, TXT</p>
                </div>
              </div>
            </div>

            {/* Paste alternative */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
              <button
                type="button"
                onClick={() => setShowPaste(!showPaste)}
                className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1.5 mx-auto"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>{showPaste ? 'إخفاء لصق النص' : 'أو الصق قائمة الأصناف والكميات كنص'}</span>
              </button>

              {showPaste && (
                <div className="mt-3 space-y-3 animate-fade-in">
                  <textarea
                    rows={6}
                    value={pastedText}
                    onChange={e => setPastedText(e.target.value)}
                    placeholder="الصق النص هنا (مثال: كفتة اطياب 1 كجم | الكمية: 20)"
                    className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <button
                    type="button"
                    onClick={handlePasteSubmit}
                    disabled={!pastedText.trim()}
                    className="w-full py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-black text-xs shadow-md transition-all"
                  >
                    ⚡ معالجة ومطابقة القائمة
                  </button>
                </div>
              )}
            </div>

            {errorMsg && (
              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: PREVIEW & MODE SELECTION */}
        {step === 'preview' && (
          <div className="flex flex-col flex-1 overflow-hidden">
            
            {/* Import Mode Selector & Stats */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              
              {/* Mode toggle */}
              <div className="flex p-1 rounded-2xl bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setImportMode('add')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                    importMode === 'add'
                      ? 'bg-sky-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>➕ إضافة على الرصيد الحالي (شراء وتوريد)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setImportMode('set')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                    importMode === 'set'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>🎯 تعيين كرصيد فعلي جديد (تعديل مباشر)</span>
                </button>
              </div>

              {/* Summary */}
              <div className="flex items-center gap-4 text-xs font-bold">
                <span className="text-slate-500">الأصناف المحددة: <strong className="text-slate-900 dark:text-white">{matchedSelected.length}</strong></span>
                <span className="text-slate-500">إجمالي الكميات: <strong className="text-sky-600 dark:text-sky-400">{totalImportQuantity}</strong></span>
              </div>

            </div>

            {/* Table */}
            <div className="flex-1 overflow-y-auto p-4">
              <table className="w-full text-xs text-right border-collapse">
                <thead className="bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 sticky top-0 z-10 font-bold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-2.5 w-10 text-center">
                      <input
                        type="checkbox"
                        checked={selectedItems.length === parsedItems.length && parsedItems.length > 0}
                        onChange={e => handleToggleSelectAll(e.target.checked)}
                        className="rounded text-sky-600"
                      />
                    </th>
                    <th className="p-2.5">اسم الصنف في الملف</th>
                    <th className="p-2.5">الصنف المطابق في المنظومة</th>
                    <th className="p-2.5 w-24 text-center">الرصيد الحالي</th>
                    <th className="p-2.5 w-28 text-center">{importMode === 'add' ? 'الكمية المضافة (+)' : 'الرصيد الجديد'}</th>
                    <th className="p-2.5 w-24 text-center">الرصيد بعد التحديث</th>
                    <th className="p-2.5 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {parsedItems.map((row, idx) => {
                    const isRemapping = activeRemapIdx === idx;
                    const finalStock = importMode === 'add' ? (row.currentStock + row.importQty) : row.importQty;

                    return (
                      <tr key={row.id} className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors ${!row.selected ? 'opacity-40' : ''}`}>
                        <td className="p-2.5 text-center">
                          <input
                            type="checkbox"
                            checked={row.selected}
                            onChange={e => setParsedItems(prev => prev.map((r, i) => i === idx ? { ...r, selected: e.target.checked } : r))}
                            className="rounded text-sky-600"
                          />
                        </td>

                        <td className="p-2.5 font-bold text-slate-800 dark:text-slate-200">
                          {row.rawName}
                        </td>

                        <td className="p-2.5 relative">
                          {row.matchedProduct ? (
                            <div className="flex items-center justify-between gap-2 p-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                              <div className="flex items-center gap-2 truncate">
                                <span>{row.matchedProduct.emoji || '📦'}</span>
                                <span className="font-bold text-slate-900 dark:text-white truncate">{row.matchedProduct.name}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => setActiveRemapIdx(isRemapping ? null : idx)}
                                className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between gap-2 p-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900">
                              <span className="text-rose-600 text-[11px] font-bold">غير مربوط</span>
                              <button
                                type="button"
                                onClick={() => setActiveRemapIdx(isRemapping ? null : idx)}
                                className="px-2 py-0.5 bg-sky-600 text-white rounded-lg text-[10px] font-bold"
                              >
                                اختيار صنف
                              </button>
                            </div>
                          )}

                          {isRemapping && (
                            <div className="absolute top-full right-0 left-0 z-30 mt-1 p-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 max-h-52 overflow-y-auto">
                              <input
                                type="text"
                                autoFocus
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="ابحث في الكتالوج..."
                                className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 outline-none mb-1"
                              />
                              {catalog
                                .filter(p => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                .slice(0, 7)
                                .map(p => (
                                  <button
                                    key={p.id}
                                    type="button"
                                    onClick={() => handleRemap(idx, p)}
                                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-sky-50 dark:hover:bg-slate-800 text-right text-xs"
                                  >
                                    <span>{p.name}</span>
                                    <span className="text-[10px] text-slate-400">{p.unit}</span>
                                  </button>
                                ))}
                            </div>
                          )}
                        </td>

                        <td className="p-2.5 text-center font-mono text-slate-500">
                          {row.currentStock} {row.unit}
                        </td>

                        <td className="p-2.5 text-center">
                          <input
                            type="number"
                            step="any"
                            value={row.importQty}
                            onChange={e => handleQtyChange(idx, e.target.value)}
                            className="w-20 text-center py-1 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-black text-xs outline-none focus:ring-1 focus:ring-sky-500"
                          />
                        </td>

                        <td className="p-2.5 text-center font-black text-sky-700 dark:text-sky-400 font-mono">
                          {finalStock.toFixed(2)} {row.unit}
                        </td>

                        <td className="p-2.5 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemove(idx)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded-lg"
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

            {/* Bottom Actions */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shrink-0">
              <button
                type="button"
                onClick={() => setStep('upload')}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100"
              >
                تغيير الملف
              </button>

              <button
                type="button"
                onClick={handleCommitBulkImport}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-black text-xs shadow-lg shadow-sky-600/30 flex items-center gap-2 active:scale-95 transition-all"
              >
                <CheckCircle className="w-4 h-4" />
                <span>اعتماد التحديث المجمع للمخزن ({matchedSelected.length} صنف)</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
