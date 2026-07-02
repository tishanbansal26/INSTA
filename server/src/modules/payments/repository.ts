import prisma from "../../config/prisma";
import type { PaymentFilter } from "./types";
import { Prisma } from "@prisma/client";

export const paymentRepository = {
  create: async (data: Prisma.PaymentUncheckedCreateInput) => {
    return prisma.payment.create({ data });
  },

  findById: async (id: string) => {
    return prisma.payment.findFirst({
      where: { id, deletedAt: null },
      include: { policy: true, quotation: true, createdBy: true }
    });
  },

  findMany: async (params: { skip: number; take: number; search: string; filters: PaymentFilter }) => {
    const { skip, take, search, filters } = params;
    
    const where: Prisma.PaymentWhereInput = {
      deletedAt: null,
      ...(filters.policyId && { policyId: filters.policyId }),
      ...(filters.quotationId && { quotationId: filters.quotationId }),
      ...(filters.clientId && { policy: { clientId: filters.clientId } }),
      ...(filters.paymentMode && { paymentMode: filters.paymentMode }),
      ...(filters.paymentStatus && { paymentStatus: filters.paymentStatus }),
      ...(filters.fromDate && filters.toDate && {
        createdAt: { gte: filters.fromDate, lte: filters.toDate }
      }),
      ...(search && {
        OR: [
          { receiptNumber: { contains: search, mode: 'insensitive' } },
          { transactionId: { contains: search, mode: 'insensitive' } }
        ]
      })
    };

    return prisma.payment.findMany({
      where,
      skip,
      take,
      include: { policy: true, createdBy: true },
      orderBy: { createdAt: "desc" }
    });
  },

  count: async (params: { search: string; filters: PaymentFilter }) => {
    const { search, filters } = params;
    const where: Prisma.PaymentWhereInput = {
      deletedAt: null,
      ...(filters.policyId && { policyId: filters.policyId }),
      ...(filters.quotationId && { quotationId: filters.quotationId }),
      ...(filters.clientId && { policy: { clientId: filters.clientId } }),
      ...(filters.paymentMode && { paymentMode: filters.paymentMode }),
      ...(filters.paymentStatus && { paymentStatus: filters.paymentStatus }),
      ...(filters.fromDate && filters.toDate && {
        createdAt: { gte: filters.fromDate, lte: filters.toDate }
      }),
      ...(search && {
        OR: [
          { receiptNumber: { contains: search, mode: 'insensitive' } },
          { transactionId: { contains: search, mode: 'insensitive' } }
        ]
      })
    };
    return prisma.payment.count({ where });
  },

  update: async (id: string, data: Prisma.PaymentUpdateInput) => {
    return prisma.payment.update({
      where: { id },
      data
    });
  },

  softDelete: async (id: string, updatedById: string) => {
    return prisma.payment.update({
      where: { id },
      data: { deletedAt: new Date(), updatedById }
    });
  },

  getOutstandingBalance: async (policyId: string) => {
    const policy = await prisma.policy.findUnique({ where: { id: policyId } });
    if (!policy) return 0;
    
    const totalDue = Number(policy.premiumAmount) + Number(policy.gstAmount);
    
    const payments = await prisma.payment.aggregate({
      where: { policyId, paymentStatus: "SUCCESS", deletedAt: null },
      _sum: { amount: true, gst: true }
    });
    
    const totalPaid = Number(payments._sum.amount || 0) + Number(payments._sum.gst || 0);
    return Math.max(0, totalDue - totalPaid);
  }
};
