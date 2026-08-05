import fs from "node:fs/promises";
import path from "node:path";

import mongoose from "mongoose";

import HeroSlide from "../models/HeroSlide.js";

const slidePayload = (body) => ({
  title: body.title?.trim(),
  altText: body.altText?.trim(),
  image: body.image?.trim() || "",
  order: Number(body.order),
  active: body.active !== false,
});

// Return a public URL for a validated locally uploaded hero image.
export const uploadHeroSlideImage = (request, response) => {
  if (!request.file) {
    return response.status(400).json({ success: false, message: "Choose a hero image" });
  }

  const image = `${request.protocol}://${request.get("host")}/uploads/hero/${request.file.filename}`;
  return response.status(201).json({ success: true, image });
};

// Create a new slide while keeping frontend styling outside database control.
export const createHeroSlide = async (request, response, next) => {
  try {
    const data = slidePayload(request.body);

    if (!data.title || !data.altText || !data.image || !Number.isInteger(data.order) || data.order < 1) {
      return response.status(400).json({
        success: false,
        message: "Text, alt text, image and a valid display order are required",
      });
    }

    const slide = await HeroSlide.create(data);
    return response.status(201).json({ success: true, message: "Hero slide created", slide });
  } catch (error) {
    return next(error);
  }
};

// Admin list includes active and inactive slides.
export const listAdminHeroSlides = async (request, response, next) => {
  try {
    const slides = await HeroSlide.find().sort({ order: 1, createdAt: 1 });
    return response.status(200).json({ success: true, slides });
  } catch (error) {
    return next(error);
  }
};

// Return one complete slide for the separate admin edit page.
export const getAdminHeroSlide = async (request, response, next) => {
  try {
    if (!mongoose.isValidObjectId(request.params.id)) {
      return response.status(400).json({ success: false, message: "Invalid slide id" });
    }
    const slide = await HeroSlide.findById(request.params.id);
    if (!slide) return response.status(404).json({ success: false, message: "Hero slide not found" });
    return response.status(200).json({ success: true, slide });
  } catch (error) {
    return next(error);
  }
};

// Update content/order/status; a replacement image remains optional.
export const updateHeroSlide = async (request, response, next) => {
  try {
    if (!mongoose.isValidObjectId(request.params.id)) {
      return response.status(400).json({ success: false, message: "Invalid slide id" });
    }

    const slide = await HeroSlide.findById(request.params.id);
    if (!slide) {
      return response.status(404).json({ success: false, message: "Hero slide not found" });
    }

    const data = slidePayload(request.body);
    if (!data.title || !data.altText || !Number.isInteger(data.order) || data.order < 1) {
      return response.status(400).json({
        success: false,
        message: "Text, alt text and a valid display order are required",
      });
    }

    if (!data.image) data.image = slide.image;
    Object.assign(slide, data);
    await slide.save();

    return response.status(200).json({ success: true, message: "Hero slide updated", slide });
  } catch (error) {
    return next(error);
  }
};

// Delete one slide and remove only its own locally uploaded hero image.
export const deleteHeroSlide = async (request, response, next) => {
  try {
    if (!mongoose.isValidObjectId(request.params.id)) {
      return response.status(400).json({ success: false, message: "Invalid slide id" });
    }

    const slide = await HeroSlide.findByIdAndDelete(request.params.id);
    if (!slide) {
      return response.status(404).json({ success: false, message: "Hero slide not found" });
    }

    if (slide.image?.includes("/uploads/hero/")) {
      try {
        const filename = path.basename(new URL(slide.image).pathname);
        const uploadDirectory = path.resolve("uploads", "hero");
        const imagePath = path.resolve(uploadDirectory, filename);

        if (path.dirname(imagePath) === uploadDirectory) {
          await fs.unlink(imagePath);
        }
      } catch (error) {
        // A missing local file must not restore an already deleted database record.
        if (error.code !== "ENOENT") {
          console.warn(`Unable to remove hero image: ${error.message}`);
        }
      }
    }

    return response.status(200).json({
      success: true,
      message: "Hero slide deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
};

// Public homepage receives only active slides in configured display order.
export const listPublicHeroSlides = async (request, response, next) => {
  try {
    const slides = await HeroSlide.find({ active: true }).sort({ order: 1, createdAt: 1 });
    return response.status(200).json({ success: true, slides });
  } catch (error) {
    return next(error);
  }
};
