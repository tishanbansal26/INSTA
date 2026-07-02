import { AppError } from "../../shared/errors/AppError";
import prisma from "../../config/prisma";
import { policyRepository } from "./repository";
import type { CreatePolicyDto, UpdatePolicyDto } from "./dto";

const ensurePositiveNumber = (value: number, field: string) => {
  if (!Number.isFinite(value) || value <= 0) {
    throw new AppError(`${field} must be greater than 0`, 400);
  }
};

export const policyService = {
  generatePolicyNumber: async (companyCode: string, year: number, sequence: number) => {
    const padded = String(sequence + 1).padStart(6, "0");
    return `${companyCode.toUpperCase()}-${year}-${padded}`;
  },

  create: async (input: CreatePolicyDto, createdById?: string) => {
    ensurePositiveNumber(input.sumInsured, "Sum insured");
    ensurePositiveNumber(input.premiumAmount, "Premium amount");
    ensurePositiveNumber(input.gstAmount, "GST amount");

    const [client, company, plan, agent] = await Promise.all([
      prisma.client.findFirst({ where: { id: input.clientId, deletedAt: null } }),
      prisma.company.findFirst({ where: { id: input.companyId, deletedAt: null } }),
      prisma.plan.findFirst({ where: { id: input.planId, deletedAt: null } }),
      prisma.user.findFirst({ where: { id: input.agentId, deletedAt: null } }),
    ]);

    if (!client) {
      throw new AppError("Client not found", 404);
    }

    if (!company) {
      throw new AppError("Company not found", 404);
    }

    if (!plan) {
      throw new AppError("Plan not found", 404);
    }

    if (!agent) {
      throw new AppError("Agent not found", 404);
    }

    if (plan.companyId !== company.id) {
      throw new AppError("Selected plan does not belong to the selected company", 400);
    }

    const startDate = new Date(input.startDate);
    const expiryDate = new Date(input.expiryDate);
    if (Number.isNaN(startDate.getTime()) || Number.isNaN(expiryDate.getTime()) || expiryDate <= startDate) {
      throw new AppError("Expiry date must be after start date", 400);
    }

    const year = new Date(input.issueDate).getFullYear() || new Date().getFullYear();
    const sequence = await prisma.policy.count({ where: { createdAt: { gte: new Date(`${year}-01-01T00:00:00.000Z`) } } });
    const policyNumber = await policyService.generatePolicyNumber(company.code, year, sequence);

    return policyRepository.create({
      policyNumber,
      clientId: input.clientId,
      companyId: input.companyId,
      planId: input.planId,
      agentId: input.agentId,
      sumInsured: input.sumInsured,
      premiumAmount: input.premiumAmount,
      gstAmount: input.gstAmount,
      issueDate: new Date(input.issueDate),
      startDate,
      expiryDate,
      status: input.status ?? "PENDING",
      paymentStatus: input.paymentStatus ?? "PENDING",
      remarks: input.remarks,
      createdById: createdById ?? input.agentId,
    });
  },

  list: async (query: any) => {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 20);
    const skip = (page - 1) * limit;
    const search = query.search || "";
    const status = query.status as string | undefined;
    const companyId = query.companyId as string | undefined;
    const clientId = query.clientId as string | undefined;

    const [items, total] = await Promise.all([
      policyRepository.findMany({ page, limit, search, status, companyId, clientId, skip, take: limit }),
      policyRepository.count({ search, status, companyId, clientId }),
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
    const policy = await policyRepository.findById(id);
    if (!policy) {
      throw new AppError("Policy not found", 404);
    }
    return policy;
  },

  update: async (id: string, input: UpdatePolicyDto) => {
    const existing = await policyRepository.findById(id);
    if (!existing) {
      throw new AppError("Policy not found", 404);
    }

    if (input.sumInsured !== undefined) ensurePositiveNumber(input.sumInsured, "Sum insured");
    if (input.premiumAmount !== undefined) ensurePositiveNumber(input.premiumAmount, "Premium amount");
    if (input.gstAmount !== undefined) ensurePositiveNumber(input.gstAmount, "GST amount");

    if (input.startDate && input.expiryDate) {
      const startDate = new Date(input.startDate);
      const expiryDate = new Date(input.expiryDate);
      if (expiryDate <= startDate) {
        throw new AppError("Expiry date must be after start date", 400);
      }
    }

    return policyRepository.update(id, input);
  },

  remove: async (id: string) => {
    const existing = await policyRepository.findById(id);
    if (!existing) {
      throw new AppError("Policy not found", 404);
    }

    return policyRepository.softDelete(id);
  },

  byClient: async (clientId: string) => {
    return policyRepository.findByClientId(clientId);
  },

  expiring: async () => {
    return policyRepository.findExpiring();
  },

  search: async (query: string) => {
    if (!query) {
      return [];
    }
    return policyRepository.search(query);
  },
};
