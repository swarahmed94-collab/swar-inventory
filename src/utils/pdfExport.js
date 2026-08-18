import html2pdf from 'html2pdf.js';
import { getStockStatus, formatArabicDateTime } from './storage';

/**
 * Generate and download formatted PDF report directly
 */
export const downloadInventoryPDF = async (products) => {
  const currentDate = new Date().toLocaleDateString('ar-EG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  let totalItems = products.length;
  let totalStock = 0;
  let criticalCount = 0;
  let healthyCount = 0;

  products.forEach(p => {
    totalStock += Number(p.currentStock) || 0;
    const s = getStockStatus(p);
    if (s.status === 'critical') criticalCount++;
    else if (s.status === 'healthy') healthyCount++;
  });

  const tableRows = products.map((p, idx) => {
    const s = getStockStatus(p);
    const lastAudit = p.auditHistory?.length > 0 ? p.auditHistory[p.auditHistory.length - 1] : null;
    const statusBg = s.status === 'critical' ? '#fee2e2' : s.status === 'warning' ? '#fef3c7' : '#dcfce7';
    const statusColor = s.status === 'critical' ? '#991b1b' : s.status === 'warning' ? '#92400e' : '#166534';

    return `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 10px 8px; text-align: center; color: #64748b; font-size: 11px;">${idx + 1}</td>
        <td style="padding: 10px 8px; font-weight: bold; color: #0f172a; font-size: 12px;">
          ${p.emoji || '🧊'} ${p.name}
        </td>
        <td style="padding: 10px 8px; color: #475569; font-size: 11px;">${p.freezerLocation || 'غير محدد'}</td>
        <td style="padding: 10px 8px; text-align: center; font-weight: 900; font-size: 13px; color: #0284c7;">
          ${p.currentStock} <span style="font-size: 10px; font-weight: normal; color: #64748b;">${p.unit}</span>
        </td>
        <td style="padding: 10px 8px; text-align: center; font-weight: bold; color: #dc2626; font-size: 11px;">
          ${p.minCriticalThreshold} ${p.unit}
        </td>
        <td style="padding: 10px 8px; text-align: center;">
          <span style="background: ${statusBg}; color: ${statusColor}; padding: 3px 8px; border-radius: 999px; font-size: 10px; font-weight: bold; display: inline-block;">
            ${s.label}
          </span>
        </td>
        <td style="padding: 10px 8px; color: #64748b; font-size: 10px;">
          ${lastAudit ? formatArabicDateTime(lastAudit.date) : 'لم يجرد'}
        </td>
      </tr>
    `;
  }).join('');

  const container = document.createElement('div');
  container.style.direction = 'rtl';
  container.style.fontFamily = "'Tajawal', 'Cairo', sans-serif";
  container.style.padding = '24px';
  container.style.backgroundColor = '#ffffff';
  container.style.color = '#0f172a';

  container.innerHTML = `
    <div style="border-bottom: 2px solid #0284c7; padding-bottom: 16px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <h1 style="margin: 0; font-size: 22px; font-weight: 900; color: #0f172a;">
          ❄️ صِـوار | تقرير جرد وحالة مخزون المجمدات
        </h1>
        <p style="margin: 4px 0 0 0; font-size: 11px; color: #64748b;">
          تاريخ التقرير: ${currentDate} | مستودع الأغذية المجمدة
        </p>
      </div>
      <div style="text-align: left; font-family: monospace; font-size: 11px; color: #0284c7; font-weight: bold;">
        SWAR-INVENTORY
      </div>
    </div>

    <!-- Summary Box -->
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 20px;">
      <div style="border: 1px solid #e2e8f0; background: #f8fafc; border-radius: 12px; padding: 10px; text-align: center;">
        <div style="font-size: 10px; color: #64748b; font-weight: bold;">إجمالي الأصناف</div>
        <div style="font-size: 18px; font-weight: 900; color: #0f172a; margin-top: 2px;">${totalItems}</div>
      </div>
      <div style="border: 1px solid #e2e8f0; background: #f8fafc; border-radius: 12px; padding: 10px; text-align: center;">
        <div style="font-size: 10px; color: #64748b; font-weight: bold;">إجمالي الكميات</div>
        <div style="font-size: 18px; font-weight: 900; color: #0284c7; margin-top: 2px;">${totalStock}</div>
      </div>
      <div style="border: 1px solid #fecaca; background: #fef2f2; border-radius: 12px; padding: 10px; text-align: center;">
        <div style="font-size: 10px; color: #dc2626; font-weight: bold;">نواقص حرجة 🔴</div>
        <div style="font-size: 18px; font-weight: 900; color: #dc2626; margin-top: 2px;">${criticalCount}</div>
      </div>
      <div style="border: 1px solid #bbf7d0; background: #f0fdf4; border-radius: 12px; padding: 10px; text-align: center;">
        <div style="font-size: 10px; color: #16a34a; font-weight: bold;">مخزون كافي 🟢</div>
        <div style="font-size: 18px; font-weight: 900; color: #16a34a; margin-top: 2px;">${healthyCount}</div>
      </div>
    </div>

    <!-- Table -->
    <table style="width: 100%; border-collapse: collapse; text-align: right; margin-bottom: 24px; font-size: 11px;">
      <thead>
        <tr style="background: #f1f5f9; border-bottom: 2px solid #cbd5e1; color: #334155;">
          <th style="padding: 8px; text-align: center;">#</th>
          <th style="padding: 8px;">الصنف المجمد</th>
          <th style="padding: 8px;">مكان الفريزر</th>
          <th style="padding: 8px; text-align: center;">الرصيد الفعلي</th>
          <th style="padding: 8px; text-align: center;">الحد الحرج</th>
          <th style="padding: 8px; text-align: center;">الحالة</th>
          <th style="padding: 8px;">آخر حركة جرد</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>

    <!-- Signatures -->
    <div style="margin-top: 40px; border-top: 1px dashed #cbd5e1; padding-top: 16px; display: flex; justify-content: space-between; font-size: 11px; color: #475569;">
      <div>توقيع مسؤول المخزن: .......................................</div>
      <div>اعتماد مدير التشغيل: .......................................</div>
    </div>
  `;

  const dateStr = new Date().toISOString().split('T')[0];
  const opt = {
    margin: [10, 10, 10, 10],
    filename: `تقرير_جرد_صوار_${dateStr}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  try {
    await html2pdf().set(opt).from(container).save();
    return true;
  } catch (err) {
    console.error('PDF export error:', err);
    // Fallback to print
    window.print();
    return false;
  }
};
