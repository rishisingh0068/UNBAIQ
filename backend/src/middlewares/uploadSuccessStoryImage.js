import { createImageUpload } from "./createImageUpload.js";

// Keep success-story images in memory until Cloudinary accepts the upload.
export const uploadSuccessStoryImage = createImageUpload({
  maxMegabytes: 10,
  invalidTypeMessage: "Only JPG, PNG and WEBP success-story images are allowed",
});
