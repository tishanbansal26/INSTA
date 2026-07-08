import type { Request, Response, NextFunction } from "express";
import { apiResponse } from "../../shared/responses/apiResponse";
import prisma from "../../config/prisma";
import { AuditService } from "../../shared/services/AuditService";

export const leadsController = {
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
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { mobile: { contains: search, mode: "insensitive" } },
          { source: { contains: search, mode: "insensitive" } },
        ];
      }

      const items = await prisma.lead.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder }
      });
      const total = await prisma.lead.count({ where });

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
      let createdById = req.user?.id;
      if (!createdById) {
        const defaultUser = await prisma.user.findFirst({
          where: { role: { in: ["ADMIN", "AGENT"] } }
        });
        createdById = defaultUser?.id || "";
      }

      const lead = await prisma.lead.create({
        data: {
          name: req.body.name,
          email: req.body.email,
          mobile: req.body.mobile,
          source: req.body.source || "Website Calculator",
          status: req.body.status || "NEW",
          priority: req.body.priority || "MEDIUM",
          createdById
        }
      });

      // Automatically create a follow-up task for the agent
      await prisma.task.create({
        data: {
          title: `Follow up: New Lead - ${lead.name}`,
          description: `A new lead has been generated from ${lead.source || 'Website Calculator'}.\nMobile: ${lead.mobile}\nEmail: ${lead.email || 'N/A'}`,
          status: 'PENDING',
          priority: 'HIGH',
          createdById,
          assignedToId: createdById
        }
      });

      await AuditService.log({
        req,
        tableName: "Lead",
        recordId: lead.id,
        action: "CREATE",
        newValue: lead
      });
      res.status(201).json(apiResponse(true, "Lead created", lead));
    } catch (error) { next(error); }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const oldLead = await prisma.lead.findUnique({ where: { id } });
      const lead = await prisma.lead.update({
        where: { id },
        data: req.body
      });
      await AuditService.log({
        req,
        tableName: "Lead",
        recordId: lead.id,
        action: "UPDATE",
        oldValue: oldLead,
        newValue: lead
      });
      res.status(200).json(apiResponse(true, "Lead updated", lead));
    } catch (error) { next(error); }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const oldLead = await prisma.lead.findUnique({ where: { id } });
      await prisma.lead.delete({ where: { id } });
      if (oldLead) {
        await AuditService.log({
          req,
          tableName: "Lead",
          recordId: id,
          action: "DELETE",
          oldValue: oldLead
        });
      }
      res.status(200).json(apiResponse(true, "Lead deleted", null));
    } catch (error) { next(error); }
  }
};
