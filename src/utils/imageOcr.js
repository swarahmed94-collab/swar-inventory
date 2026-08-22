import { createWorker } from 'tesseract.js';

/**
 * Pre-process image in an HTML5 canvas to improve OCR recognition accuracy
 * (Grayscale, Contrast enhancement, and Binarization)
 */
export const preprocessImage = (imageElement) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = imageElement.width || imageElement.videoWidth || 800;
  canvas.height = imageElement.height || imageElement.videoHeight || 600;
  
  ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
  
  try {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const d = imgData.data;
    
    // High contrast grayscale filter
    for (let i = 0; i < d.length; i += 4) {
      const avg = (d[i] * 0.299) + (d[i + 1] * 0.587) + (d[i + 2] * 0.114);
      // High contrast curve
      const contrast = avg > 128 ? Math.min(255, avg * 1.15) : Math.max(0, avg * 0.85);
      d[i] = contrast;
      d[i + 1] = contrast;
      d[i + 2] = contrast;
    }
    
    ctx.putImageData(imgData, 0, 0);
  } catch (e) {
    // In case of CORS or canvas security restriction, return standard canvas
  }

  return canvas.toDataURL('image/jpeg', 0.95);
};

/**
 * Perform in-browser OCR on an image file, blob, or base64 data URL
 * Supports Arabic & English invoice text
 */
export const extractTextFromImage = async (imageFileOrBlob, onProgress = null) => {
  let worker = null;
  try {
    worker = await createWorker('ara+eng', 1, {
      logger: m => {
        if (onProgress && m.status === 'recognizing text' && m.progress !== undefined) {
          onProgress(Math.round(m.progress * 100));
        }
      }
    });

    let imageInput = imageFileOrBlob;
    if (imageFileOrBlob instanceof File || imageFileOrBlob instanceof Blob) {
      const img = new Image();
      const objectUrl = URL.createObjectURL(imageFileOrBlob);
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = objectUrl;
      });
      imageInput = preprocessImage(img);
      URL.revokeObjectURL(objectUrl);
    }

    const { data: { text, lines } } = await worker.recognize(imageInput);
    await worker.terminate();

    if (lines && lines.length > 0) {
      return lines.map(l => l.text.trim()).filter(Boolean);
    }

    return (text || '').split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  } catch (error) {
    console.error('OCR Error:', error);
    if (worker) {
      try { await worker.terminate(); } catch {}
    }
    throw new Error('فشل في قراءة نصوص الصورة بالكاميرا/المعرض. يرجى التأكد من وضوح إضاءة الفاتورة.');
  }
};
