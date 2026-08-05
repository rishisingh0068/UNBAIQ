import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

import multer from "multer";

const uploadDirectory = path.resolve("uploads", "hero");
fs.mkdirSync(uploadDirectory, { recursive: true });

const extensions = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

const uploader = multer({
  storage: multer.diskStorage({
    destination: uploadDirectory,
    filename: (request, file, callback) => {
      void request;
      callback(null, `${Date.now()}-${randomUUID()}${extensions[file.mimetype]}`);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (request, file, callback) => {
    void request;
    callback(
      extensions[file.mimetype]
        ? null
        : new Error("Only JPG, PNG and WEBP hero images are allowed"),
      Boolean(extensions[file.mimetype]),
    );
  },
});

// Return upload validation problems as client errors instead of server errors.
export const uploadHeroImage = (request, response, next) => {
  uploader.single("image")(request, response, (error) => {
    if (error) {
      response.status(400);
      return next(error);
    }
    return next();
  });
};
