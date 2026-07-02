import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

import { hasPermission } from "./permissions";

export const authorize = (requiredPermission: string) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError("Unauthorized", 401));
    }

    if (!hasPermission(req.user.role, requiredPermission)) {
      return next(new AppError(`Forbidden: Missing ${requiredPermission} permission`, 403));
    }

    next();
  };
};
