import { Router } from "express";

import {
  getCurrentAdmin,
  loginAdmin,
  resetAdminPassword,
  updateCurrentAdmin,
  uploadCurrentAdminAvatar,
} from "../controllers/adminAuth.controller.js";
import { protectAdmin } from "../middlewares/adminAuth.js";
import { uploadAdminProfileImage } from "../middlewares/uploadAdminProfileImage.js";

const adminAuthRouter = Router();

// Public login route; it returns a token when credentials are correct.
adminAuthRouter.post("/login", loginAdmin);

// Recovery-key reset is available when the admin cannot use the old password.
adminAuthRouter.post("/reset-password", resetAdminPassword);

// Protected route used to restore and verify an admin session.
adminAuthRouter.get("/me", protectAdmin, getCurrentAdmin);
adminAuthRouter.patch("/me", protectAdmin, updateCurrentAdmin);
adminAuthRouter.post("/profile-image", protectAdmin, uploadAdminProfileImage, uploadCurrentAdminAvatar);

export default adminAuthRouter;
