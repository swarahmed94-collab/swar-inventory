/**
 * voiceParser.js
 * Converts a spoken Arabic/English transcript into an array of { rawName, qty }.
 *
 * Handles:
 *  - Egyptian dialect number words (واحد, اتنين, تلاتة … عشرة, عشرين, مية …)
 *  - Mixed Arabic-English phrases ("5 burger و 6 كفتة")
 *  - Common separators: و / مع / كمان / أيضاً / comma / period
 *  - Fractions: نص (0.5), ربع (0.25), تلت (0.333)
 *  - Decimal / integer digits: Arabic-Indic ١٢٣ or Latin 123
 */

// ---------------------------------------------------------------------------
// Number-word → value map (Egyptian Arabic dialect)
// ---------------------------------------------------------------------------
const WORD_NUMBERS = {
  // Cardinals
  'صفر': 0, 'واحد': 1, 'اتنين': 2, 'اثنين': 2, 'تنين': 2,
  'تلاتة': 3, 'ثلاثة': 3, 'تلات': 3, 'ثلاث': 3,
  'اربعة': 4, 'أربعة': 4, 'اربع': 4, 'أربع': 4,
  'خمسة': 5, 'خمس': 5,
  'ستة': 6, 'ست': 6,
  'سبعة': 7, 'سبع': 7,
  'تمانية': 8, 'ثمانية': 8, 'تمان': 8, 'ثماني': 8,
  'تسعة': 9, 'تسع': 9,
  'عشرة': 10, 'عشر': 10, 'عشرا': 10,
  'حداشر': 11, 'إحدى عشر': 11, 'أحد عشر': 11,
  'اتناشر': 12, 'اثنا عشر': 12, 'اثني عشر': 12,
  'تلتاشر': 13, 'ثلاثة عشر': 13,
  'اربعتاشر': 14, 'أربعة عشر': 14,
  'خمستاشر': 15, 'خمسة عشر': 15,
  'ستاشر': 16, 'ستة عشر': 16,
  'سبعتاشر': 17, 'سبعة عشر': 17,
  'تمانتاشر': 18, 'ثمانية عشر': 18,
  'تسعتاشر': 19, 'تسعة عشر': 19,
  'عشرين': 20, 'تلاتين': 30, 'ثلاثين': 30,
  'اربعين': 40, 'أربعين': 40,
  'خمسين': 50, 'ستين': 60,
  'سبعين': 70, 'تمانين': 80, 'ثمانين': 80,
  'تسعين': 90,
  'مية': 100, 'مائة': 100, 'ميه': 100,
  'مئة': 100,
  'مياتين': 200, 'مئتين': 200,
  'تلاتمية': 300, 'خمسمية': 500, 'الف': 1000, 'ألف': 1000,
  // Fractions
  'نص': 0.5, 'نصف': 0.5, 'ربع': 0.25, 'تلت': 1 / 3,
};

// ---------------------------------------------------------------------------
// Separator words / connector words (split the sentence on these)
// ---------------------------------------------------------------------------
const SEPARATOR_PATTERN =
  /[\u060C,،;.]+|\s+(?:و|مع|كمان|أيضاً|ايضاً|ايضا|كذلك|plus|and)\s+/gi;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Convert Arabic-Indic / Eastern-Arabic digits to Latin digits */
const convertArabicDigits = (str) =>
  str.replace(/[٠١٢٣٤٥٦٧٨٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString());

/** Normalize a token for Arabic comparison */
const normalizeToken = (t) =>
  t
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/[\u064B-\u065F\u0670]/g, '') // strip tashkeel
    .trim()
    .toLowerCase();

/**
 * Try to parse a word token as a number.
 * Returns a number or null.
 */
const tokenToNumber = (token) => {
  const t = convertArabicDigits(token.trim());

  // Pure Latin / Arabic-Indic number (possibly decimal)
  if (/^\d+(\.\d+)?$/.test(t)) return parseFloat(t);

  // Number-word lookup (normalized)
  const norm = normalizeToken(token);
  if (WORD_NUMBERS[norm] !== undefined) return WORD_NUMBERS[norm];

  // Partial match — try every key that starts with / equals normalized token
  for (const [key, val] of Object.entries(WORD_NUMBERS)) {
    if (normalizeToken(key) === norm) return val;
  }

  return null;
};

// ---------------------------------------------------------------------------
// Core: split transcript into segments then parse each one
// ---------------------------------------------------------------------------

/**
 * Parse one segment like "خمسة برجر" or "burger 6" or "6 كفتة" or "كفتة"
 * Returns { rawName: string, qty: number } or null
 */
const parseSegment = (segment) => {
  const raw = segment.trim();
  if (!raw) return null;

  const tokens = convertArabicDigits(raw).split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return null;

  const nameTokens = [];
  let qty = null;
  let qtyAssigned = false;

  // Pass 1: walk tokens left-to-right
  // Strategy: the first numeric token we see is the quantity;
  //           everything else joins the name.
  for (let i = 0; i < tokens.length; i++) {
    const num = tokenToNumber(tokens[i]);
    if (num !== null && !qtyAssigned) {
      // Check if next token is also a number (compound: "عشرين وخمسة" = 25)
      // Simple rule: if value >= 10 and next token value < 10, add them
      if (num >= 10 && i + 1 < tokens.length) {
        const nextNum = tokenToNumber(tokens[i + 1]);
        if (nextNum !== null && nextNum < 10) {
          qty = num + nextNum;
          i++; // skip next token
          qtyAssigned = true;
          continue;
        }
      }
      qty = num;
      qtyAssigned = true;
    } else {
      nameTokens.push(tokens[i]);
    }
  }

  // If no quantity found at all, default to 1
  if (!qtyAssigned) qty = 1;

  const rawName = nameTokens.join(' ').trim();

  // Reject segments that are only stop words or too short
  const stopWords = new Set([
    'من', 'في', 'على', 'الى', 'إلى', 'هات', 'جيب', 'عايز', 'عاوز',
    'اضف', 'أضف', 'حط', 'خد', 'the', 'a', 'an', 'of', 'and', 'with',
  ]);
  const cleanName = rawName
    .split(/\s+/)
    .filter((w) => !stopWords.has(normalizeToken(w)))
    .join(' ')
    .trim();

  if (!cleanName || cleanName.length < 2) return null;

  return { rawName: cleanName, qty: qty ?? 1 };
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Parse a full voice transcript into structured items.
 *
 * @param {string} transcript  Raw speech-to-text string
 * @returns {{ rawName: string, qty: number }[]}
 *
 * @example
 * parseVoiceTranscript("خمسة برجر وستة كفتة وستة سجق")
 * // [{ rawName: "برجر", qty: 5 }, { rawName: "كفتة", qty: 6 }, ...]
 */
export const parseVoiceTranscript = (transcript) => {
  if (!transcript || typeof transcript !== 'string') return [];

  const cleaned = transcript
    .replace(/[""''«»]/g, '')  // remove quotation marks
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleaned) return [];

  // Split on separator words / punctuation
  const rawSegments = cleaned.split(SEPARATOR_PATTERN);

  const items = [];
  for (const seg of rawSegments) {
    const parsed = parseSegment(seg);
    if (parsed) items.push(parsed);
  }

  return items;
};
