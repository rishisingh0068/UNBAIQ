import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

import multer from "multer";

const uploadDirectory = path.resolve("uploads", "admin-profiles");

// Ensure the dedicated profile-photo directory exists before upload.
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
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (request, file, callback) => {
    void request;
    if (!extensionByMimeType[file.mimetype]) {
      callback(new Error("Only JPG, PNG and WEBP profile photos are allowed"));
      return;
    }
    callback(null, true);
  },
});

// Convert Multer validation failures into readable 400 responses.
export const uploadAdminProfileImage = (request, response, next) => {
  uploader.single("image")(request, response, (error) => {
    if (error) {
      response.status(400);
      return next(error);
    }
    return next();
  });
};
