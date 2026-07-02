import prisma from "../../config/prisma";
import type { CreatePremiumRateDto, UpdatePremiumRateDto } from "./dto";
import type { PremiumRateFilter } from "./types";
import { Prisma } from "@prisma/client";

export const premiumRateRepository = {
  create: async (data: CreatePremiumRateDto) => {
    return prisma.premiumRate.create({ data });
  },

  findById: async (id: string) => {
    return prisma.premiumRate.findFirst({
      where: { id, deletedAt: null },
      include: { company: true, plan: true }
    });
  },

  findMany: async (params: { skip: number; take: number; search: string; filters: PremiumRateFilter }) => {
    const { skip, take, search, filters } = params;
    
    const where: Prisma.PremiumRateWhereInput = {
      deletedAt: null,
      ...(filters.companyId && { companyId: filters.companyId }),
      ...(filters.planId && { planId: filters.planId }),
      ...(filters.cityTier && { cityTier: filters.cityTier }),
      ...(filters.familyType && { familyType: filters.familyType }),
      ...(filters.isActive !== undefined && { isActive: filters.isActive }),
      ...(filters.age && { ageFrom: { lte: filters.age }, ageTo: { gte: filters.age } }),
      ...(filters.gender && { gender: filters.gender }),
      ...(filters.sumInsured && { sumInsured: filters.sumInsured }),
      ...(filters.tenure && { tenure: filters.tenure }),
      ...(search && {
        OR: [
          { company: { code: { contains: search, mode: 'insensitive' } } },
          { plan: { code: { contains: search, mode: 'insensitive' } } }
        ]
      })
    };

    return prisma.premiumRate.findMany({
      where,
      skip,
      take,
      include: { company: true, plan: true },
      orderBy: { createdAt: "desc" }
    });
  },

  count: async (params: { search: string; filters: PremiumRateFilter }) => {
    const { search, filters } = params;
    const where: Prisma.PremiumRateWhereInput = {
      deletedAt: null,
      ...(filters.companyId && { companyId: filters.companyId }),
      ...(filters.planId && { planId: filters.planId }),
      ...(filters.cityTier && { cityTier: filters.cityTier }),
      ...(filters.familyType && { familyType: filters.familyType }),
      ...(filters.isActive !== undefined && { isActive: filters.isActive }),
      ...(filters.age && { ageFrom: { lte: filters.age }, ageTo: { gte: filters.age } }),
      ...(filters.gender && { gender: filters.gender }),
      ...(filters.sumInsured && { sumInsured: filters.sumInsured }),
      ...(filters.tenure && { tenure: filters.tenure }),
      ...(search && {
        OR: [
          { company: { code: { contains: search, mode: 'insensitive' } } },
          { plan: { code: { contains: search, mode: 'insensitive' } } }
        ]
      })
    };
    return prisma.premiumRate.count({ where });
  },

  update: async (id: string, data: UpdatePremiumRateDto) => {
    return prisma.premiumRate.update({
      where: { id },
      data
    });
  },

  softDelete: async (id: string) => {
    return prisma.premiumRate.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }
};
