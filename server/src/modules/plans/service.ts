import { AppError } from "../../shared/errors/AppError";
import { planRepository } from "./repository";
import type { CreatePlanDto, UpdatePlanDto } from "./dto";

export const planService = {
  create: async (input: CreatePlanDto) => {
    return planRepository.create(input);
  },

  list: async (query: any) => {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 20);
    const skip = (page - 1) * limit;
    const search = query.search || "";
    const isActive = query.isActive === undefined ? undefined : query.isActive === "true";
    const companyId = query.companyId as string | undefined;

    const [items, total] = await Promise.all([
      planRepository.findMany({ page, limit, search, isActive, companyId, skip, take: limit }),
      planRepository.count({ search, isActive, companyId }),
    ]);

    return {
      items,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  },

  getById: async (id: string) => {
    const plan = await planRepository.findById(id);
    if (!plan) {
      throw new AppError("Plan not found", 404);
    }
    return plan;
  },

  update: async (id: string, input: UpdatePlanDto) => {
    const existing = await planRepository.findById(id);
    if (!existing) {
      throw new AppError("Plan not found", 404);
    }

    return planRepository.update(id, input);
  },

  remove: async (id: string) => {
    const existing = await planRepository.findById(id);
    if (!existing) {
      throw new AppError("Plan not found", 404);
    }

    return planRepository.softDelete(id);
  },
};
