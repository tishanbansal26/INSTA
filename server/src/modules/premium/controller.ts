import type { Request, Response, NextFunction } from "express";
import { apiResponse } from "../../shared/responses/apiResponse";
import { premiumService } from "./service";

export const premiumController = {
  calculate: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await premiumService.calculate(req.body);
      res.status(200).json(apiResponse(true, "Premium calculated successfully", result));
    } catch (error) {
      next(error);
    }
  }
};
