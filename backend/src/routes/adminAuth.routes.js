import { Router } from "express";

import {
  getCurrentAdmin,
  loginAdmin,
} from "../controllers/adminAuth.controller.js";
import { protectAdmin } from "../middlewares/adminAuth.js";

const adminAuthRouter = Router();

// Public login route; it returns a token when credentials are correct.
adminAuthRouter.post("/login", loginAdmin);

// Protected route used to restore and verify an admin session.
adminAuthRouter.get("/me", protectAdmin, getCurrentAdmin);

export default adminAuthRouter;
