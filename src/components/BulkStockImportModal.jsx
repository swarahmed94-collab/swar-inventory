import React, { useState, useRef, useEffect } from 'react';
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
  Sliders,
  Camera,
  Image as ImageIcon,
  SwitchCamera,
  RefreshCw
} from 'lucide-react';
import { extractTextFromPDF, parseRawInvoiceData } from '../utils/pdfParser';
import { extractTextFromImage } from '../utils/imageOcr';
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
  const [loadingText, setLoadingText] = useState('');
  const [ocrProgress, setOcrProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [fileName, setFileName] = useState('');
  const [pastedText, setPastedText] = useState('');
  const [showPaste, setShowPaste] = useState(false);

  // In-app live camera state
  const [isLiveCameraOpen, setIsLiveCameraOpen] = useState(false);
  const [cameraFacingMode, setCameraFacingMode] = useState('environment');
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Hidden native inputs
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  const [parsedItems, setParsedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRemapIdx, setActiveRemapIdx] = useState(null);

  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, []);

  if (!isOpen) return null;

  const stopCameraStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const startLiveCamera = async (facing = 'environment') => {
    stopCameraStream();
    setIsLiveCameraOpen(true);
    setErrorMsg('');
    try {
      const constraints = {
        video: {
          facingMode: { ideal: facing },
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setIsLiveCameraOpen(false);
      if (cameraInputRef.current) {
        cameraInputRef.current.click();
      }
    }
  };

  const captureLivePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    stopCameraStream();
    setIsLiveCameraOpen(false);

    canvas.toBlob(blob => {
      if (blob) {
        handleImageFile(blob, 'صورة جرد ملتقطة بالكاميرا');
      }
    }, 'image/jpeg', 0.95);
  };

  const processImportData = (rawList) => {
    if (!rawList || rawList.length === 0) {
      setErrorMsg('لم يتم التعرف على أصناف في الملف/الصورة. يرجى مراجعة تنسيق البيانات أو إعادة التصوير.');
      setIsLoading(false);
      return;
    }

    const rows = rawList.map((item, idx) => {
      const match = autoMatchProduct(item.rawName, catalog);
      const currentStock = match.matchedProduct ? Number(match.matchedProduct.currentStock) || 0 : 0;
      const importedQty = item.qty !== undefined && !isNaN(Number(item.qty)) ? Number(item.qty) : 0;

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

  const handleImageFile = async (fileOrBlob, customName = '') => {
    setIsLoading(true);
    setOcrProgress(0);
    setLoadingText('جاري قراءة نصوص صورة كشف الجرد بالذكاء الاصطناعي (OCR)...');
    setErrorMsg('');
    setFileName(customName || fileOrBlob.name || 'صورة جرد');

    try {
      const lines = await extractTextFromImage(fileOrBlob, progress => {
        setOcrProgress(progress);
      });
      const list = parseRawInvoiceData(lines);
      processImportData(list);
    } catch (err) {
      setErrorMsg(err.message || 'فشل في استخراج نصوص كشف الجرد من الصورة.');
      setIsLoading(false);
    }
  };

  const handleGenericFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg('');
    setFileName(file.name);

    if (file.type.startsWith('image/')) {
      handleImageFile(file);
    } else if (file.name.toLowerCase().endsWith('.pdf')) {
      setIsLoading(true);
      setLoadingText('جاري قراءة ملف الـ PDF واستخراج قائمة الأصناف...');
      try {
        const lines = await extractTextFromPDF(file);
        const list = parseRawInvoiceData(lines);
        processImportData(list);
      } catch (err) {
        setErrorMsg(err.message || 'فشل في قراءة ملف المخزون PDF.');
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      setLoadingText('جاري قراءة الملف...');
      try {
        const text = await file.text();
        const list = parseRawInvoiceData(text);
        processImportData(list);
      } catch (err) {
        setErrorMsg('فشل في معالجة الملف.');
        setIsLoading(false);
      }
    }
  };

  const handlePasteSubmit = () => {
    if (!pastedText.trim()) return;
    setIsLoading(true);
    setLoadingText('جاري معالجة النص ومطابقة الأصناف...');
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
              <h2 className="text-base sm:text-lg font-black">الاستيراد والتحديث المجمع للمخزون (PDF / صور / كاميرا)</h2>
              <p className="text-xs text-sky-200/80">استيراد وتحديث كميات المخزن بضغطة واحدة من ملف PDF، صورة، أو تصوير بالكاميرا</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hidden inputs */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleGenericFileChange}
          className="hidden"
        />
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          onChange={handleGenericFileChange}
          className="hidden"
        />
        <input
          ref={pdfInputRef}
          type="file"
          accept=".pdf,.txt,.csv"
          onChange={handleGenericFileChange}
          className="hidden"
        />

        {/* LIVE CAMERA OVERLAY */}
        {isLiveCameraOpen && (
          <div className="p-4 sm:p-6 flex flex-col items-center justify-center bg-black text-white flex-1 space-y-4">
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden bg-slate-900 border-2 border-sky-500 shadow-2xl flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-8 inset-y-12 border-2 border-dashed border-sky-400/60 rounded-2xl pointer-events-none flex items-center justify-center">
                <span className="text-[11px] font-bold bg-black/60 px-3 py-1 rounded-full text-sky-300">
                  وجّه الكاميرا نحو كشف الجرد
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  const nextMode = cameraFacingMode === 'environment' ? 'user' : 'environment';
                  setCameraFacingMode(nextMode);
                  startLiveCamera(nextMode);
                }}
                className="p-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-all shadow-md"
              >
                <SwitchCamera className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={captureLivePhoto}
                className="w-16 h-16 rounded-full bg-sky-500 hover:bg-sky-400 text-white shadow-xl shadow-sky-500/50 flex items-center justify-center border-4 border-white active:scale-95 transition-all"
              >
                <Camera className="w-8 h-8" />
              </button>

              <button
                type="button"
                onClick={() => { stopCameraStream(); setIsLiveCameraOpen(false); }}
                className="p-3.5 rounded-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 1: UPLOAD */}
        {step === 'upload' && !isLiveCameraOpen && (
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h3 className="text-lg font-black text-slate-800 dark:text-white">اختر طريقة رفع كشف البضاعة أو الجرد</h3>
              <p className="text-xs text-slate-500">
                يمكنك تصوير كشف البضاعة بالكاميرا، اختيار صورة من المعرض، أو رفع ملف PDF/إكسيل لمطابقة الأرصدة تلقائياً.
              </p>
            </div>

            {/* 3 Action Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              
              <button
                type="button"
                onClick={() => startLiveCamera('environment')}
                className="p-6 rounded-3xl bg-gradient-to-b from-sky-50 to-indigo-50 dark:from-sky-950/40 dark:to-indigo-950/20 border-2 border-sky-300 dark:border-sky-700/60 hover:border-sky-500 hover:shadow-xl transition-all flex flex-col items-center text-center gap-3 group active:scale-95"
              >
                <div className="w-14 h-14 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-lg shadow-sky-600/30 group-hover:scale-110 transition-transform">
                  <Camera className="w-7 h-7" />
                </div>
                <div>
                  <div className="font-black text-sm text-slate-900 dark:text-white">📸 تصوير بالكاميرا</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">تصوير فوري لكشف الجرد الورقي</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                className="p-6 rounded-3xl bg-gradient-to-b from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/20 border-2 border-indigo-300 dark:border-indigo-700/60 hover:border-indigo-500 hover:shadow-xl transition-all flex flex-col items-center text-center gap-3 group active:scale-95"
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-7 h-7" />
                </div>
                <div>
                  <div className="font-black text-sm text-slate-900 dark:text-white">🖼️ معرض الصور</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">اختيار صورة محفوظة (JPG/PNG)</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => pdfInputRef.current?.click()}
                className="p-6 rounded-3xl bg-gradient-to-b from-teal-50 to-emerald-50 dark:from-teal-950/40 dark:to-emerald-950/20 border-2 border-teal-300 dark:border-teal-700/60 hover:border-teal-500 hover:shadow-xl transition-all flex flex-col items-center text-center gap-3 group active:scale-95"
              >
                <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-lg shadow-teal-600/30 group-hover:scale-110 transition-transform">
                  <Upload className="w-7 h-7" />
                </div>
                <div>
                  <div className="font-black text-sm text-slate-900 dark:text-white">📄 ملفات PDF</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">ملف PDF أو CSV أو نص</div>
                </div>
              </button>

            </div>

            {/* Dropzone */}
            <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-sky-500 rounded-3xl p-6 text-center bg-slate-50/50 dark:bg-slate-950/30 transition-all cursor-pointer max-w-3xl mx-auto">
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.webp,.txt,.csv"
                onChange={handleGenericFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                أو اسحب وأفلت أي ملف PDF أو صورة هنا
              </span>
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
                <div className="mt-3 space-y-3 animate-fade-in max-w-3xl mx-auto">
                  <textarea
                    rows={5}
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
              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center gap-2 max-w-3xl mx-auto">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {isLoading && (
              <div className="flex flex-col items-center justify-center p-8 gap-3 max-w-md mx-auto">
                <RefreshCw className="w-9 h-9 text-sky-600 animate-spin" />
                <div className="text-center">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{loadingText || 'جاري استخراج البيانات والمطابقة...'}</p>
                  {ocrProgress > 0 && (
                    <div className="w-48 bg-slate-200 dark:bg-slate-800 rounded-full h-2 mt-2 overflow-hidden mx-auto">
                      <div className="bg-sky-500 h-full transition-all duration-300" style={{ width: `${ocrProgress}%` }}></div>
                    </div>
                  )}
                </div>
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
                    <th className="p-2.5">اسم الصنف في الملف / الصورة</th>
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
                تغيير الملف / الصورة
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
