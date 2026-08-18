import { getStockStatus, getAuditRecency, formatArabicDateTime } from './storage';

/**
 * Export product & inventory list to CSV (supports UTF-8 with BOM for Excel Arabic)
 */
export const exportToCSV = (products) => {
  const headers = [
    'كود الصنف',
    'اسم المنتج',
    'الفئة',
    'مكان الحفظ/الفريزر',
    'الكمية الحالية',
    'وحدة القياس',
    'حالة المخزون',
    'الحد الأدنى الحرج',
    'الحد الآمن',
    'تاريخ آخر جرد',
    'عدد مرات الجرد',
    'ملاحظات'
  ];

  const rows = products.map((p) => {
    const status = getStockStatus(p);
    const recency = getAuditRecency(p);
    const lastAudit = p.auditHistory && p.auditHistory.length > 0
      ? formatArabicDateTime(p.auditHistory[p.auditHistory.length - 1].date)
      : 'لم يجرد بعد';

    return [
      `"${p.id}"`,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.category}"`,
      `"${(p.freezerLocation || '').replace(/"/g, '""')}"`,
      p.currentStock,
      `"${p.unit}"`,
      `"${status.label}"`,
      p.minCriticalThreshold,
      p.healthyThreshold,
      `"${lastAudit}"`,
      p.auditHistory ? p.auditHistory.length : 0,
      `"${(p.notes || '').replace(/"/g, '""')}"`
    ];
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const dateStr = new Date().toISOString().split('T')[0];
  link.setAttribute('href', url);
  link.setAttribute('download', `تقرير_جرد_سوار_${dateStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Trigger print dialog with styled printable inventory
 */
export const printInventoryReport = () => {
  window.print();
};
