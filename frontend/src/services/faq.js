const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Parse FAQ responses and keep backend validation messages readable.
const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Unable to complete the FAQ request");
  return data;
};

const adminHeaders = (token) => ({ "Content-Type": "application/json", Authorization: `Bearer ${token}` });

// Public pages receive active FAQs only.
export const getPublicFaqs = () => request("/faqs");

// Protected requests power all FAQ management actions.
export const getAdminFaqs = (token) => request("/admin/faqs", { headers: adminHeaders(token) });
export const getAdminFaq = (token, id) => request(`/admin/faqs/${id}`, { headers: adminHeaders(token) });
export const createAdminFaq = (token, data) => request("/admin/faqs", { method: "POST", headers: adminHeaders(token), body: JSON.stringify(data) });
export const updateAdminFaq = (token, id, data) => request(`/admin/faqs/${id}`, { method: "PATCH", headers: adminHeaders(token), body: JSON.stringify(data) });
export const deleteAdminFaq = (token, id) => request(`/admin/faqs/${id}`, { method: "DELETE", headers: adminHeaders(token) });
