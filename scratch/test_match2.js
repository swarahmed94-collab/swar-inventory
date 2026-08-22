import { INITIAL_PRODUCTS } from '../src/data/defaultProducts.js';

// Let's test standard Unicode vs Presentation Forms
const normalStr = "استربس اطياب 1 كجم [كيس]";
const presentationFormStr = "\uFE8F\uFE91\uFEAE\uFE97\uFEB3\u0020\uFE8E\uFEF3\uFE8E\uFE97\u00201\u0020\uFE9F\uFEA4\uFEA1";

console.log("Normal:", normalStr);
console.log("NFKD Normalized Normal:", normalStr.normalize('NFKD'));
console.log("NFKD Normalized Presentation:", presentationFormStr.normalize('NFKD'));

// Regex in old normalizeArabic:
const oldClean = presentationFormStr.replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, ' ');
console.log("Old clean on presentation form (without NFKD):", `"${oldClean}"`);

const newClean = presentationFormStr.normalize('NFKD').replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, ' ');
console.log("New clean on presentation form (WITH NFKD):", `"${newClean}"`);
