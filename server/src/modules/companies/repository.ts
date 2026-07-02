import prisma from "../../config/prisma";

export const companyRepository = {
  create: async (data: any) => {
    return prisma.company.create({ data });
  },

  findMany: async (query: any) => {
    const { page, limit, search, isActive, skip, take } = query;
    const where: any = { deletedAt: null };

    if (typeof isActive === "boolean") {
      where.isActive = isActive;
    }

    if (search) {
      where.OR = [{ code: { contains: search, mode: "insensitive" } }, { description: { contains: search, mode: "insensitive" } }];
    }

    return prisma.company.findMany({
      where,
      skip: skip ?? (page - 1) * limit,
      take: take ?? limit,
      orderBy: { createdAt: "desc" },
    });
  },

  count: async (query: any) => {
    const { search, isActive } = query;
    const where: any = { deletedAt: null };

    if (typeof isActive === "boolean") {
      where.isActive = isActive;
    }

    if (search) {
      where.OR = [{ code: { contains: search, mode: "insensitive" } }, { description: { contains: search, mode: "insensitive" } }];
    }

    return prisma.company.count({ where });
  },

  findById: async (id: string) => {
    return prisma.company.findFirst({ where: { id, deletedAt: null } });
  },

  update: async (id: string, data: any) => {
    return prisma.company.update({ where: { id }, data });
  },

  softDelete: async (id: string) => {
    return prisma.company.update({ where: { id }, data: { deletedAt: new Date(), isActive: false } });
  },
};
