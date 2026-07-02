import type { Request, Response, NextFunction } from "express";
import { apiResponse } from "../../shared/responses/apiResponse";
import { documentService } from "./service";
import { AppError } from "../../shared/errors/AppError";

export const documentController = {
  upload: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user?.id) throw new Error("Unauthorized");
      if (!req.file) throw new AppError("No file uploaded", 400);
      
      const doc = await documentService.upload(req.body, req.file, req.user.id);
      res.status(201).json(apiResponse(true, "Document uploaded successfully", doc, 201));
    } catch (error) {
      next(error);
    }
  },

  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await documentService.list(req.query);
      res.status(200).json(apiResponse(true, "Documents fetched successfully", result));
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const doc = await documentService.getById(id);
      res.status(200).json(apiResponse(true, "Document fetched successfully", doc));
    } catch (error) {
      next(error);
    }
  },

  byClient: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clientId = Array.isArray(req.params.clientId) ? req.params.clientId[0] : req.params.clientId;
      req.query.clientId = clientId;
      const result = await documentService.list(req.query);
      res.status(200).json(apiResponse(true, "Client documents fetched successfully", result));
    } catch (error) {
      next(error);
    }
  },

  byPolicy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const policyId = Array.isArray(req.params.policyId) ? req.params.policyId[0] : req.params.policyId;
      req.query.policyId = policyId;
      const result = await documentService.list(req.query);
      res.status(200).json(apiResponse(true, "Policy documents fetched successfully", result));
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const doc = await documentService.update(id, req.body);
      res.status(200).json(apiResponse(true, "Document updated successfully", doc));
    } catch (error) {
      next(error);
    }
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const doc = await documentService.remove(id);
      res.status(200).json(apiResponse(true, "Document deleted successfully", doc));
    } catch (error) {
      next(error);
    }
  },

  verify: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user?.id) throw new Error("Unauthorized");
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const doc = await documentService.verify(id, req.body, req.user.id);
      res.status(200).json(apiResponse(true, "Document verified successfully", doc));
    } catch (error) {
      next(error);
    }
  }
};
