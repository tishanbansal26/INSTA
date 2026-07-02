import prisma from "../../config/prisma";
import { Prisma } from "@prisma/client";

export const documentRepository = {
  create: async (data: Prisma.DocumentUncheckedCreateInput) => {
    return prisma.document.create({ data });
  },

  findById: async (id: string) => {
    return prisma.document.findFirst({
      where: { id, deletedAt: null },
      include: { client: true, policy: true, uploadedBy: true, verifiedBy: true }
    });
  },

  findMany: async (params: { skip: number; take: number; search: string; filters: any }) => {
    const { skip, take, search, filters } = params;
    
    const where: Prisma.DocumentWhereInput = {
      deletedAt: null,
      ...(filters.clientId && { clientId: filters.clientId }),
      ...(filters.policyId && { policyId: filters.policyId }),
      ...(filters.quotationId && { quotationId: filters.quotationId }),
      ...(filters.documentType && { documentType: filters.documentType }),
      ...(filters.verificationStatus && { verificationStatus: filters.verificationStatus }),
      ...(search && {
        OR: [
          { fileName: { contains: search, mode: 'insensitive' } },
          { originalFileName: { contains: search, mode: 'insensitive' } }
        ]
      })
    };

    return prisma.document.findMany({
      where,
      skip,
      take,
      include: { client: true, uploadedBy: true },
      orderBy: { createdAt: "desc" }
    });
  },

  count: async (params: { search: string; filters: any }) => {
    const { search, filters } = params;
    const where: Prisma.DocumentWhereInput = {
      deletedAt: null,
      ...(filters.clientId && { clientId: filters.clientId }),
      ...(filters.policyId && { policyId: filters.policyId }),
      ...(filters.quotationId && { quotationId: filters.quotationId }),
      ...(filters.documentType && { documentType: filters.documentType }),
      ...(filters.verificationStatus && { verificationStatus: filters.verificationStatus }),
      ...(search && {
        OR: [
          { fileName: { contains: search, mode: 'insensitive' } },
          { originalFileName: { contains: search, mode: 'insensitive' } }
        ]
      })
    };
    return prisma.document.count({ where });
  },

  update: async (id: string, data: Prisma.DocumentUpdateInput) => {
    return prisma.document.update({
      where: { id },
      data
    });
  },

  softDelete: async (id: string) => {
    return prisma.document.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }
};
