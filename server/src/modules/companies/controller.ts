import type { Request, Response, NextFunction } from "express";
import { apiResponse } from "../../shared/responses/apiResponse";
import { companyService } from "./service";

export const companyController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const company = await companyService.create(req.body);
      res.status(201).json(apiResponse(true, "Company created successfully", company, 201));
    } catch (error) {
      next(error);
    }
  },

  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await companyService.list(req.query as any);
      res.status(200).json(apiResponse(true, "Companies fetched successfully", result));
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const company = await companyService.getById(id);
      res.status(200).json(apiResponse(true, "Company fetched successfully", company));
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const company = await companyService.update(id, req.body);
      res.status(200).json(apiResponse(true, "Company updated successfully", company));
    } catch (error) {
      next(error);
    }
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const company = await companyService.remove(id);
      res.status(200).json(apiResponse(true, "Company deleted successfully", company));
    } catch (error) {
      next(error);
    }
  },
};
