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
