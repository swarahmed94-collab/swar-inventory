/**
 * High-precision Arabic Fuzzy Matching Engine
 * Supports Arabic Presentation Forms-A/B, RTL reversals, weights, brands, and packaging units.
 */

// Arabic Presentation Forms Mapping to standard Arabic characters
const ARABIC_PRESENTATION_MAP = {
  '\uFE80': '\u0621', // HAMZA
  '\uFE81': '\u0622', '\uFE82': '\u0622', // ALEF WITH MADDA
  '\uFE83': '\u0623', '\uFE84': '\u0623', // ALEF WITH HAMZA ABOVE
  '\uFE85': '\u0624', '\uFE86': '\u0624', // WAW WITH HAMZA
  '\uFE87': '\u0625', '\uFE88': '\u0625', // ALEF WITH HAMZA BELOW
  '\uFE89': '\u0626', '\uFE8A': '\u0626', '\uFE8B': '\u0626', '\uFE8C': '\u0626', // YEH WITH HAMZA
  '\uFE8D': '\u0627', '\uFE8E': '\u0627', // ALEF
  '\uFE8F': '\u0628', '\uFE90': '\u0628', '\uFE91': '\u0628', '\uFE92': '\u0628', // BEH
  '\uFE93': '\u0629', '\uFE94': '\u0629', // TEH MARBUTA
  '\uFE95': '\u062A', '\uFE96': '\u062A', '\uFE97': '\u062A', '\uFE98': '\u062A', // TEH
  '\uFE99': '\u062B', '\uFE9A': '\u062B', '\uFE9B': '\u062B', '\uFE9C': '\u062B', // THEH
  '\uFE9D': '\u062C', '\uFE9E': '\u062C', '\uFE9F': '\u062C', '\uFEA0': '\u062C', // JEEM
  '\uFEA1': '\u062D', '\uFEA2': '\u062D', '\uFEA3': '\u062D', '\uFEA4': '\u062D', // HAH
  '\uFEA5': '\u062E', '\uFEA6': '\u062E', '\uFEA7': '\u062E', '\uFEA8': '\u062E', // KHAH
  '\uFEA9': '\u062F', '\uFEAA': '\u062F', // DAL
  '\uFEAB': '\u0630', '\uFEAC': '\u0630', // THAL
  '\uFEAD': '\u0631', '\uFEAE': '\u0631', // REH
  '\uFEAF': '\u0632', '\uFEB0': '\u0632', // ZAIN
  '\uFEB1': '\u0633', '\uFEB2': '\u0633', '\uFEB3': '\u0633', '\uFEB4': '\u0633', // SEEN
  '\uFEB5': '\u0634', '\uFEB6': '\u0634', '\uFEB7': '\u0634', '\uFEB8': '\u0634', // SHEEN
  '\uFEB9': '\u0635', '\uFEBA': '\u0635', '\uFEBB': '\u0635', '\uFEBC': '\u0635', // SAD
  '\uFEBD': '\u0636', '\uFEBE': '\u0636', '\uFEBF': '\u0636', '\uFEC0': '\u0636', // DAD
  '\uFEC1': '\u0637', '\uFEC2': '\u0637', '\uFEC3': '\u0637', '\uFEC4': '\u0637', // TAH
  '\uFEC5': '\u0638', '\uFEC6': '\u0638', '\uFEC7': '\u0638', '\uFEC8': '\u0638', // ZAH
  '\uFEC9': '\u0639', '\uFECA': '\u0639', '\uFECB': '\u0639', '\uFECC': '\u0639', // AIN
  '\uFECD': '\u063A', '\uFECE': '\u063A', '\uFECF': '\u063A', '\uFED0': '\u063A', // GHAIN
  '\uFED1': '\u0641', '\uFED2': '\u0641', '\uFED3': '\u0641', '\uFED4': '\u0641', // FEH
  '\uFED5': '\u0642', '\uFED6': '\u0642', '\uFED7': '\u0642', '\uFED8': '\u0642', // QAF
  '\uFED9': '\u0643', '\uFEDA': '\u0643', '\uFEDB': '\u0643', '\uFEDC': '\u0643', // KAF
  '\uFEDD': '\u0644', '\uFEDE': '\u0644', '\uFEDF': '\u0644', '\uFEE0': '\u0644', // LAM
  '\uFEE1': '\u0645', '\uFEE2': '\u0645', '\uFEE3': '\u0645', '\uFEE4': '\u0645', // MEEM
  '\uFEE5': '\u0646', '\uFEE6': '\u0646', '\uFEE7': '\u0646', '\uFEE8': '\u0646', // NOON
  '\uFEE9': '\u0647', '\uFEEA': '\u0647', '\uFEEB': '\u0647', '\uFEEC': '\u0647', // HEH
  '\uFEED': '\u0648', '\uFEEE': '\u0648', // WAW
  '\uFEEF': '\u0649', '\uFEF0': '\u0649', // ALEF MAQSURA
  '\uFEF1': '\u064A', '\uFEF2': '\u064A', '\uFEF3': '\u064A', '\uFEF4': '\u064A', // YEH
  '\uFEF5': '\u0644\u0622', '\uFEF6': '\u0644\u0622', // LAM ALEF MADDA
  '\uFEF7': '\u0644\u0623', '\uFEF8': '\u0644\u0623', // LAM ALEF HAMZA ABOVE
  '\uFEF9': '\u0644\u0625', '\uFEFA': '\u0644\u0625', // LAM ALEF HAMZA BELOW
  '\uFEFB': '\u0644\u0627', '\uFEFC': '\u0644\u0627', // LAM ALEF
};

export const decodeArabicPresentationForms = (text) => {
  if (!text) return '';
  let res = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ARABIC_PRESENTATION_MAP[ch]) {
      res += ARABIC_PRESENTATION_MAP[ch];
    } else {
      res += ch;
    }
  }
  return res.normalize('NFKD');
};

// Normalize Arabic text for robust searching & comparison
export const normalizeArabic = (text) => {
  if (!text) return '';
  let str = decodeArabicPresentationForms(String(text));

  // Convert Arabic/Hindi digits to Latin digits
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  arabicDigits.forEach((d, idx) => {
    str = str.replace(new RegExp(d, 'g'), String(idx));
  });

  // Remove diacritics / Tashkeel
  str = str.replace(/[\u064B-\u065F\u0670]/g, '');

  // Normalize Alef variants
  str = str.replace(/[أإآٱ]/g, 'ا');

  // Normalize Taa Marbouta
  str = str.replace(/ة/g, 'ه');

  // Normalize Yaa / Alef Maqsura
  str = str.replace(/ى/g, 'ي');

  // Normalize common product term abbreviations
  str = str.replace(/\bجم\b/g, 'جرام');
  str = str.replace(/\bكجم\b/g, 'كيلو');
  str = str.replace(/\bكغ\b/g, 'كيلو');
  str = str.replace(/\bك\b/g, 'كيلو');
  str = str.replace(/\bكارتون\b/g, 'كرتون');
  str = str.replace(/\bكرتونه\b/g, 'كرتون');
  str = str.replace(/\bعلبه\b/g, 'علبة');
  str = str.replace(/\bقطع\b/g, 'قطعة');

  // Remove extra punctuation, keeping letters, numbers and brackets
  str = str.replace(/[^\u0600-\u06FFa-zA-Z0-9\s\[\]()]/g, ' ');

  // Collapse consecutive whitespaces
  str = str.replace(/\s+/g, ' ').trim();

  return str;
};

/**
 * Generate multiple normalized variants of a text query (handles reversed RTL strings)
 */
export const getQueryVariants = (rawText) => {
  const norm = normalizeArabic(rawText);
  if (!norm) return [];

  const charReversed = norm.split('').reverse().join('').replace(/\s+/g, ' ').trim();
  const wordReversed = norm.split(' ').map(w => w.split('').reverse().join('')).join(' ').replace(/\s+/g, ' ').trim();
  const wordsOrderReversed = norm.split(' ').reverse().join(' ').replace(/\s+/g, ' ').trim();
  const fullReversed = charReversed.split(' ').reverse().join(' ').replace(/\s+/g, ' ').trim();

  const set = new Set([norm, charReversed, wordReversed, wordsOrderReversed, fullReversed]);
  return Array.from(set).filter(Boolean);
};

/**
 * Standard Levenshtein Distance
 */
export const levenshteinDistance = (a, b) => {
  if (!a || !b) return (a || b || '').length;
  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
};

/**
 * Token Set Similarity (order-independent word matching)
 */
export const tokenSetSimilarity = (query, target) => {
  const normQ = normalizeArabic(query);
  const normT = normalizeArabic(target);

  if (!normQ || !normT) return 0;
  if (normQ === normT) return 1.0;

  const wordsQ = new Set(normQ.split(' ').filter(Boolean));
  const wordsT = new Set(normT.split(' ').filter(Boolean));

  if (wordsQ.size === 0 || wordsT.size === 0) return 0;

  let intersection = 0;
  wordsQ.forEach(w => {
    if (wordsT.has(w)) {
      intersection++;
    } else {
      for (const tw of wordsT) {
        if (w.length >= 3 && tw.length >= 3) {
          const dist = levenshteinDistance(w, tw);
          if (dist <= 1) {
            intersection += 0.85;
            break;
          }
        }
      }
    }
  });

  const union = wordsQ.size + wordsT.size - intersection;
  return union > 0 ? (intersection / union) : 0;
};

/**
 * Extract numbers, weights, and packaging terms to boost matching accuracy
 */
export const extractFeatures = (text) => {
  const norm = normalizeArabic(text);
  const numbers = norm.match(/\d+(\.\d+)?/g) || [];
  const hasCarton = norm.includes('كرتون');
  const hasBag = norm.includes('كيس');
  const hasBox = norm.includes('علب');
  const hasPiece = norm.includes('قطع');

  return { norm, numbers, hasCarton, hasBag, hasBox, hasPiece };
};

/**
 * Calculate match score between a single variant and a target product
 */
const scoreSingleVariant = (qVariant, product) => {
  const qFeat = extractFeatures(qVariant);
  const pFeat = extractFeatures(product.name);

  // Exact normalized match
  if (qFeat.norm === pFeat.norm) return 1.0;

  // Substring containment
  if (pFeat.norm.includes(qFeat.norm) || qFeat.norm.includes(pFeat.norm)) {
    const lenRatio = Math.min(qFeat.norm.length, pFeat.norm.length) / Math.max(qFeat.norm.length, pFeat.norm.length);
    if (lenRatio > 0.6) return 0.95;
  }

  // Token Jaccard Similarity
  const tokenSim = tokenSetSimilarity(qVariant, product.name);

  // Levenshtein similarity on normalized full strings
  const maxLen = Math.max(qFeat.norm.length, pFeat.norm.length);
  const levDist = levenshteinDistance(qFeat.norm, pFeat.norm);
  const levSim = maxLen > 0 ? Math.max(0, 1 - (levDist / maxLen)) : 0;

  // Combined baseline score
  let score = (tokenSim * 0.65) + (levSim * 0.35);

  // Packaging match adjustments
  if (qFeat.hasCarton && pFeat.hasCarton) score += 0.12;
  if (qFeat.hasBag && pFeat.hasBag) score += 0.12;
  if (qFeat.hasBox && pFeat.hasBox) score += 0.12;
  if (qFeat.hasPiece && pFeat.hasPiece) score += 0.10;

  // Packaging mismatch penalties
  if (qFeat.hasCarton && pFeat.hasBag) score -= 0.20;
  if (qFeat.hasBag && pFeat.hasCarton) score -= 0.20;

  // Number / Weight matching (e.g. 400 vs 900 vs 1000)
  const commonNumbers = qFeat.numbers.filter(n => pFeat.numbers.includes(n));
  if (qFeat.numbers.length > 0 && pFeat.numbers.length > 0) {
    if (commonNumbers.length > 0) {
      score += 0.15;
    } else {
      score -= 0.15;
    }
  }

  return Math.max(0, Math.min(1.0, score));
};

/**
 * Calculate comprehensive match score across all query variants
 */
export const calculateMatchScore = (queryName, product) => {
  if (!queryName || !product || !product.name) return 0;

  const variants = getQueryVariants(queryName);
  let maxScore = 0;

  for (const v of variants) {
    const s = scoreSingleVariant(v, product);
    if (s > maxScore) {
      maxScore = s;
    }
    if (maxScore >= 0.98) break;
  }

  return maxScore;
};

/**
 * Find best matching products for a queried name from the product catalog
 */
export const findBestMatches = (queryName, catalog = [], limit = 5) => {
  if (!queryName || !Array.isArray(catalog) || catalog.length === 0) {
    return [];
  }

  const scored = catalog.map(product => {
    const score = calculateMatchScore(queryName, product);
    return {
      product,
      score: Math.round(score * 100) / 100,
      confidence: score >= 0.70 ? 'high' : score >= 0.40 ? 'medium' : 'low'
    };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit);
};

/**
 * Auto-match a single item against the catalog
 */
export const autoMatchProduct = (queryName, catalog = [], threshold = 0.40) => {
  const topMatches = findBestMatches(queryName, catalog, 5);
  const best = topMatches[0];

  if (best && best.score >= threshold) {
    return {
      matchedProduct: best.product,
      confidence: best.confidence,
      score: best.score,
      suggestions: topMatches.map(m => m.product)
    };
  }

  return {
    matchedProduct: null,
    confidence: 'none',
    score: best ? best.score : 0,
    suggestions: topMatches.map(m => m.product)
  };
};
