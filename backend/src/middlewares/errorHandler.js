export const errorHandler = (error, request, response, next) => {
  void request;
  void next;

  const statusCode = response.statusCode >= 400 ? response.statusCode : 500;

  response.status(statusCode).json({
    success: false,
    message: error.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
};
