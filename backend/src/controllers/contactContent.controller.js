import ContactContent from "../models/ContactContent.js";
import { publishContentUpdate } from "../utils/liveEvents.js";

// These values preserve the current website content until an admin saves custom data.
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

const fields = Object.keys(defaultContactContent);
const cleanPayload = (body) => Object.fromEntries(fields.map((field) => [field, body[field]?.trim()]));

// Public visitors receive saved content or safe defaults when the singleton has not been created.
export const getPublicContactContent = async (request, response, next) => {
  try {
    const content = await ContactContent.findOne({ key: "main" }).select("-key -__v");
    return response.status(200).json({ success: true, content: content || defaultContactContent });
  } catch (error) {
    return next(error);
  }
};

// Admin receives the same complete record for the contact-content editor.
export const getAdminContactContent = async (request, response, next) => {
  try {
    const content = await ContactContent.findOne({ key: "main" }).select("-key -__v");
    return response.status(200).json({ success: true, content: content || defaultContactContent });
  } catch (error) {
    return next(error);
  }
};

// Validate and upsert the one managed contact-content document.
export const updateContactContent = async (request, response, next) => {
  try {
    const data = cleanPayload(request.body);
    if (fields.some((field) => !data[field])) {
      return response.status(400).json({ success: false, message: "All contact content fields are required" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return response.status(400).json({ success: false, message: "Enter a valid contact email" });
    }
    const content = await ContactContent.findOneAndUpdate(
      { key: "main" },
      { $set: data, $setOnInsert: { key: "main" } },
      { new: true, upsert: true, runValidators: true },
    ).select("-key -__v");
    // Refresh the open Let's Talk information after the singleton is saved.
    publishContentUpdate("contact-content");
    return response.status(200).json({ success: true, message: "Contact content saved successfully", content });
  } catch (error) {
    return next(error);
  }
};
