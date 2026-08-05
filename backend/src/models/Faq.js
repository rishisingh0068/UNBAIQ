import mongoose from "mongoose";

// Store FAQ content while keeping accordion styling controlled by the frontend.
const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, trim: true, maxlength: 500 },
    answer: { type: String, required: true, trim: true, maxlength: 5000 },
    order: { type: Number, required: true, min: 1 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Faq = mongoose.model("Faq", faqSchema);

export default Faq;
