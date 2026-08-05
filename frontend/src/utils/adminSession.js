const TOKEN_KEY = "unbaiq_admin_token";
const ADMIN_KEY = "unbaiq_admin_profile";

// Keep the admin session only for the lifetime of the current browser tab.
export const saveAdminSession = ({ token, admin }) => {
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
};

export const getAdminToken = () => sessionStorage.getItem(TOKEN_KEY);

export const getStoredAdmin = () => {
  const storedAdmin = sessionStorage.getItem(ADMIN_KEY);

  if (!storedAdmin) {
    return null;
  }

  try {
    return JSON.parse(storedAdmin);
  } catch {
    clearAdminSession();
    return null;
  }
};

// Refresh visible profile information without replacing the active token.
export const updateStoredAdmin = (admin) => {
  sessionStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
};

// Remove both token and profile when logout or token verification fails.
export const clearAdminSession = () => {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(ADMIN_KEY);
};
