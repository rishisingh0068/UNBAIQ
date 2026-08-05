import { Router } from "express";

import { listPublicFaqs } from "../controllers/faq.controller.js";

const faqRouter = Router();

// Website visitors can read active FAQs without authentication.
faqRouter.get("/", listPublicFaqs);

export default faqRouter;
