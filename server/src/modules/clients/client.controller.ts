import type { Request, Response, NextFunction } from "express";
import { apiResponse } from "../../shared/responses/apiResponse";
import { clientService } from "./client.service";

export const clientController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const client = await clientService.create(req.body, req.user?.id || "");
      res.status(201).json(apiResponse(true, "Client created", client, 201));
    } catch (error) {
      next(error);
    }
  },

  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await clientService.list(req.query as any);
      res.status(200).json(apiResponse(true, "Clients fetched", result));
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const client = await clientService.getById(id);
      res.status(200).json(apiResponse(true, "Client fetched", client));
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const client = await clientService.update(id, req.body);
      res.status(200).json(apiResponse(true, "Client updated", client));
    } catch (error) {
      next(error);
    }
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const client = await clientService.remove(id);
      res.status(200).json(apiResponse(true, "Client deleted", client));
    } catch (error) {
      next(error);
    }
  },
};
