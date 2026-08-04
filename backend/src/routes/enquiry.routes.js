import { Router } from "express";

import { createEnquiry } from "../controllers/enquiry.controller.js";

const enquiryRouter = Router();

// Public website visitors can submit a new enquiry through this endpoint.
enquiryRouter.post("/", createEnquiry);

export default enquiryRouter;
