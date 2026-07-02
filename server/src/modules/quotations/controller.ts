import type { Request, Response, NextFunction } from "express";
import { apiResponse } from "../../shared/responses/apiResponse";
import { quotationService } from "./service";

export const quotationController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const quotation = await quotationService.create(req.body, req.user?.id);
      res.status(201).json(apiResponse(true, "Quotation created successfully", quotation, 201));
    } catch (error) {
      next(error);
    }
  },

  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await quotationService.list(req.query as any);
      res.status(200).json(apiResponse(true, "Quotations fetched successfully", result));
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray((req.params.id as string)) ? (req.params.id as string)[0] : (req.params.id as string);
      const quotation = await quotationService.getById(id);
      res.status(200).json(apiResponse(true, "Quotation fetched successfully", quotation));
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray((req.params.id as string)) ? (req.params.id as string)[0] : (req.params.id as string);
      const quotation = await quotationService.update(id, req.body);
      res.status(200).json(apiResponse(true, "Quotation updated successfully", quotation));
    } catch (error) {
      next(error);
    }
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray((req.params.id as string)) ? (req.params.id as string)[0] : (req.params.id as string);
      const quotation = await quotationService.remove(id);
      res.status(200).json(apiResponse(true, "Quotation deleted successfully", quotation));
    } catch (error) {
      next(error);
    }
  },

  approve: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray((req.params.id as string)) ? (req.params.id as string)[0] : (req.params.id as string);
      const quotation = await quotationService.approve(id);
      res.status(200).json(apiResponse(true, "Quotation approved successfully", quotation));
    } catch (error) {
      next(error);
    }
  },

  reject: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray((req.params.id as string)) ? (req.params.id as string)[0] : (req.params.id as string);
      const quotation = await quotationService.reject(id, req.body?.remarks);
      res.status(200).json(apiResponse(true, "Quotation rejected successfully", quotation));
    } catch (error) {
      next(error);
    }
  },

  convertToPolicy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray((req.params.id as string)) ? (req.params.id as string)[0] : (req.params.id as string);
      const policy = await quotationService.convertToPolicy(id);
      res.status(201).json(apiResponse(true, "Quotation converted to policy successfully", policy, 201));
    } catch (error) {
      next(error);
    }
  },
};
