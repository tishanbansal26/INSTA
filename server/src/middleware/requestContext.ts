import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

export function requestContext(req: Request, res: Response, next: NextFunction) {
  // Use provided correlation ID or generate a new one
  const reqId = req.headers["x-correlation-id"] || req.headers["x-request-id"] || crypto.randomUUID();
  
  (req as any).id = reqId;
  res.setHeader("X-Request-ID", reqId);

  next();
}
