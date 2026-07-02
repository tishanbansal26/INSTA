import jwt from "jsonwebtoken";

const accessSecret = process.env.JWT_SECRET || "dev-access-secret";
const refreshSecret = process.env.JWT_REFRESH_SECRET || "dev-refresh-secret";

export interface JwtPayload {
  id: string;
  role: string;
  iat?: number;
  exp?: number;
}

export const signAccessToken = (payload: Omit<JwtPayload, "iat" | "exp">) => {
  return jwt.sign(payload, accessSecret, { expiresIn: "15m" });
};

export const signRefreshToken = (payload: Omit<JwtPayload, "iat" | "exp">) => {
  return jwt.sign(payload, refreshSecret, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, accessSecret) as JwtPayload;
  } catch {
    return jwt.verify(token, refreshSecret) as JwtPayload;
  }
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, refreshSecret) as JwtPayload;
};
