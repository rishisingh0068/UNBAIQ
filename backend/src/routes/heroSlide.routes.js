import { Router } from "express";

import { listPublicHeroSlides } from "../controllers/heroSlide.controller.js";

const heroSlideRouter = Router();

// Homepage access is public but inactive slides remain hidden.
heroSlideRouter.get("/", listPublicHeroSlides);

export default heroSlideRouter;
