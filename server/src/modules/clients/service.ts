import { AppError } from "../../shared/errors/AppError";
import { clientRepository } from "./repository";
import type { CreateClientDto, UpdateClientDto } from "./dto";

/**
 * Business logic for client management.
 */
export const clientService = {
  /**
   * Create a new client.
   */
  create: async (input: CreateClientDto, createdById: string) => {
    return clientRepository.create(input, createdById);
  },

  /**
   * List clients with pagination and optional filtering.
   */
  list: async (query: any) => {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 20);
    const skip = (page - 1) * limit;
    const search = query.search || "";
    const isActive = query.isActive === undefined ? undefined : query.isActive === "true";

    const [items, total] = await Promise.all([
      clientRepository.findMany({ page, limit, search, isActive, skip, take: limit }),
      clientRepository.count({ search, isActive }),
    ]);

    return {
      items,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  },

  /**
   * Search clients by name, phone, email, PAN, or Aadhaar.
   */
  search: async (query: string) => {
    if (!query) {
      return [];
    }

    return clientRepository.search(query);
  },

  /**
   * Fetch a single client by ID.
   */
  getById: async (id: string) => {
    const client = await clientRepository.findById(id);
    if (!client) {
      throw new AppError("Client not found", 404);
    }
    return client;
  },

  /**
   * Update an existing client.
   */
  update: async (id: string, input: UpdateClientDto) => {
    const existing = await clientRepository.findById(id);
    if (!existing) {
      throw new AppError("Client not found", 404);
    }

    return clientRepository.update(id, input);
  },

  /**
   * Soft delete a client.
   */
  remove: async (id: string) => {
    const existing = await clientRepository.findById(id);
    if (!existing) {
      throw new AppError("Client not found", 404);
    }

    return clientRepository.softDelete(id);
  },
};
