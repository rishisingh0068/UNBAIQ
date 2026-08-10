import { createImageUpload } from "./createImageUpload.js";

// Keep profile photos in memory until Cloudinary accepts the upload.
export const uploadAdminProfileImage = createImageUpload({
  maxMegabytes: 5,
  invalidTypeMessage: "Only JPG, PNG and WEBP profile photos are allowed",
});
