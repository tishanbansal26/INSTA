import prisma from "../../config/prisma";

export const authRepository = {
  findByEmail: async (email: string) => {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  createUser: async (data: any) => {
    return prisma.user.create({ data });
  },

  findById: async (id: string) => {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  updateLastLogin: async (id: string) => {
    return prisma.user.update({
      where: { id },
      data: { lastLogin: new Date() },
    });
  },

  createRefreshToken: async (userId: string, token: string, expiresAt: Date) => {
    return prisma.refreshToken.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });
  },

  findRefreshToken: async (token: string) => {
    return prisma.refreshToken.findUnique({
      where: { token },
    });
  },

  deleteRefreshToken: async (token: string) => {
    return prisma.refreshToken.deleteMany({
      where: { token },
    });
  },

  deleteAllRefreshTokensForUser: async (userId: string) => {
    return prisma.refreshToken.deleteMany({
      where: { userId },
    });
  },
};
