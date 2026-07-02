import { AppError } from "../../shared/errors/AppError";
import prisma from "../../config/prisma";
import { ExpenseCategory, PaymentMode } from "@prisma/client";

export interface CreateExpenseDto {
  category: ExpenseCategory;
  vendor?: string;
  amount: number;
  gst: number;
  paymentMode: PaymentMode;
  remarks?: string;
}

export const expenseService = {
  create: async (input: CreateExpenseDto) => {
    return prisma.expense.create({
      data: {
        category: input.category,
        vendor: input.vendor,
        amount: input.amount,
        gst: input.gst,
        paymentMode: input.paymentMode,
        remarks: input.remarks,
      },
    });
  },

  list: async (query: any) => {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 20);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      prisma.expense.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { documents: true }
      }),
      prisma.expense.count(),
    ]);

    return {
      items,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  },

  getById: async (id: string) => {
    const expense = await prisma.expense.findUnique({
      where: { id },
      include: { documents: true },
    });
    if (!expense) throw new AppError("Expense not found", 404);
    return expense;
  },

  update: async (id: string, input: Partial<CreateExpenseDto>) => {
    const existing = await prisma.expense.findUnique({ where: { id } });
    if (!existing) throw new AppError("Expense not found", 404);

    return prisma.expense.update({
      where: { id },
      data: input,
    });
  },

  remove: async (id: string) => {
    const existing = await prisma.expense.findUnique({ where: { id } });
    if (!existing) throw new AppError("Expense not found", 404);
    
    return prisma.expense.delete({ where: { id } });
  }
};
