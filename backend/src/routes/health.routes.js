import { Router } from "express";

const healthRouter = Router();

healthRouter.get("/", (request, response) => {
  void request;

  response.status(200).json({
    success: true,
    message: "UNBAIQ API is running",
    timestamp: new Date().toISOString(),
  });
});

export default healthRouter;
