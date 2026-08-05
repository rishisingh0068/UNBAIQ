const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Convert every API response into JSON and preserve the backend error message.
const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, options);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Unable to complete the request");
  }

  return data;
};

// Send admin credentials to the backend login endpoint.
export const loginAdmin = (credentials) =>
  request("/admin/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

// Reset a forgotten password with the private server recovery key.
export const resetAdminPassword = (resetData) =>
  request("/admin/auth/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(resetData),
  });

// Verify a saved token and retrieve the currently logged-in admin.
export const getCurrentAdmin = (token) =>
  request("/admin/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });

// Update the authenticated admin's editable profile fields.
export const updateCurrentAdmin = (token, profile) =>
  request("/admin/auth/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profile),
  });

// Upload one local profile photo without overriding the multipart boundary.
export const uploadCurrentAdminAvatar = async (token, imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  const response = await fetch(`${API_URL}/admin/auth/profile-image`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Unable to upload the profile photo");
  return data;
};
