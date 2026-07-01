import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

const attempts = new Map<string, { count: number; firstAttemptAt: number }>();

export const rateLimiter = ({
  windowMs,
  maxAttempts,
}: {
  windowMs: number;
  maxAttempts: number;
}) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const key = req.ip || "unknown";
    const now = Date.now();
    const current = attempts.get(key);

    if (!current) {
      attempts.set(key, { count: 1, firstAttemptAt: now });
      return next();
    }

    if (now - current.firstAttemptAt > windowMs) {
      attempts.set(key, { count: 1, firstAttemptAt: now });
      return next();
    }

    if (current.count >= maxAttempts) {
      return next(new AppError("Too many login attempts. Please try again later.", 429));
    }

    attempts.set(key, { count: current.count + 1, firstAttemptAt: current.firstAttemptAt });
    next();
  };
};
