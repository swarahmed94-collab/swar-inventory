import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Crown, 
  Users, 
  KeyRound, 
  Lock, 
  CheckCircle, 
  AlertCircle,
  Smartphone,
  Share2,
  Copy,
  Check
} from 'lucide-react';
import { getRolesConfig, saveRolesConfig, verifyRolePin, getRolePermissions } from '../utils/roles';
import { sounds } from '../utils/sound';

export default function RoleManagementModal({
  isOpen,
  onClose,
  currentRole,
  onRoleChanged
}) {
  const [config, setConfig] = useState(getRolesConfig);
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState('status'); // 'status' | 'pins' | 'devices'
  const [copiedLink, setCopiedLink] = useState('');

  if (!isOpen) return null;

  const permissions = getRolePermissions(currentRole);
  const isOwner = currentRole === 'owner';

  const handleLogin = (e) => {
    e.preventDefault();
    const res = verifyRolePin(pinInput);
    if (res.valid) {
      sounds.playSuccess();
      const updated = { ...config, currentDeviceRole: res.role };
      saveRolesConfig(updated);
      setConfig(updated);
      onRoleChanged(res.role);
      setPinInput('');
      setErrorMsg('');
    } else {
      sounds.playWarning();
      setErrorMsg('رمز المرور (PIN) غير صحيح!');
    }
  };

  const handleUpdatePins = (e) => {
    e.preventDefault();
    sounds.playSuccess();
    saveRolesConfig(config);
    alert('تم تحديث رموز الصلاحيات بنجاح!');
  };

  const generateInviteLink = (roleType) => {
    const currentUrl = window.location.origin + window.location.pathname;
    const pin = roleType === 'manager' ? config.managerPin : roleType === 'auditor' ? config.auditorPin : '';
    return `${currentUrl}?role=${roleType}&pin=${pin}`;
  };

  const handleCopyLink = (roleType) => {
    sounds.playClick();
    const link = generateInviteLink(roleType);
    navigator.clipboard.writeText(link);
    setCopiedLink(roleType);
    setTimeout(() => setCopiedLink(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fade-in no-print">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto animate-slide-up flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
              {isOwner ? <Crown className="w-5 h-5 text-amber-400" /> : <ShieldCheck className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black">
                إدارة الصلاحيات والمستخدمين
              </h2>
              <p className="text-xs text-slate-400">تحديد المتحكم الرئيسي وتوزيع الصلاحيات</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs (For Owner) */}
        {isOwner && (
          <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-1 gap-1 text-xs font-bold">
            <button
              onClick={() => setActiveTab('status')}
              className={`flex-1 py-2 rounded-xl transition-colors ${activeTab === 'status' ? 'bg-white dark:bg-slate-800 shadow-sm text-sky-600 dark:text-sky-400' : 'text-slate-500'}`}
            >
              حالة هذا الجهاز
            </button>
            <button
              onClick={() => setActiveTab('pins')}
              className={`flex-1 py-2 rounded-xl transition-colors ${activeTab === 'pins' ? 'bg-white dark:bg-slate-800 shadow-sm text-sky-600 dark:text-sky-400' : 'text-slate-500'}`}
            >
              رموز الصلاحيات (PINs)
            </button>
            <button
              onClick={() => setActiveTab('devices')}
              className={`flex-1 py-2 rounded-xl transition-colors ${activeTab === 'devices' ? 'bg-white dark:bg-slate-800 shadow-sm text-sky-600 dark:text-sky-400' : 'text-slate-500'}`}
            >
              منح صلاحيات للموظفين
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
          
          {activeTab === 'status' && (
            <div className="space-y-4">
              {/* Current Role Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-slate-800/60 dark:to-slate-900 border border-sky-200 dark:border-sky-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    {currentRole === 'owner' ? '👑' : currentRole === 'manager' ? '⚡' : currentRole === 'auditor' ? '📝' : '👁️'}
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">صلاحية هذا الجهاز حالياً:</div>
                    <div className="text-base font-black text-slate-900 dark:text-white">
                      {permissions.roleLabel}
                    </div>
                  </div>
                </div>

                {currentRole !== 'viewer' && (
                  <button
                    onClick={() => {
                      sounds.playClick();
                      const updated = { ...config, currentDeviceRole: 'viewer' };
                      saveRolesConfig(updated);
                      setConfig(updated);
                      onRoleChanged('viewer');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 dark:bg-rose-950 dark:text-rose-300 text-xs font-bold transition-colors"
                  >
                    قفل للجهاز (مشاهدة)
                  </button>
                )}
              </div>

              {/* Login with PIN if not Owner */}
              {currentRole !== 'owner' && (
                <form onSubmit={handleLogin} className="space-y-3 pt-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    ترقية صلاحيات هذا الجهاز عبر رمز المرور (PIN):
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      required
                      value={pinInput}
                      onChange={(e) => {
                        setPinInput(e.target.value);
                        setErrorMsg('');
                      }}
                      placeholder="أدخل رمز المالك أو المدير أو مأمور الجرد"
                      className="flex-1 text-center font-mono text-lg font-black py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-md"
                    >
                      دخول
                    </button>
                  </div>

                  {errorMsg && (
                    <div className="text-xs text-rose-600 font-bold text-center flex items-center justify-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errorMsg}</span>
                    </div>
                  )}
                </form>
              )}

              {/* Permissions Checklist */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  ما يمكنك فعله بهذه الصلاحية:
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                    <CheckCircle className="w-3.5 h-3.5" /> مشاهدة المخزون والتقارير
                  </div>
                  <div className={`flex items-center gap-1.5 ${permissions.canAudit ? 'text-emerald-600 font-semibold' : 'text-slate-400 line-through'}`}>
                    <CheckCircle className="w-3.5 h-3.5" /> تسجيل حركات الجرد
                  </div>
                  <div className={`flex items-center gap-1.5 ${permissions.canEditProducts ? 'text-emerald-600 font-semibold' : 'text-slate-400 line-through'}`}>
                    <CheckCircle className="w-3.5 h-3.5" /> إضافة وتعديل الأصناف
                  </div>
                  <div className={`flex items-center gap-1.5 ${permissions.canDeleteProducts ? 'text-emerald-600 font-semibold' : 'text-slate-400 line-through'}`}>
                    <CheckCircle className="w-3.5 h-3.5" /> حذف الأصناف وإدارة الصلاحيات
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Manage PINs (Owner Only) */}
          {activeTab === 'pins' && isOwner && (
            <form onSubmit={handleUpdatePins} className="space-y-4">
              <p className="text-xs text-slate-500">
                بصفتك المالك، يمكنك تخصيص رمز PIN مختلف لكل مستوى صلاحية لمنحه للموظفين:
              </p>

              <div>
                <label className="block text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">
                  👑 رمز المالك الرئيسي (Owner PIN) - تحكم مطلق:
                </label>
                <input
                  type="text"
                  required
                  value={config.ownerPin}
                  onChange={(e) => setConfig({ ...config, ownerPin: e.target.value })}
                  className="w-full font-mono text-center text-lg font-bold py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-sky-600 dark:text-sky-400 mb-1">
                  ⚡ رمز المدير (Manager PIN) - إضافة وتعديل وجرد:
                </label>
                <input
                  type="text"
                  required
                  value={config.managerPin}
                  onChange={(e) => setConfig({ ...config, managerPin: e.target.value })}
                  className="w-full font-mono text-center text-lg font-bold py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-teal-600 dark:text-teal-400 mb-1">
                  📝 رمز مأمور الجرد (Auditor PIN) - تسجيل جرد الفريزر فقط:
                </label>
                <input
                  type="text"
                  required
                  value={config.auditorPin}
                  onChange={(e) => setConfig({ ...config, auditorPin: e.target.value })}
                  className="w-full font-mono text-center text-lg font-bold py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-md"
              >
                حفظ الرموز
              </button>
            </form>
          )}

          {/* TAB 3: Share Permissions with Team (Owner Only) */}
          {activeTab === 'devices' && isOwner && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500">
                أرسل الرمز أو الرابط المباشر للموظف لمنحه الصلاحية التي تريدها على هاتفه:
              </p>

              {/* Share Manager Permission */}
              <div className="p-3.5 rounded-2xl border border-sky-200 dark:border-sky-800 bg-sky-50/50 dark:bg-sky-950/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-sky-900 dark:text-sky-200">صلاحية مدير (Manager)</div>
                  <div className="text-[11px] text-slate-500">الرمز الخاص به: <strong className="font-mono text-sky-600">{config.managerPin}</strong></div>
                </div>
                <button
                  onClick={() => handleCopyLink('manager')}
                  className="px-3 py-1.5 rounded-xl bg-sky-600 text-white text-xs font-bold flex items-center gap-1"
                >
                  {copiedLink === 'manager' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink === 'manager' ? 'تم النسخ' : 'نسخ رابط الدخول'}</span>
                </button>
              </div>

              {/* Share Auditor Permission */}
              <div className="p-3.5 rounded-2xl border border-teal-200 dark:border-teal-800 bg-teal-50/50 dark:bg-teal-950/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-teal-900 dark:text-teal-200">صلاحية مأمور جرد (Auditor)</div>
                  <div className="text-[11px] text-slate-500">الرمز الخاص به: <strong className="font-mono text-teal-600">{config.auditorPin}</strong></div>
                </div>
                <button
                  onClick={() => handleCopyLink('auditor')}
                  className="px-3 py-1.5 rounded-xl bg-teal-600 text-white text-xs font-bold flex items-center gap-1"
                >
                  {copiedLink === 'auditor' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink === 'auditor' ? 'تم النسخ' : 'نسخ رابط الدخول'}</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
