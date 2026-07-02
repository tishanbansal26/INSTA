import prisma from "../../config/prisma";

export const quotationRepository = {
  create: async (data: any) => {
    return prisma.quotation.create({ data });
  },

  findMany: async (query: any) => {
    const { page, limit, search, status, clientId, companyId, skip, take } = query;
    const where: any = {};

    if (status) where.status = status;
    if (clientId) where.clientId = clientId;
    if (companyId) where.companyId = companyId;

    if (search) {
      where.OR = [
        { quotationNumber: { contains: search, mode: "insensitive" } },
        { client: { firstName: { contains: search, mode: "insensitive" } } },
        { client: { lastName: { contains: search, mode: "insensitive" } } },
        { client: { phone: { contains: search, mode: "insensitive" } } },
      ];
    }

    return prisma.quotation.findMany({
      where,
      include: { client: true, company: true, plan: true, createdBy: true },
      skip: skip ?? (page - 1) * limit,
      take: take ?? limit,
      orderBy: { createdAt: "desc" },
    });
  },

  count: async (query: any) => {
    const { search, status, clientId, companyId } = query;
    const where: any = {};

    if (status) where.status = status;
    if (clientId) where.clientId = clientId;
    if (companyId) where.companyId = companyId;

    if (search) {
      where.OR = [
        { quotationNumber: { contains: search, mode: "insensitive" } },
        { client: { firstName: { contains: search, mode: "insensitive" } } },
        { client: { lastName: { contains: search, mode: "insensitive" } } },
        { client: { phone: { contains: search, mode: "insensitive" } } },
      ];
    }

    return prisma.quotation.count({ where });
  },

  findById: async (id: string) => {
    return prisma.quotation.findUnique({ where: { id }, include: { client: true, company: true, plan: true, createdBy: true } });
  },

  update: async (id: string, data: any) => {
    return prisma.quotation.update({ where: { id }, data });
  },

  delete: async (id: string) => {
    return prisma.quotation.delete({ where: { id } });
  },
};
