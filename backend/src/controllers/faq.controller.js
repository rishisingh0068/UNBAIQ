import mongoose from "mongoose";

import Faq from "../models/Faq.js";
import { publishContentUpdate } from "../utils/liveEvents.js";

const faqPayload = (body) => ({
  question: body.question?.trim(),
  answer: body.answer?.trim(),
  order: Number(body.order),
  active: body.active !== false,
});

const isValidFaq = (data) =>
  data.question && data.answer && Number.isInteger(data.order) && data.order >= 1;

// Create one structured question and answer for the shared FAQ section.
export const createFaq = async (request, response, next) => {
  try {
    const data = faqPayload(request.body);
    if (!isValidFaq(data)) {
      return response.status(400).json({ success: false, message: "Question, answer and a valid display order are required" });
    }
    const faq = await Faq.create(data);
    // Refresh active FAQ sections after successful creation.
    publishContentUpdate("faqs");
    return response.status(201).json({ success: true, message: "FAQ created successfully", faq });
  } catch (error) {
    return next(error);
  }
};

// Admin list includes both active and inactive FAQ records.
export const listAdminFaqs = async (request, response, next) => {
  try {
    const faqs = await Faq.find().sort({ order: 1, createdAt: 1 });
    return response.status(200).json({ success: true, faqs });
  } catch (error) {
    return next(error);
  }
};

// Return one complete FAQ for the separate admin edit page.
export const getAdminFaq = async (request, response, next) => {
  try {
    if (!mongoose.isValidObjectId(request.params.id)) {
      return response.status(400).json({ success: false, message: "Invalid FAQ id" });
    }
    const faq = await Faq.findById(request.params.id);
    if (!faq) return response.status(404).json({ success: false, message: "FAQ not found" });
    return response.status(200).json({ success: true, faq });
  } catch (error) {
    return next(error);
  }
};

// Update content, display order or visibility from the admin editor.
export const updateFaq = async (request, response, next) => {
  try {
    if (!mongoose.isValidObjectId(request.params.id)) {
      return response.status(400).json({ success: false, message: "Invalid FAQ id" });
    }
    const data = faqPayload(request.body);
    if (!isValidFaq(data)) {
      return response.status(400).json({ success: false, message: "Question, answer and a valid display order are required" });
    }
    const faq = await Faq.findByIdAndUpdate(request.params.id, data, { new: true, runValidators: true });
    if (!faq) return response.status(404).json({ success: false, message: "FAQ not found" });
    publishContentUpdate("faqs");
    return response.status(200).json({ success: true, message: "FAQ updated successfully", faq });
  } catch (error) {
    return next(error);
  }
};

// Permanently remove one selected FAQ after admin confirmation in the UI.
export const deleteFaq = async (request, response, next) => {
  try {
    if (!mongoose.isValidObjectId(request.params.id)) {
      return response.status(400).json({ success: false, message: "Invalid FAQ id" });
    }
    const faq = await Faq.findByIdAndDelete(request.params.id);
    if (!faq) return response.status(404).json({ success: false, message: "FAQ not found" });
    publishContentUpdate("faqs");
    return response.status(200).json({ success: true, message: "FAQ deleted successfully" });
  } catch (error) {
    return next(error);
  }
};

// Public pages receive only active FAQs in their configured order.
export const listPublicFaqs = async (request, response, next) => {
  try {
    const faqs = await Faq.find({ active: true })
      .select("question answer order")
      .sort({ order: 1, createdAt: 1 });
    return response.status(200).json({ success: true, faqs });
  } catch (error) {
    return next(error);
  }
};
