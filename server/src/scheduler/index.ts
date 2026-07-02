import cron from 'node-cron';
import prisma from '../config/prisma';
import { CommissionStatus, PayoutStatus, InvoiceStatus } from '@prisma/client';

export const initScheduler = () => {
  // Run on the 1st of every month at 00:00
  cron.schedule('0 0 1 * *', async () => {
    console.log('Running Monthly Closing Scheduler...');

    const today = new Date();
    // E.g., if today is July 1st, we close for June.
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const periodString = `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, '0')}`;

    try {
      // 1. Lock the month
      const systemAdmin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
      if (!systemAdmin) {
        console.error('Monthly Closing failed: System admin not found');
        return;
      }

      const closing = await prisma.monthlyClosing.upsert({
        where: { period: periodString },
        update: { isLocked: true },
        create: {
          period: periodString,
          isLocked: true,
          lockedById: systemAdmin.id,
        },
      });

      console.log(`Locked month ${periodString}`);

      // 2. Generate Agent Payouts
      // Find all unpaid commissions for last month (we could filter by date, but simpler is just all unpaid)
      const unpaidSplits = await prisma.commissionSplit.groupBy({
        by: ['agentId'],
        _sum: {
          commissionAmount: true,
        },
        where: {
          commission: {
            status: CommissionStatus.PENDING,
          },
        },
      });

      for (const split of unpaidSplits) {
        if (split._sum.commissionAmount && split._sum.commissionAmount.toNumber() > 0) {
          await prisma.payout.create({
            data: {
              agentId: split.agentId,
              amount: split._sum.commissionAmount,
              period: periodString,
              status: PayoutStatus.PENDING,
            },
          });
        }
      }

      console.log(`Generated ${unpaidSplits.length} payouts for ${periodString}`);

      // 3. Generate Company Invoices
      const companyCommissions = await prisma.commission.groupBy({
        by: ['companyId'],
        _sum: {
          totalCommissionAmount: true,
        },
        where: {
          status: CommissionStatus.PENDING,
        },
      });

      for (const cc of companyCommissions) {
        if (cc._sum.totalCommissionAmount && cc._sum.totalCommissionAmount.toNumber() > 0) {
          await prisma.invoice.create({
            data: {
              invoiceNumber: `INV-${periodString}-${cc.companyId.substring(0, 4).toUpperCase()}`,
              companyId: cc.companyId,
              amount: cc._sum.totalCommissionAmount,
              gst: cc._sum.totalCommissionAmount.toNumber() * 0.18, // 18% GST example
              dueDate: new Date(today.getFullYear(), today.getMonth(), 15), // Due 15th
              status: InvoiceStatus.DRAFT,
            },
          });
        }
      }

      console.log(`Generated ${companyCommissions.length} company invoices for ${periodString}`);

      // Notify Finance (dummy log)
      console.log(`Sent notifications to Finance regarding Monthly Closing for ${periodString}`);

    } catch (error) {
      console.error('Error during Monthly Closing:', error);
    }
  });

  console.log('Scheduler initialized');
};
