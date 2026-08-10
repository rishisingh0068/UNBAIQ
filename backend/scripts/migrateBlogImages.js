import "dotenv/config";

import path from "node:path";

import mongoose from "mongoose";

import cloudinary from "../src/config/cloudinary.js";
import { connectDatabase } from "../src/config/database.js";
import Blog from "../src/models/Blog.js";

// Map each original website blog to its optimized local WebP cover.
const blogImages = [
  {
    slug: "how-to-own-web-design-agency-for-free",
    filename: "blog1.webp",
  },
  {
    slug: "five-difficult-things-about-web-design-agency",
    filename: "blog2.webp",
  },
  {
    slug: "why-web-design-agency-is-so-famous",
    filename: "blog3.webp",
  },
];

const hasCloudinaryCover = (coverImage) => {
  try {
    return new URL(coverImage).hostname === "res.cloudinary.com";
  } catch {
    return false;
  }
};

// Upload the three legacy covers once and store their permanent URLs in MongoDB.
const migrateBlogImages = async () => {
  try {
    await connectDatabase();

    for (const item of blogImages) {
      const blog = await Blog.findOne({ slug: item.slug });

      if (!blog) {
        console.warn(`Skipped ${item.slug}: matching blog was not found`);
        continue;
      }

      if (hasCloudinaryCover(blog.coverImage)) {
        console.log(`Skipped ${item.slug}: Cloudinary cover already exists`);
        continue;
      }

      const imagePath = path.resolve(
        "..",
        "frontend",
        "src",
        "assets",
        "images",
        "home",
        "blog",
        item.filename,
      );
      const publicId = `unbaiq/blogs/default-${item.slug}`;
      const uploadedImage = await cloudinary.uploader.upload(imagePath, {
        public_id: publicId,
        resource_type: "image",
        overwrite: true,
        invalidate: true,
      });

      blog.coverImage = uploadedImage.secure_url;
      await blog.save();
      console.log(`Migrated ${item.slug}`);
    }

    console.log("Default blog image migration completed");
  } catch (error) {
    console.error(`Unable to migrate default blog images: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

migrateBlogImages();
