import { Router } from "express";

import { createFaq, deleteFaq, getAdminFaq, listAdminFaqs, updateFaq } from "../controllers/faq.controller.js";
import { protectAdmin } from "../middlewares/adminAuth.js";

const adminFaqRouter = Router();

// FAQ creation, editing and deletion require an authenticated admin.
adminFaqRouter.use(protectAdmin);
adminFaqRouter.get("/", listAdminFaqs);
adminFaqRouter.post("/", createFaq);
adminFaqRouter.get("/:id", getAdminFaq);
adminFaqRouter.patch("/:id", updateFaq);
adminFaqRouter.delete("/:id", deleteFaq);

export default adminFaqRouter;
