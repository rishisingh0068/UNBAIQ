import "dotenv/config";

import mongoose from "mongoose";

import { connectDatabase } from "../src/config/database.js";
import Admin from "../src/models/Admin.js";

// Create the first admin from temporary values stored in the local .env file.
const createAdmin = async () => {
  try {
    const name = process.env.ADMIN_NAME?.trim();
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    if (!name || !email || !password) {
      throw new Error("ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD are required");
    }

    if (password.length < 8) {
      throw new Error("ADMIN_PASSWORD must contain at least 8 characters");
    }

    await connectDatabase();

    // Prevent duplicate admin accounts from being created with the same email.
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      throw new Error("An admin with this email already exists");
    }

    // The Admin model hashes the password automatically before saving it.
    const admin = await Admin.create({
      name,
      email,
      password,
      role: "super-admin",
    });

    console.log(`Admin created successfully: ${admin.email}`);
  } catch (error) {
    console.error(`Unable to create admin: ${error.message}`);
    process.exitCode = 1;
  } finally {
    // Always close the database connection so the command can exit cleanly.
    await mongoose.disconnect();
  }
};

createAdmin();
