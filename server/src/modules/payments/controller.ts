import type { Request, Response, NextFunction } from "express";
import { apiResponse } from "../../shared/responses/apiResponse";
import { paymentService } from "./service";

export const paymentController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user?.id) throw new Error("Unauthorized");
      const payment = await paymentService.create(req.body, req.user.id);
      res.status(201).json(apiResponse(true, "Payment created successfully", payment, 201));
    } catch (error) {
      next(error);
    }
  },

  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await paymentService.list(req.query);
      res.status(200).json(apiResponse(true, "Payments fetched successfully", result));
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray((req.params.id as string)) ? (req.params.id as string)[0] : (req.params.id as string);
      const payment = await paymentService.getById(id);
      res.status(200).json(apiResponse(true, "Payment fetched successfully", payment));
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user?.id) throw new Error("Unauthorized");
      const id = Array.isArray((req.params.id as string)) ? (req.params.id as string)[0] : (req.params.id as string);
      const payment = await paymentService.update(id, req.body, req.user.id);
      res.status(200).json(apiResponse(true, "Payment updated successfully", payment));
    } catch (error) {
      next(error);
    }
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user?.id) throw new Error("Unauthorized");
      const id = Array.isArray((req.params.id as string)) ? (req.params.id as string)[0] : (req.params.id as string);
      const payment = await paymentService.remove(id, req.user.id);
      res.status(200).json(apiResponse(true, "Payment deleted successfully", payment));
    } catch (error) {
      next(error);
    }
  },

  byPolicy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const policyId = Array.isArray(req.params.policyId) ? req.params.policyId[0] : req.params.policyId;
      req.query.policyId = policyId;
      const result = await paymentService.list(req.query);
      res.status(200).json(apiResponse(true, "Policy payments fetched successfully", result));
    } catch (error) {
      next(error);
    }
  },

  byClient: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clientId = Array.isArray(req.params.clientId) ? req.params.clientId[0] : req.params.clientId;
      req.query.clientId = clientId;
      const result = await paymentService.list(req.query);
      res.status(200).json(apiResponse(true, "Client payments fetched successfully", result));
    } catch (error) {
      next(error);
    }
  },

  pending: async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query.paymentStatus = "PENDING";
      const result = await paymentService.list(req.query);
      res.status(200).json(apiResponse(true, "Pending payments fetched successfully", result));
    } catch (error) {
      next(error);
    }
  }
};
