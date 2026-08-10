import multer from "multer";

const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

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
