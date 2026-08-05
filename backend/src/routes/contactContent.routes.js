import { Router } from "express";

import { getPublicContactContent } from "../controllers/contactContent.controller.js";

const contactContentRouter = Router();

// Website visitors can read the managed Get in Touch information.
contactContentRouter.get("/", getPublicContactContent);

export default contactContentRouter;
