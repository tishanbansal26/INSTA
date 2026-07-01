import { AppError } from "../../shared/errors/AppError";
import { comparePassword, hashPassword } from "../../shared/utils/password";
import { signAccessToken, signRefreshToken } from "../../shared/utils/jwt";
import { authRepository } from "./auth.repository";
import type { AuthTokens, LoginInput, RegisterInput } from "./auth.types";

const handleDatabaseError = (error: unknown) => {
  if (error instanceof AppError) {
    throw error;
  }

  throw new AppError("Database unavailable", 503);
};

const getRefreshExpiry = () => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);
  return expiresAt;
};

export const authService = {
  register: async (input: RegisterInput): Promise<AuthTokens> => {
    try {
      const existingUser = await authRepository.findByEmail(input.email);
      if (existingUser) {
        throw new AppError("Email already registered", 409);
      }

      const hashedPassword = await hashPassword(input.password);
      const user = await authRepository.createUser({
        name: input.name,
        email: input.email,
        password: hashedPassword,
        phone: input.phone,
        role: input.role ?? "AGENT",
      });

      const accessToken = signAccessToken({ id: user.id, role: user.role });
      const refreshToken = signRefreshToken({ id: user.id, role: user.role });

      await authRepository.createRefreshToken(user.id, refreshToken, getRefreshExpiry());

      return { accessToken, refreshToken };
    } catch (error) {
      handleDatabaseError(error);
      throw error;
    }
  },

  login: async (input: LoginInput): Promise<AuthTokens> => {
    try {
      const user = await authRepository.findByEmail(input.email);
      if (!user) {
        throw new AppError("Invalid credentials", 401);
      }

      const isPasswordValid = await comparePassword(input.password, user.password);
      if (!isPasswordValid) {
        throw new AppError("Invalid credentials", 401);
      }

      const accessToken = signAccessToken({ id: user.id, role: user.role });
      const refreshToken = signRefreshToken({ id: user.id, role: user.role });

      await authRepository.updateLastLogin(user.id);
      await authRepository.createRefreshToken(user.id, refreshToken, getRefreshExpiry());

      return { accessToken, refreshToken };
    } catch (error) {
      handleDatabaseError(error);
      throw error;
    }
  },

  refresh: async (refreshToken: string): Promise<AuthTokens> => {
    try {
      const storedToken = await authRepository.findRefreshToken(refreshToken);
      if (!storedToken) {
        throw new AppError("Invalid refresh token", 401);
      }

      if (storedToken.expiresAt < new Date()) {
        await authRepository.deleteRefreshToken(refreshToken);
        throw new AppError("Refresh token expired", 401);
      }

      const user = await authRepository.findById(storedToken.userId);
      if (!user) {
        throw new AppError("Invalid refresh token", 401);
      }

      const accessToken = signAccessToken({ id: storedToken.userId, role: user.role });
      const newRefreshToken = signRefreshToken({ id: storedToken.userId, role: user.role });

      await authRepository.createRefreshToken(storedToken.userId, newRefreshToken, getRefreshExpiry());
      await authRepository.deleteRefreshToken(refreshToken);

      return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      handleDatabaseError(error);
      throw error;
    }
  },

  logout: async (refreshToken: string) => {
    try {
      await authRepository.deleteRefreshToken(refreshToken);
    } catch (error) {
      handleDatabaseError(error);
      throw error;
    }
  },
};
