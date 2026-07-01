import type { ErrorRequestHandler } from "express";
import { AppError } from "../shared/errors/AppError";
import { apiResponse } from "../shared/responses/apiResponse";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(
      apiResponse(false, err.message, null, err.statusCode)
    );
  }

  console.error("Unhandled error:", err);

  return res.status(500).json(
    apiResponse(false, "Internal server error", null, 500)
  );
};
