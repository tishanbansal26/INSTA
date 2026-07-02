import { AppError } from "../../shared/errors/AppError";
import { premiumRateRepository } from "./repository";
import type { CreatePremiumRateDto, UpdatePremiumRateDto } from "./dto";

export const premiumRateService = {
  create: async (input: CreatePremiumRateDto) => {
    return premiumRateRepository.create(input);
  },

  list: async (query: any) => {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 20);
    const skip = (page - 1) * limit;
    const search = query.search || "";
    
    const filters = {
      companyId: query.companyId,
      planId: query.planId,
      cityTier: query.cityTier,
      familyType: query.familyType,
      isActive: query.isActive !== undefined ? query.isActive === 'true' : undefined,
      age: query.age ? Number(query.age) : undefined,
      sumInsured: query.sumInsured ? Number(query.sumInsured) : undefined,
      tenure: query.tenure ? Number(query.tenure) : undefined,
      gender: query.gender,
    };

    const [items, total] = await Promise.all([
      premiumRateRepository.findMany({ skip, take: limit, search, filters }),
      premiumRateRepository.count({ search, filters })
    ]);

    return {
      items,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    };
  },

  getById: async (id: string) => {
    const rate = await premiumRateRepository.findById(id);
    if (!rate) {
      throw new AppError("Premium rate not found", 404);
    }
    return rate;
  },

  update: async (id: string, input: UpdatePremiumRateDto) => {
    const existing = await premiumRateRepository.findById(id);
    if (!existing) {
      throw new AppError("Premium rate not found", 404);
    }
    return premiumRateRepository.update(id, input);
  },

  remove: async (id: string) => {
    const existing = await premiumRateRepository.findById(id);
    if (!existing) {
      throw new AppError("Premium rate not found", 404);
    }
    return premiumRateRepository.softDelete(id);
  }
};
