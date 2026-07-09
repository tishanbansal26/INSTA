import type { Request, Response, NextFunction } from "express";
import { apiResponse } from "../../shared/responses/apiResponse";
import prisma from "../../config/prisma";
import { AuditService } from "../../shared/services/AuditService";

export const claimsController = {
  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const skip = (page - 1) * limit;

      const search = (req.query.search as string) || "";
      const status = req.query.status as string;
      const priority = req.query.priority as string;
      const sortBy = (req.query.sortBy as string) || "createdAt";
      const sortOrder = (req.query.sortOrder as string) === "asc" ? "asc" : "desc";

      const where: any = {};

      if (status) {
        where.status = status;
      }
      if (priority) {
        where.priority = priority;
      }

      if (search) {
        where.OR = [
          { claimNumber: { contains: search, mode: "insensitive" } },
          { claimType: { contains: search, mode: "insensitive" } },
          { client: { firstName: { contains: search, mode: "insensitive" } } },
          { client: { lastName: { contains: search, mode: "insensitive" } } },
          { client: { phone: { contains: search, mode: "insensitive" } } },
        ];
      }

      const items = await prisma.claim.findMany({
        where,
        skip,
        take: limit,
        include: {
          client: true,
          policy: true,
        },
        orderBy: { [sortBy]: sortOrder }
      });
      const total = await prisma.claim.count({ where });

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
      const id = req.params.id as string;
      const claim = await prisma.claim.findUnique({
        where: { id },
        include: {
          client: true,
          policy: true,
        }
      });
      if (!claim) {
        return res.status(404).json(apiResponse(false, "Claim not found", null, 404));
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
      await AuditService.log({
        req,
        tableName: "Claim",
        recordId: claim.id,
        action: "CREATE",
        newValue: claim
      });
      res.status(201).json(apiResponse(true, "Claim created", claim));
    } catch (error) { next(error); }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const oldClaim = await prisma.claim.findUnique({ where: { id } });
      const claim = await prisma.claim.update({
        where: { id },
        data: req.body
      });
      await AuditService.log({
        req,
        tableName: "Claim",
        recordId: claim.id,
        action: "UPDATE",
        oldValue: oldClaim,
        newValue: claim
      });
      res.status(200).json(apiResponse(true, "Claim updated", claim));
    } catch (error) { next(error); }
  }
};
