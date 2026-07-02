import type { Request, Response, NextFunction } from "express";
import { apiResponse } from "../../shared/responses/apiResponse";
import { planService } from "./service";

export const planController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const plan = await planService.create(req.body);
      res.status(201).json(apiResponse(true, "Plan created successfully", plan, 201));
    } catch (error) {
      next(error);
    }
  },

  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await planService.list(req.query as any);
      res.status(200).json(apiResponse(true, "Plans fetched successfully", result));
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray((req.params.id as string)) ? (req.params.id as string)[0] : (req.params.id as string);
      const plan = await planService.getById(id);
      res.status(200).json(apiResponse(true, "Plan fetched successfully", plan));
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray((req.params.id as string)) ? (req.params.id as string)[0] : (req.params.id as string);
      const plan = await planService.update(id, req.body);
      res.status(200).json(apiResponse(true, "Plan updated successfully", plan));
    } catch (error) {
      next(error);
    }
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray((req.params.id as string)) ? (req.params.id as string)[0] : (req.params.id as string);
      const plan = await planService.remove(id);
      res.status(200).json(apiResponse(true, "Plan deleted successfully", plan));
    } catch (error) {
      next(error);
    }
  },
};
