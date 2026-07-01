import { Router } from "express";
import prisma from "../config/prisma";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const count = await prisma.user.count();
    res.status(200).json({
      success: true,
      message: "Prisma is connected",
      data: { users: count },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
