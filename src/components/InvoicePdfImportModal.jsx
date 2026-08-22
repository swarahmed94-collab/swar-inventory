import React, { useState, useRef, useEffect } from 'react';
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
  Edit3,
  Camera,
  Image as ImageIcon,
  SwitchCamera
} from 'lucide-react';
import { extractTextFromPDF, parseRawInvoiceData } from '../utils/pdfParser';
import { extractTextFromImage } from '../utils/imageOcr';
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
  const [loadingText, setLoadingText] = useState('');
  const [ocrProgress, setOcrProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [fileName, setFileName] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [paymentType, setPaymentType] = useState('cash');
  const [recordInJournal, setRecordInJournal] = useState(true);
  const [updateProductPrices, setUpdateProductPrices] = useState(false);
  const [pastedText, setPastedText] = useState('');
  const [showPasteArea, setShowPasteArea] = useState(false);

  // In-app live camera state
  const [isLiveCameraOpen, setIsLiveCameraOpen] = useState(false);
  const [cameraFacingMode, setCameraFacingMode] = useState('environment'); // 'environment' (back) | 'user' (front)
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Hidden native inputs
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  // Extracted and mapped items
  const [parsedRows, setParsedRows] = useState([]);
  const [searchCatalogQuery, setSearchCatalogQuery] = useState('');
  const [activeRemapIndex, setActiveRemapIndex] = useState(null);

  // Clean up camera stream on close
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
      console.warn('Live camera access error:', err);
      // Fallback directly to native camera input
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
        handleImageFile(blob, 'صورة ملتقطة بالكاميرا');
      }
    }, 'image/jpeg', 0.95);
  };

  const processExtractedItems = (rawItems) => {
    if (!rawItems || rawItems.length === 0) {
      setErrorMsg('لم يتم العثور على أصناف قابلة للاستخراج في الملف/الصورة. يرجى تجربة تصوير الفاتورة بإضاءة أوضح أو لصق النص.');
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

  const handleImageFile = async (fileOrBlob, customName = '') => {
    setIsLoading(true);
    setOcrProgress(0);
    setLoadingText('جاري التعرف على نصوص الفاتورة بالذكاء الاصطناعي (OCR)...');
    setErrorMsg('');
    setFileName(customName || fileOrBlob.name || 'صورة فاتورة');

    try {
      const lines = await extractTextFromImage(fileOrBlob, progress => {
        setOcrProgress(progress);
      });
      const rawItems = parseRawInvoiceData(lines);
      processExtractedItems(rawItems);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'فشل في استخراج نصوص الفاتورة من الصورة.');
      setIsLoading(false);
    }
  };

  const handleGenericFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input value so re-uploading the same file works
    e.target.value = '';

    setErrorMsg('');
    setFileName(file.name || 'ملف فاتورة');

    const fileNameLower = (file.name || '').toLowerCase();
    const fileType = (file.type || '').toLowerCase();

    const isPdf = fileType === 'application/pdf' || 
                  fileType === 'application/x-pdf' || 
                  fileType.includes('pdf') || 
                  fileNameLower.endsWith('.pdf');

    const isImage = fileType.startsWith('image/') || 
                    /\.(jpg|jpeg|png|webp|bmp|gif|heic|heif)$/i.test(fileNameLower);

    if (isImage) {
      handleImageFile(file);
    } else if (isPdf) {
      setIsLoading(true);
      setLoadingText('جاري قراءة ملف الـ PDF واستخراج الجداول...');
      try {
        const lines = await extractTextFromPDF(file);
        const rawItems = parseRawInvoiceData(lines);
        processExtractedItems(rawItems);
      } catch (err) {
        console.error('PDF parsing error:', err);
        setErrorMsg(err.message || 'حدث خطأ أثناء معالجة ملف الـ PDF.');
        setIsLoading(false);
      }
    } else {
      // Plain text or CSV
      setIsLoading(true);
      setLoadingText('جاري معالجة الملف...');
      try {
        const text = await file.text();
        const rawItems = parseRawInvoiceData(text);
        processExtractedItems(rawItems);
      } catch (err) {
        console.error('File reading error:', err);
        setErrorMsg('حدث خطأ أثناء قراءة الملف.');
        setIsLoading(false);
      }
    }
  };

  const handleProcessPastedText = () => {
    if (!pastedText.trim()) return;
    setIsLoading(true);
    setLoadingText('جاري معالجة النص ومطابقة الأصناف...');
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
        vendorName: vendorName.trim() || 'مورد بضاعة (استيراد فواتير)',
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
                <h2 className="text-base sm:text-lg font-black">قارئ ومستخرج الفواتير الذكي (PDF / صور / كاميرا)</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/30 text-emerald-200 border border-emerald-400/40">
                  OCR & PDF Engine
                </span>
              </div>
              <p className="text-xs text-emerald-200/80">تصوير بالكاميرا، اختيار من المعرض، أو رفع ملفات PDF والمطابقة التلقائية</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hidden Native File & Camera Inputs */}
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
          accept=".pdf,application/pdf,.csv,text/csv,.txt,text/plain"
          onChange={handleGenericFileChange}
          className="hidden"
        />

        {/* LIVE CAMERA OVERLAY MODAL */}
        {isLiveCameraOpen && (
          <div className="p-4 sm:p-6 flex flex-col items-center justify-center bg-black text-white flex-1 space-y-4">
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden bg-slate-900 border-2 border-emerald-500 shadow-2xl flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-8 inset-y-12 border-2 border-dashed border-emerald-400/60 rounded-2xl pointer-events-none flex items-center justify-center">
                <span className="text-[11px] font-bold bg-black/60 px-3 py-1 rounded-full text-emerald-300">
                  وجّه الكاميرا نحو جدول الفاتورة
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
                title="تبديل الكاميرا"
              >
                <SwitchCamera className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={captureLivePhoto}
                className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-xl shadow-emerald-500/50 flex items-center justify-center border-4 border-white active:scale-95 transition-all"
                title="التقاط الصورة"
              >
                <Camera className="w-8 h-8" />
              </button>

              <button
                type="button"
                onClick={() => { stopCameraStream(); setIsLiveCameraOpen(false); }}
                className="p-3.5 rounded-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 transition-all"
                title="إلغاء الكاميرا"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 1: UPLOAD / CAMERA / GALLERY */}
        {step === 'upload' && !isLiveCameraOpen && (
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h3 className="text-lg font-black text-slate-800 dark:text-white">اختر طريقة إدخال الفاتورة</h3>
              <p className="text-xs text-slate-500">
                يمكنك تصوير الفاتورة الورقية بالكاميرا مباشرة، اختيار صورة من المعرض، أو رفع ملف PDF ليتم استخراج الأصناف والأسعار فوراً.
              </p>
            </div>

            {/* 3 Main Action Cards: Camera, Gallery, PDF */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              
              {/* 1. Camera Photo */}
              <button
                type="button"
                onClick={() => startLiveCamera('environment')}
                className="p-6 rounded-3xl bg-gradient-to-b from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/20 border-2 border-emerald-300 dark:border-emerald-700/60 hover:border-emerald-500 hover:shadow-xl transition-all flex flex-col items-center text-center gap-3 group active:scale-95"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 group-hover:scale-110 transition-transform">
                  <Camera className="w-7 h-7" />
                </div>
                <div>
                  <div className="font-black text-sm text-slate-900 dark:text-white">📸 تصوير بالكاميرا</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">التقاط صورة فورية للفاتورة الورقية</div>
                </div>
              </button>

              {/* 2. Photo Gallery */}
              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                className="p-6 rounded-3xl bg-gradient-to-b from-sky-50 to-indigo-50 dark:from-sky-950/40 dark:to-indigo-950/20 border-2 border-sky-300 dark:border-sky-700/60 hover:border-sky-500 hover:shadow-xl transition-all flex flex-col items-center text-center gap-3 group active:scale-95"
              >
                <div className="w-14 h-14 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-lg shadow-sky-600/30 group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-7 h-7" />
                </div>
                <div>
                  <div className="font-black text-sm text-slate-900 dark:text-white">🖼️ معرض الصور</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">اختيار صورة محفوظة (JPG/PNG)</div>
                </div>
              </button>

              {/* 3. PDF & Documents */}
              <button
                type="button"
                onClick={() => pdfInputRef.current?.click()}
                className="p-6 rounded-3xl bg-gradient-to-b from-violet-50 to-purple-50 dark:from-violet-950/40 dark:to-purple-950/20 border-2 border-violet-300 dark:border-violet-700/60 hover:border-violet-500 hover:shadow-xl transition-all flex flex-col items-center text-center gap-3 group active:scale-95"
              >
                <div className="w-14 h-14 rounded-2xl bg-violet-600 text-white flex items-center justify-center shadow-lg shadow-violet-600/30 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <div>
                  <div className="font-black text-sm text-slate-900 dark:text-white">📄 ملفات PDF</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">رفع ملف PDF أو جدول إكسيل</div>
                </div>
              </button>

            </div>

            {/* Dropzone for any file */}
            <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-emerald-500 rounded-3xl p-6 text-center bg-slate-50/50 dark:bg-slate-950/30 transition-all cursor-pointer">
              <input
                type="file"
                accept=".pdf,application/pdf,image/*,.png,.jpg,.jpeg,.webp,.txt,text/plain,.csv,text/csv"
                onChange={handleGenericFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                أو اسحب وأفلت أي ملف PDF أو صورة هنا مباشرة
              </span>
            </div>

            {/* Toggle Paste Raw Text */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
              <button
                type="button"
                onClick={() => setShowPasteArea(!showPasteArea)}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1.5 mx-auto"
              >
                <FileText className="w-4 h-4" />
                <span>{showPasteArea ? 'إخفاء لصق النص المباشر' : 'أو الصق نص / جدول الفاتورة يدوياً من الواتساب'}</span>
              </button>

              {showPasteArea && (
                <div className="mt-3 space-y-3 animate-fade-in max-w-3xl mx-auto">
                  <textarea
                    rows={5}
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
              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center gap-2 max-w-3xl mx-auto">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Loading Indicator with OCR Progress */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center p-8 gap-3 max-w-md mx-auto">
                <RefreshCw className="w-9 h-9 text-emerald-600 animate-spin" />
                <div className="text-center">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{loadingText || 'جاري استخراج البيانات والمطابقة...'}</p>
                  {ocrProgress > 0 && (
                    <div className="w-48 bg-slate-200 dark:bg-slate-800 rounded-full h-2 mt-2 overflow-hidden mx-auto">
                      <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${ocrProgress}%` }}></div>
                    </div>
                  )}
                </div>
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
