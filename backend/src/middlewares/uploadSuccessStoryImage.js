import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

import multer from "multer";

const uploadDirectory = path.resolve("uploads", "success-stories");

// Create the dedicated local folder before a success-story image is uploaded.
fs.mkdirSync(uploadDirectory, { recursive: true });

const extensionByMimeType = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

const uploader = multer({
  storage: multer.diskStorage({
    destination: uploadDirectory,
    filename: (request, file, callback) => {
      void request;
      callback(null, `${Date.now()}-${randomUUID()}${extensionByMimeType[file.mimetype]}`);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (request, file, callback) => {
    void request;
    if (!extensionByMimeType[file.mimetype]) {
      callback(new Error("Only JPG, PNG and WEBP success-story images are allowed"));
      return;
    }
    callback(null, true);
  },
});

// Return upload errors as readable 400 responses instead of server failures.
export const uploadSuccessStoryImage = (request, response, next) => {
  uploader.single("image")(request, response, (error) => {
    if (error) {
      response.status(400);
      return next(error);
    }
    return next();
  });
};
