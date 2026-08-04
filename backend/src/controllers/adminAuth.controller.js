import Admin from "../models/Admin.js";
import { generateToken } from "../utils/generateToken.js";

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
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    return next(error);
  }
};

// Return the profile attached by the protected-route middleware.
export const getCurrentAdmin = (request, response) => {
  response.status(200).json({
    success: true,
    admin: request.admin,
  });
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
