const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Parse blog API responses and preserve backend validation messages.
const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, options);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Unable to complete the blog request");
  }

  return data;
};

const adminHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

// Public website requests expose only published blog posts.
export const getPublishedBlogs = () => request("/blogs");
export const getPublishedBlog = (slug) => request(`/blogs/${slug}`);

// Protected requests power the admin blog list and editor.
export const getAdminBlogs = (token) =>
  request("/admin/blogs", { headers: adminHeaders(token) });

export const getAdminBlog = (token, blogId) =>
  request(`/admin/blogs/${blogId}`, { headers: adminHeaders(token) });

export const createAdminBlog = (token, blogData) =>
  request("/admin/blogs", {
    method: "POST",
    headers: adminHeaders(token),
    body: JSON.stringify(blogData),
  });

export const updateAdminBlog = (token, blogId, blogData) =>
  request(`/admin/blogs/${blogId}`, {
    method: "PATCH",
    headers: adminHeaders(token),
    body: JSON.stringify(blogData),
  });

// Permanently delete one blog through the protected admin endpoint.
export const deleteAdminBlog = (token, blogId) =>
  request(`/admin/blogs/${blogId}`, {
    method: "DELETE",
    headers: adminHeaders(token),
  });

// Upload one local image without manually setting the multipart content type.
export const uploadAdminBlogImage = async (token, imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(`${API_URL}/admin/blogs/upload-image`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Unable to upload the blog image");
  }

  return data;
};
