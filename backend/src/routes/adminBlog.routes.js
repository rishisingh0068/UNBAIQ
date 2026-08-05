import { Router } from "express";

import {
  createBlog,
  deleteBlog,
  getAdminBlog,
  listAdminBlogs,
  updateBlog,
  uploadBlogCoverImage,
} from "../controllers/blog.controller.js";
import { protectAdmin } from "../middlewares/adminAuth.js";
import { uploadBlogImage } from "../middlewares/uploadBlogImage.js";

const adminBlogRouter = Router();

// Blog creation and editing are restricted to authenticated admins.
adminBlogRouter.use(protectAdmin);
adminBlogRouter.post("/upload-image", uploadBlogImage, uploadBlogCoverImage);
adminBlogRouter.get("/", listAdminBlogs);
adminBlogRouter.post("/", createBlog);
adminBlogRouter.get("/:id", getAdminBlog);
adminBlogRouter.patch("/:id", updateBlog);
adminBlogRouter.delete("/:id", deleteBlog);

export default adminBlogRouter;
