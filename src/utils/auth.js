const AUTH_KEY = 'swar_auth_v5';

// ← هذا الرقم السري الثابت يمكنك من أخذ صلاحيات الأدمن على أي جهاز في أي وقت
export const MASTER_RESCUE = 'SWAR2026';

export const getAuth = () => {
  try {
    const data = localStorage.getItem(AUTH_KEY);
    if (!data) {
      const init = { isAdmin: false, adminPass: '1234' };
      localStorage.setItem(AUTH_KEY, JSON.stringify(init));
      return init;
    }
    const parsed = JSON.parse(data);
    return {
      isAdmin: Boolean(parsed.isAdmin),
      adminPass: parsed.adminPass || '1234'
    };
  } catch {
    return { isAdmin: false, adminPass: '1234' };
  }
};

export const saveAuth = (auth) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
};

export const checkPass = (input) => {
  const auth = getAuth();
  const p = String(input).trim();
  return p === String(auth.adminPass).trim() || p === MASTER_RESCUE;
};

