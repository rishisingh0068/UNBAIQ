import { createImageUpload } from "./createImageUpload.js";

// Keep hero images in memory until the controller streams them to Cloudinary.
export const uploadHeroImage = createImageUpload({
  maxMegabytes: 10,
  invalidTypeMessage: "Only JPG, PNG and WEBP hero images are allowed",
});
