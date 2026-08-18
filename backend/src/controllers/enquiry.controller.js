import mongoose from "mongoose";

import Enquiry from "../models/Enquiry.js";
import { sendEnquiryThankYouEmail } from "../utils/sendEmail.js";
import { publishContentUpdate } from "../utils/liveEvents.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+\-\s()]{7,15}$/;
const ALLOWED_STATUSES = ["new", "read", "replied"];

// Validate and save a public Let's Talk form submission.
export const createEnquiry = async (request, response, next) => {
  try {
    const enquiryData = {
      name: request.body.name?.trim(),
      email: request.body.email?.trim().toLowerCase(),
      phone: request.body.phone?.trim(),
      subject: request.body.subject?.trim(),
      message: request.body.message?.trim(),
    };

    if (Object.values(enquiryData).some((value) => !value)) {
      return response.status(400).json({
        success: false,
        message: "All enquiry fields are required",
      });
    }

    if (!EMAIL_PATTERN.test(enquiryData.email)) {
      return response.status(400).json({
        success: false,
        message: "Enter a valid email address",
      });
    }

    if (!PHONE_PATTERN.test(enquiryData.phone)) {
      return response.status(400).json({
        success: false,
        message: "Enter a valid phone number",
      });
    }

    const enquiry = await Enquiry.create(enquiryData);

    // Preserve a valid enquiry even if the external email provider is unavailable.
    try {
      await sendEnquiryThankYouEmail(enquiry);
    } catch (emailError) {
      console.error(`Unable to send enquiry thank-you email: ${emailError.message}`);
    }

    // Notify open admin panels immediately after a public enquiry is saved.
    publishContentUpdate("enquiries");

    return response.status(201).json({
      success: true,
      message: "Your enquiry has been submitted successfully",
    });
  } catch (error) {
    return next(error);
  }
};

// Return every enquiry to an authenticated admin, newest first.
export const listEnquiries = async (request, response, next) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    return response.status(200).json({
      success: true,
      enquiries,
    });
  } catch (error) {
    return next(error);
  }
};

// Return small counts used by the dashboard enquiry badge.
export const getEnquiryStats = async (request, response, next) => {
  try {
    const [total, newCount] = await Promise.all([
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: "new" }),
    ]);

    return response.status(200).json({
      success: true,
      stats: { total, new: newCount },
    });
  } catch (error) {
    return next(error);
  }
};

// Allow an authenticated admin to move an enquiry through its workflow.
export const updateEnquiryStatus = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { status } = request.body;

    if (!mongoose.isValidObjectId(id)) {
      return response.status(400).json({
        success: false,
        message: "Invalid enquiry id",
      });
    }

    if (!ALLOWED_STATUSES.includes(status)) {
      return response.status(400).json({
        success: false,
        message: "Status must be new, read, or replied",
      });
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true },
    );

    if (!enquiry) {
      return response.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    // Keep enquiry counts and lists synchronized across every open admin tab.
    publishContentUpdate("enquiries");

    return response.status(200).json({
      success: true,
      message: "Enquiry status updated",
      enquiry,
    });
  } catch (error) {
    return next(error);
  }
};
