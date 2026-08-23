import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.js?url';

// ---------------------------------------------------------------------------
// Mobile-aware Worker setup
// ---------------------------------------------------------------------------
const isMobileBrowser = () => {
  if (typeof navigator === 'undefined') return false;
  return /Android|iPhone|iPad|iPod|IEMobile|Opera Mini|Mobile/i.test(
    navigator.userAgent
  );
};

if (isMobileBrowser()) {
  // Disable Web Worker on mobile to avoid Blob-URL and memory crashes
  pdfjsLib.GlobalWorkerOptions.workerSrc = '';
} else {
  // Desktop: use the bundled worker as normal
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
}

// CDN fallback in case the bundled worker URL is empty
if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
}

// ---------------------------------------------------------------------------
// Arabic Presentation Forms Mapping to standard Arabic characters
// ---------------------------------------------------------------------------
const ARABIC_PRESENTATION_MAP = {
  '\uFE80': '\u0621', '\uFE81': '\u0622', '\uFE82': '\u0622', '\uFE83': '\u0623', '\uFE84': '\u0623',
  '\uFE85': '\u0624', '\uFE86': '\u0624', '\uFE87': '\u0625', '\uFE88': '\u0625', '\uFE89': '\u0626',
  '\uFE8A': '\u0626', '\uFE8B': '\u0626', '\uFE8C': '\u0626', '\uFE8D': '\u0627', '\uFE8E': '\u0627',
  '\uFE8F': '\u0628', '\uFE90': '\u0628', '\uFE91': '\u0628', '\uFE92': '\u0628', '\uFE93': '\u0629',
  '\uFE94': '\u0629', '\uFE95': '\u062A', '\uFE96': '\u062A', '\uFE97': '\u062A', '\uFE98': '\u062A',
  '\uFE99': '\u062B', '\uFE9A': '\u062B', '\uFE9B': '\u062B', '\uFE9C': '\u062B', '\uFE9D': '\u062C',
  '\uFE9E': '\u062C', '\uFE9F': '\u062C', '\uFEA0': '\u062C', '\uFEA1': '\u062D', '\uFEA2': '\u062D',
  '\uFEA3': '\u062D', '\uFEA4': '\u062D', '\uFEA5': '\u062E', '\uFEA6': '\u062E', '\uFEA7': '\u062E',
  '\uFEA8': '\u062E', '\uFEA9': '\u062F', '\uFEAA': '\u062F', '\uFEAB': '\u0630', '\uFEAC': '\u0630',
  '\uFEAD': '\u0631', '\uFEAE': '\u0631', '\uFEAF': '\u0632', '\uFEB0': '\u0632', '\uFEB1': '\u0633',
  '\uFEB2': '\u0633', '\uFEB3': '\u0633', '\uFEB4': '\u0633', '\uFEB5': '\u0634', '\uFEB6': '\u0634',
  '\uFEB7': '\u0634', '\uFEB8': '\u0634', '\uFEB9': '\u0635', '\uFEBA': '\u0635', '\uFEBB': '\u0635',
  '\uFEBC': '\u0635', '\uFEBD': '\u0636', '\uFEBE': '\u0636', '\uFEBF': '\u0636', '\uFEC0': '\u0636',
  '\uFEC1': '\u0637', '\uFEC2': '\u0637', '\uFEC3': '\u0637', '\uFEC4': '\u0637', '\uFEC5': '\u0638',
  '\uFEC6': '\u0638', '\uFEC7': '\u0638', '\uFEC8': '\u0638', '\uFEC9': '\u0639', '\uFECA': '\u0639',
  '\uFECB': '\u0639', '\uFECC': '\u0639', '\uFECD': '\u063A', '\uFECE': '\u063A', '\uFECF': '\u063A',
  '\uFED0': '\u063A', '\uFED1': '\u0641', '\uFED2': '\u0641', '\uFED3': '\u0641', '\uFED4': '\u0641',
  '\uFED5': '\u0642', '\uFED6': '\u0642', '\uFED7': '\u0642', '\uFED8': '\u0642', '\uFED9': '\u0643',
  '\uFEDA': '\u0643', '\uFEDB': '\u0643', '\uFEDC': '\u0643', '\uFEDD': '\u0644', '\uFEDE': '\u0644',
  '\uFEDF': '\u0644', '\uFEE0': '\u0644', '\uFEE1': '\u0645', '\uFEE2': '\u0645', '\uFEE3': '\u0645',
  '\uFEE4': '\u0645', '\uFEE5': '\u0646', '\uFEE6': '\u0646', '\uFEE7': '\u0646', '\uFEE8': '\u0646',
  '\uFEE9': '\u0647', '\uFEEA': '\u0647', '\uFEEB': '\u0647', '\uFEEC': '\u0647', '\uFEED': '\u0648',
  '\uFEEE': '\u0648', '\uFEEF': '\u0649', '\uFEF0': '\u0649', '\uFEF1': '\u064A', '\uFEF2': '\u064A',
  '\uFEF3': '\u064A', '\uFEF4': '\u064A', '\uFEF5': '\u0644\u0622', '\uFEF6': '\u0644\u0622',
  '\uFEF7': '\u0644\u0623', '\uFEF8': '\u0644\u0623', '\uFEF9': '\u0644\u0625', '\uFEFA': '\u0644\u0625',
  '\uFEFB': '\u0644\u0627', '\uFEFC': '\u0644\u0627'
};

/**
 * Decode Arabic presentation forms into canonical UTF-8 characters
 */
export const decodeArabicPresentationForms = (text) => {
  if (!text) return '';
  let res = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    res += ARABIC_PRESENTATION_MAP[ch] || ch;
  }
  return res.normalize('NFKD').trim();
};

/**
 * Normalize Arabic text for keyword and header matching
 */
export const normalizeArabic = (text) => {
  if (!text) return '';
  const decoded = decodeArabicPresentationForms(text);
  return decoded
    .normalize('NFD')
    .replace(/[\u064B-\u065F\u0670\u0654\u0655]/g, '') // strip tashkeel & combining hamzas
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .normalize('NFC')
    .trim()
    .toLowerCase();
};

/**
 * Safely parse numbers handling commas, currencies, and scientific notation (e.g. 3.55e-15 => 0)
 */
export const parseNumberSafe = (val) => {
  if (val === null || val === undefined) return 0;
  const str = String(val).replace(/,/g, '').trim();
  if (!str) return 0;
  // Handle POS float rounding in scientific notation (e.g. 3.55e-15 -> 0)
  if (str.includes('e-') || str.includes('E-')) return 0;
  const n = parseFloat(str);
  return isNaN(n) ? 0 : n;
};

// ---------------------------------------------------------------------------
// File → ArrayBuffer helper
// ---------------------------------------------------------------------------
const getFileArrayBuffer = (fileOrArrayBuffer) => {
  if (!fileOrArrayBuffer) {
    return Promise.reject(new Error('لم يتم تمرير أي ملف للقراءة'));
  }
  if (fileOrArrayBuffer instanceof ArrayBuffer) {
    return Promise.resolve(fileOrArrayBuffer);
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () =>
      reject(new Error('تعذر قراءة بيانات الملف. يرجى المحاولة مجدداً.'));
    reader.readAsArrayBuffer(fileOrArrayBuffer);
  });
};

const MAX_PDF_BYTES_MOBILE = 15 * 1024 * 1024; // 15 MB

const checkFileSizeForMobile = (fileOrBlob) => {
  if (!isMobileBrowser()) return;
  const size = fileOrBlob?.size ?? 0;
  if (size > MAX_PDF_BYTES_MOBILE) {
    throw new Error(
      `حجم ملف الـ PDF كبير جداً على الجوال (${(size / 1024 / 1024).toFixed(1)} MB). الحد المسموح هو 15 MB.`
    );
  }
};

// ---------------------------------------------------------------------------
// Generic Template & Spatial Layout Engine
// ---------------------------------------------------------------------------

/**
 * Detect column headers dynamically from a row of text items.
 * Learns column positions for any invoice layout dynamically.
 */
export const detectColumnTemplateFromHeaders = (rowItems) => {
  const colRules = [
    { type: 'total', regex: /(اجمالي|مجموع|قيمه|total|amount)/i },
    { type: 'qty', regex: /(الكميه|العدد|كميه|qty|quantity|count)/i },
    { type: 'price', regex: /(سعر\s*البيع|سعر\s*الشراء|سعر\s*الوحده|السعر|سعر|price|rate)/i },
    { type: 'name', regex: /(اسم\s*المنتج|اسم\s*الصنف|المنتج|الصنف|بيان|وصف|item|product|desc)/i },
    { type: 'barcode', regex: /(رقم\s*المنتج|كود\s*الصنف|كود\s*المنتج|باركود|كود|barcode|code|sku)/i },
    { type: 'index', regex: /(^#$|^مسلسل$|^م$|^ت$|^no\.?$|^idx$)/i },
  ];

  const detected = [];
  for (const item of rowItems) {
    const norm = normalizeArabic(item.text);
    for (const rule of colRules) {
      if (rule.regex.test(norm)) {
        if (!detected.some(d => d.type === rule.type)) {
          detected.push({
            type: rule.type,
            x: item.x,
            w: item.w || 20,
            midX: item.x + ((item.w || 20) / 2),
            text: item.text
          });
          break;
        }
      }
    }
  }

  // A valid table header row must have at least product name + at least one numeric column
  const hasName = detected.some(d => d.type === 'name');
  const hasNumeric = detected.some(d => d.type === 'qty' || d.type === 'price' || d.type === 'total');

  if (hasName && hasNumeric && detected.length >= 3) {
    return detected.sort((a, b) => a.midX - b.midX);
  }
  return null;
};

/**
 * Build dynamic spatial boundary bands from learned header column coordinates
 */
export const buildSpatialBands = (headerColumns, pageWidth = 600) => {
  if (!headerColumns || headerColumns.length === 0) {
    // Default standard generic RTL layout fallback
    return [
      { type: 'total', minX: 0, maxX: 115 },
      { type: 'qty', minX: 115, maxX: 185 },
      { type: 'price', minX: 185, maxX: 265 },
      { type: 'name', minX: 265, maxX: 445 },
      { type: 'barcode', minX: 445, maxX: 545 },
      { type: 'index', minX: 545, maxX: pageWidth }
    ];
  }

  const sorted = [...headerColumns].sort((a, b) => a.midX - b.midX);
  const bands = [];

  for (let i = 0; i < sorted.length; i++) {
    const curr = sorted[i];
    const prev = sorted[i - 1];
    const next = sorted[i + 1];

    const minX = prev ? (prev.midX + curr.midX) / 2 : 0;
    const maxX = next ? (curr.midX + next.midX) / 2 : pageWidth;

    bands.push({
      type: curr.type,
      minX,
      maxX,
      headerText: curr.text
    });
  }

  return bands;
};

/**
 * Map a row's items into structured columns based on spatial bands and validate mathematically
 */
export const mapRowToBands = (rowItems, bands) => {
  const cellMap = {
    name: [],
    qty: '',
    price: '',
    total: '',
    barcode: '',
    index: ''
  };

  for (const it of rowItems) {
    const itemMidX = it.x + (it.w / 2);
    const matchedBand = bands.find(b => itemMidX >= b.minX && itemMidX < b.maxX);
    const bandType = matchedBand ? matchedBand.type : null;

    if (bandType === 'name') {
      cellMap.name.push(it.text);
    } else if (bandType === 'qty') {
      cellMap.qty = (cellMap.qty ? cellMap.qty + ' ' : '') + it.text;
    } else if (bandType === 'price') {
      cellMap.price = (cellMap.price ? cellMap.price + ' ' : '') + it.text;
    } else if (bandType === 'total') {
      cellMap.total = (cellMap.total ? cellMap.total + ' ' : '') + it.text;
    } else if (bandType === 'barcode') {
      cellMap.barcode += it.text;
    } else if (bandType === 'index') {
      cellMap.index += it.text;
    }
  }

  const rawName = decodeArabicPresentationForms(cellMap.name.join(' '));
  let qty = parseNumberSafe(cellMap.qty);
  let price = parseNumberSafe(cellMap.price);
  let total = parseNumberSafe(cellMap.total);

  // Mathematical validation & permutation integrity (Qty * Price ≈ Total)
  let isMathValid = false;
  const expectedTotal = qty * price;
  if (Math.abs(expectedTotal - total) <= Math.max(1.0, total * 0.05)) {
    isMathValid = true;
  } else if (qty > 0 && price === 0 && total > 0) {
    price = total / qty;
    isMathValid = true;
  } else if (price > 0 && total > 0 && qty === 0) {
    if (Math.abs(price - total) < 0.1) {
      qty = 1;
      isMathValid = true;
    }
  }

  return {
    rawName,
    qty,
    price,
    total,
    barcode: cellMap.barcode.trim(),
    index: cellMap.index.trim(),
    isMathValid
  };
};

// ---------------------------------------------------------------------------
// Main High-Precision PDF Extractor (Spatial & Dynamic Template)
// ---------------------------------------------------------------------------
export const extractStructuredInvoiceFromPDF = async (fileOrArrayBuffer) => {
  if (fileOrArrayBuffer instanceof File || fileOrArrayBuffer instanceof Blob) {
    checkFileSizeForMobile(fileOrArrayBuffer);
  }

  let pdf = null;
  try {
    const arrayBuffer = await getFileArrayBuffer(fileOrArrayBuffer);

    const loadOptions = {
      data: arrayBuffer,
      cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
      cMapPacked: true,
      standardFontDataUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/standard_fonts/',
      disableRange: true,
      disableStream: true,
      ...(isMobileBrowser() ? { disableWorker: true } : {}),
    };

    const loadingTask = pdfjsLib.getDocument(loadOptions);
    pdf = await loadingTask.promise;

    let activeBands = null;
    const extractedItems = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.0 });
      const pageWidth = viewport.width || 600;

      const textContent = await page.getTextContent({
        disableCombineTextItems: false,
      });

      // Group items into rows using adaptive Y-clustering
      const rowMap = new Map();
      const Y_TOLERANCE = 4.0;

      (textContent.items || []).forEach(item => {
        if (!item || typeof item.str !== 'string') return;
        const text = item.str.trim();
        if (!text) return;

        const y = item.transform[5];
        const x = item.transform[4];
        const w = item.width || 0;

        let matchedY = null;
        for (const existingY of rowMap.keys()) {
          if (Math.abs(existingY - y) <= Y_TOLERANCE) {
            matchedY = existingY;
            break;
          }
        }

        if (matchedY !== null) {
          rowMap.get(matchedY).push({ x, w, text });
        } else {
          rowMap.set(y, [{ x, w, text }]);
        }
      });

      page.cleanup();

      // Sort rows top-to-bottom
      const sortedY = Array.from(rowMap.keys()).sort((a, b) => b - a);

      for (const y of sortedY) {
        const rowItems = rowMap.get(y).sort((a, b) => a.x - b.x);

        // 1. Dynamic Header Template Detection
        const detectedHeader = detectColumnTemplateFromHeaders(rowItems);
        if (detectedHeader) {
          activeBands = buildSpatialBands(detectedHeader, pageWidth);
          continue;
        }

        // 2. Metadata / Footer Skip Checks
        const fullText = rowItems.map(i => i.text).join(' ');
        const normFull = normalizeArabic(fullText);

        if (
          normFull.includes('تقرير بالمنتجات') ||
          normFull.includes('بيان اسعار') ||
          normFull.includes('كشف حساب') ||
          normFull.includes('صوار') ||
          normFull.includes('المحله الكبرى') ||
          normFull.includes('date:') ||
          normFull.includes('time:') ||
          normFull.includes('التاريخ') ||
          rowItems.some(it => normalizeArabic(it.text).includes('الاجمالي الكلي') || normalizeArabic(it.text) === 'اجمالي')
        ) {
          continue;
        }

        // 3. Map Row according to active spatial template
        const bandsToUse = activeBands || buildSpatialBands(null, pageWidth);
        const mapped = mapRowToBands(rowItems, bandsToUse);

        // Skip rows with no meaningful item name or meta-only rows
        if (mapped.rawName && mapped.rawName.length >= 2) {
          // Reject single metadata words mistaken as items
          if (['تقرير بالمنتجات', 'فاتورة مشتريات', 'سند استلام', 'صِوار'].includes(mapped.rawName)) {
            continue;
          }
          extractedItems.push(mapped);
        }
      }
    }

    return extractedItems;
  } catch (error) {
    console.error('PDF Spatial Extraction Error:', error);
    if (error.message && /حجم|تعذر|يرجى/.test(error.message)) {
      throw error;
    }
    throw new Error('فشل في قراءة ملف الـ PDF. يرجى التأكد من صلاحية الملف.');
  } finally {
    if (pdf) {
      try { pdf.destroy(); } catch (_) {}
    }
  }
};

// ---------------------------------------------------------------------------
// Backward-compatible Text extractor
// ---------------------------------------------------------------------------
export const extractTextFromPDF = async (fileOrArrayBuffer) => {
  const structuredItems = await extractStructuredInvoiceFromPDF(fileOrArrayBuffer);
  // Return pipe-formatted lines for any legacy caller
  return structuredItems.map(
    it => `${it.rawName} | الكمية: ${it.qty} | السعر: ${it.price} | الإجمالي: ${it.total}`
  );
};

// ---------------------------------------------------------------------------
// Universal Parser for Raw Text / CSV / Pasted Content
// ---------------------------------------------------------------------------
export const isReportHeaderOrMeta = (cleanLine) => {
  if (!cleanLine || typeof cleanLine !== 'string') return true;
  const line = cleanLine.trim();
  if (line.length < 2) return true;

  if (/^(date|time|التاريخ|الوقت|الساعة|العنوان|هاتف|تليفون|فاكس|فرع)/i.test(line)) return true;
  if (/^(\s*»|\s*«|\s*[-=_*#]{3,})/i.test(line)) return true;
  if (/^(تقرير|بيان|كشف|فاتورة|سجل|أرشيف|سند)\s+(بالمنتجات|بالأصناف|بالمخزون|بالمبيعات|بالمشتريات)/i.test(line)) return true;

  const colHeaderWords = [
    'اسم المنتج', 'اسم الصنف', 'رقم المنتج', 'كود الصنف',
    'سعر البيع', 'سعر الشراء', 'السعر', 'الكمية', 'الكميه', 'الإجمالي', 'الاجمالي'
  ];
  let headerMatchCount = 0;
  for (const h of colHeaderWords) {
    if (line.includes(h)) headerMatchCount++;
  }
  return headerMatchCount >= 2;
};

export const parseInvoiceLine = (line) => {
  if (!line) return null;
  if (typeof line === 'object' && line.rawName) return line; // Already structured
  const clean = String(line).trim();
  if (isReportHeaderOrMeta(clean)) return null;

  // Format 1: Pipe-delimited ("اسم الصنف | الكمية: X | السعر: Y")
  if (clean.includes('|')) {
    const parts = clean.split('|').map(p => p.trim());
    if (parts.length >= 2) {
      const name = decodeArabicPresentationForms(parts[0].replace(/^(الصنف|الاسم|المنتج)[:\s]*/i, '').trim());
      let qty = 0;
      let price = 0;
      let total = 0;

      parts.slice(1).forEach(part => {
        const qtyMatch = part.match(/الكمية[:\s]*([0-9,.]+)/i) || part.match(/الكميه[:\s]*([0-9,.]+)/i);
        const priceMatch = part.match(/السعر[:\s]*([0-9,.]+)/i);
        const totalMatch = part.match(/(الإجمالي|الاجمالي)[:\s]*([0-9,.]+)/i);

        if (qtyMatch) qty = parseNumberSafe(qtyMatch[1]);
        else if (priceMatch) price = parseNumberSafe(priceMatch[1]);
        else if (totalMatch) total = parseNumberSafe(totalMatch[2]);
        else {
          const num = parseNumberSafe(part);
          if (qty === 0) qty = num;
          else if (price === 0) price = num;
          else if (total === 0) total = num;
        }
      });

      if (name && (qty >= 0 || price >= 0)) {
        return { rawName: name, qty, price, total: total || qty * price };
      }
    }
  }

  // Format 2: CSV / Tab Delimited
  const delimiters = [',', '\t', ';'];
  for (const delim of delimiters) {
    if (clean.includes(delim)) {
      const cols = clean.split(delim).map(c => c.trim().replace(/^["']|["']$/g, ''));
      if (cols.length >= 2) {
        let name = '';
        let qty = 0;
        let price = 0;
        let total = 0;

        cols.forEach((col, idx) => {
          const num = parseNumberSafe(col);
          if (isNaN(parseFloat(col.replace(/,/g, ''))) || idx === 0) {
            if (!name) name = decodeArabicPresentationForms(col);
          } else {
            if (qty === 0) qty = num;
            else if (price === 0) price = num;
            else if (total === 0) total = num;
          }
        });

        if (name && (qty >= 0 || price >= 0)) {
          return { rawName: name, qty, price, total: total || qty * price };
        }
      }
    }
  }

  // Format 3: Intelligent space-separated tokens
  const rawTokens = clean.split(/\s+/);
  const numberTokens = [];
  const textTokens = [];

  rawTokens.forEach(token => {
    const cleanNumStr = token.replace(/,/g, '');
    if (/^[0-9]+(\.[0-9]+)?$/.test(cleanNumStr)) {
      numberTokens.push({
        num: parseFloat(cleanNumStr),
        isBarcode: cleanNumStr.length >= 7 || (cleanNumStr.startsWith('0') && cleanNumStr.length >= 5)
      });
    } else {
      textTokens.push(token);
    }
  });

  if (textTokens.length > 0) {
    const rawName = decodeArabicPresentationForms(
      textTokens.join(' ').replace(/^[#\d\s.-]+(?=[^\d\s.-])/, '').replace(/[»«:;]+$/g, '').trim()
    );

    const validNumbers = numberTokens.filter(t => !t.isBarcode).map(t => t.num);
    let price = 0;
    let qty = 0;
    let total = 0;

    if (validNumbers.length >= 3) {
      const [n1, n2, n3] = validNumbers;
      if (Math.abs(n1 * n2 - n3) < Math.max(1, n3 * 0.05)) {
        price = n1; qty = n2; total = n3;
      } else if (Math.abs(n2 * n3 - n1) < Math.max(1, n1 * 0.05)) {
        price = n2; qty = n3; total = n1;
      } else {
        price = n1; qty = n2; total = n1 * n2;
      }
    } else if (validNumbers.length === 2) {
      price = validNumbers[0];
      qty = validNumbers[1];
      total = price * qty;
    } else if (validNumbers.length === 1) {
      qty = validNumbers[0];
    }

    if (rawName && rawName.length >= 2) {
      return { rawName, qty, price, total };
    }
  }

  return null;
};

export const parseRawInvoiceData = (rawContent) => {
  if (Array.isArray(rawContent) && rawContent.length > 0 && typeof rawContent[0] === 'object' && rawContent[0].rawName) {
    return rawContent;
  }

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
