import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  CheckCircle, 
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { verifyAdminPIN, saveAdminAuth, getAdminAuth } from '../utils/auth';
import { sounds } from '../utils/sound';

export default function AdminLoginModal({
  isOpen,
  onClose,
  isAdmin,
  onLoginSuccess,
  onLogout
}) {
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showChangePin, setShowChangePin] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (verifyAdminPIN(pinInput)) {
      sounds.playSuccess();
      const current = getAdminAuth();
      const updated = { ...current, isAdmin: true };
      saveAdminAuth(updated);
      onLoginSuccess();
      setErrorMsg('');
      onClose();
    } else {
      sounds.playWarning();
      setErrorMsg('رمز المرور (PIN) غير صحيح!');
    }
  };

  const handleChangePin = (e) => {
    e.preventDefault();
    if (newPin.trim().length < 4) {
      setErrorMsg('الرمز الجديد يجب أن يكون 4 أرقام على الأقل');
      return;
    }
    const current = getAdminAuth();
    const updated = { ...current, pin: newPin.trim() };
    saveAdminAuth(updated);
    sounds.playSuccess();
    setSuccessMsg('تم تغيير رمز المرور بنجاح!');
    setNewPin('');
    setTimeout(() => {
      setSuccessMsg('');
      setShowChangePin(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fade-in no-print">
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto animate-slide-up">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 to-sky-950 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black">
                {isAdmin ? 'لوحة تحكم المسؤول (Admin)' : 'تسجيل دخول المسؤول'}
              </h2>
              <p className="text-xs text-slate-400">حماية صلاحيات التعديل والحذف</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4">
          
          {isAdmin ? (
            /* Logged in as Admin */
            <div className="space-y-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  أنت مسجل حالياً كمسؤول (Admin) ✅
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  لديك كامل الصلاحيات لإضافة وتعديل وحذف الأصناف وحركات الجرد.
                </p>
              </div>

              {/* Change PIN option */}
              {!showChangePin ? (
                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={() => setShowChangePin(true)}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <KeyRound className="w-4 h-4 text-sky-500" />
                    <span>تغيير رمز المرور (PIN)</span>
                  </button>

                  <button
                    onClick={() => {
                      sounds.playClick();
                      onLogout();
                      onClose();
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-700 dark:text-rose-300 text-xs font-bold transition-colors"
                  >
                    تسجيل الخروج (التحويل لوضع المشاهدة فقط)
                  </button>
                </div>
              ) : (
                <form onSubmit={handleChangePin} className="space-y-3 pt-2 text-right">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    أدخل رمز PIN الجديد:
                  </label>
                  <input
                    type="password"
                    required
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    placeholder="مثال: 5566"
                    className="w-full text-center tracking-widest text-lg font-black py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 outline-none"
                  />
                  {successMsg && <div className="text-xs text-emerald-600 font-bold text-center">{successMsg}</div>}
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-sky-600 text-white rounded-xl text-xs font-bold"
                    >
                      حفظ الرمز
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowChangePin(false)}
                      className="px-3 py-2 border rounded-xl text-xs text-slate-600"
                    >
                      إلغاء
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* Not logged in: Enter PIN */
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 flex items-center justify-center mx-auto mb-2">
                  <Lock className="w-6 h-6" />
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  أدخل رمز المرور للتحكم في إضافة وتعديل وحذف المخزون. الرمز الافتراضي هو: <strong className="text-sky-600 font-mono">1234</strong>
                </p>
              </div>

              <div>
                <input
                  type="password"
                  required
                  autoFocus
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="أدخل رمز المرور (PIN)"
                  className="w-full text-center tracking-widest text-2xl font-black py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-sky-500"
                />
              </div>

              {errorMsg && (
                <div className="text-xs font-bold text-rose-600 text-center flex items-center justify-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-black text-sm shadow-md shadow-sky-600/25 transition-all"
              >
                تأكيد الدخول
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
