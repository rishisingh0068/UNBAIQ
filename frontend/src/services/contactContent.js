const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Shared defaults prevent the public section from becoming empty during API downtime or first setup.
export const defaultContactContent = {
  heading: "Get in Touch",
  descriptionOne: "Get in touch to start discussing your software product needs.",
  descriptionTwo: "Not sure where to start? We can help with that too.",
  indiaLabel: "Our Address in India",
  indiaAddress: "Bhutani CyberPark, C-712A\nSec-62, Noida, Uttar Pradesh",
  dubaiLabel: "Our Address in Dubai",
  dubaiAddress: "Sharjah Media City, Sharjah UAE",
  availabilityLabel: "We Are Available",
  workingHours: "Mon - Fri: 9.00am to 6.00pm",
  holidayText: "Sunday Holiday",
  contactLabel: "Contact",
  phone: "9911916600",
  email: "contact@unbaiq.com",
};

const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Unable to load contact content");
  return data;
};

// Public and protected requests share one content source while keeping writes authenticated.
export const getPublicContactContent = () => request("/contact-content");
export const getAdminContactContent = (token) => request("/admin/contact-content", { headers: { Authorization: `Bearer ${token}` } });
export const saveAdminContactContent = (token, content) => request("/admin/contact-content", {
  method: "PUT",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  body: JSON.stringify(content),
});
