import { AppError } from "../../shared/errors/AppError";
import prisma from "../../config/prisma";
import { paymentRepository } from "./repository";
import type { CreatePaymentDto, UpdatePaymentDto } from "./dto";

const buildReceiptNumber = async () => {
  const year = new Date().getFullYear();
  const count = await prisma.payment.count({ where: { createdAt: { gte: new Date(`${year}-01-01T00:00:00.000Z`) } } });
  return `RCPT-${year}-${String(count + 1).padStart(6, "0")}`;
};

export const paymentService = {
  create: async (input: CreatePaymentDto, createdById: string) => {
    const policy = await prisma.policy.findUnique({ where: { id: input.policyId } });
    if (!policy) throw new AppError("Policy not found", 404);
    
    const outstanding = await paymentRepository.getOutstandingBalance(input.policyId);
    if (input.amount + input.gst > outstanding) {
      throw new AppError(`Payment exceeds outstanding balance of ${outstanding}`, 400);
    }
    
    if (policy.status === "CANCELLED") {
      throw new AppError("Cannot process payments for a cancelled policy", 400);
    }

    const receiptNumber = await buildReceiptNumber();

    return paymentRepository.create({
      ...input,
      receiptNumber,
      createdById,
      paymentStatus: "PENDING",
      amount: input.amount,
      gst: input.gst,
    });
  },

  list: async (query: any) => {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 20);
    const skip = (page - 1) * limit;
    const search = query.search || "";
    
    const filters = {
      policyId: query.policyId,
      quotationId: query.quotationId,
      clientId: query.clientId,
      paymentMode: query.paymentMode,
      paymentStatus: query.paymentStatus,
      fromDate: query.fromDate ? new Date(query.fromDate) : undefined,
      toDate: query.toDate ? new Date(query.toDate) : undefined,
    };

    const [items, total] = await Promise.all([
      paymentRepository.findMany({ skip, take: limit, search, filters }),
      paymentRepository.count({ search, filters })
    ]);

    return {
      items,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    };
  },

  getById: async (id: string) => {
    const payment = await paymentRepository.findById(id);
    if (!payment) throw new AppError("Payment not found", 404);
    return payment;
  },

  update: async (id: string, input: UpdatePaymentDto, updatedById: string) => {
    const payment = await paymentRepository.findById(id);
    if (!payment) throw new AppError("Payment not found", 404);
    
    const updated = await paymentRepository.update(id, {
      ...input,
      updatedBy: { connect: { id: updatedById } }
    });

    if (input.paymentStatus === "SUCCESS") {
      const outstanding = await paymentRepository.getOutstandingBalance(payment.policyId);
      if (outstanding <= 0) {
        await prisma.policy.update({
          where: { id: payment.policyId },
          data: { paymentStatus: "PAID" }
        });
      } else {
        await prisma.policy.update({
          where: { id: payment.policyId },
          data: { paymentStatus: "PARTIAL" }
        });
      }
    }

    return updated;
  },

  remove: async (id: string, updatedById: string) => {
    const payment = await paymentRepository.findById(id);
    if (!payment) throw new AppError("Payment not found", 404);
    return paymentRepository.softDelete(id, updatedById);
  }
};
