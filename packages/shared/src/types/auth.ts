export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: "ADMIN" | "MANAGER" | "AGENT" | "ACCOUNTANT";
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "MANAGER" | "AGENT" | "ACCOUNTANT" | "CUSTOMER";
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}
