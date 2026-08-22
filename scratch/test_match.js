import { INITIAL_PRODUCTS } from '../src/data/defaultProducts.js';
import { autoMatchProduct, findBestMatches, calculateMatchScore, normalizeArabic } from '../src/utils/fuzzyMatcher.js';
import { parseInvoiceLine } from '../src/utils/pdfParser.js';

console.log('Total products in catalog:', INITIAL_PRODUCTS.length);

const testLines = [
  '0923522943 414,240.00 828.48 500.00 رصيد سابق',
  '01111055237 9,863.00 986.3 10.00 فوارغ مخللات',
  'رصيد سابق 500.00 828.48 414,240.00 0923522943',
  'فوارغ مخللات 10.00 986.3 9,863.00 01111055237',
  'اجنحه اطياب 700 جم [كيس] 50.00 0 0.00 123456',
  'استربس اطياب 1 كجم [كيس] 290.00 6 1,740.00 123456',
  'استربس اطياب جم 400 [علبة] 140.00 4 560.00 123456',
  'استربس الوادي جم 900 [كيس] 205.00 9 1,845.00 123456'
];

testLines.forEach((line, idx) => {
  console.log(`\n--- Test Line #${idx + 1} ---`);
  console.log('Original Line:', line);
  const parsed = parseInvoiceLine(line);
  console.log('Parsed result:', parsed);

  if (parsed) {
    const match = autoMatchProduct(parsed.rawName, INITIAL_PRODUCTS);
    console.log('AutoMatch:', {
      rawName: parsed.rawName,
      matched: match.matchedProduct ? match.matchedProduct.name : null,
      confidence: match.confidence,
      score: match.score
    });
    if (!match.matchedProduct) {
      console.log('Top 3 candidates:', findBestMatches(parsed.rawName, INITIAL_PRODUCTS, 3));
    }
  }
});
