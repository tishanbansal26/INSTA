import type { Request, Response, NextFunction } from "express";
import { apiResponse } from "../../shared/responses/apiResponse";
import prisma from "../../config/prisma";

export const claimsController = {
  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const skip = (page - 1) * limit;

      const items = await prisma.claim.findMany({
        skip,
        take: limit,
        include: {
          client: true,
          policy: true,
        },
        orderBy: { createdAt: 'desc' }
      });
      const total = await prisma.claim.count();

      res.status(200).json(apiResponse(true, "Claims fetched", {
        items,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }));
    } catch (error) { next(error); }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const claim = await prisma.claim.findUnique({
        where: { id },
        include: {
          client: true,
          policy: true,
        }
      });
      if (!claim) {
        return res.status(404).json(apiResponse(false, "Claim not found"));
      }
      res.status(200).json(apiResponse(true, "Claim fetched", claim));
    } catch (error) { next(error); }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const claim = await prisma.claim.create({
        data: {
          ...req.body,
          createdById: req.user?.id || ""
        }
      });
      res.status(201).json(apiResponse(true, "Claim created", claim));
    } catch (error) { next(error); }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const claim = await prisma.claim.update({
        where: { id },
        data: req.body
      });
      res.status(200).json(apiResponse(true, "Claim updated", claim));
    } catch (error) { next(error); }
  }
};
