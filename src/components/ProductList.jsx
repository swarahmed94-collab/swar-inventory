import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  LayoutGrid, 
  List, 
  X,
  PackageX,
  Plus,
  Drumstick,
  Beef,
  Fish,
  Utensils,
  Carrot,
  Boxes,
  Milk,
  Salad
} from 'lucide-react';
import ProductCard from './ProductCard';
import { DEFAULT_CATEGORIES } from '../data/defaultProducts';
import { getStockStatus, getAuditRecency } from '../utils/storage';

export default function ProductList({
  products,
  isAdmin,
  selectedCategory,
  onSelectCategory,
  activeStatusFilter,
  onSelectStatusFilter,
  onOpenAudit,
  onEditProduct,
  onDeleteProduct,
  onQuickUpdateStock,
  onOpenAddModal,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('urgency'); // 'urgency' | 'name' | 'stockAsc' | 'stockDesc' | 'lastAuditAsc'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  const categoryIcons = {
    all: Boxes,
    poultry: Drumstick,
    meat: Beef,
    dairy: Milk,
    pickles: Salad,
    seafood: Fish,
    appetizers: Utensils,
    vegetables: Carrot,
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query
        const query = searchQuery.trim().toLowerCase();
        if (query) {
          const matchName = p.name.toLowerCase().includes(query);
          const matchLoc = (p.freezerLocation || '').toLowerCase().includes(query);
          const matchNotes = (p.notes || '').toLowerCase().includes(query);
          if (!matchName && !matchLoc && !matchNotes) return false;
        }

        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }

        // Status filter (from dashboard or filter bar)
        if (activeStatusFilter && activeStatusFilter !== 'all') {
          const status = getStockStatus(p);
          const recency = getAuditRecency(p);

          if (activeStatusFilter === 'critical' && status.status !== 'critical') return false;
          if (activeStatusFilter === 'warning' && status.status !== 'warning') return false;
          if (activeStatusFilter === 'healthy' && status.status !== 'healthy') return false;
          if (activeStatusFilter === 'delayedAudit' && !recency.needsAudit) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'urgency') {
          // Sort by critical stock first, then by delayed audit
          const statA = getStockStatus(a).status === 'critical' ? 0 : (getStockStatus(a).status === 'warning' ? 1 : 2);
          const statB = getStockStatus(b).status === 'critical' ? 0 : (getStockStatus(b).status === 'warning' ? 1 : 2);
          if (statA !== statB) return statA - statB;
          return a.currentStock - b.currentStock;
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name, 'ar');
        }
        if (sortBy === 'stockAsc') {
          return a.currentStock - b.currentStock;
        }
        if (sortBy === 'stockDesc') {
          return b.currentStock - a.currentStock;
        }
        if (sortBy === 'lastAuditAsc') {
          const dateA = a.auditHistory?.length > 0 ? new Date(a.auditHistory[a.auditHistory.length - 1].date) : new Date(0);
          const dateB = b.auditHistory?.length > 0 ? new Date(b.auditHistory[b.auditHistory.length - 1].date) : new Date(0);
          return dateA - dateB; // Oldest audit first
        }
        return 0;
      });
  }, [products, searchQuery, selectedCategory, activeStatusFilter, sortBy]);

  return (
    <div className="space-y-6">
      
      {/* Search, Filter Bar & Controls */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 no-print">
        
        {/* Search Bar & View Mode */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم الصنف، مكان الفريزر، أو الملاحظات..."
              className="w-full pl-10 pr-11 py-2.5 sm:py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium w-full sm:w-auto">
              <ArrowUpDown className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span className="text-slate-500 dark:text-slate-400 whitespace-nowrap">الترتيب:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-slate-900 dark:text-white font-bold outline-none cursor-pointer pr-1"
              >
                <option value="urgency" className="dark:bg-slate-900">الأكثر احتياجاً وأولوية</option>
                <option value="stockAsc" className="dark:bg-slate-900">الأقل كمية بالمخزن</option>
                <option value="stockDesc" className="dark:bg-slate-900">الأعلى كمية بالمخزن</option>
                <option value="lastAuditAsc" className="dark:bg-slate-900">الأقدم في تاريخ الجرد</option>
                <option value="name" className="dark:bg-slate-900">أبجدياً بالاسم</option>
              </select>
            </div>
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {DEFAULT_CATEGORIES.map((cat) => {
            const Icon = categoryIcons[cat.id] || Boxes;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-sky-600 text-white shadow-sm shadow-sky-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Filter Indicator */}
        {activeStatusFilter && activeStatusFilter !== 'all' && (
          <div className="flex items-center justify-between bg-sky-50 dark:bg-sky-950/50 px-3 py-2 rounded-xl border border-sky-200 dark:border-sky-800/80 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-sky-900 dark:text-sky-200 font-bold">
              <span>الفلتر النشط:</span>
              <span className="underline">
                {activeStatusFilter === 'critical' && '🔴 النواقص الحرجة والنافدة'}
                {activeStatusFilter === 'warning' && '🟡 المخزون المتوسط القريب من الطلب'}
                {activeStatusFilter === 'healthy' && '🟢 المخزون الكافي والآمن'}
                {activeStatusFilter === 'delayedAudit' && '⏱️ أصناف بحاجة لجرد عاجل'}
              </span>
            </div>
            <button
              onClick={() => onSelectStatusFilter('all')}
              className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              إلغاء الفلتر
            </button>
          </div>
        )}

      </div>

      {/* Products Grid / Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <PackageX className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
            لا توجد أصناف مطابقة للبحث أو الفلتر
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
            تأكد من تعديل نص البحث أو اختيار تصنيف آخر، أو قم بإضافة صنف مجمد جديد الآن.
          </p>
          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md shadow-sky-500/20 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            إضافة صنف جديد
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isAdmin={isAdmin}
              onOpenAudit={onOpenAudit}
              onEditProduct={onEditProduct}
              onDeleteProduct={onDeleteProduct}
              onQuickUpdateStock={onQuickUpdateStock}
            />
          ))}
        </div>
      )}

    </div>
  );
}
