import prisma from "../../config/prisma";

export const policyRepository = {
  create: async (data: any) => {
    return prisma.policy.create({ data, include: { client: true, company: true, plan: true, agent: true } });
  },

  findMany: async (query: any) => {
    const { page, limit, search, status, companyId, clientId, skip, take } = query;
    const where: any = { deletedAt: null };

    if (status) {
      where.status = status;
    }

    if (companyId) {
      where.companyId = companyId;
    }

    if (clientId) {
      where.clientId = clientId;
    }

    if (search) {
      where.OR = [
        { policyNumber: { contains: search, mode: "insensitive" } },
        { client: { firstName: { contains: search, mode: "insensitive" } } },
        { client: { lastName: { contains: search, mode: "insensitive" } } },
        { client: { phone: { contains: search, mode: "insensitive" } } },
        { company: { code: { contains: search, mode: "insensitive" } } },
        { plan: { name: { contains: search, mode: "insensitive" } } },
      ];
    }

    return prisma.policy.findMany({
      where,
      include: { client: true, company: true, plan: true, agent: true },
      skip: skip ?? (page - 1) * limit,
      take: take ?? limit,
      orderBy: { createdAt: "desc" },
    });
  },

  count: async (query: any) => {
    const { search, status, companyId, clientId } = query;
    const where: any = { deletedAt: null };

    if (status) {
      where.status = status;
    }

    if (companyId) {
      where.companyId = companyId;
    }

    if (clientId) {
      where.clientId = clientId;
    }

    if (search) {
      where.OR = [
        { policyNumber: { contains: search, mode: "insensitive" } },
        { client: { firstName: { contains: search, mode: "insensitive" } } },
        { client: { lastName: { contains: search, mode: "insensitive" } } },
        { client: { phone: { contains: search, mode: "insensitive" } } },
        { company: { code: { contains: search, mode: "insensitive" } } },
        { plan: { name: { contains: search, mode: "insensitive" } } },
      ];
    }

    return prisma.policy.count({ where });
  },

  findById: async (id: string) => {
    return prisma.policy.findFirst({ where: { id, deletedAt: null }, include: { client: true, company: true, plan: true, agent: true } });
  },

  findByClientId: async (clientId: string) => {
    return prisma.policy.findMany({ where: { clientId, deletedAt: null }, include: { company: true, plan: true }, orderBy: { createdAt: "desc" } });
  },

  findExpiring: async () => {
    const now = new Date();
    const twoMonthsFromNow = new Date(now.getFullYear(), now.getMonth() + 2, now.getDate());
    return prisma.policy.findMany({
      where: { deletedAt: null, status: "ACTIVE", expiryDate: { lte: twoMonthsFromNow, gte: now } },
      include: { client: true, company: true, plan: true },
      orderBy: { expiryDate: "asc" },
    });
  },

  search: async (query: string) => {
    return prisma.policy.findMany({
      where: {
        deletedAt: null,
        OR: [
          { policyNumber: { contains: query, mode: "insensitive" } },
          { client: { firstName: { contains: query, mode: "insensitive" } } },
          { client: { lastName: { contains: query, mode: "insensitive" } } },
          { client: { phone: { contains: query, mode: "insensitive" } } },
          { company: { code: { contains: query, mode: "insensitive" } } },
          { plan: { name: { contains: query, mode: "insensitive" } } },
        ],
      },
      include: { client: true, company: true, plan: true },
      take: 10,
      orderBy: { createdAt: "desc" },
    });
  },

  update: async (id: string, data: any) => {
    return prisma.policy.update({ where: { id }, data, include: { client: true, company: true, plan: true, agent: true } });
  },

  softDelete: async (id: string) => {
    return prisma.policy.update({ where: { id }, data: { deletedAt: new Date(), status: "CANCELLED" } });
  },
};
