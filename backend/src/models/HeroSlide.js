import mongoose from "mongoose";

// Store hero content only; all visual styling remains controlled by frontend CSS.
const heroSlideSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 300 },
    altText: { type: String, required: true, trim: true, maxlength: 200 },
    image: { type: String, trim: true, default: "" },
    order: { type: Number, required: true, min: 1, default: 1 },
    active: { type: Boolean, default: true },
    legacyImageKey: { type: Number, default: null },
  },
  { timestamps: true },
);

const HeroSlide = mongoose.model("HeroSlide", heroSlideSchema);

export default HeroSlide;
