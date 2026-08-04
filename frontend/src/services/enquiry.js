const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Parse backend responses consistently and surface their useful error messages.
const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, options);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Unable to complete the enquiry request");
  }

  return data;
};

// Submit the public Let's Talk form without requiring authentication.
export const submitEnquiry = (formData) =>
  request("/enquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

const adminHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

// Fetch protected enquiry data for the admin dashboard and list page.
export const getEnquiries = (token) =>
  request("/admin/enquiries", { headers: adminHeaders(token) });

export const getEnquiryStats = (token) =>
  request("/admin/enquiries/stats", { headers: adminHeaders(token) });

// Move an enquiry between new, read, and replied states.
export const updateEnquiryStatus = (token, enquiryId, status) =>
  request(`/admin/enquiries/${enquiryId}/status`, {
    method: "PATCH",
    headers: adminHeaders(token),
    body: JSON.stringify({ status }),
  });
