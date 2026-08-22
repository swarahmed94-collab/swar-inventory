import { createWorker } from 'tesseract.js';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const MAX_IMAGE_DIM = 1600;      // px — downscale before OCR to save RAM
const OCR_TIMEOUT_MS = 45_000;  // 45 s — kill OCR if it hangs (mobile watchdog)

// ---------------------------------------------------------------------------
// Image downscaling helper
// ---------------------------------------------------------------------------
/**
 * Resize an image so neither dimension exceeds MAX_IMAGE_DIM.
 * On mobile, camera shots can be 4000×3000 px (~46 MB raw canvas data).
 * Downscaling to 1600 px reduces RAM usage to ~7 MB — safe for all devices.
 *
 * @param {HTMLImageElement} img
 * @returns {{ canvas: HTMLCanvasElement, width: number, height: number }}
 */
const downscaleImage = (img) => {
  let w = img.naturalWidth  || img.width  || img.videoWidth  || 800;
  let h = img.naturalHeight || img.height || img.videoHeight || 600;

  if (w > MAX_IMAGE_DIM || h > MAX_IMAGE_DIM) {
    const ratio = Math.min(MAX_IMAGE_DIM / w, MAX_IMAGE_DIM / h);
    w = Math.round(w * ratio);
    h = Math.round(h * ratio);
  }

  return { w, h };
};

// ---------------------------------------------------------------------------
// Image pre-processing (grayscale + high-contrast binarisation)
// ---------------------------------------------------------------------------
/**
 * Pre-process image in an HTML5 canvas to improve OCR recognition accuracy.
 * (Grayscale, Contrast enhancement, and Binarization)
 * Returns a JPEG data-URL at 85% quality to keep the blob small.
 *
 * @param {HTMLImageElement} imageElement
 * @returns {string} base64 data-URL
 */
export const preprocessImage = (imageElement) => {
  const { w, h } = downscaleImage(imageElement);

  const canvas = document.createElement('canvas');
  canvas.width  = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  // Draw at the target (smaller) size — this is the memory-saving step
  ctx.drawImage(imageElement, 0, 0, w, h);

  try {
    const imgData = ctx.getImageData(0, 0, w, h);
    const d = imgData.data;

    // High contrast grayscale filter
    for (let i = 0; i < d.length; i += 4) {
      const avg = d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114;
      // High contrast curve: push light pixels lighter, dark ones darker
      const contrast = avg > 128
        ? Math.min(255, avg * 1.15)
        : Math.max(0,   avg * 0.85);
      d[i]     = contrast;
      d[i + 1] = contrast;
      d[i + 2] = contrast;
    }

    ctx.putImageData(imgData, 0, 0);
  } catch (_e) {
    // In case of CORS / canvas security restriction — use the original draw
  }

  const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

  // Explicit cleanup: setting dimensions to 0 releases the backing store
  // on all browsers (prevents cumulative memory leaks on repeated scans)
  canvas.width  = 0;
  canvas.height = 0;

  return dataUrl;
};

// ---------------------------------------------------------------------------
// HEIC / HEIF detection helper
// ---------------------------------------------------------------------------
/**
 * iOS cameras save photos as HEIC by default.
 * The browser usually reports MIME as "image/heic" but sometimes as "" or
 * "application/octet-stream". We sniff the first 12 bytes to be sure.
 *
 * @param {File|Blob} fileOrBlob
 * @returns {Promise<boolean>}
 */
export const isHEICFile = async (fileOrBlob) => {
  try {
    const slice = fileOrBlob.slice(0, 12);
    const buf   = await slice.arrayBuffer();
    const bytes = new Uint8Array(buf);
    // HEIC magic: bytes 4-7 are 'ftyp', bytes 8-11 contain 'heic', 'heix', 'mif1' etc.
    const header = String.fromCharCode(...bytes.slice(4, 12));
    return /ftyp(heic|heix|mif1|msf1|hevc|hevx)/i.test(header);
  } catch {
    return false;
  }
};

// ---------------------------------------------------------------------------
// Main OCR function
// ---------------------------------------------------------------------------
/**
 * Perform in-browser OCR on an image file, blob, or base64 data URL.
 * Supports Arabic & English invoice text.
 * Mobile-safe: downscales large images, cleans up canvas memory, has timeout.
 *
 * @param {File|Blob|string} imageFileOrBlob
 * @param {function(number): void} [onProgress] — called with 0-100 progress
 * @returns {Promise<string[]>} array of extracted text lines
 */
export const extractTextFromImage = async (imageFileOrBlob, onProgress = null) => {
  let worker     = null;
  let objectUrl  = null;

  // Wrap everything in a race against OCR_TIMEOUT_MS
  const ocrPromise = (async () => {
    try {
      worker = await createWorker('ara+eng', 1, {
        logger: m => {
          if (
            onProgress &&
            m.status === 'recognizing text' &&
            m.progress !== undefined
          ) {
            onProgress(Math.round(m.progress * 100));
          }
        },
      });

      let imageInput = imageFileOrBlob;

      if (imageFileOrBlob instanceof File || imageFileOrBlob instanceof Blob) {
        // Check for HEIC (iPhone default format — Canvas cannot decode it natively)
        const heic = await isHEICFile(imageFileOrBlob);
        if (heic) {
          // HEIC is not supported by Canvas on any browser yet.
          // Tesseract.js can sometimes handle it directly via its internal
          // decoder, so we pass the raw blob and let it try.
          // If the user is on iOS Safari the browser itself will have already
          // converted it to JPEG in the <input type="file"> pipeline, so this
          // branch is rarely reached.
          imageInput = imageFileOrBlob;
        } else {
          // Standard path: load into an Image element, preprocess, then pass
          // a downscaled JPEG data-URL to Tesseract.
          const img = new Image();
          objectUrl  = URL.createObjectURL(imageFileOrBlob);

          await new Promise((resolve, reject) => {
            img.onload  = resolve;
            img.onerror = reject;
            img.src     = objectUrl;
          });

          imageInput = preprocessImage(img);

          // Release the object URL immediately — no longer needed
          URL.revokeObjectURL(objectUrl);
          objectUrl = null;
        }
      }

      const { data: { text, lines } } = await worker.recognize(imageInput);
      await worker.terminate();
      worker = null;

      if (lines && lines.length > 0) {
        return lines.map(l => l.text.trim()).filter(Boolean);
      }

      return (text || '').split(/\r?\n/).map(l => l.trim()).filter(Boolean);

    } catch (error) {
      console.error('OCR Error:', error);
      throw new Error(
        'فشل في قراءة نصوص الصورة بالكاميرا/المعرض. يرجى التأكد من وضوح إضاءة الفاتورة.'
      );
    }
  })();

  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(
      () => reject(new Error('استغرقت عملية التعرف على النص وقتاً طويلاً. حاول مع صورة بإضاءة أفضل.')),
      OCR_TIMEOUT_MS
    )
  );

  try {
    return await Promise.race([ocrPromise, timeoutPromise]);
  } finally {
    // Guaranteed cleanup even if timeout fires first
    if (objectUrl) {
      try { URL.revokeObjectURL(objectUrl); } catch {}
    }
    if (worker) {
      try { await worker.terminate(); } catch {}
    }
  }
};
