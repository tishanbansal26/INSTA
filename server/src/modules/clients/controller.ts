import type { Request, Response, NextFunction } from "express";
import { apiResponse } from "../../shared/responses/apiResponse";
import { clientService } from "./service";

/**
 * HTTP handlers for the clients module.
 */
export const clientController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const client = await clientService.create(req.body, req.user?.id || "");
      res.status(201).json(apiResponse(true, "Client created successfully", client, 201));
    } catch (error) {
      next(error);
    }
  },

  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await clientService.list(req.query as any);
      res.status(200).json(apiResponse(true, "Clients fetched successfully", result));
    } catch (error) {
      next(error);
    }
  },

  search: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await clientService.search(req.query.q as string);
      res.status(200).json(apiResponse(true, "Clients searched successfully", result));
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray((req.params.id as string)) ? (req.params.id as string)[0] : (req.params.id as string);
      const client = await clientService.getById(id);
      res.status(200).json(apiResponse(true, "Client fetched successfully", client));
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray((req.params.id as string)) ? (req.params.id as string)[0] : (req.params.id as string);
      const client = await clientService.update(id, req.body);
      res.status(200).json(apiResponse(true, "Client updated successfully", client));
    } catch (error) {
      next(error);
    }
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray((req.params.id as string)) ? (req.params.id as string)[0] : (req.params.id as string);
      const client = await clientService.remove(id);
      res.status(200).json(apiResponse(true, "Client deleted successfully", client));
    } catch (error) {
      next(error);
    }
  },
};
