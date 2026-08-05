import { Router } from "express";

import {
  createHeroSlide,
  deleteHeroSlide,
  getAdminHeroSlide,
  listAdminHeroSlides,
  updateHeroSlide,
  uploadHeroSlideImage,
} from "../controllers/heroSlide.controller.js";
import { protectAdmin } from "../middlewares/adminAuth.js";
import { uploadHeroImage } from "../middlewares/uploadHeroImage.js";

const adminHeroSlideRouter = Router();

adminHeroSlideRouter.use(protectAdmin);
adminHeroSlideRouter.get("/", listAdminHeroSlides);
adminHeroSlideRouter.post("/", createHeroSlide);
adminHeroSlideRouter.post("/upload-image", uploadHeroImage, uploadHeroSlideImage);
adminHeroSlideRouter.get("/:id", getAdminHeroSlide);
adminHeroSlideRouter.patch("/:id", updateHeroSlide);
adminHeroSlideRouter.delete("/:id", deleteHeroSlide);

export default adminHeroSlideRouter;
