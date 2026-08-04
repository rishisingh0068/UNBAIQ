import jwt from "jsonwebtoken";

import Admin from "../models/Admin.js";

// Protect admin routes by validating the Bearer token from the request header.
export const protectAdmin = async (request, response, next) => {
  try {
    const authorization = request.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
      return response.status(401).json({
        success: false,
        message: "Admin authentication is required",
      });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not configured");
    }

    const token = authorization.slice(7).trim();
    const payload = jwt.verify(token, secret);
    const admin = await Admin.findById(payload.adminId);

    if (!admin) {
      return response.status(401).json({
        success: false,
        message: "Admin account was not found",
      });
    }

    request.admin = admin;
    return next();
  } catch (error) {
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return response.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    return next(error);
  }
};
