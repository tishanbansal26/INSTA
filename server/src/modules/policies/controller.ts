import type { Request, Response, NextFunction } from "express";
import { apiResponse } from "../../shared/responses/apiResponse";
import { policyService } from "./service";
import { AuditService } from "../../shared/services/AuditService";

export const policyController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const policy = await policyService.create(req.body, req.user?.id);
      await AuditService.log({
        req,
        tableName: "Policy",
        recordId: policy.id,
        action: "CREATE",
        newValue: policy
      });
      res.status(201).json(apiResponse(true, "Policy created successfully", policy, 201));
    } catch (error) {
      next(error);
    }
  },

  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await policyService.list(req.query as any);
      res.status(200).json(apiResponse(true, "Policies fetched successfully", result));
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray((req.params.id as string)) ? (req.params.id as string)[0] : (req.params.id as string);
      const policy = await policyService.getById(id);
      res.status(200).json(apiResponse(true, "Policy fetched successfully", policy));
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray((req.params.id as string)) ? (req.params.id as string)[0] : (req.params.id as string);
      const oldPolicy = await policyService.getById(id);
      const policy = await policyService.update(id, req.body);
      await AuditService.log({
        req,
        tableName: "Policy",
        recordId: policy.id,
        action: "UPDATE",
        oldValue: oldPolicy,
        newValue: policy
      });
      res.status(200).json(apiResponse(true, "Policy updated successfully", policy));
    } catch (error) {
      next(error);
    }
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray((req.params.id as string)) ? (req.params.id as string)[0] : (req.params.id as string);
      const oldPolicy = await policyService.getById(id);
      const policy = await policyService.remove(id);
      await AuditService.log({
        req,
        tableName: "Policy",
        recordId: id,
        action: "DELETE",
        oldValue: oldPolicy
      });
      res.status(200).json(apiResponse(true, "Policy deleted successfully", policy));
    } catch (error) {
      next(error);
    }
  },

  byClient: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clientId = Array.isArray(req.params.clientId) ? req.params.clientId[0] : req.params.clientId;
      const policies = await policyService.byClient(clientId);
      res.status(200).json(apiResponse(true, "Client policies fetched successfully", policies));
    } catch (error) {
      next(error);
    }
  },

  expiring: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const policies = await policyService.expiring();
      res.status(200).json(apiResponse(true, "Expiring policies fetched successfully", policies));
    } catch (error) {
      next(error);
    }
  },

  search: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await policyService.search(req.query.q as string);
      res.status(200).json(apiResponse(true, "Policies searched successfully", result));
    } catch (error) {
      next(error);
    }
  },
};
