import React from 'react';
import { 
  Package, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Boxes,
  TrendingDown
} from 'lucide-react';
import { getStockStatus, getAuditRecency } from '../utils/storage';

export default function DashboardStats({ products, activeFilter, onSelectFilter }) {
  let totalStockCount = 0;
  let criticalCount = 0;
  let warningCount = 0;
  let healthyCount = 0;
  let delayedAuditCount = 0;

  products.forEach(p => {
    totalStockCount += Number(p.currentStock) || 0;
    const status = getStockStatus(p);
    if (status.status === 'critical') criticalCount++;
    else if (status.status === 'warning') warningCount++;
    else healthyCount++;

    const recency = getAuditRecency(p);
    if (recency.needsAudit) delayedAuditCount++;
  });

  const cards = [
    {
      id: 'all',
      title: 'إجمالي الأصناف',
      value: products.length,
      subtitle: `${totalStockCount} وحدة مخزونة`,
      icon: Package,
      gradient: 'from-sky-500 to-blue-600',
      border: 'border-sky-500/20 hover:border-sky-500/40',
      activeRing: 'ring-2 ring-sky-500 ring-offset-2 dark:ring-offset-slate-900',
      badgeColor: 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300',
    },
    {
      id: 'critical',
      title: 'نواقص حرجة / نفاد',
      value: criticalCount,
      subtitle: criticalCount > 0 ? 'يتطلب شراء فوري 🔴' : 'المخزون تحت السيطرة',
      icon: AlertTriangle,
      gradient: 'from-rose-500 to-red-600',
      border: 'border-red-500/20 hover:border-red-500/40',
      activeRing: 'ring-2 ring-red-500 ring-offset-2 dark:ring-offset-slate-900',
      badgeColor: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300',
      isPulsing: criticalCount > 0
    },
    {
      id: 'warning',
      title: 'مخزون متوسط / قرب النفاد',
      value: warningCount,
      subtitle: 'يحتاج طلب قريب 🟡',
      icon: TrendingDown,
      gradient: 'from-amber-500 to-yellow-600',
      border: 'border-amber-500/20 hover:border-amber-500/40',
      activeRing: 'ring-2 ring-amber-500 ring-offset-2 dark:ring-offset-slate-900',
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
    },
    {
      id: 'healthy',
      title: 'مخزون كافي وآمن',
      value: healthyCount,
      subtitle: 'كميات ممتازة 🟢',
      icon: CheckCircle2,
      gradient: 'from-emerald-500 to-teal-600',
      border: 'border-emerald-500/20 hover:border-emerald-500/40',
      activeRing: 'ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-slate-900',
      badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
    },
    {
      id: 'delayedAudit',
      title: 'بحاجة لجرد عاجل',
      value: delayedAuditCount,
      subtitle: delayedAuditCount > 0 ? 'لم تُجرد منذ فترة ⏱️' : 'جميع الأصناف مجرودة حديثاً',
      icon: Clock,
      gradient: 'from-purple-500 to-indigo-600',
      border: 'border-purple-500/20 hover:border-purple-500/40',
      activeRing: 'ring-2 ring-purple-500 ring-offset-2 dark:ring-offset-slate-900',
      badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300',
      isPulsing: delayedAuditCount > 0
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8 no-print">
      {cards.map((card) => {
        const Icon = card.icon;
        const isActive = activeFilter === card.id;

        return (
          <button
            key={card.id}
            onClick={() => onSelectFilter(isActive ? 'all' : card.id)}
            className={`text-right p-4 rounded-2xl bg-white dark:bg-slate-900/90 border transition-all duration-200 shadow-sm relative overflow-hidden group hover:shadow-md ${card.border} ${isActive ? card.activeRing : ''}`}
          >
            {/* Ambient Background Gradient Glow */}
            <div className={`absolute top-0 left-0 w-24 h-24 bg-gradient-to-br ${card.gradient} opacity-5 group-hover:opacity-15 rounded-full blur-2xl transition-opacity pointer-events-none`} />

            <div className="flex items-center justify-between mb-2">
              <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr ${card.gradient} text-white flex items-center justify-center shadow-sm`}>
                <Icon className="w-5 h-5" />
              </div>
              {card.isPulsing && (
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                </span>
              )}
            </div>

            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              {card.value}
            </div>

            <div className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mt-1 truncate">
              {card.title}
            </div>

            <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1 truncate">
              {card.subtitle}
            </div>
          </button>
        );
      })}
    </div>
  );
}
