import path from "node:path";

import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { errorHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notFound.js";
import adminAuthRouter from "./routes/adminAuth.routes.js";
import adminBlogRouter from "./routes/adminBlog.routes.js";
import adminContactContentRouter from "./routes/adminContactContent.routes.js";
import adminEnquiryRouter from "./routes/adminEnquiry.routes.js";
import adminFaqRouter from "./routes/adminFaq.routes.js";
import adminHeroSlideRouter from "./routes/adminHeroSlide.routes.js";
import adminSuccessStoryRouter from "./routes/adminSuccessStory.routes.js";
import blogRouter from "./routes/blog.routes.js";
import contactContentRouter from "./routes/contactContent.routes.js";
import enquiryRouter from "./routes/enquiry.routes.js";
import eventsRouter from "./routes/events.routes.js";
import faqRouter from "./routes/faq.routes.js";
import healthRouter from "./routes/health.routes.js";
import heroSlideRouter from "./routes/heroSlide.routes.js";
import successStoryRouter from "./routes/successStory.routes.js";

const app = express();

// Normalize configured origins and safely support local, production, and Netlify preview frontends.
const configuredClientUrl = process.env.CLIENT_URL?.replace(/\/$/, "");
const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://unbaiq.netlify.app",
  configuredClientUrl,
].filter(Boolean));

const isAllowedOrigin = (origin) => {
  if (!origin || allowedOrigins.has(origin.replace(/\/$/, ""))) return true;

  try {
    const { hostname, protocol } = new URL(origin);
    return protocol === "https:" && hostname.endsWith("--unbaiq.netlify.app");
  } catch {
    return false;
  }
};

app.disable("x-powered-by");
app.use(
  helmet({
    // Blog images are requested by the frontend running on a different origin.
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);
app.use(
  cors({
    // Reflect only approved origins so browser login and SSE work across deployments.
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) return callback(null, true);
      return callback(new Error("Origin is not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// Serve locally uploaded blog images through stable public URLs.
app.use("/uploads", express.static(path.resolve("uploads")));

if (process.env.NODE_ENV !== "test") {
  app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
}

app.use("/api/health", healthRouter);

// One native SSE stream keeps open public pages synchronized with saved content.
app.use("/api/events", eventsRouter);

// Accept public Let's Talk submissions and expose protected admin management.
app.use("/api/enquiries", enquiryRouter);
app.use("/api/admin/enquiries", adminEnquiryRouter);

// A public reader and protected singleton editor manage the Get in Touch details.
app.use("/api/contact-content", contactContentRouter);
app.use("/api/admin/contact-content", adminContactContentRouter);

// One managed FAQ collection powers every shared Q&A section.
app.use("/api/faqs", faqRouter);
app.use("/api/admin/faqs", adminFaqRouter);

// Expose published blogs publicly and editing tools only to admins.
app.use("/api/blogs", blogRouter);
app.use("/api/admin/blogs", adminBlogRouter);

// Hero slide visuals stay fixed while admins manage image/text/order/status.
app.use("/api/hero-slides", heroSlideRouter);
app.use("/api/admin/hero-slides", adminHeroSlideRouter);

// Success-story layout stays fixed while admins manage its structured content.
app.use("/api/success-stories", successStoryRouter);
app.use("/api/admin/success-stories", adminSuccessStoryRouter);

// Mount all admin authentication endpoints under one API prefix.
app.use("/api/admin/auth", adminAuthRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
