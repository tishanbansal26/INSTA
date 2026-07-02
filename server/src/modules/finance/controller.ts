import { Request, Response } from "express";
import { financeService } from "./service";
import { AppError } from "../../shared/errors/AppError";

export const getDashboardMetrics = async (req: Request, res: Response) => {
  try {
    const metrics = await financeService.getDashboardMetrics();
    res.json({
      success: true,
      data: metrics
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
};
