import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

import multer from "multer";

const uploadDirectory = path.resolve("uploads", "blogs");

// Ensure the local blog-image directory exists before Multer writes a file.
fs.mkdirSync(uploadDirectory, { recursive: true });

const extensionByMimeType = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

const storage = multer.diskStorage({
  destination: uploadDirectory,
  filename: (request, file, callback) => {
    void request;
    const extension = extensionByMimeType[file.mimetype];
    callback(null, `${Date.now()}-${randomUUID()}${extension}`);
  },
});

const uploader = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (request, file, callback) => {
    void request;

    if (!extensionByMimeType[file.mimetype]) {
      callback(new Error("Only JPG, PNG and WEBP blog images are allowed"));
      return;
    }

    callback(null, true);
  },
});

// Convert upload validation failures into clear client-side 400 responses.
export const uploadBlogImage = (request, response, next) => {
  uploader.single("image")(request, response, (error) => {
    if (error) {
      response.status(400);
      return next(error);
    }

    return next();
  });
};
