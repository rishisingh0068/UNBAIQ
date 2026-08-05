import { Router } from "express";

import {
  createSuccessStory,
  deleteSuccessStory,
  getAdminSuccessStory,
  listAdminSuccessStories,
  updateSuccessStory,
  uploadSuccessStoryCoverImage,
} from "../controllers/successStory.controller.js";
import { protectAdmin } from "../middlewares/adminAuth.js";
import { uploadSuccessStoryImage } from "../middlewares/uploadSuccessStoryImage.js";

const adminSuccessStoryRouter = Router();

// Every success-story management action requires a verified admin token.
adminSuccessStoryRouter.use(protectAdmin);
adminSuccessStoryRouter.post("/upload-image", uploadSuccessStoryImage, uploadSuccessStoryCoverImage);
adminSuccessStoryRouter.get("/", listAdminSuccessStories);
adminSuccessStoryRouter.post("/", createSuccessStory);
adminSuccessStoryRouter.get("/:id", getAdminSuccessStory);
adminSuccessStoryRouter.patch("/:id", updateSuccessStory);
adminSuccessStoryRouter.delete("/:id", deleteSuccessStory);

export default adminSuccessStoryRouter;
