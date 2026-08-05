import mongoose from "mongoose";

// Keep every success story in the same fixed structure used by the public design.
const successStorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    description: { type: String, required: true, trim: true, maxlength: 600 },
    industry: { type: String, required: true, trim: true, maxlength: 100 },
    timeline: { type: String, required: true, trim: true, maxlength: 100 },
    platform: { type: String, required: true, trim: true, maxlength: 100 },
    coverImage: { type: String, required: true, trim: true },
    imageAlt: { type: String, required: true, trim: true, maxlength: 250 },
    challenge: { type: String, required: true, trim: true, maxlength: 10000 },
    approach: { type: String, required: true, trim: true, maxlength: 10000 },
    results: [{ type: String, required: true, trim: true, maxlength: 500 }],
    testimonial: { type: String, required: true, trim: true, maxlength: 3000 },
    clientName: { type: String, required: true, trim: true, maxlength: 150 },
    clientDesignation: { type: String, required: true, trim: true, maxlength: 150 },
    companyName: { type: String, required: true, trim: true, maxlength: 200 },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

const SuccessStory = mongoose.model("SuccessStory", successStorySchema);

export default SuccessStory;
