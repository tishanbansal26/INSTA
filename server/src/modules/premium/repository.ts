import prisma from "../../config/prisma";

export const premiumRepository = {
  createRate: async (data: any) => {
    return prisma.premiumRate.create({ data });
  },

  findRates: async (query: any) => {
    const { companyId, planId, skip, take } = query;
    const where: any = {};

    if (companyId) {
      where.companyId = companyId;
    }

    if (planId) {
      where.planId = planId;
    }

    return prisma.premiumRate.findMany({
      where,
      skip: skip ?? 0,
      take: take ?? 50,
      orderBy: { createdAt: "desc" },
    });
  },

  findById: async (id: string) => {
    return prisma.premiumRate.findUnique({ where: { id } });
  },

  updateRate: async (id: string, data: any) => {
    return prisma.premiumRate.update({ where: { id }, data });
  },

  deleteRate: async (id: string) => {
    return prisma.premiumRate.delete({ where: { id } });
  },

  findMatchingRates: async (companyId: string, planId: string) => {
    return prisma.premiumRate.findMany({
      where: { companyId, planId },
      orderBy: [{ ageFrom: "asc" }, { ageTo: "asc" }],
    });
  },
};
