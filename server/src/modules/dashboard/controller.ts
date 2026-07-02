import type { Request, Response, NextFunction } from "express";
import { apiResponse } from "../../shared/responses/apiResponse";
import prisma from "../../config/prisma";

export const dashboardController = {
  overview: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [
        totalClients,
        activePolicies,
        expiredPolicies,
        totalQuotations,
        pendingPayments
      ] = await Promise.all([
        prisma.client.count({ where: { deletedAt: null } }),
        prisma.policy.count({ where: { status: "ACTIVE", deletedAt: null } }),
        prisma.policy.count({ where: { status: "EXPIRED", deletedAt: null } }),
        prisma.quotation.count({ where: { status: { in: ["DRAFT", "SENT"] } } }),
        prisma.payment.count({ where: { paymentStatus: "PENDING", deletedAt: null } })
      ]);

      const revenueAgg = await prisma.payment.aggregate({
        where: { paymentStatus: "SUCCESS", deletedAt: null },
        _sum: { amount: true }
      });
      const totalRevenue = revenueAgg._sum.amount || 0;

      res.status(200).json(apiResponse(true, "Dashboard overview fetched", {
        totalClients,
        activePolicies,
        expiredPolicies,
        totalQuotations,
        totalRevenue,
        pendingPayments
      }));
    } catch (error) {
      next(error);
    }
  },

  revenue: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(apiResponse(true, "Revenue stats fetched", []));
    } catch (error) { next(error); }
  },

  policies: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(apiResponse(true, "Policy stats fetched", []));
    } catch (error) { next(error); }
  },

  recentActivities: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(apiResponse(true, "Recent activities fetched", []));
    } catch (error) { next(error); }
  }
};
