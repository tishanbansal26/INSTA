import prisma from "../../config/prisma";
import { CommissionStatus, ExpenseCategory, PayoutStatus, InvoiceStatus } from "@prisma/client";

export const financeService = {
  getDashboardMetrics: async () => {
    // 1. Premium Collected
    const premiumResult = await prisma.policy.aggregate({
      _sum: {
        premiumAmount: true,
      },
      where: {
        paymentStatus: "PAID"
      }
    });
    
    // 2. Commission Earned (Total Commission on policies)
    const commissionResult = await prisma.commission.aggregate({
      _sum: {
        totalCommissionAmount: true,
      }
    });

    // 3. Commission Paid (Cleared this month / Paid)
    const commissionPaidResult = await prisma.commission.aggregate({
      _sum: {
        totalCommissionAmount: true,
      },
      where: {
        status: CommissionStatus.PAID
      }
    });

    // 4. Pending Commission
    const commissionPendingResult = await prisma.commission.aggregate({
      _sum: {
        totalCommissionAmount: true,
      },
      where: {
        status: CommissionStatus.PENDING
      }
    });

    // 5. Expenses
    const expensesResult = await prisma.expense.aggregate({
      _sum: {
        amount: true,
      }
    });

    // Outstanding Company Payments (Invoices)
    const outstandingInvoices = await prisma.invoice.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        status: { in: [InvoiceStatus.DRAFT, InvoiceStatus.ISSUED, InvoiceStatus.OVERDUE] }
      }
    });

    const premiumCollected = premiumResult._sum.premiumAmount?.toNumber() || 0;
    const commissionEarned = commissionResult._sum.totalCommissionAmount?.toNumber() || 0;
    const commissionPaid = commissionPaidResult._sum.totalCommissionAmount?.toNumber() || 0;
    const pendingCommission = commissionPendingResult._sum.totalCommissionAmount?.toNumber() || 0;
    const expenses = expensesResult._sum.amount?.toNumber() || 0;
    const outstandingCompanyPayments = outstandingInvoices._sum.amount?.toNumber() || 0;

    const netProfit = premiumCollected - expenses - commissionPaid; // Or based on earnings, depending on accounting.

    return {
      premiumCollected,
      commissionEarned,
      commissionPaid,
      pendingCommission,
      expenses,
      netProfit,
      outstandingCompanyPayments
    };
  }
};
