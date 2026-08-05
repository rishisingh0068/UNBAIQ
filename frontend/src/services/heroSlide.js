const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Unable to complete hero request");
  return data;
};

const adminHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

// Public homepage and protected admin slide requests.
export const getPublicHeroSlides = () => request("/hero-slides");
export const getAdminHeroSlides = (token) =>
  request("/admin/hero-slides", { headers: adminHeaders(token) });
export const getAdminHeroSlide = (token, id) =>
  request(`/admin/hero-slides/${id}`, { headers: adminHeaders(token) });
export const createHeroSlide = (token, data) =>
  request("/admin/hero-slides", { method: "POST", headers: adminHeaders(token), body: JSON.stringify(data) });
export const updateHeroSlide = (token, id, data) =>
  request(`/admin/hero-slides/${id}`, { method: "PATCH", headers: adminHeaders(token), body: JSON.stringify(data) });
// Delete the selected slide through the protected admin endpoint.
export const deleteHeroSlide = (token, id) =>
  request(`/admin/hero-slides/${id}`, { method: "DELETE", headers: adminHeaders(token) });

// Upload local files separately so MongoDB stores only the returned public URL.
export const uploadHeroImage = async (token, file) => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await fetch(`${API_URL}/admin/hero-slides/upload-image`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Unable to upload hero image");
  return data;
};
