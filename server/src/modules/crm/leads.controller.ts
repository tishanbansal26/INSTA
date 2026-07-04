import type { Request, Response, NextFunction } from "express";
import { apiResponse } from "../../shared/responses/apiResponse";
import prisma from "../../config/prisma";

export const leadsController = {
  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const skip = (page - 1) * limit;

      const items = await prisma.lead.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      });
      const total = await prisma.lead.count();

      res.status(200).json(apiResponse(true, "Leads fetched", {
        items,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }));
    } catch (error) { next(error); }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const lead = await prisma.lead.create({
        data: {
          ...req.body,
          createdById: req.user?.id || ""
        }
      });
      res.status(201).json(apiResponse(true, "Lead created", lead));
    } catch (error) { next(error); }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const lead = await prisma.lead.update({
        where: { id },
        data: req.body
      });
      res.status(200).json(apiResponse(true, "Lead updated", lead));
    } catch (error) { next(error); }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      await prisma.lead.delete({ where: { id } });
      res.status(200).json(apiResponse(true, "Lead deleted", null));
    } catch (error) { next(error); }
  }
};
