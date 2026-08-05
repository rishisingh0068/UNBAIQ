import fs from "node:fs/promises";
import path from "node:path";

import mongoose from "mongoose";

import Blog from "../models/Blog.js";
import { createSlug } from "../utils/createSlug.js";

const ALLOWED_STATUSES = ["draft", "published"];

// Clean pasted editor text while preserving heading and list line structure.
const normalizeContent = (content) =>
  content
    ?.replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

// Return the public URL generated for a validated local blog image.
export const uploadBlogCoverImage = (request, response) => {
  if (!request.file) {
    return response.status(400).json({
      success: false,
      message: "Choose a blog image to upload",
    });
  }

  const coverImage = `${request.protocol}://${request.get("host")}/uploads/blogs/${request.file.filename}`;

  return response.status(201).json({
    success: true,
    message: "Blog image uploaded successfully",
    coverImage,
  });
};

// Generate a unique slug without changing existing published URLs later.
const generateUniqueSlug = async (title) => {
  const baseSlug = createSlug(title) || `blog-${Date.now()}`;
  let slug = baseSlug;
  let suffix = 2;

  while (await Blog.exists({ slug })) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return slug;
};

const blogPayload = (body) => ({
  title: body.title?.trim(),
  author: body.author?.trim(),
  excerpt: body.excerpt?.trim(),
  coverImage: body.coverImage?.trim() || "",
  content: normalizeContent(body.content),
  status: body.status,
});

// Create a draft or published blog from the protected admin form.
export const createBlog = async (request, response, next) => {
  try {
    const data = blogPayload(request.body);

    if (!data.title || !data.author || !data.excerpt || !data.content) {
      return response.status(400).json({
        success: false,
        message: "Title, author, excerpt and content are required",
      });
    }

    if (!ALLOWED_STATUSES.includes(data.status)) {
      data.status = "draft";
    }

    const blog = await Blog.create({
      ...data,
      slug: await generateUniqueSlug(data.title),
      publishedAt: data.status === "published" ? new Date() : null,
    });

    return response.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    return next(error);
  }
};

// Return both drafts and published blogs to an authenticated admin.
export const listAdminBlogs = async (request, response, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return response.status(200).json({ success: true, blogs });
  } catch (error) {
    return next(error);
  }
};

// Return one editable blog record to an authenticated admin.
export const getAdminBlog = async (request, response, next) => {
  try {
    if (!mongoose.isValidObjectId(request.params.id)) {
      return response.status(400).json({ success: false, message: "Invalid blog id" });
    }

    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({ success: false, message: "Blog not found" });
    }

    return response.status(200).json({ success: true, blog });
  } catch (error) {
    return next(error);
  }
};

// Update editable fields while preserving the original public slug.
export const updateBlog = async (request, response, next) => {
  try {
    if (!mongoose.isValidObjectId(request.params.id)) {
      return response.status(400).json({ success: false, message: "Invalid blog id" });
    }

    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({ success: false, message: "Blog not found" });
    }

    const data = blogPayload(request.body);

    if (!data.title || !data.author || !data.excerpt || !data.content) {
      return response.status(400).json({
        success: false,
        message: "Title, author, excerpt and content are required",
      });
    }

    if (!ALLOWED_STATUSES.includes(data.status)) {
      return response.status(400).json({
        success: false,
        message: "Status must be draft or published",
      });
    }

    const wasPublished = blog.status === "published";
    Object.assign(blog, data);

    if (data.status === "published" && !wasPublished) {
      blog.publishedAt = new Date();
    } else if (data.status === "draft") {
      blog.publishedAt = null;
    }

    await blog.save();

    return response.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    return next(error);
  }
};

// Delete one blog and remove only its matching locally uploaded cover image.
export const deleteBlog = async (request, response, next) => {
  try {
    if (!mongoose.isValidObjectId(request.params.id)) {
      return response.status(400).json({ success: false, message: "Invalid blog id" });
    }

    const blog = await Blog.findByIdAndDelete(request.params.id);
    if (!blog) {
      return response.status(404).json({ success: false, message: "Blog not found" });
    }

    if (blog.coverImage?.includes("/uploads/blogs/")) {
      try {
        const filename = path.basename(new URL(blog.coverImage).pathname);
        const uploadDirectory = path.resolve("uploads", "blogs");
        const imagePath = path.resolve(uploadDirectory, filename);
        if (path.dirname(imagePath) === uploadDirectory) await fs.unlink(imagePath);
      } catch (error) {
        // A missing image must not restore an already deleted database record.
        if (error.code !== "ENOENT") console.warn(`Unable to remove blog image: ${error.message}`);
      }
    }

    return response.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    return next(error);
  }
};

// Public list contains only published posts and card-level fields.
export const listPublishedBlogs = async (request, response, next) => {
  try {
    const blogs = await Blog.find({ status: "published" })
      .select("title slug author excerpt coverImage publishedAt createdAt")
      .sort({ publishedAt: -1, createdAt: -1 });

    return response.status(200).json({ success: true, blogs });
  } catch (error) {
    return next(error);
  }
};

// Public detail never exposes a draft post.
export const getPublishedBlog = async (request, response, next) => {
  try {
    const blog = await Blog.findOne({
      slug: request.params.slug,
      status: "published",
    });

    if (!blog) {
      return response.status(404).json({ success: false, message: "Blog not found" });
    }

    return response.status(200).json({ success: true, blog });
  } catch (error) {
    return next(error);
  }
};
