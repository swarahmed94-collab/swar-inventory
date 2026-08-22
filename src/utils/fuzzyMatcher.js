/**
 * High-precision Arabic Fuzzy Matching Engine
 * Tailored for inventory product names, weights, brands, and packaging units.
 */

// Normalize Arabic text for robust searching & comparison
export const normalizeArabic = (text) => {
  if (!text) return '';
  let str = String(text).trim().toLowerCase();

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

  // Remove extra punctuation, keeping letters and numbers
  str = str.replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, ' ');

  // Collapse consecutive whitespaces
  str = str.replace(/\s+/g, ' ').trim();

  return str;
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
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
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
      // Check partial word match for slight typo in token
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
 * Calculate comprehensive match score between a queried name and a catalog product
 */
export const calculateMatchScore = (queryName, product) => {
  if (!queryName || !product || !product.name) return 0;

  const qFeat = extractFeatures(queryName);
  const pFeat = extractFeatures(product.name);

  // Exact normalized match
  if (qFeat.norm === pFeat.norm) return 1.0;

  // Substring containment
  if (pFeat.norm.includes(qFeat.norm) || qFeat.norm.includes(pFeat.norm)) {
    const lenRatio = Math.min(qFeat.norm.length, pFeat.norm.length) / Math.max(qFeat.norm.length, pFeat.norm.length);
    if (lenRatio > 0.75) return 0.95;
  }

  // Token Jaccard Similarity
  const tokenSim = tokenSetSimilarity(queryName, product.name);

  // Levenshtein similarity on normalized full strings
  const maxLen = Math.max(qFeat.norm.length, pFeat.norm.length);
  const levDist = levenshteinDistance(qFeat.norm, pFeat.norm);
  const levSim = maxLen > 0 ? Math.max(0, 1 - (levDist / maxLen)) : 0;

  // Combined baseline score
  let score = (tokenSim * 0.65) + (levSim * 0.35);

  // Packaging match adjustments (carton vs bag is critical in frozen foods)
  if (qFeat.hasCarton && pFeat.hasCarton) score += 0.12;
  if (qFeat.hasBag && pFeat.hasBag) score += 0.12;
  if (qFeat.hasBox && pFeat.hasBox) score += 0.12;
  if (qFeat.hasPiece && pFeat.hasPiece) score += 0.10;

  // Packaging mismatch penalties
  if (qFeat.hasCarton && pFeat.hasBag) score -= 0.25;
  if (qFeat.hasBag && pFeat.hasCarton) score -= 0.25;

  // Number / Weight matching (e.g. 400 vs 900 vs 1000)
  const commonNumbers = qFeat.numbers.filter(n => pFeat.numbers.includes(n));
  if (qFeat.numbers.length > 0 && pFeat.numbers.length > 0) {
    if (commonNumbers.length > 0) {
      score += 0.15;
    } else {
      // Discrepancy in specified weights (e.g. 400g vs 900g)
      score -= 0.20;
    }
  }

  return Math.max(0, Math.min(1.0, score));
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
      confidence: score >= 0.80 ? 'high' : score >= 0.50 ? 'medium' : 'low'
    };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit);
};

/**
 * Auto-match a single item against the catalog
 * Returns { matchedProduct, confidence, score, suggestions }
 */
export const autoMatchProduct = (queryName, catalog = [], threshold = 0.55) => {
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
