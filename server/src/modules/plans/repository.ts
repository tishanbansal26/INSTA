import prisma from "../../config/prisma";

export const planRepository = {
  create: async (data: any) => {
    return prisma.plan.create({ data });
  },

  findMany: async (query: any) => {
    const { page, limit, search, isActive, companyId, skip, take } = query;
    const where: any = { deletedAt: null };

    if (typeof isActive === "boolean") {
      where.isActive = isActive;
    }

    if (companyId) {
      where.companyId = companyId;
    }

    if (search) {
      where.OR = [{ name: { contains: search, mode: "insensitive" } }, { code: { contains: search, mode: "insensitive" } }, { category: { contains: search, mode: "insensitive" } }];
    }

    return prisma.plan.findMany({
      where,
      include: { company: true },
      skip: skip ?? (page - 1) * limit,
      take: take ?? limit,
      orderBy: { createdAt: "desc" },
    });
  },

  count: async (query: any) => {
    const { search, isActive, companyId } = query;
    const where: any = { deletedAt: null };

    if (typeof isActive === "boolean") {
      where.isActive = isActive;
    }

    if (companyId) {
      where.companyId = companyId;
    }

    if (search) {
      where.OR = [{ name: { contains: search, mode: "insensitive" } }, { code: { contains: search, mode: "insensitive" } }, { category: { contains: search, mode: "insensitive" } }];
    }

    return prisma.plan.count({ where });
  },

  findById: async (id: string) => {
    return prisma.plan.findFirst({ where: { id, deletedAt: null }, include: { company: true } });
  },

  update: async (id: string, data: any) => {
    return prisma.plan.update({ where: { id }, data, include: { company: true } });
  },

  softDelete: async (id: string) => {
    return prisma.plan.update({ where: { id }, data: { deletedAt: new Date(), isActive: false } });
  },
};
