import React, { useState, useMemo } from 'react';
import { 
  X, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Plus, 
  Trash2, 
  Search, 
  Sparkles, 
  ArrowRight, 
  DollarSign, 
  Layers, 
  Building2, 
  Check, 
  RefreshCw,
  Edit3
} from 'lucide-react';
import { extractTextFromPDF, parseRawInvoiceData } from '../utils/pdfParser';
import { autoMatchProduct, findBestMatches } from '../utils/fuzzyMatcher';
import { INITIAL_PRODUCTS } from '../data/defaultProducts';
import { sounds } from '../utils/sound';
import confetti from 'canvas-confetti';

export default function InvoicePdfImportModal({
  isOpen,
  products = [],
  isAdmin = false,
  onClose,
  onImportComplete, // receives { items, vendorName, paymentType, recordInJournal, notes }
  onOpenAdminModal,
  onAddNewProduct
}) {
  const catalog = (Array.isArray(products) && products.length > 0) ? products : INITIAL_PRODUCTS;
  const [step, setStep] = useState('upload'); // 'upload' | 'review'
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fileName, setFileName] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [paymentType, setPaymentType] = useState('cash');
  const [recordInJournal, setRecordInJournal] = useState(true);
  const [updateProductPrices, setUpdateProductPrices] = useState(false);
  const [pastedText, setPastedText] = useState('');
  const [showPasteArea, setShowPasteArea] = useState(false);

  // Extracted and mapped items
  const [parsedRows, setParsedRows] = useState([]);
  const [searchCatalogQuery, setSearchCatalogQuery] = useState('');
  const [activeRemapIndex, setActiveRemapIndex] = useState(null);

  if (!isOpen) return null;

  const processExtractedItems = (rawItems) => {
    if (!rawItems || rawItems.length === 0) {
      setErrorMsg('لم يتم العثور على أصناف قابلة للاستخراج في الملف. يرجى تجربة لصق النص مباشرة.');
      setIsLoading(false);
      return;
    }

    const rows = rawItems.map((item, idx) => {
      const matchResult = autoMatchProduct(item.rawName, catalog);
      const extractedQty = item.qty !== undefined && !isNaN(Number(item.qty)) ? Number(item.qty) : 1;
      const extractedPrice = item.price !== undefined && !isNaN(Number(item.price)) && Number(item.price) > 0
        ? Number(item.price)
        : (matchResult.matchedProduct ? Number(matchResult.matchedProduct.price || 0) : 0);

      return {
        id: 'row-' + idx + '-' + Date.now(),
        rawName: item.rawName,
        matchedProduct: matchResult.matchedProduct,
        matchConfidence: matchResult.confidence, // 'high' | 'medium' | 'none'
        matchScore: matchResult.score,
        qty: extractedQty,
        price: extractedPrice,
        unit: matchResult.matchedProduct ? matchResult.matchedProduct.unit : 'وحدة',
        selected: true
      };
    });

    setParsedRows(rows);
    setStep('review');
    setIsLoading(false);
    sounds.playSuccess();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setErrorMsg('');
    setFileName(file.name);

    try {
      if (file.name.toLowerCase().endsWith('.pdf')) {
        const lines = await extractTextFromPDF(file);
        const rawItems = parseRawInvoiceData(lines);
        processExtractedItems(rawItems);
      } else {
        // Plain text or CSV
        const text = await file.text();
        const rawItems = parseRawInvoiceData(text);
        processExtractedItems(rawItems);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'حدث خطأ أثناء معالجة الملف.');
      setIsLoading(false);
    }
  };

  const handleProcessPastedText = () => {
    if (!pastedText.trim()) return;
    setIsLoading(true);
    setErrorMsg('');
    setFileName('نص ملصوق يدوياً');

    try {
      const rawItems = parseRawInvoiceData(pastedText);
      processExtractedItems(rawItems);
    } catch (err) {
      setErrorMsg('حدث خطأ أثناء قراءة النص.');
      setIsLoading(false);
    }
  };

  const handleRemapProduct = (rowIndex, product) => {
    setParsedRows(prev => prev.map((r, i) => {
      if (i !== rowIndex) return r;
      return {
        ...r,
        matchedProduct: product,
        matchConfidence: 'high',
        matchScore: 1.0,
        unit: product.unit || r.unit,
        price: r.price > 0 ? r.price : Number(product.price || 0)
      };
    }));
    setActiveRemapIndex(null);
  };

  const handleCreateNewProductFromRow = (row, index) => {
    if (onAddNewProduct) {
      onAddNewProduct({
        name: row.rawName,
        price: row.price || 0,
        currentStock: row.qty || 0,
        unit: row.unit || 'وحدة',
        category: 'all',
        brand: 'عام'
      });
      // Temporarily set placeholder until saved
      setParsedRows(prev => prev.map((r, i) => i === index ? { ...r, matchConfidence: 'high' } : r));
    }
  };

  const handleRowChange = (index, field, value) => {
    setParsedRows(prev => prev.map((r, i) => {
      if (i !== index) return r;
      return { ...r, [field]: value };
    }));
  };

  const handleToggleSelectAll = (checked) => {
    setParsedRows(prev => prev.map(r => ({ ...r, selected: checked })));
  };

  const handleRemoveRow = (index) => {
    setParsedRows(prev => prev.filter((_, i) => i !== index));
  };

  // Calculations
  const selectedRows = parsedRows.filter(r => r.selected);
  const totalAmount = selectedRows.reduce((sum, r) => sum + (Number(r.qty) * Number(r.price)), 0);
  const totalUnits = selectedRows.reduce((sum, r) => sum + Number(r.qty), 0);
  const highMatchCount = parsedRows.filter(r => r.matchConfidence === 'high').length;
  const mediumMatchCount = parsedRows.filter(r => r.matchConfidence === 'medium').length;
  const unmatchedCount = parsedRows.filter(r => !r.matchedProduct || r.matchConfidence === 'none').length;

  const handleFinalConfirm = () => {
    if (!isAdmin) {
      if (onOpenAdminModal) onOpenAdminModal();
      return;
    }

    if (selectedRows.length === 0) {
      alert('يرجى تحديد صنف واحد على الأقل للاستيراد.');
      return;
    }

    // Check if any selected item is unmatched
    const hasUnmatched = selectedRows.some(r => !r.matchedProduct);
    if (hasUnmatched) {
      if (!window.confirm('تنبيه: توجد بعض الأصناف المحددة غير مربوطة بمنتج في النظام. سيتم تخطي الأصناف غير المربوطة. هل ترغب في المتابعة؟')) {
        return;
      }
    }

    const validItems = selectedRows
      .filter(r => r.matchedProduct)
      .map(r => ({
        productId: r.matchedProduct.id,
        name: r.matchedProduct.name,
        unit: r.unit || r.matchedProduct.unit || 'وحدة',
        qty: Number(r.qty) || 0,
        price: Number(r.price) || 0,
        rawName: r.rawName
      }));

    if (validItems.length === 0) {
      alert('لم يتم العثور على أصناف مربوطة بنجاح.');
      return;
    }

    if (onImportComplete) {
      onImportComplete({
        items: validItems,
        vendorName: vendorName.trim() || 'مورد بضاعة (استيراد PDF)',
        paymentType,
        recordInJournal,
        updateProductPrices,
        totalAmount,
        totalUnits,
        fileName
      });
    }

    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/75 backdrop-blur-sm animate-fade-in no-print overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 my-auto flex flex-col max-h-[95vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white rounded-t-3xl shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center shadow-inner">
              <Sparkles className="w-6 h-6 text-emerald-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black">قارئ فواتير الـ PDF والمطابقة الذكية</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/30 text-emerald-200 border border-emerald-400/40">
                  AI Smart Match
                </span>
              </div>
              <p className="text-xs text-emerald-200/80">استخراج الأصناف، الأسعار والكميات ومطابقتها آلياً مع المخزون</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: UPLOAD / INPUT */}
        {step === 'upload' && (
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h3 className="text-lg font-black text-slate-800 dark:text-white">ارفع فاتورة الشراء بصيغة PDF أو ملف نصي</h3>
              <p className="text-xs text-slate-500">
                يقوم النظام بتحليل نصوص وجداول الفاتورة ومطابقة أسماء المنتجات مع كتالوج الـ 445 صنف تلقائياً حتى مع اختلاف كتابة الكلمات أو الأحجام.
              </p>
            </div>

            {/* Dropzone */}
            <div className="relative border-2 border-dashed border-emerald-300 dark:border-emerald-700/60 hover:border-emerald-500 rounded-3xl p-8 sm:p-12 text-center bg-emerald-50/40 dark:bg-emerald-950/20 transition-all cursor-pointer group">
              <input
                type="file"
                accept=".pdf,.txt,.csv"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-sm font-black text-slate-800 dark:text-slate-200">
                    اضغط لاختيار ملف الفاتورة أو اسحبه إلى هنا
                  </span>
                  <p className="text-xs text-slate-400 mt-1">يدعم ملفات PDF، CSV، والنصوص</p>
                </div>
              </div>
            </div>

            {/* Toggle Paste Raw Text */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
              <button
                type="button"
                onClick={() => setShowPasteArea(!showPasteArea)}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1.5 mx-auto"
              >
                <FileText className="w-4 h-4" />
                <span>{showPasteArea ? 'إخفاء لصق النص المباشر' : 'أو الصق نص أو جدول الفاتورة يدوياً من الواتساب / إكسيل'}</span>
              </button>

              {showPasteArea && (
                <div className="mt-3 space-y-3 animate-fade-in">
                  <textarea
                    rows={6}
                    value={pastedText}
                    onChange={e => setPastedText(e.target.value)}
                    placeholder="الصق نص الفاتورة هنا (مثال: استربس اطياب كيس | الكمية: 5 | السعر: 290)"
                    className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={handleProcessPastedText}
                    disabled={!pastedText.trim()}
                    className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-black text-xs shadow-md transition-all"
                  >
                    🚀 استخراج ومطابقة النص الملصوق
                  </button>
                </div>
              )}
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center p-8 gap-3">
                <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin" />
                <p className="text-xs font-bold text-slate-600 dark:text-slate-400">جاري قراءة الفاتورة وتشغيل خوارزمية المطابقة الذكية...</p>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: REVIEW & CONFIRM */}
        {step === 'review' && (
          <div className="flex flex-col flex-1 overflow-hidden">
            
            {/* Top Toolbar & Summary Stats */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
                <div className="text-[11px] text-slate-500 font-bold">إجمالي الأصناف</div>
                <div className="text-base font-black text-slate-800 dark:text-white">{parsedRows.length} صنف</div>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-900 text-center">
                <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold">تطابق مؤكد 🟢</div>
                <div className="text-base font-black text-emerald-800 dark:text-emerald-300">{highMatchCount}</div>
              </div>
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-900 text-center">
                <div className="text-[11px] text-amber-700 dark:text-amber-400 font-bold">تطابق مقترح 🟡</div>
                <div className="text-base font-black text-amber-800 dark:text-amber-300">{mediumMatchCount}</div>
              </div>
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-2xl border border-rose-200 dark:border-rose-900 text-center">
                <div className="text-[11px] text-rose-700 dark:text-rose-400 font-bold">غير معروف 🔴</div>
                <div className="text-base font-black text-rose-800 dark:text-rose-300">{unmatchedCount}</div>
              </div>
            </div>

            {/* Vendor & Payment Meta Form */}
            <div className="p-4 bg-white dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 shrink-0">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">اسم المورد / الشركة</label>
                <div className="relative">
                  <Building2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={vendorName}
                    onChange={e => setVendorName(e.target.value)}
                    placeholder="مثال: شركة أطياب للدواجن"
                    className="w-full pr-9 pl-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">طريقة الدفع</label>
                <select
                  value={paymentType}
                  onChange={e => setPaymentType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="cash">نقدي (كاش)</option>
                  <option value="credit">آجل (مديونية / حساب مورد)</option>
                  <option value="transfer">تحويل بنكي / إلكتروني</option>
                </select>
              </div>

              <div className="flex items-center gap-4 pt-4 sm:pt-6">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={recordInJournal}
                    onChange={e => setRecordInJournal(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>تسجيل في اليومية والخزينة</span>
                </label>
              </div>
            </div>

            {/* Main Interactive Table */}
            <div className="flex-1 overflow-y-auto p-4">
              <table className="w-full text-xs text-right border-collapse">
                <thead className="bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 sticky top-0 z-10 font-bold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-2.5 w-10 text-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.length === parsedRows.length && parsedRows.length > 0}
                        onChange={e => handleToggleSelectAll(e.target.checked)}
                        className="rounded text-emerald-600"
                      />
                    </th>
                    <th className="p-2.5">الاسم المستخرج من الفاتورة</th>
                    <th className="p-2.5">الصنف المطابق في كتالوج صِـوار</th>
                    <th className="p-2.5 w-24 text-center">الكمية</th>
                    <th className="p-2.5 w-24 text-center">سعر الوحدة</th>
                    <th className="p-2.5 w-24 text-center">الإجمالي</th>
                    <th className="p-2.5 w-12 text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {parsedRows.map((row, idx) => {
                    const isRemapping = activeRemapIndex === idx;
                    const confidenceBadge = row.matchConfidence === 'high'
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-300'
                      : row.matchConfidence === 'medium'
                      ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-300'
                      : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border-rose-300';

                    return (
                      <tr key={row.id} className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors ${!row.selected ? 'opacity-40' : ''}`}>
                        <td className="p-2.5 text-center">
                          <input
                            type="checkbox"
                            checked={row.selected}
                            onChange={e => handleRowChange(idx, 'selected', e.target.checked)}
                            className="rounded text-emerald-600"
                          />
                        </td>

                        {/* Raw name */}
                        <td className="p-2.5 font-bold text-slate-800 dark:text-slate-200">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[11px] text-slate-400">#{idx + 1}</span>
                            <span>{row.rawName}</span>
                          </div>
                        </td>

                        {/* Matched Product */}
                        <td className="p-2.5 relative">
                          {row.matchedProduct ? (
                            <div className="flex items-center justify-between gap-2 p-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                              <div className="flex items-center gap-2 overflow-hidden">
                                <span className="text-base">{row.matchedProduct.emoji || '📦'}</span>
                                <div className="truncate">
                                  <div className="font-black text-slate-900 dark:text-white truncate">{row.matchedProduct.name}</div>
                                  <div className="text-[10px] text-slate-400">الرصيد الحالي: {row.matchedProduct.currentStock} {row.matchedProduct.unit}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold border ${confidenceBadge}`}>
                                  {Math.round((row.matchScore || 0.9) * 100)}%
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setActiveRemapIndex(isRemapping ? null : idx)}
                                  className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500"
                                  title="تغيير الربط بصنف آخر"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between gap-2 p-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900">
                              <span className="text-rose-700 dark:text-rose-400 font-bold text-[11px]">لم يتم العثور على تطابق</span>
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => setActiveRemapIndex(isRemapping ? null : idx)}
                                  className="px-2 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-[10px] font-bold"
                                >
                                  ربط بصنف
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleCreateNewProductFromRow(row, idx)}
                                  className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-bold flex items-center gap-0.5"
                                >
                                  <Plus className="w-3 h-3" /> جديد
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Remap Dropdown popup */}
                          {isRemapping && (
                            <div className="absolute top-full right-0 left-0 z-30 mt-1 p-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 max-h-56 overflow-y-auto">
                              <div className="sticky top-0 bg-white dark:bg-slate-900 pb-2">
                                <input
                                  type="text"
                                  autoFocus
                                  value={searchCatalogQuery}
                                  onChange={e => setSearchCatalogQuery(e.target.value)}
                                  placeholder="ابحث في الكتالوج..."
                                  className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 outline-none"
                                />
                              </div>
                              <div className="space-y-1">
                                {catalog
                                  .filter(p => !searchCatalogQuery || p.name.toLowerCase().includes(searchCatalogQuery.toLowerCase()))
                                  .slice(0, 8)
                                  .map(p => (
                                    <button
                                      key={p.id}
                                      type="button"
                                      onClick={() => handleRemapProduct(idx, p)}
                                      className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 text-right text-xs"
                                    >
                                      <div className="flex items-center gap-2">
                                        <span>{p.emoji || '📦'}</span>
                                        <span className="font-bold text-slate-800 dark:text-slate-200">{p.name}</span>
                                      </div>
                                      <span className="text-[10px] text-slate-400">{p.unit} - {p.price} ج</span>
                                    </button>
                                  ))}
                              </div>
                            </div>
                          )}
                        </td>

                        {/* Qty */}
                        <td className="p-2.5 text-center">
                          <input
                            type="number"
                            step="any"
                            min="0"
                            value={row.qty}
                            onChange={e => handleRowChange(idx, 'qty', e.target.value)}
                            className="w-20 text-center py-1 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-black text-xs outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </td>

                        {/* Price */}
                        <td className="p-2.5 text-center">
                          <input
                            type="number"
                            step="any"
                            min="0"
                            value={row.price}
                            onChange={e => handleRowChange(idx, 'price', e.target.value)}
                            className="w-20 text-center py-1 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-black text-xs outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </td>

                        {/* Total */}
                        <td className="p-2.5 text-center font-black text-emerald-700 dark:text-emerald-400">
                          {(Number(row.qty || 0) * Number(row.price || 0)).toFixed(2)} ج
                        </td>

                        {/* Actions */}
                        <td className="p-2.5 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveRow(idx)}
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
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

            {/* Bottom Execution Bar */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-[11px] text-slate-500 font-bold">إجمالي كميات الشراء:</div>
                  <div className="text-sm font-black text-slate-800 dark:text-white">{totalUnits.toFixed(2)} وحدة</div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 font-bold">إجمالي الفاتورة:</div>
                  <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">{totalAmount.toFixed(2)} جنيه</div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setStep('upload')}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  إعادة رفع ملف آخر
                </button>

                <button
                  type="button"
                  onClick={handleFinalConfirm}
                  className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تأكيد واستيراد الفاتورة للمخزن ({selectedRows.length})</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
