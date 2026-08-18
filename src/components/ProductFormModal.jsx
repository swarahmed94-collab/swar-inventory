import React, { useState, useEffect } from 'react';
import { 
  X, 
  Package, 
  Layers, 
  Scale, 
  MapPin, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';
import { DEFAULT_CATEGORIES } from '../data/defaultProducts';
import { sounds } from '../utils/sound';

export default function ProductFormModal({
  productToEdit,
  isOpen,
  onClose,
  onSaveProduct
}) {
  if (!isOpen) return null;

  const isEdit = Boolean(productToEdit);

  const [formData, setFormData] = useState({
    name: '',
    category: 'poultry',
    unit: 'كيس',
    currentStock: 10,
    minCriticalThreshold: 5,
    healthyThreshold: 20,
    freezerLocation: 'فريزر رقم 1',
    notes: '',
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name || '',
        category: productToEdit.category || 'poultry',
        unit: productToEdit.unit || 'كيس',
        currentStock: productToEdit.currentStock ?? 0,
        minCriticalThreshold: productToEdit.minCriticalThreshold ?? 5,
        healthyThreshold: productToEdit.healthyThreshold ?? 20,
        freezerLocation: productToEdit.freezerLocation || '',
        notes: productToEdit.notes || '',
      });
    } else {
      setFormData({
        name: '',
        category: 'poultry',
        unit: 'كيس',
        currentStock: 10,
        minCriticalThreshold: 5,
        healthyThreshold: 20,
        freezerLocation: 'فريزر رقم 1',
        notes: '',
      });
    }
  }, [productToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    sounds.playSuccess();

    const productPayload = {
      ...formData,
      name: formData.name.trim(),
      currentStock: Number(formData.currentStock) || 0,
      minCriticalThreshold: Number(formData.minCriticalThreshold) || 5,
      healthyThreshold: Number(formData.healthyThreshold) || 20,
    };

    onSaveProduct(productPayload, productToEdit?.id);
    onClose();
  };

  const unitsList = ['كيس', 'كرتونة', 'علبة', 'طبق', 'كجم', 'قطعة'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in no-print">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto animate-slide-up">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-sky-600 to-blue-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black">
                {isEdit ? 'تعديل بيانات الصنف المجمد' : 'إضافة صنف مجمد جديد'}
              </h2>
              <p className="text-xs text-sky-100 mt-0.5">
                يرجى إدخال وتحديث البيانات بدقة لمتابعة مستويات المخزون
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          {/* Product Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              اسم المنتج المجمد: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="مثال: ستربس دجاج مقرمش 1 كجم، بانيه حار، برجر..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-sky-500 outline-none"
            />
          </div>

          {/* Category & Unit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                التصنيف:
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm outline-none cursor-pointer"
              >
                {DEFAULT_CATEGORIES.filter(c => c.id !== 'all').map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                وحدة التعبئة والقياس:
              </label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm outline-none cursor-pointer"
              >
                {unitsList.map(u => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Stock Levels & Thresholds */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              <span>مستويات المخزون وحدود الإنذار الذكية</span>
            </h4>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1 truncate">
                  الكمية الحالية:
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.currentStock}
                  onChange={(e) => setFormData({ ...formData, currentStock: e.target.value })}
                  className="w-full px-2.5 py-2 text-center text-base font-black rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-rose-600 dark:text-rose-400 mb-1 truncate">
                  الحد الحرج 🔴:
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.minCriticalThreshold}
                  onChange={(e) => setFormData({ ...formData, minCriticalThreshold: e.target.value })}
                  className="w-full px-2.5 py-2 text-center text-base font-black rounded-xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mb-1 truncate">
                  الحد الآمن 🟢:
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.healthyThreshold}
                  onChange={(e) => setFormData({ ...formData, healthyThreshold: e.target.value })}
                  className="w-full px-2.5 py-2 text-center text-base font-black rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/60 text-emerald-600 dark:text-emerald-400 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Freezer Location */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              مكان التخزين / رقم الفريزر:
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={formData.freezerLocation}
                onChange={(e) => setFormData({ ...formData, freezerLocation: e.target.value })}
                placeholder="مثال: فريزر 1 - الرف الأوسط، غرفة التجميد الرئيسية..."
                className="w-full pr-9 pl-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              ملاحظات إضافية:
            </label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="ملاحظات المورد، درجة التجميد، تواريخ الصلاحية..."
              className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-sky-500 resize-none"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-sm font-black shadow-md shadow-sky-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isEdit ? 'حفظ التعديلات' : 'إضافة الصنف'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
