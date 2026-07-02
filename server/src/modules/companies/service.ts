import { AppError } from "../../shared/errors/AppError";
import { companyRepository } from "./repository";
import type { CreateCompanyDto, UpdateCompanyDto } from "./dto";

export const companyService = {
  create: async (input: CreateCompanyDto) => {
    return companyRepository.create(input);
  },

  list: async (query: any) => {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 20);
    const skip = (page - 1) * limit;
    const search = query.search || "";
    const isActive = query.isActive === undefined ? undefined : query.isActive === "true";

    const [items, total] = await Promise.all([
      companyRepository.findMany({ page, limit, search, isActive, skip, take: limit }),
      companyRepository.count({ search, isActive }),
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
    const company = await companyRepository.findById(id);
    if (!company) {
      throw new AppError("Company not found", 404);
    }
    return company;
  },

  update: async (id: string, input: UpdateCompanyDto) => {
    const existing = await companyRepository.findById(id);
    if (!existing) {
      throw new AppError("Company not found", 404);
    }

    return companyRepository.update(id, input);
  },

  remove: async (id: string) => {
    const existing = await companyRepository.findById(id);
    if (!existing) {
      throw new AppError("Company not found", 404);
    }

    return companyRepository.softDelete(id);
  },
};
