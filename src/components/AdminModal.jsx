import React, { useState } from 'react';
import { X, ShieldCheck, Lock, KeyRound, LogOut, RotateCcw, History, AlertCircle, Sparkles } from 'lucide-react';
import { getAuth, saveAuth, checkPass } from '../utils/auth';

export default function AdminModal({ 
  isOpen, 
  isAdmin, 
  onClose, 
  onAuthChange,
  onOpenInventoryReset,
  onOpenAuditTrail
}) {
  const [tab, setTab] = useState('login'); // 'login' | 'changepass' | 'tools'
  const [pass, setPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [err, setErr] = useState('');
  const [ok, setOk] = useState('');

  if (!isOpen) return null;

  const reset = () => { setPass(''); setNewPass(''); setConfirmPass(''); setErr(''); setOk(''); };

  const handleLogin = (e) => {
    e.preventDefault();
    if (checkPass(pass)) {
      const auth = getAuth();
      const updated = { ...auth, isAdmin: true };
      saveAuth(updated);
      onAuthChange(true);
      reset();
      onClose();
    } else {
      setErr('كلمة المرور غير صحيحة!');
    }
  };

  const handleLogout = () => {
    const auth = getAuth();
    saveAuth({ ...auth, isAdmin: false });
    onAuthChange(false);
    reset();
    onClose();
  };

  const handleChangePass = (e) => {
    e.preventDefault();
    if (!checkPass(pass)) { setErr('كلمة المرور الحالية غير صحيحة!'); return; }
    if (newPass.length < 3) { setErr('كلمة المرور الجديدة يجب أن تكون 3 أحرف على الأقل'); return; }
    if (newPass !== confirmPass) { setErr('كلمة المرور الجديدة غير متطابقة'); return; }
    const auth = getAuth();
    saveAuth({ ...auth, adminPass: newPass });
    setErr('');
    setOk('✅ تم تغيير كلمة المرور بنجاح!');
    setPass(''); setNewPass(''); setConfirmPass('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in no-print">
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-900 to-sky-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 flex items-center justify-center">
              {isAdmin ? <ShieldCheck className="w-5 h-5 text-sky-400" /> : <Lock className="w-5 h-5 text-slate-400" />}
            </div>
            <div>
              <h2 className="text-base font-black">إدارة الصلاحيات والنظام</h2>
              <p className="text-xs text-slate-400">{isAdmin ? '🟢 أنت مسؤول (Admin)' : '🔴 مشاهد فقط (Viewer)'}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20"><X className="w-5 h-5" /></button>
        </div>

        {/* Tabs - Only when Admin */}
        {isAdmin && (
          <div className="flex gap-1 p-2 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
            <button
              onClick={() => { setTab('login'); reset(); }}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-colors ${tab === 'login' ? 'bg-white dark:bg-slate-800 shadow text-sky-600 dark:text-sky-400' : 'text-slate-500'}`}
            >الحالة</button>
            <button
              onClick={() => { setTab('changepass'); reset(); }}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-colors ${tab === 'changepass' ? 'bg-white dark:bg-slate-800 shadow text-sky-600 dark:text-sky-400' : 'text-slate-500'}`}
            >كلمة المرور</button>
            <button
              onClick={() => { setTab('tools'); reset(); }}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-colors ${tab === 'tools' ? 'bg-white dark:bg-slate-800 shadow text-rose-600 dark:text-rose-400' : 'text-slate-500'}`}
            >أدوات متقدمة</button>
          </div>
        )}

        <div className="p-5 space-y-4">

          {/* VIEWER → Login to Admin */}
          {!isAdmin && (
            <form onSubmit={handleLogin} className="space-y-3">
              <p className="text-xs text-slate-500">أدخل كلمة مرور المسؤول لتفعيل صلاحيات Admin على هذا الجهاز:</p>
              <input
                type="password"
                required
                value={pass}
                onChange={(e) => { setPass(e.target.value); setErr(''); }}
                placeholder="كلمة المرور"
                className="w-full text-center font-mono text-xl font-black py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-sky-500"
              />
              {err && <p className="text-xs text-rose-600 font-bold flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{err}</p>}
              <button type="submit" className="w-full py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-black text-sm shadow-md">
                🔓 تسجيل دخول كمسؤول
              </button>
              <p className="text-[11px] text-slate-400 text-center">كلمة المرور الافتراضية: <span className="font-mono font-bold">1234</span></p>
            </form>
          )}

          {/* ADMIN → Status & Logout */}
          {isAdmin && tab === 'login' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-center">
                <div className="text-2xl mb-1">🛡️</div>
                <div className="font-black text-emerald-800 dark:text-emerald-300">هذا الجهاز: مسؤول Admin</div>
                <div className="text-xs text-slate-500 mt-1">لديك صلاحيات كاملة على النظام</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-sky-50 dark:bg-slate-800/60 border border-sky-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
                <p className="font-bold text-slate-700 dark:text-slate-300 mb-2">✅ صلاحياتك كمسؤول:</p>
                <p>• قارئ فواتير الـ PDF والمطابقة الذكية</p>
                <p>• الاستيراد المجمع للكميات من ملف خارجي</p>
                <p>• تسجيل وتعديل الفواتير والجرد اليومي</p>
                <p>• تصفير كامل المخزون مع الحماية</p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full py-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-950 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900 font-bold text-sm flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" /> تحويل هذا الجهاز لمشاهد فقط
              </button>
            </div>
          )}

          {/* ADMIN → Change Password */}
          {isAdmin && tab === 'changepass' && (
            <form onSubmit={handleChangePass} className="space-y-3">
              <p className="text-xs text-slate-500">يمكنك تغيير كلمة مرور الدخول للنظام. أرسل الكلمة الجديدة للموظفين الذين تريد منحهم صلاحية Admin.</p>
              {ok && <p className="text-xs text-emerald-600 font-bold text-center">{ok}</p>}
              <div className="space-y-2">
                <input
                  type="password"
                  required
                  value={pass}
                  onChange={(e) => { setPass(e.target.value); setErr(''); setOk(''); }}
                  placeholder="كلمة المرور الحالية"
                  className="w-full text-center font-mono text-lg font-bold py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-sky-500"
                />
                <input
                  type="password"
                  required
                  value={newPass}
                  onChange={(e) => { setNewPass(e.target.value); setErr(''); setOk(''); }}
                  placeholder="كلمة المرور الجديدة"
                  className="w-full text-center font-mono text-lg font-bold py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-sky-500"
                />
                <input
                  type="password"
                  required
                  value={confirmPass}
                  onChange={(e) => { setConfirmPass(e.target.value); setErr(''); setOk(''); }}
                  placeholder="تأكيد كلمة المرور الجديدة"
                  className="w-full text-center font-mono text-lg font-bold py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              {err && <p className="text-xs text-rose-600 font-bold flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{err}</p>}
              <button type="submit" className="w-full py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-black text-sm shadow-md flex items-center justify-center gap-2">
                <KeyRound className="w-4 h-4" /> تغيير كلمة المرور
              </button>
              <p className="text-[11px] text-slate-400 text-center">رمز الطوارئ الثابت: <span className="font-mono font-bold text-amber-600 dark:text-amber-400">SWAR2026</span> (لاستعادة الوصول دائماً)</p>
            </form>
          )}

          {/* ADMIN → Advanced Tools (Clear All Stock & Audit Log) */}
          {isAdmin && tab === 'tools' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 space-y-2">
                <div className="flex items-center gap-2 font-black text-xs text-rose-700 dark:text-rose-400">
                  <RotateCcw className="w-4 h-4" />
                  <span>تصفير كامل المخزون (Clear All Stock)</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  تصفير كميات جميع الأصناف لتصبح 0 مع الحفاظ التام على أسماء وبيانات المنتجات.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onOpenInventoryReset) onOpenInventoryReset();
                  }}
                  className="w-full py-2 px-3 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs rounded-xl shadow-sm transition-all"
                >
                  ⚠️ فتح شاشة تصفير المخزون
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 space-y-2">
                <div className="flex items-center gap-2 font-black text-xs text-indigo-700 dark:text-indigo-400">
                  <History className="w-4 h-4" />
                  <span>سجل التدقيق والأثر الرجعي (Audit Trail)</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  عرض كل العمليات، الفواتير، وحركات التصفير مع توثيق الأوقات والمستخدمين.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onOpenAuditTrail) onOpenAuditTrail();
                  }}
                  className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-xl shadow-sm transition-all"
                >
                  📜 فتح سجل التدقيق الكامل
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
