import { Prisma } from "@prisma/client";

export type PremiumRateFilter = {
  companyId?: string;
  planId?: string;
  age?: number;
  gender?: "MALE" | "FEMALE" | "OTHER";
  sumInsured?: number;
  tenure?: number;
  cityTier?: string;
  familyType?: string;
  isActive?: boolean;
};
