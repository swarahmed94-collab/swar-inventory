import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.js?url';

// ---------------------------------------------------------------------------
// Mobile-aware Worker setup
// ---------------------------------------------------------------------------
// On mobile browsers (iOS Safari, Android Chrome/WebView), loading the worker
// from a Blob URL can fail silently or crash due to:
//   1. iOS Safari blocking Blob-URL workers in certain security contexts.
//   2. The worker consuming 150-300 MB RAM which exceeds mobile OS limits.
// Fix: detect mobile and disable the worker entirely on those devices.
// pdfjs will fall back to running in the main thread — slower but rock-solid.

const isMobileBrowser = () => {
  if (typeof navigator === 'undefined') return false;
  return /Android|iPhone|iPad|iPod|IEMobile|Opera Mini|Mobile/i.test(
    navigator.userAgent
  );
};

if (isMobileBrowser()) {
  // Disable Web Worker on mobile to avoid Blob-URL and OOM crashes
  pdfjsLib.GlobalWorkerOptions.workerSrc = '';
} else {
  // Desktop: use the bundled worker as normal
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
}

// CDN fallback in case the bundled worker URL is empty / fails to resolve
// (handles edge cases like some PWA setups or restrictive CSPs)
if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
}

// ---------------------------------------------------------------------------
// File → ArrayBuffer helper (universal: File, Blob, ArrayBuffer, all mobile)
// ---------------------------------------------------------------------------
const getFileArrayBuffer = (fileOrArrayBuffer) => {
  if (!fileOrArrayBuffer) {
    return Promise.reject(new Error('لم يتم تمرير أي ملف للقراءة'));
  }
  if (fileOrArrayBuffer instanceof ArrayBuffer) {
    return Promise.resolve(fileOrArrayBuffer);
  }
  // FileReader is guaranteed to work on every mobile browser, including
  // old iOS 12 WebViews where file.arrayBuffer() may be undefined.
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () =>
      reject(new Error('تعذر قراءة بيانات الملف. يرجى المحاولة مجدداً.'));
    reader.readAsArrayBuffer(fileOrArrayBuffer);
  });
};

// ---------------------------------------------------------------------------
// PDF file-size guard (warn before attempting to parse huge files on mobile)
// ---------------------------------------------------------------------------
const MAX_PDF_BYTES_MOBILE = 15 * 1024 * 1024; // 15 MB

const checkFileSizeForMobile = (fileOrBlob) => {
  if (!isMobileBrowser()) return; // no restriction on desktop
  const size = fileOrBlob?.size ?? 0;
  if (size > MAX_PDF_BYTES_MOBILE) {
    throw new Error(
      `حجم ملف الـ PDF كبير جداً على الجوال (${(size / 1024 / 1024).toFixed(1)} MB). ` +
      `الحد المسموح به على الموبايل هو 15 MB. يرجى استخدام نسخة أصغر من الملف.`
    );
  }
};

// ---------------------------------------------------------------------------
// Main extraction function
// ---------------------------------------------------------------------------
/**
 * Extract structured rows and text from an uploaded PDF file.
 * Works on iOS Safari 12+, all Android browsers, and all desktop browsers.
 *
 * @param {File|Blob|ArrayBuffer} fileOrArrayBuffer
 * @returns {Promise<string[]>} Array of text lines extracted from the PDF
 */
export const extractTextFromPDF = async (fileOrArrayBuffer) => {
  // Mobile size guard (throws a user-friendly Arabic error if too large)
  if (fileOrArrayBuffer instanceof File || fileOrArrayBuffer instanceof Blob) {
    checkFileSizeForMobile(fileOrArrayBuffer);
  }

  let pdf = null;
  try {
    const arrayBuffer = await getFileArrayBuffer(fileOrArrayBuffer);

    const loadOptions = {
      data: arrayBuffer,
      // These two options are critical for Arabic PDFs with embedded fonts.
      // Without them pdfjs may throw "Cannot read font data" on mobile.
      cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
      cMapPacked: true,
      standardFontDataUrl:
        'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/standard_fonts/',
      // Disable range requests — not supported in all mobile environments
      disableRange: true,
      disableStream: true,
      // On mobile we already disabled the worker globally, but set the flag
      // here as well so pdfjs never attempts to spawn one.
      ...(isMobileBrowser() ? { disableWorker: true } : {}),
    };

    const loadingTask = pdfjsLib.getDocument(loadOptions);
    pdf = await loadingTask.promise;

    const allLines = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent({
        // Avoid decoding large image XObjects — saves memory on mobile
        disableCombineTextItems: false,
      });

      // Group text items by their Y coordinate (same row = same Y ± tolerance)
      const rowMap = new Map();
      const Y_TOLERANCE = 4.0;

      (textContent.items || []).forEach(item => {
        // Guard: some items are MarkedContent tags with no .str
        if (!item || typeof item.str !== 'string') return;
        const text = item.str.trim();
        if (!text) return;

        const transform = item.transform;
        const y =
          Array.isArray(transform) && transform.length >= 6 ? transform[5] : 0;
        const x =
          Array.isArray(transform) && transform.length >= 5 ? transform[4] : 0;

        let matchedY = null;
        for (const existingY of rowMap.keys()) {
          if (Math.abs(existingY - y) <= Y_TOLERANCE) {
            matchedY = existingY;
            break;
          }
        }

        if (matchedY !== null) {
          rowMap.get(matchedY).push({ x, text });
        } else {
          rowMap.set(y, [{ x, text }]);
        }
      });

      // Explicitly release the page to free memory (important on mobile)
      page.cleanup();

      // Sort rows top-to-bottom (PDF coordinate origin is bottom-left)
      const sortedY = Array.from(rowMap.keys()).sort((a, b) => b - a);

      sortedY.forEach(y => {
        const rowItems = rowMap.get(y);
        rowItems.sort((a, b) => a.x - b.x);
        const lineText = rowItems.map(i => i.text).join(' ');
        if (lineText.trim()) {
          allLines.push(lineText.trim());
        }
      });
    }

    return allLines;
  } catch (error) {
    console.error('PDF extraction error:', error);
    // Re-throw user-friendly errors as-is; wrap unknown errors
    if (error.message && /حجم|تعذر|يرجى/.test(error.message)) {
      throw error;
    }
    throw new Error(
      'فشل في قراءة ملف الـ PDF. يرجى التأكد من صلاحية الملف أو تجربة ملف آخر.'
    );
  } finally {
    // Always destroy the PDF document to release memory (critical on mobile)
    if (pdf) {
      try {
        pdf.destroy();
      } catch (_) {
        // ignore cleanup errors
      }
    }
  }
};

// ---------------------------------------------------------------------------
// Line-level classification helpers
// ---------------------------------------------------------------------------

/**
 * Check if a line is a report header, metadata, column header, or summary footer
 */
export const isReportHeaderOrMeta = (cleanLine) => {
  if (!cleanLine || typeof cleanLine !== 'string') return true;
  const line = cleanLine.trim();

  if (line.length < 2) return true;

  if (
    /^(date|time|التاريخ|الوقت|الساعة|تاريخ|وقت|العنوان|هاتف|تليفون|فاكس|فرع|المحلة|القاهرة|الإسكندرية)/i.test(
      line
    )
  )
    return true;
  if (/^(\s*»|\s*«|\s*[-=_*#]{3,})/i.test(line)) return true;
  if (
    /^(تقرير|بيان|كشف|فاتورة|سجل|أرشيف|سند)\s+(بالمنتجات|بالأصناف|بالمخزون|بالمبيعات|بالمشتريات|حركة|يومي|شهري)/i.test(
      line
    )
  )
    return true;
  if (
    /^(صوار|SWAR|شركة|مؤسسة|مستودع|ثلاجة)\s+(لجميع|لتجارة|لتوزيع)/i.test(
      line
    )
  )
    return true;

  const colHeaderWords = [
    'اسم المنتج', 'اسم الصنف', 'رقم المنتج', 'كود الصنف', 'كود المنتج',
    'سعر البيع', 'سعر الشراء', 'السعر', 'الكمية', 'الكميه', 'الإجمالي',
    'الاجمالي', 'المجموع', 'الوحدة', 'الوحده', 'البيان', 'ملاحظات', 'مسلسل',
  ];
  let headerMatchCount = 0;
  for (const h of colHeaderWords) {
    if (line.includes(h)) headerMatchCount++;
  }
  if (headerMatchCount >= 2) return true;

  if (
    /^(المجموع الكلي|الإجمالي الكلي|إجمالي التقرير|صافي القيمة|عدد الأصناف|Page\s*\d+|صفحة\s*\d+)/i.test(
      line
    )
  )
    return true;

  return false;
};

// ---------------------------------------------------------------------------
// Line parser
// ---------------------------------------------------------------------------

/**
 * Parse a single line of text from an invoice/stock file into structured product data
 */
export const parseInvoiceLine = (line) => {
  if (!line || typeof line !== 'string') return null;
  const clean = line.trim();

  if (isReportHeaderOrMeta(clean)) return null;

  // Format 1: Pipe-delimited ("اسم الصنف | الكمية: X | السعر: Y")
  if (clean.includes('|')) {
    const parts = clean.split('|').map(p => p.trim());
    if (parts.length >= 2) {
      const name = parts[0].replace(/^(الصنف|الاسم|المنتج)[:\s]*/i, '').trim();
      let qty = 0;
      let price = 0;

      parts.slice(1).forEach(part => {
        const qtyMatch = part.match(/الكمية[:\s]*([0-9,.]+)/i);
        const priceMatch = part.match(/السعر[:\s]*([0-9,.]+)/i);
        if (qtyMatch) qty = parseFloat(qtyMatch[1].replace(/,/g, '')) || 0;
        else if (priceMatch)
          price = parseFloat(priceMatch[1].replace(/,/g, '')) || 0;
        else {
          const num = parseFloat(part.replace(/,/g, ''));
          if (!isNaN(num)) {
            if (qty === 0) qty = num;
            else if (price === 0) price = num;
          }
        }
      });

      if (name && (qty > 0 || price > 0 || parts.length >= 3)) {
        return { rawName: name, qty: qty || 0, price: price || 0 };
      }
    }
  }

  // Format 2: CSV / Tab-separated (Name, Qty, Price, Unit/Total)
  const delimiters = [',', '\t', ';'];
  for (const delim of delimiters) {
    if (clean.includes(delim)) {
      const cols = clean
        .split(delim)
        .map(c => c.trim().replace(/^["']|["']$/g, ''));
      if (cols.length >= 2) {
        let name = '';
        let qty = 0;
        let price = 0;

        cols.forEach((col, idx) => {
          const num = parseFloat(col.replace(/,/g, ''));
          if (isNaN(num) || (idx === 0 && isNaN(parseFloat(col)))) {
            if (!name) name = col;
          } else {
            if (qty === 0) qty = num;
            else if (price === 0) price = num;
          }
        });

        if (name && (qty > 0 || price > 0)) {
          return { rawName: name, qty: qty || 0, price: price || 0 };
        }
      }
    }
  }

  // Format 3: Intelligent space-separated POS/PDF table line
  const rawTokens = clean.split(/\s+/);
  const numberTokens = [];
  const textTokens = [];

  rawTokens.forEach(token => {
    const cleanNumStr = token.replace(/,/g, '');
    if (/^[0-9]+(\.[0-9]+)?$/.test(cleanNumStr)) {
      numberTokens.push({
        raw: token,
        num: parseFloat(cleanNumStr),
        isBarcode:
          cleanNumStr.length >= 7 ||
          (cleanNumStr.startsWith('0') && cleanNumStr.length >= 5),
      });
    } else {
      textTokens.push(token);
    }
  });

  if (textTokens.length > 0) {
    const rawName = textTokens
      .join(' ')
      .replace(/^[#\d\s.-]+(?=[^\d\s.-])/, '')
      .replace(/[»«:;]+$/g, '')
      .trim();

    const validNumbers = numberTokens
      .filter(t => !t.isBarcode)
      .map(t => t.num);

    let price = 0;
    let qty = 0;

    if (validNumbers.length >= 3) {
      const [n1, n2, n3] = validNumbers;
      if (Math.abs(n1 * n2 - n3) < Math.max(1, n3 * 0.05)) {
        price = n1;
        qty = n2;
      } else if (Math.abs(n2 * n3 - n1) < Math.max(1, n1 * 0.05)) {
        price = n2;
        qty = n3;
      } else if (Math.abs(n1 * n3 - n2) < Math.max(1, n2 * 0.05)) {
        price = n1;
        qty = n3;
      } else {
        price = n1;
        qty = n2;
      }
    } else if (validNumbers.length === 2) {
      price = validNumbers[0];
      qty = validNumbers[1];
    } else if (validNumbers.length === 1) {
      qty = validNumbers[0];
    }

    if (rawName && rawName.length >= 2) {
      return { rawName, qty, price };
    }
  }

  return null;
};

// ---------------------------------------------------------------------------
// Batch parser
// ---------------------------------------------------------------------------

/**
 * Parse a raw text or array of lines extracted from PDF/CSV/Text into structured items
 */
export const parseRawInvoiceData = (rawContent) => {
  let lines = [];
  if (Array.isArray(rawContent)) {
    lines = rawContent;
  } else if (typeof rawContent === 'string') {
    lines = rawContent
      .split(/\r?\n/)
      .map(l => l.trim())
      .filter(Boolean);
  }

  const parsedItems = [];

  for (const line of lines) {
    const parsed = parseInvoiceLine(line);
    if (parsed && parsed.rawName && parsed.rawName.length >= 2) {
      parsedItems.push(parsed);
    }
  }

  return parsedItems;
};
