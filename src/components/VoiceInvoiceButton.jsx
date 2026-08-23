import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Mic, MicOff, X, CheckCircle2, AlertTriangle, Loader2, Volume2 } from 'lucide-react';
import { parseVoiceTranscript } from '../utils/voiceParser';
import { autoMatchProduct } from '../utils/fuzzyMatcher';
import { sounds } from '../utils/sound';

// ---------------------------------------------------------------------------
// Browser support check
// ---------------------------------------------------------------------------
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition || null;

const SUPPORTED = !!SpeechRecognition;

// ---------------------------------------------------------------------------
// Confidence badge helper
// ---------------------------------------------------------------------------
const ConfidenceBadge = ({ confidence, score }) => {
  const cfg =
    confidence === 'high'
      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
      : confidence === 'medium'
      ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700'
      : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-700';

  const label =
    confidence === 'high' ? '✅ تطابق' : confidence === 'medium' ? '🟡 مقترح' : '❓ غير محدد';

  return (
    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md border ${cfg}`}>
      {label} {Math.round((score || 0) * 100)}%
    </span>
  );
};

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export default function VoiceInvoiceButton({ products = [], onAddItems }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimText, setInterimText] = useState('');
  const [matchedItems, setMatchedItems] = useState([]); // [{ rawName, qty, product, confidence, score }]
  const [phase, setPhase] = useState('idle'); // idle | listening | processing | review
  const [errorMsg, setErrorMsg] = useState('');

  const recognitionRef = useRef(null);
  const pulseTimerRef = useRef(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------------------------------------------------------------------------
  // Speech Recognition
  // ---------------------------------------------------------------------------
  const startListening = useCallback(() => {
    if (!SUPPORTED) {
      setErrorMsg('متصفحك لا يدعم التعرف على الكلام. يرجى استخدام Chrome أو Edge.');
      return;
    }
    setErrorMsg('');
    setTranscript('');
    setInterimText('');
    setMatchedItems([]);
    setPhase('listening');
    setIsListening(true);

    const rec = new SpeechRecognition();
    rec.lang = 'ar-EG';           // Egyptian Arabic — best for our use-case
    rec.continuous = true;         // keep listening until user stops
    rec.interimResults = true;     // show partial results live
    rec.maxAlternatives = 1;

    rec.onresult = (e) => {
      let finalText = '';
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) {
          finalText += t + ' ';
        } else {
          interim += t;
        }
      }
      if (finalText) setTranscript((prev) => (prev + ' ' + finalText).trim());
      setInterimText(interim);
    };

    rec.onerror = (e) => {
      console.warn('SpeechRecognition error:', e.error);
      if (e.error === 'not-allowed') {
        setErrorMsg('لم يتم منح إذن الميكروفون. يرجى السماح من إعدادات المتصفح.');
      } else if (e.error === 'network') {
        setErrorMsg('يتطلب التعرف على الكلام اتصالاً بالإنترنت.');
      } else if (e.error !== 'aborted') {
        setErrorMsg('حدث خطأ في الميكروفون: ' + e.error);
      }
      setIsListening(false);
      setPhase('idle');
    };

    rec.onend = () => {
      setIsListening(false);
      setInterimText('');
    };

    recognitionRef.current = rec;
    try {
      rec.start();
    } catch (err) {
      setErrorMsg('تعذر تشغيل الميكروفون: ' + err.message);
      setPhase('idle');
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
      recognitionRef.current = null;
    }
    setIsListening(false);
    setInterimText('');
    clearTimeout(pulseTimerRef.current);
  }, []);

  // ---------------------------------------------------------------------------
  // Process transcript → fuzzy match
  // ---------------------------------------------------------------------------
  const processTranscript = useCallback(
    (text) => {
      const finalText = (text || transcript).trim();
      if (!finalText) {
        setErrorMsg('لم يتم التقاط أي كلام. حاول مرة أخرى.');
        setPhase('idle');
        return;
      }

      setPhase('processing');
      setErrorMsg('');

      // Small async delay so the UI can show the loading state
      setTimeout(() => {
        const parsed = parseVoiceTranscript(finalText);

        if (parsed.length === 0) {
          setErrorMsg('لم يتم التعرف على أي أصناف من الكلام. حاول بوضوح أكثر.');
          setPhase('idle');
          return;
        }

        const catalog = Array.isArray(products) ? products : [];
        const results = parsed.map((item) => {
          const match = autoMatchProduct(item.rawName, catalog, 0.30);
          return {
            rawName: item.rawName,
            qty: item.qty,
            product: match.matchedProduct,
            confidence: match.confidence,
            score: match.score,
            selected: !!match.matchedProduct,
          };
        });

        setMatchedItems(results);
        setPhase('review');
        sounds.playSuccess?.();
      }, 150);
    },
    [transcript, products]
  );

  // ---------------------------------------------------------------------------
  // Confirm & add items to invoice
  // ---------------------------------------------------------------------------
  const handleConfirm = () => {
    const toAdd = matchedItems.filter((r) => r.selected && r.product);
    if (toAdd.length === 0) {
      setErrorMsg('لم يتم تحديد أي صنف مطابق للإضافة.');
      return;
    }

    if (onAddItems) {
      onAddItems(toAdd.map((r) => ({ product: r.product, qty: r.qty })));
    }

    sounds.playSuccess?.();
    setIsOpen(false);
    setPhase('idle');
    setTranscript('');
    setMatchedItems([]);
  };

  // ---------------------------------------------------------------------------
  // Toggle mic button
  // ---------------------------------------------------------------------------
  const handleMicToggle = () => {
    if (isListening) {
      stopListening();
      processTranscript(transcript);
    } else {
      startListening();
    }
  };

  // ---------------------------------------------------------------------------
  // Render: collapsed trigger button
  // ---------------------------------------------------------------------------
  if (!isOpen) {
    return (
      <button
        type="button"
        id="voice-invoice-trigger-btn"
        onClick={() => { setIsOpen(true); setPhase('idle'); setErrorMsg(''); }}
        title="إضافة أصناف بالصوت"
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-black shadow-md shadow-violet-500/30 transition-all active:scale-95 shrink-0"
      >
        <Mic className="w-4 h-4" />
        <span className="hidden sm:inline">صوت 🎙️</span>
      </button>
    );
  }

  // ---------------------------------------------------------------------------
  // Render: expanded panel
  // ---------------------------------------------------------------------------
  return (
    <div
      id="voice-invoice-panel"
      className="rounded-3xl border-2 border-violet-300 dark:border-violet-700/60 bg-gradient-to-b from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/20 p-4 space-y-4 shadow-xl shadow-violet-200/50 dark:shadow-violet-900/30 animate-fade-in"
    >
      {/* ── Panel Header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center shadow-md shadow-violet-600/30">
            <Mic className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-black text-slate-900 dark:text-white">إضافة أصناف بالصوت</div>
            <div className="text-[11px] text-slate-500">
              {SUPPORTED
                ? 'قل مثلاً: "خمسة برجر وستة كفتة"'
                : 'غير مدعوم في هذا المتصفح'}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => { stopListening(); setIsOpen(false); setPhase('idle'); }}
          className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* ── Unsupported browser fallback ── */}
      {!SUPPORTED && (
        <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-bold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>
            متصفحك لا يدعم التعرف على الكلام (Web Speech API).
            يرجى استخدام <strong>Chrome</strong> أو <strong>Edge</strong> للحصول على هذه الميزة.
          </span>
        </div>
      )}

      {/* ── Mic Button + Live Transcript ── */}
      {SUPPORTED && (phase === 'idle' || phase === 'listening') && (
        <div className="flex flex-col items-center gap-4">
          {/* Big mic button */}
          <button
            type="button"
            id="voice-mic-main-btn"
            onClick={handleMicToggle}
            className={`relative w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-95 ${
              isListening
                ? 'bg-rose-500 hover:bg-rose-400 shadow-rose-500/40'
                : 'bg-violet-600 hover:bg-violet-500 shadow-violet-500/40'
            }`}
          >
            {/* Pulse rings when listening */}
            {isListening && (
              <>
                <span className="absolute inset-0 rounded-full bg-rose-500 opacity-40 animate-ping" />
                <span className="absolute -inset-3 rounded-full border-2 border-rose-400 opacity-30 animate-ping [animation-delay:0.3s]" />
              </>
            )}
            {isListening ? (
              <MicOff className="w-9 h-9 text-white relative z-10" />
            ) : (
              <Mic className="w-9 h-9 text-white relative z-10" />
            )}
          </button>

          <p className="text-xs font-bold text-slate-600 dark:text-slate-400 text-center">
            {isListening
              ? '🔴 جاري الاستماع... اضغط مرة أخرى عند الانتهاء'
              : '🎙️ اضغط وابدأ الكلام'}
          </p>

          {/* Live interim transcript */}
          {(transcript || interimText) && (
            <div className="w-full p-3 rounded-2xl bg-white dark:bg-slate-900 border border-violet-200 dark:border-violet-800 text-sm text-slate-700 dark:text-slate-300 min-h-[48px]">
              <span>{transcript}</span>
              {interimText && (
                <span className="text-slate-400 italic"> {interimText}</span>
              )}
            </div>
          )}

          {/* Manual process button (in case user typed/pasted) */}
          {transcript && !isListening && (
            <button
              type="button"
              onClick={() => processTranscript(transcript)}
              className="w-full py-2.5 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-black shadow-md transition-all active:scale-95"
            >
              🔍 تحليل ومطابقة الكلام
            </button>
          )}
        </div>
      )}

      {/* ── Processing spinner ── */}
      {phase === 'processing' && (
        <div className="flex flex-col items-center gap-3 py-4">
          <Loader2 className="w-9 h-9 text-violet-600 animate-spin" />
          <p className="text-xs font-bold text-slate-600 dark:text-slate-400">
            جاري تحليل الكلام ومطابقة الأصناف...
          </p>
        </div>
      )}

      {/* ── Review & Confirm ── */}
      {phase === 'review' && matchedItems.length > 0 && (
        <div className="space-y-3">
          {/* Transcript summary */}
          <div className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-900/50 border border-violet-200 dark:border-violet-800 text-xs text-slate-600 dark:text-slate-400">
            <Volume2 className="w-3.5 h-3.5 inline ml-1 text-violet-500" />
            <span className="font-bold text-violet-700 dark:text-violet-400">ما قلته: </span>
            {transcript}
          </div>

          {/* Matched items list */}
          <div className="space-y-2">
            {matchedItems.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 p-2.5 rounded-2xl border transition-all ${
                  item.selected
                    ? 'bg-white dark:bg-slate-900 border-violet-200 dark:border-violet-700'
                    : 'bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                {/* Select checkbox */}
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={(e) =>
                    setMatchedItems((prev) =>
                      prev.map((r, i) => i === idx ? { ...r, selected: e.target.checked } : r)
                    )
                  }
                  className="w-4 h-4 rounded text-violet-600 focus:ring-violet-500 shrink-0"
                />

                {/* Product info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-base">{item.product?.emoji || '📦'}</span>
                    <span className="font-black text-sm text-slate-900 dark:text-white truncate">
                      {item.product?.name || item.rawName}
                    </span>
                    <ConfidenceBadge confidence={item.confidence} score={item.score} />
                  </div>
                  {item.product?.name !== item.rawName && (
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      قلت: <span className="font-mono">{item.rawName}</span>
                    </div>
                  )}
                </div>

                {/* Qty input */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      setMatchedItems((prev) =>
                        prev.map((r, i) =>
                          i === idx ? { ...r, qty: Math.max(0.25, (r.qty || 1) - 1) } : r
                        )
                      )
                    }
                    className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-950/50 text-slate-600 flex items-center justify-center text-sm font-black"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="0.25"
                    step="0.25"
                    value={item.qty}
                    onChange={(e) =>
                      setMatchedItems((prev) =>
                        prev.map((r, i) =>
                          i === idx ? { ...r, qty: parseFloat(e.target.value) || 1 } : r
                        )
                      )
                    }
                    className="w-12 text-center py-1 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 font-black text-xs outline-none focus:ring-1 focus:ring-violet-500"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setMatchedItems((prev) =>
                        prev.map((r, i) =>
                          i === idx ? { ...r, qty: (r.qty || 1) + 1 } : r
                        )
                      )
                    }
                    className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-950/50 text-slate-600 flex items-center justify-center text-sm font-black"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleConfirm}
              id="voice-invoice-confirm-btn"
              className="flex-1 py-2.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-black shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              إضافة {matchedItems.filter((r) => r.selected && r.product).length} صنف للفاتورة
            </button>
            <button
              type="button"
              onClick={() => { setPhase('idle'); setTranscript(''); setMatchedItems([]); }}
              className="px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-black transition-all"
            >
              إعادة
            </button>
          </div>
        </div>
      )}

      {/* ── Error Message ── */}
      {errorMsg && (
        <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
}
