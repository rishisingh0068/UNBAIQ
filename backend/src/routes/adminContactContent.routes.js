import { Router } from "express";

import { getAdminContactContent, updateContactContent } from "../controllers/contactContent.controller.js";
import { protectAdmin } from "../middlewares/adminAuth.js";

const adminContactContentRouter = Router();

// Only an authenticated admin may view or replace the managed contact content.
adminContactContentRouter.use(protectAdmin);
adminContactContentRouter.get("/", getAdminContactContent);
adminContactContentRouter.put("/", updateContactContent);

export default adminContactContentRouter;
