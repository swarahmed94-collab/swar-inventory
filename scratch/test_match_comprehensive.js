import { INITIAL_PRODUCTS } from '../src/data/defaultProducts.js';
import { decodeArabicPresentationForms } from './test_arabic_normalizer.js';

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

  // Remove extra punctuation, keeping letters and numbers
  str = str.replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, ' ');

  // Collapse consecutive whitespaces
  str = str.replace(/\s+/g, ' ').trim();

  return str;
};

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

console.log("Variants of 'رصيد سابق':", getQueryVariants("رصيد سابق"));
console.log("Variants of 'قباس ديصر':", getQueryVariants("قباس ديصر"));
console.log("Variants of presentation 'استربس اطياب':", getQueryVariants("\uFE8F\uFE91\uFEAE\uFE97\uFEB3\u0020\uFE8E\uFEF3\uFE8E\uFE97"));
