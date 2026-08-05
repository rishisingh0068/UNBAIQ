import { Router } from "express";

import {
  getPublishedBlog,
  listPublishedBlogs,
} from "../controllers/blog.controller.js";

const blogRouter = Router();

// Website visitors can access published posts without authentication.
blogRouter.get("/", listPublishedBlogs);
blogRouter.get("/:slug", getPublishedBlog);

export default blogRouter;
