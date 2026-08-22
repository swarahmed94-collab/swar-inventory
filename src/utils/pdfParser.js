import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Initialize PDF.js worker
if (typeof window !== 'undefined' && pdfjsLib.GlobalWorkerOptions) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
}

/**
 * Extract structured rows and text from an uploaded PDF file
 */
export const extractTextFromPDF = async (fileOrArrayBuffer) => {
  try {
    let arrayBuffer;
    if (fileOrArrayBuffer instanceof File || fileOrArrayBuffer instanceof Blob) {
      arrayBuffer = await fileOrArrayBuffer.arrayBuffer();
    } else {
      arrayBuffer = fileOrArrayBuffer;
    }

    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    const allLines = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      // Group items by vertical Y coordinate with a tolerance (for same row)
      const rowMap = new Map();
      const Y_TOLERANCE = 4.0;

      textContent.items.forEach(item => {
        const text = item.str.trim();
        if (!text) return;

        const y = item.transform[5];
        const x = item.transform[4];

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
 * Parse a single line of text from an invoice/stock file into structured product data
 */
export const parseInvoiceLine = (line) => {
  if (!line || typeof line !== 'string') return null;
  const clean = line.trim();

  // Skip header lines or divider lines
  if (/^(#|مسلسل|الرقم|الصنف|الاسم|البيان|الكمية|السعر|الإجمالي|الاجمالي|المجموع|تاريخ|فاتورة|كود)/i.test(clean)) {
    return null;
  }
  if (clean.length < 3 || /^[-=_*#\s]{4,}$/.test(clean)) {
    return null;
  }

  // Format 1: "اسم الصنف | الكمية: X | السعر: Y" or pipe separated
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
          // If pure number in column
          const num = parseFloat(part.replace(/,/g, ''));
          if (!isNaN(num)) {
            if (qty === 0) qty = num;
            else if (price === 0) price = num;
          }
        }
      });

      if (name && (qty > 0 || price > 0 || parts.length >= 3)) {
        return { rawName: name, qty: qty || 1, price: price || 0 };
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

        // Determine which columns are numbers
        cols.forEach((col, idx) => {
          const num = parseFloat(col.replace(/,/g, ''));
          if (isNaN(num) || (idx === 0 && isNaN(parseFloat(col)))) {
            if (!name) name = col;
            else if (!isNaN(num)) {
              // Could be unit or secondary description
            }
          } else {
            if (qty === 0) qty = num;
            else if (price === 0) price = num;
          }
        });

        if (name && (qty > 0 || price > 0)) {
          return { rawName: name, qty: qty || 1, price: price || 0 };
        }
      }
    }
  }

  // Format 3: Space separated / Table row from PDF
  // Example: "استربس اطياب كيس 5 290 1450" or "فوارغ مخللات 986.3 10.00"
  // Match numbers at the end of the line
  const regexTrailingNumbers = /^(.*?)(?:\s+(\d+(?:\.\d+)?))?(?:\s+(\d+(?:\.\d+)?))?(?:\s+(\d+(?:\.\d+)?))?$/;
  const match = clean.match(regexTrailingNumbers);

  if (match) {
    const rawName = match[1]?.trim();
    const num1 = match[2] ? parseFloat(match[2]) : null;
    const num2 = match[3] ? parseFloat(match[3]) : null;
    const num3 = match[4] ? parseFloat(match[4]) : null;

    if (rawName && rawName.length >= 2) {
      let qty = 1;
      let price = 0;

      if (num1 !== null && num2 !== null && num3 !== null) {
        // [qty, price, total] or [idx, qty, price]
        qty = num1;
        price = num2;
      } else if (num1 !== null && num2 !== null) {
        // [qty, price]
        qty = num1;
        price = num2;
      } else if (num1 !== null) {
        qty = num1;
      }

      return { rawName, qty, price };
    }
  }

  return { rawName: clean, qty: 1, price: 0 };
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
