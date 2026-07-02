import type { Request, Response, NextFunction } from "express";
import { apiResponse } from "../../shared/responses/apiResponse";
import { premiumRateService } from "./service";

export const premiumRateController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rate = await premiumRateService.create(req.body);
      res.status(201).json(apiResponse(true, "Premium rate created successfully", rate, 201));
    } catch (error) {
      next(error);
    }
  },

  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await premiumRateService.list(req.query);
      res.status(200).json(apiResponse(true, "Premium rates fetched successfully", result));
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const rate = await premiumRateService.getById(id);
      res.status(200).json(apiResponse(true, "Premium rate fetched successfully", rate));
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const rate = await premiumRateService.update(id, req.body);
      res.status(200).json(apiResponse(true, "Premium rate updated successfully", rate));
    } catch (error) {
      next(error);
    }
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const rate = await premiumRateService.remove(id);
      res.status(200).json(apiResponse(true, "Premium rate deleted successfully", rate));
    } catch (error) {
      next(error);
    }
  }
};
