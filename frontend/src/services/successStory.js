const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Preserve backend validation messages across public and admin requests.
const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Unable to complete the success-story request");
  return data;
};

const adminHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

// Public endpoints never expose unpublished stories.
export const getPublishedSuccessStories = () => request("/success-stories");
export const getPublishedSuccessStory = (slug) => request(`/success-stories/${slug}`);

// Protected endpoints power the admin list and fixed-structure editor.
export const getAdminSuccessStories = (token) =>
  request("/admin/success-stories", { headers: adminHeaders(token) });
export const getAdminSuccessStory = (token, id) =>
  request(`/admin/success-stories/${id}`, { headers: adminHeaders(token) });
export const createAdminSuccessStory = (token, data) =>
  request("/admin/success-stories", { method: "POST", headers: adminHeaders(token), body: JSON.stringify(data) });
export const updateAdminSuccessStory = (token, id, data) =>
  request(`/admin/success-stories/${id}`, { method: "PATCH", headers: adminHeaders(token), body: JSON.stringify(data) });
// Permanently delete one story through the protected admin endpoint.
export const deleteAdminSuccessStory = (token, id) =>
  request(`/admin/success-stories/${id}`, { method: "DELETE", headers: adminHeaders(token) });

// Upload a local image without overriding the browser's multipart boundary.
export const uploadAdminSuccessStoryImage = async (token, imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  const response = await fetch(`${API_URL}/admin/success-stories/upload-image`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Unable to upload the success-story image");
  return data;
};
