import prisma from "../../config/prisma";

export const clientRepository = {
  create: async (data: any, createdById: string) => {
    return prisma.client.create({
      data: {
        ...data,
        createdById,
      },
    });
  },

  findMany: async (query: any) => {
    const { page, limit, search, isActive, skip, take } = query;
    const where: any = { deletedAt: null };

    if (typeof isActive === "boolean") {
      where.isActive = isActive;
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { pan: { contains: search, mode: "insensitive" } },
        { aadhaar: { contains: search, mode: "insensitive" } },
      ];
    }

    return prisma.client.findMany({
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
      where.OR = [
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { pan: { contains: search, mode: "insensitive" } },
        { aadhaar: { contains: search, mode: "insensitive" } },
      ];
    }

    return prisma.client.count({ where });
  },

  search: async (query: string) => {
    return prisma.client.findMany({
      where: {
        deletedAt: null,
        OR: [
          { firstName: { contains: query, mode: "insensitive" } },
          { lastName: { contains: query, mode: "insensitive" } },
          { phone: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
          { pan: { contains: query, mode: "insensitive" } },
          { aadhaar: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 10,
      orderBy: { createdAt: "desc" },
    });
  },

  findById: async (id: string) => {
    return prisma.client.findFirst({
      where: { id, deletedAt: null },
    });
  },

  update: async (id: string, data: any) => {
    return prisma.client.update({
      where: { id },
      data,
    });
  },

  softDelete: async (id: string) => {
    return prisma.client.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false },
    });
  },
};
