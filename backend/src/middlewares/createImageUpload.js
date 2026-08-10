import multer from "multer";

// Keep every admin image form aligned, including Cloudinary-compatible SVG uploads.
const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/svg+xml"]);

// Reuse one memory-only validator so Render never depends on temporary upload files.
export const createImageUpload = ({ maxMegabytes, invalidTypeMessage }) => {
  const uploader = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: maxMegabytes * 1024 * 1024 },
    fileFilter: (request, file, callback) => {
      void request;
      if (!allowedMimeTypes.has(file.mimetype)) return callback(new Error(invalidTypeMessage));
      return callback(null, true);
    },
  });

  return (request, response, next) => {
    uploader.single("image")(request, response, (error) => {
      if (error) {
        response.status(400);
        return next(error);
      }
      return next();
    });
  };
};
