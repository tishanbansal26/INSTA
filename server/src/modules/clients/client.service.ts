import { AppError } from "../../shared/errors/AppError";
import { clientRepository } from "./client.repository";
import type { ClientCreateInput, ClientListQuery, ClientUpdateInput } from "./client.types";

export const clientService = {
  create: async (input: ClientCreateInput, createdById: string) => {
    return clientRepository.create(input, createdById);
  },

  list: async (query: ClientListQuery) => {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 20);
    const skip = (page - 1) * limit;
    const search = query.search || "";
    const isActive = query.isActive === undefined ? undefined : query.isActive === "true";

    const [clients, total] = await Promise.all([
      clientRepository.findMany({ page, limit, search, isActive, skip, take: limit }),
      clientRepository.count({ search, isActive }),
    ]);

    return {
      data: clients,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  getById: async (id: string) => {
    const client = await clientRepository.findById(id);
    if (!client) {
      throw new AppError("Client not found", 404);
    }
    return client;
  },

  update: async (id: string, input: ClientUpdateInput) => {
    const existing = await clientRepository.findById(id);
    if (!existing) {
      throw new AppError("Client not found", 404);
    }

    return clientRepository.update(id, input);
  },

  remove: async (id: string) => {
    const existing = await clientRepository.findById(id);
    if (!existing) {
      throw new AppError("Client not found", 404);
    }

    return clientRepository.softDelete(id);
  },
};
