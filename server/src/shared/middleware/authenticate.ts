import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { verifyToken } from "../utils/jwt";
import prisma from "../../config/prisma";

export const authenticate = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return next(new AppError("Unauthorized", 401));
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive) {
      return next(new AppError("Unauthorized", 401));
    }

    req.user = user;
    next();
  } catch (error) {
    next(new AppError("Unauthorized", 401));
  }
};
