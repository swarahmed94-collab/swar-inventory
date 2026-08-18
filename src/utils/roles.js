const AUTH_CONFIG_KEY = 'swar_cloud_roles_v2';
const MASTER_KEY_SECRET = 'SWAR-SUPER-ADMIN-2026';

/**
 * Roles:
 * - 'viewer': مشاهَدة فقط (قراءة التقارير والمخزون)
 * - 'auditor': مأمور جرد (تسجيل حركات الجرد فقط بدون حذف الأصناف)
 * - 'manager': مدير فرع (إضافة وتعديل الأصناف وتسجيل الجرد)
 * - 'owner': المالك والمتحكم الرئيسي (صلاحيات كاملة + إدارة صلاحيات باقي الأجهزة والمستخدمين)
 */

export const getRolesConfig = () => {
  try {
    const data = localStorage.getItem(AUTH_CONFIG_KEY);
    if (!data) {
      // First device / setup is the Owner
      const initial = {
        currentDeviceRole: 'owner', // 'owner' | 'manager' | 'auditor' | 'viewer'
        deviceId: 'dev-' + Math.random().toString(36).substring(2, 9),
        deviceName: 'الجهاز الرئيسي (المدير)',
        ownerPin: '1234',
        managerPin: '5566',
        auditorPin: '7788',
        authorizedDevices: [
          { id: 'master', name: 'الجهاز الرئيسي للمدير', role: 'owner', addedAt: new Date().toISOString() }
        ]
      };
      localStorage.setItem(AUTH_CONFIG_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(data);
  } catch {
    return {
      currentDeviceRole: 'viewer',
      deviceId: 'dev-guest',
      deviceName: 'مستخدم عادي',
      ownerPin: '1234',
      managerPin: '5566',
      auditorPin: '7788',
      authorizedDevices: []
    };
  }
};

export const saveRolesConfig = (config) => {
  try {
    localStorage.setItem(AUTH_CONFIG_KEY, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save roles config:', err);
  }
};

export const verifyRolePin = (inputPin) => {
  const cfg = getRolesConfig();
  const pin = String(inputPin).trim();

  if (pin === String(cfg.ownerPin).trim()) {
    return { valid: true, role: 'owner', roleName: 'المالك والمتحكم الرئيسي' };
  }
  if (pin === String(cfg.managerPin).trim()) {
    return { valid: true, role: 'manager', roleName: 'مدير (إضافة وتعديل وجرد)' };
  }
  if (pin === String(cfg.auditorPin).trim()) {
    return { valid: true, role: 'auditor', roleName: 'مأمور جرد (تسجيل جرد فقط)' };
  }

  return { valid: false, role: 'viewer', roleName: 'مشاهد فقط' };
};

export const getRolePermissions = (role) => {
  return {
    canView: true,
    canAudit: role === 'owner' || role === 'manager' || role === 'auditor',
    canEditProducts: role === 'owner' || role === 'manager',
    canDeleteProducts: role === 'owner',
    canManageRoles: role === 'owner',
    canManageCloud: role === 'owner',
    roleLabel: 
      role === 'owner' ? '👑 المالك الرئيسي (تحكم كامل)' :
      role === 'manager' ? '⚡ مدير (إضافة وجرد وتعديل)' :
      role === 'auditor' ? '📝 مأمور جرد (تسجيل فقط)' :
      '👁️ مشاهد فقط'
  };
};
