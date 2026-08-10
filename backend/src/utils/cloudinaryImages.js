import cloudinary from "../config/cloudinary.js";

const ensureConfiguration = () => {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error("Cloudinary environment variables are not configured");
  }
};

// Stream a validated Multer memory buffer directly to a permanent Cloudinary folder.
export const uploadCloudinaryImage = (buffer, folder) => {
  ensureConfiguration();

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `unbaiq/${folder}`,
        resource_type: "image",
        unique_filename: true,
        overwrite: false,
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve({ url: result.secure_url, publicId: result.public_id });
      },
    );

    uploadStream.end(buffer);
  });
};

// Extract public IDs only from this account's standard Cloudinary delivery URLs.
export const getCloudinaryPublicId = (imageUrl) => {
  if (!imageUrl) return null;

  try {
    const url = new URL(imageUrl);
    if (url.hostname !== "res.cloudinary.com") return null;
    const segments = url.pathname.split("/").filter(Boolean);
    const uploadIndex = segments.indexOf("upload");
    if (uploadIndex < 0) return null;
    const assetSegments = segments.slice(uploadIndex + 1);
    if (/^v\d+$/.test(assetSegments[0])) assetSegments.shift();
    if (assetSegments.length === 0) return null;
    return assetSegments.join("/").replace(/\.[^/.]+$/, "");
  } catch {
    return null;
  }
};

// Delete only URLs recognized as Cloudinary assets; legacy/local URLs remain untouched.
export const deleteCloudinaryImage = async (imageUrl) => {
  const publicId = getCloudinaryPublicId(imageUrl);
  if (!publicId) return;
  ensureConfiguration();
  await cloudinary.uploader.destroy(publicId, { resource_type: "image", invalidate: true });
};

// Cleanup failures are logged without rolling back content already saved in MongoDB.
export const deleteCloudinaryImageSafely = async (imageUrl, label = "image") => {
  try {
    await deleteCloudinaryImage(imageUrl);
  } catch (error) {
    console.warn(`Unable to remove old Cloudinary ${label}: ${error.message}`);
  }
};
