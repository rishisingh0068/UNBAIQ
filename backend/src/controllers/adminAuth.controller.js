import fs from "node:fs/promises";
import path from "node:path";

import Admin from "../models/Admin.js";
import { generateToken } from "../utils/generateToken.js";

// Return only safe account fields; password hashes never leave the backend.
const adminProfile = (admin) => ({
  id: admin.id,
  name: admin.name,
  email: admin.email,
  role: admin.role,
  avatar: admin.avatar || "",
  createdAt: admin.createdAt,
  updatedAt: admin.updatedAt,
});

// Authenticate an admin and return a signed access token.
export const loginAdmin = async (request, response, next) => {
  try {
    const email = request.body.email?.trim().toLowerCase();
    const password = request.body.password;

    if (!email || !password) {
      return response.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const admin = await Admin.findOne({ email }).select("+password");
    const passwordMatches = admin && (await admin.matchesPassword(password));

    // Use one generic error so an attacker cannot discover registered emails.
    if (!passwordMatches) {
      return response.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    return response.status(200).json({
      success: true,
      message: "Login successful",
      token: generateToken(admin.id),
      admin: adminProfile(admin),
    });
  } catch (error) {
    return next(error);
  }
};

// Return the profile attached by the protected-route middleware.
export const getCurrentAdmin = (request, response) => {
  response.status(200).json({
    success: true,
    admin: adminProfile(request.admin),
  });
};

// Return a public URL for a validated locally uploaded admin profile photo.
export const uploadCurrentAdminAvatar = (request, response) => {
  if (!request.file) {
    return response.status(400).json({ success: false, message: "Choose a profile photo" });
  }
  const avatar = `${request.protocol}://${request.get("host")}/uploads/admin-profiles/${request.file.filename}`;
  return response.status(201).json({ success: true, avatar });
};

// Allow the signed-in admin to update only their own editable profile fields.
export const updateCurrentAdmin = async (request, response, next) => {
  try {
    const name = request.body.name?.trim();
    const email = request.body.email?.trim().toLowerCase();
    const avatar = request.body.avatar?.trim() || "";

    if (!name || !email) {
      return response.status(400).json({ success: false, message: "Name and email are required" });
    }

    const emailOwner = await Admin.findOne({ email, _id: { $ne: request.admin._id } });
    if (emailOwner) {
      return response.status(409).json({ success: false, message: "This email is already used by another admin" });
    }

    request.admin.name = name;
    request.admin.email = email;
    const previousAvatar = request.admin.avatar;
    request.admin.avatar = avatar;
    await request.admin.save();

    if (previousAvatar && previousAvatar !== avatar && previousAvatar.includes("/uploads/admin-profiles/")) {
      try {
        const filename = path.basename(new URL(previousAvatar).pathname);
        const uploadDirectory = path.resolve("uploads", "admin-profiles");
        const imagePath = path.resolve(uploadDirectory, filename);
        if (path.dirname(imagePath) === uploadDirectory) await fs.unlink(imagePath);
      } catch (error) {
        // Profile data is already saved, so a missing old file must not fail the request.
        if (error.code !== "ENOENT") console.warn(`Unable to remove old admin avatar: ${error.message}`);
      }
    }

    return response.status(200).json({
      success: true,
      message: "Profile updated successfully",
      admin: adminProfile(request.admin),
    });
  } catch (error) {
    return next(error);
  }
};

// Temporary local-development reset; production and remote requests are blocked.
export const resetAdminPassword = async (request, response, next) => {
  try {
    const email = request.body.email?.trim().toLowerCase();
    const newPassword = request.body.newPassword;
    const remoteAddress = request.socket.remoteAddress;
    const isLocalRequest = ["127.0.0.1", "::1", "::ffff:127.0.0.1"].includes(
      remoteAddress,
    );

    if (process.env.NODE_ENV !== "development" || !isLocalRequest) {
      return response.status(403).json({
        success: false,
        message: "Password reset is available only in local development",
      });
    }

    if (!email || !newPassword) {
      return response.status(400).json({
        success: false,
        message: "Email and new password are required",
      });
    }

    if (newPassword.length < 8) {
      return response.status(400).json({
        success: false,
        message: "New password must contain at least 8 characters",
      });
    }

    const admin = await Admin.findOne({ email }).select("+password");

    // Avoid exposing whether an admin email exists through different errors.
    if (!admin) {
      return response.status(401).json({
        success: false,
        message: "Admin account was not found",
      });
    }

    admin.password = newPassword;
    await admin.save();

    return response.status(200).json({
      success: true,
      message: "Password reset successfully. You can now sign in.",
    });
  } catch (error) {
    return next(error);
  }
};
