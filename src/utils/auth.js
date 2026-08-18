const ADMIN_STORAGE_KEY = 'swar_admin_auth_v1';
const DEFAULT_ADMIN_PIN = '1234'; // Default PIN can be changed by admin

export const getAdminAuth = () => {
  try {
    const data = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!data) {
      // By default, first device / owner gets admin access, others can login with PIN
      const initial = {
        isAdmin: true, // initial state on this creator's device
        pin: DEFAULT_ADMIN_PIN,
      };
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(data);
  } catch {
    return { isAdmin: false, pin: DEFAULT_ADMIN_PIN };
  }
};

export const saveAdminAuth = (auth) => {
  try {
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(auth));
  } catch (err) {
    console.error('Error saving admin auth:', err);
  }
};

export const verifyAdminPIN = (inputPin) => {
  const auth = getAdminAuth();
  return String(inputPin).trim() === String(auth.pin).trim();
};
