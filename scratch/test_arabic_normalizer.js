import { INITIAL_PRODUCTS } from '../src/data/defaultProducts.js';

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

console.log("Decoded Presentation string:", decodeArabicPresentationForms("\uFE8F\uFE91\uFEAE\uFE97\uFEB3\u0020\uFE8E\uFEF3\uFE8E\uFE97"));
