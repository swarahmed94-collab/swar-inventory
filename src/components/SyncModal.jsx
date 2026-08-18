import React, { useState } from 'react';
import { 
  X, 
  Cloud, 
  RefreshCw, 
  CheckCircle, 
  Copy, 
  Users, 
  Wifi, 
  Lock,
  Smartphone
} from 'lucide-react';
import { getSyncConfig, saveSyncConfig, pushStateToCloud } from '../utils/cloudSync';
import { sounds } from '../utils/sound';

export default function SyncModal({ products, invoices = [], isOpen, onClose, onForceSync }) {
  const [config, setConfig] = useState(getSyncConfig);
  const [roomInput, setRoomInput] = useState(config.roomId || 'swar-main-freezer');
  const [copied, setCopied] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  if (!isOpen) return null;

  const handleSaveRoom = async (e) => {
    e.preventDefault();
    if (!roomInput.trim()) return;

    sounds.playSuccess();
    const updated = {
      ...config,
      roomId: roomInput.trim().toLowerCase(),
      lastSyncTime: new Date().toISOString()
    };
    setConfig(updated);
    saveSyncConfig(updated);

    setIsSyncing(true);
    await pushStateToCloud(updated.roomId, { products, invoices });
    setIsSyncing(false);
    onForceSync();
  };


  const handleCopyCode = () => {
    sounds.playClick();
    navigator.clipboard.writeText(config.roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in no-print">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto animate-slide-up">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-sky-600 to-indigo-600 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black">
                المزامنة السحابية المباشرة (Cloud Sync)
              </h2>
              <p className="text-xs text-sky-100">تحديث فوري للمخزون بين جميع هواتف الموظفين مجاناً 100%</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4">
          
          {/* Status badge */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 font-bold text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>المزامنة السحابية نشطة وتعمل لحظياً</span>
            </div>
            <Wifi className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>

          {/* Sync Code / Room Form */}
          <form onSubmit={handleSaveRoom} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                رمز/اسم غرفة التخزين المشتركة (Store Room ID):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  required
                  value={roomInput}
                  onChange={(e) => setRoomInput(e.target.value)}
                  placeholder="مثال: branch-1-cairo"
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-sm font-bold outline-none focus:ring-2 focus:ring-sky-500"
                />
                <button
                  type="submit"
                  disabled={isSyncing}
                  className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
                >
                  {isSyncing ? 'جاري الربط...' : 'ربط ومزامنة'}
                </button>
              </div>
            </div>
          </form>

          {/* Share with Team info */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
              <Users className="w-4 h-4 text-sky-600" />
              <span>كيف تربط هواتف فريق العمل معاً؟</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              شارك هذا الرمز مع أي موظف أو افتح الرابط على أي هاتف واكتب نفس الرمز أعلاه، وستتزامن كافة حركات الجرد والإضافات في نفس اللحظة تلقائياً بدون تحديث الصفحة!
            </p>
            <button
              onClick={handleCopyCode}
              className="w-full mt-2 py-2 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-mono text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {copied ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'تم نسخ الرمز!' : `نسخ الرمز: ${config.roomId}`}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
