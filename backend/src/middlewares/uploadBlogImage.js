import { createImageUpload } from "./createImageUpload.js";

// Keep blog images in memory until the controller streams them to Cloudinary.
export const uploadBlogImage = createImageUpload({
  maxMegabytes: 5,
  invalidTypeMessage: "Only JPG, PNG and WEBP blog images are allowed",
});
