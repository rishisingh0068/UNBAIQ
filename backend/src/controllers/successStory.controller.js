import mongoose from "mongoose";

import SuccessStory from "../models/SuccessStory.js";
import { createSlug } from "../utils/createSlug.js";
import { deleteCloudinaryImageSafely, uploadCloudinaryImage } from "../utils/cloudinaryImages.js";
import { publishContentUpdate } from "../utils/liveEvents.js";

const ALLOWED_STATUSES = ["draft", "published"];

const normalizeText = (value) => value?.replace(/\r\n/g, "\n").trim();
const normalizeResults = (results) =>
  (Array.isArray(results) ? results : [])
    .map((result) => result?.trim())
    .filter(Boolean);

// Accept only the fields that belong to the approved fixed success-story structure.
const storyPayload = (body) => ({
  title: body.title?.trim(),
  description: normalizeText(body.description),
  industry: body.industry?.trim(),
  timeline: body.timeline?.trim(),
  platform: body.platform?.trim(),
  coverImage: body.coverImage?.trim() || "",
  imageAlt: body.imageAlt?.trim(),
  challenge: normalizeText(body.challenge),
  approach: normalizeText(body.approach),
  results: normalizeResults(body.results),
  testimonial: normalizeText(body.testimonial),
  clientName: body.clientName?.trim(),
  clientDesignation: body.clientDesignation?.trim(),
  companyName: body.companyName?.trim(),
  status: body.status,
});

const hasRequiredContent = (data) =>
  data.title && data.description && data.industry && data.timeline &&
  data.platform && data.coverImage && data.imageAlt && data.challenge &&
  data.approach && data.results.length > 0 && data.testimonial &&
  data.clientName && data.clientDesignation && data.companyName;

const generateUniqueSlug = async (title) => {
  const baseSlug = createSlug(title) || `success-story-${Date.now()}`;
  let slug = baseSlug;
  let suffix = 2;
  while (await SuccessStory.exists({ slug })) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
  return slug;
};

// Stream a validated success-story image to permanent Cloudinary storage.
export const uploadSuccessStoryCoverImage = async (request, response, next) => {
  try {
    if (!request.file) {
      return response.status(400).json({ success: false, message: "Choose a success-story image" });
    }
    const { url: coverImage } = await uploadCloudinaryImage(request.file.buffer, "success-stories");
    return response.status(201).json({ success: true, coverImage });
  } catch (error) {
    return next(error);
  }
};

// Create a complete story as either unpublished draft or published content.
export const createSuccessStory = async (request, response, next) => {
  try {
    const data = storyPayload(request.body);
    if (!hasRequiredContent(data)) {
      return response.status(400).json({ success: false, message: "Complete every success-story field and add at least one result" });
    }
    if (!ALLOWED_STATUSES.includes(data.status)) data.status = "draft";

    const story = await SuccessStory.create({
      ...data,
      slug: await generateUniqueSlug(data.title),
      publishedAt: data.status === "published" ? new Date() : null,
    });
    // Refresh connected story listings after a successful insert.
    publishContentUpdate("success-stories");
    return response.status(201).json({ success: true, message: "Success story created", story });
  } catch (error) {
    return next(error);
  }
};

// Admins can see published and unpublished stories together.
export const listAdminSuccessStories = async (request, response, next) => {
  try {
    const stories = await SuccessStory.find().sort({ createdAt: -1 });
    return response.status(200).json({ success: true, stories });
  } catch (error) {
    return next(error);
  }
};

// Load one complete record into the admin edit form.
export const getAdminSuccessStory = async (request, response, next) => {
  try {
    if (!mongoose.isValidObjectId(request.params.id)) {
      return response.status(400).json({ success: false, message: "Invalid success-story id" });
    }
    const story = await SuccessStory.findById(request.params.id);
    if (!story) return response.status(404).json({ success: false, message: "Success story not found" });
    return response.status(200).json({ success: true, story });
  } catch (error) {
    return next(error);
  }
};

// Edit content or switch publish state without changing the existing public URL.
export const updateSuccessStory = async (request, response, next) => {
  try {
    if (!mongoose.isValidObjectId(request.params.id)) {
      return response.status(400).json({ success: false, message: "Invalid success-story id" });
    }
    const story = await SuccessStory.findById(request.params.id);
    if (!story) return response.status(404).json({ success: false, message: "Success story not found" });

    const data = storyPayload(request.body);
    if (!data.coverImage) data.coverImage = story.coverImage;
    if (!hasRequiredContent(data) || !ALLOWED_STATUSES.includes(data.status)) {
      return response.status(400).json({ success: false, message: "Complete every field, add a result and choose a valid status" });
    }

    const wasPublished = story.status === "published";
    const previousCoverImage = story.coverImage;
    Object.assign(story, data);
    if (data.status === "published" && !wasPublished) story.publishedAt = new Date();
    if (data.status === "draft") story.publishedAt = null;
    await story.save();

    if (previousCoverImage && previousCoverImage !== story.coverImage) {
      await deleteCloudinaryImageSafely(previousCoverImage, "success-story image");
    }

    // Content and publish-state edits update list and detail pages in real time.
    publishContentUpdate("success-stories");

    return response.status(200).json({ success: true, message: "Success story updated", story });
  } catch (error) {
    return next(error);
  }
};

// Delete one story and remove its matching Cloudinary image.
export const deleteSuccessStory = async (request, response, next) => {
  try {
    if (!mongoose.isValidObjectId(request.params.id)) {
      return response.status(400).json({ success: false, message: "Invalid success-story id" });
    }

    const story = await SuccessStory.findByIdAndDelete(request.params.id);
    if (!story) {
      return response.status(404).json({ success: false, message: "Success story not found" });
    }

    await deleteCloudinaryImageSafely(story.coverImage, "success-story image");

    // Connected public pages remove the deleted story immediately.
    publishContentUpdate("success-stories");

    return response.status(200).json({ success: true, message: "Success story deleted successfully" });
  } catch (error) {
    return next(error);
  }
};

// Public list exposes only published card information.
export const listPublishedSuccessStories = async (request, response, next) => {
  try {
    const stories = await SuccessStory.find({ status: "published" })
      .select("title slug description industry timeline platform coverImage imageAlt publishedAt")
      .sort({ publishedAt: -1, createdAt: -1 });
    return response.status(200).json({ success: true, stories });
  } catch (error) {
    return next(error);
  }
};

// A draft can never be opened through the public detail endpoint.
export const getPublishedSuccessStory = async (request, response, next) => {
  try {
    const story = await SuccessStory.findOne({ slug: request.params.slug, status: "published" });
    if (!story) return response.status(404).json({ success: false, message: "Success story not found" });
    return response.status(200).json({ success: true, story });
  } catch (error) {
    return next(error);
  }
};
