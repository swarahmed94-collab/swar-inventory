// Static import of worker URL is SAFE: Vite resolves ?url to just a string at build time.
// No pdfjs-dist code runs here - it only gets the bundled worker file's URL.
// The main pdfjs-dist library is loaded lazily via dynamic import (see loadPdfJs below),
// which guarantees the Promise.withResolvers polyfill in index.html runs first on iOS Safari.
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

/**
 * Safely extract ArrayBuffer from File, Blob, or Buffer across all mobile and desktop browsers
 */
const getFileArrayBuffer = async (fileOrArrayBuffer) => {
  if (!fileOrArrayBuffer) {
    throw new Error('لم يتم تمرير أي ملف للقراءة');
  }
  if (fileOrArrayBuffer instanceof ArrayBuffer) {
    return fileOrArrayBuffer;
  }
  if (fileOrArrayBuffer.buffer instanceof ArrayBuffer) {
    return fileOrArrayBuffer.buffer;
  }
  if (typeof fileOrArrayBuffer.arrayBuffer === 'function') {
    try {
      return await fileOrArrayBuffer.arrayBuffer();
    } catch (err) {
      console.warn('file.arrayBuffer() failed on mobile, falling back to FileReader:', err);
    }
  }
  // Mobile fallback using FileReader
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('تعذر قراءة بيانات الملف من ذاكرة الهاتف.'));
    reader.readAsArrayBuffer(fileOrArrayBuffer);
  });
};

// Cached pdfjs module reference (loaded once on first PDF usage)
let _pdfjsLib = null;

const loadPdfJs = async () => {
  if (_pdfjsLib) return _pdfjsLib;
  // Dynamic import ensures the polyfill in index.html has already run
  const lib = await import('pdfjs-dist');
  _pdfjsLib = lib;
  if (_pdfjsLib.GlobalWorkerOptions) {
    _pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
  }
  return _pdfjsLib;
};

/**
 * Extract structured rows and text from an uploaded PDF file
 */
export const extractTextFromPDF = async (fileOrArrayBuffer) => {
  try {
    const pdfjsLib = await loadPdfJs();

    const rawBuffer = await getFileArrayBuffer(fileOrArrayBuffer);
    const uint8Data = rawBuffer instanceof Uint8Array ? rawBuffer : new Uint8Array(rawBuffer);

    const pdfVersion = pdfjsLib.version || '6.2.108';
    const loadingTask = pdfjsLib.getDocument({
      data: uint8Data,
      cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfVersion}/cmaps/`,
      cMapPacked: true,
      standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfVersion}/standard_fonts/`,
      isEvalSupported: false,
      useSystemFonts: true
    });

    const pdf = await loadingTask.promise;
    const allLines = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      // Group items by vertical Y coordinate with a tolerance (for same row)
      const rowMap = new Map();
      const Y_TOLERANCE = 4.0;

      (textContent.items || []).forEach(item => {
        // Safe check for marked content / non-text items in modern PDF.js
        if (!item || typeof item.str !== 'string') return;
        const text = item.str.trim();
        if (!text) return;

        // Safe transform coordinates check
        const transform = item.transform;
        const y = Array.isArray(transform) && transform.length >= 6 ? transform[5] : 0;
        const x = Array.isArray(transform) && transform.length >= 5 ? transform[4] : 0;

        // Find existing row within tolerance
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

      // Sort rows top-to-bottom (PDF y is inverted: higher Y = higher on page)
      const sortedY = Array.from(rowMap.keys()).sort((a, b) => b - a);

      sortedY.forEach(y => {
        const rowItems = rowMap.get(y);
        // Sort items left-to-right or right-to-left based on coordinates
        rowItems.sort((a, b) => a.x - b.x);
        const lineText = rowItems.map(i => i.text).join(' ');
        if (lineText.trim()) {
          allLines.push(lineText.trim());
        }
      });
    }

    return allLines;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('فشل في قراءة ملف الـ PDF. يرجى التأكد من صلاحية الملف.');
  }
};

/**
 * Check if a line is a report header, metadata, column header, or summary footer
 */
export const isReportHeaderOrMeta = (cleanLine) => {
  if (!cleanLine || typeof cleanLine !== 'string') return true;
  const line = cleanLine.trim();

  // Too short
  if (line.length < 2) return true;

  // Header keywords (Dates, times, store headers, locations)
  if (/^(date|time|التاريخ|الوقت|الساعة|تاريخ|وقت|العنوان|هاتف|تليفون|فاكس|فرع|المحلة|القاهرة|الإسكندرية)/i.test(line)) return true;
  if (/^(\s*»|\s*«|\s*[-=_*#]{3,})/i.test(line)) return true;
  if (/^(تقرير|بيان|كشف|فاتورة|سجل|أرشيف|سند)\s+(بالمنتجات|بالأصناف|بالمخزون|بالمبيعات|بالمشتريات|حركة|يومي|شهري)/i.test(line)) return true;
  if (/^(صوار|SWAR|شركة|مؤسسة|مستودع|ثلاجة)\s+(لجميع|لتجارة|لتوزيع)/i.test(line)) return true;

  // Table Column Header lines (contains multiple column titles)
  const colHeaderWords = [
    'اسم المنتج', 'اسم الصنف', 'رقم المنتج', 'كود الصنف', 'كود المنتج', 
    'سعر البيع', 'سعر الشراء', 'السعر', 'الكمية', 'الكميه', 'الإجمالي', 
    'الاجمالي', 'المجموع', 'الوحدة', 'الوحده', 'البيان', 'ملاحظات', 'مسلسل'
  ];
  let headerMatchCount = 0;
  for (const h of colHeaderWords) {
    if (line.includes(h)) headerMatchCount++;
  }
  if (headerMatchCount >= 2) return true;

  // Footer / summary totals
  if (/^(المجموع الكلي|الإجمالي الكلي|إجمالي التقرير|صافي القيمة|عدد الأصناف|Page\s*\d+|صفحة\s*\d+)/i.test(line)) return true;

  return false;
};

/**
 * Parse a single line of text from an invoice/stock file into structured product data
 */
export const parseInvoiceLine = (line) => {
  if (!line || typeof line !== 'string') return null;
  const clean = line.trim();

  // 1. Skip report headers & metadata
  if (isReportHeaderOrMeta(clean)) {
    return null;
  }

  // Format 1: Delimited format ("اسم الصنف | الكمية: X | السعر: Y" or CSV)
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
        else if (priceMatch) price = parseFloat(priceMatch[1].replace(/,/g, '')) || 0;
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

  // Format 2: CSV / Tab separated (Name, Qty, Price, Unit/Total)
  const delimiters = [',', '\t', ';'];
  for (const delim of delimiters) {
    if (clean.includes(delim)) {
      const cols = clean.split(delim).map(c => c.trim().replace(/^["']|["']$/g, ''));
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

  // Format 3: Intelligent POS / PDF Table line parser
  // Example lines from user's report:
  // "رصيد سابق 500.00 828.48 414,240.00 0923522943"
  // "فوارغ مخللات 10.00 986.3 9,863.00 01111055237"
  // "استربس اطياب 1 كجم [كيس] 290.00 6 1,740.00 0123456789"

  // Extract all numbers (handling comma thousand separators e.g. 414,240.00 -> 414240.00)
  // Match tokens that look like numbers (with optional commas and decimals)
  const rawTokens = clean.split(/\s+/);
  const numberTokens = [];
  const textTokens = [];

  rawTokens.forEach(token => {
    // Check if token is purely numeric (with optional commas/decimals)
    const cleanNumStr = token.replace(/,/g, '');
    if (/^[0-9]+(\.[0-9]+)?$/.test(cleanNumStr)) {
      numberTokens.push({
        raw: token,
        num: parseFloat(cleanNumStr),
        isBarcode: cleanNumStr.length >= 7 || cleanNumStr.startsWith('0') && cleanNumStr.length >= 5
      });
    } else {
      textTokens.push(token);
    }
  });

  // If we found text and numbers
  if (textTokens.length > 0) {
    const rawName = textTokens.join(' ')
      .replace(/^[#\d\s.-]+(?=[^\d\s.-])/, '') // remove leading row index #1, 1.
      .replace(/[»«:;]+$/g, '')
      .trim();

    // Filter non-barcode numbers
    const validNumbers = numberTokens.filter(t => !t.isBarcode).map(t => t.num);

    let price = 0;
    let qty = 0;

    if (validNumbers.length >= 3) {
      // 3 numbers: Price, Qty, Total (e.g. 500.00, 828.48, 414240.00)
      const [n1, n2, n3] = validNumbers;

      // Check math: is n1 * n2 ≈ n3? (e.g. 500 * 828.48 = 414240)
      if (Math.abs((n1 * n2) - n3) < Math.max(1, n3 * 0.05)) {
        // Look at column standard: [سعر البيع, الكمية, الإجمالي]
        price = n1;
        qty = n2;
      } else if (Math.abs((n2 * n3) - n1) < Math.max(1, n1 * 0.05)) {
        price = n2;
        qty = n3;
      } else if (Math.abs((n1 * n3) - n2) < Math.max(1, n2 * 0.05)) {
        price = n1;
        qty = n3;
      } else {
        // Fallback by order: [Price, Qty, Total]
        price = n1;
        qty = n2;
      }
    } else if (validNumbers.length === 2) {
      // [Price, Qty] or [Qty, Price]
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

/**
 * Parse a raw text or array of lines extracted from PDF/CSV/Text into structured items
 */
export const parseRawInvoiceData = (rawContent) => {
  let lines = [];
  if (Array.isArray(rawContent)) {
    lines = rawContent;
  } else if (typeof rawContent === 'string') {
    lines = rawContent.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
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
