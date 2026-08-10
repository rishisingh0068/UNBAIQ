import mongoose from "mongoose";

import HeroSlide from "../models/HeroSlide.js";
import { deleteCloudinaryImageSafely, uploadCloudinaryImage } from "../utils/cloudinaryImages.js";
import { publishContentUpdate } from "../utils/liveEvents.js";

const slidePayload = (body) => ({
  title: body.title?.trim(),
  altText: body.altText?.trim(),
  image: body.image?.trim() || "",
  order: Number(body.order),
  active: body.active !== false,
});

// Stream a validated hero image to permanent Cloudinary storage.
export const uploadHeroSlideImage = async (request, response, next) => {
  try {
    if (!request.file) {
      return response.status(400).json({ success: false, message: "Choose a hero image" });
    }
    const { url: image } = await uploadCloudinaryImage(request.file.buffer, "hero-slides");
    return response.status(201).json({ success: true, image });
  } catch (error) {
    return next(error);
  }
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
    // Tell open homepages that the active slide collection may have changed.
    publishContentUpdate("hero-slides");
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
    const previousImage = slide.image;
    Object.assign(slide, data);
    await slide.save();

    if (previousImage && previousImage !== slide.image) {
      await deleteCloudinaryImageSafely(previousImage, "hero image");
    }

    // Text, order, image, and visibility updates all refresh the public slider.
    publishContentUpdate("hero-slides");

    return response.status(200).json({ success: true, message: "Hero slide updated", slide });
  } catch (error) {
    return next(error);
  }
};

// Delete one slide and remove its matching Cloudinary image.
export const deleteHeroSlide = async (request, response, next) => {
  try {
    if (!mongoose.isValidObjectId(request.params.id)) {
      return response.status(400).json({ success: false, message: "Invalid slide id" });
    }

    const slide = await HeroSlide.findByIdAndDelete(request.params.id);
    if (!slide) {
      return response.status(404).json({ success: false, message: "Hero slide not found" });
    }

    await deleteCloudinaryImageSafely(slide.image, "hero image");

    // Remove the deleted slide from every connected homepage.
    publishContentUpdate("hero-slides");

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
