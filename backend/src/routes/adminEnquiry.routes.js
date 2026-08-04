import { Router } from "express";

import {
  getEnquiryStats,
  listEnquiries,
  updateEnquiryStatus,
} from "../controllers/enquiry.controller.js";
import { protectAdmin } from "../middlewares/adminAuth.js";

const adminEnquiryRouter = Router();

// Every admin enquiry endpoint requires a valid admin Bearer token.
adminEnquiryRouter.use(protectAdmin);
adminEnquiryRouter.get("/", listEnquiries);
adminEnquiryRouter.get("/stats", getEnquiryStats);
adminEnquiryRouter.patch("/:id/status", updateEnquiryStatus);

export default adminEnquiryRouter;
