import { Router } from "express";

import {
  getPublishedSuccessStory,
  listPublishedSuccessStories,
} from "../controllers/successStory.controller.js";

const successStoryRouter = Router();

// Visitors receive published success stories without admin authentication.
successStoryRouter.get("/", listPublishedSuccessStories);
successStoryRouter.get("/:slug", getPublishedSuccessStory);

export default successStoryRouter;
