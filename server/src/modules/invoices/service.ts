import { AppError } from '../../shared/errors/AppError';
import prisma from '../../config/prisma';

export const invoicesService = {
  list: async (query: any) => {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 20);
    const skip = (page - 1) * limit;
    
    const [items, total] = await Promise.all([
      prisma.invoice.findMany({ skip, take: limit }),
      prisma.invoice.count()
    ]);
    return { items, page, limit, total, totalPages: Math.ceil(total/limit) };
  },
  getById: async (id: string) => {
    const item = await prisma.invoice.findUnique({ where: { id } });
    if (!item) throw new AppError('Not found', 404);
    return item;
  },
  update: async (id: string, data: any) => {
    return prisma.invoice.update({ where: { id }, data });
  },
  remove: async (id: string) => {
    return prisma.invoice.delete({ where: { id } });
  }
};
