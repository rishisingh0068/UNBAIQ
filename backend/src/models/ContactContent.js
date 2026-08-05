import mongoose from "mongoose";

// A singleton document keeps the fixed Get in Touch layout editable without duplicating sections.
const contactContentSchema = new mongoose.Schema(
  {
    key: { type: String, default: "main", unique: true, immutable: true },
    heading: { type: String, required: true, trim: true },
    descriptionOne: { type: String, required: true, trim: true },
    descriptionTwo: { type: String, required: true, trim: true },
    indiaLabel: { type: String, required: true, trim: true },
    indiaAddress: { type: String, required: true, trim: true },
    dubaiLabel: { type: String, required: true, trim: true },
    dubaiAddress: { type: String, required: true, trim: true },
    availabilityLabel: { type: String, required: true, trim: true },
    workingHours: { type: String, required: true, trim: true },
    holidayText: { type: String, required: true, trim: true },
    contactLabel: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
  },
  { timestamps: true },
);

export default mongoose.model("ContactContent", contactContentSchema);
