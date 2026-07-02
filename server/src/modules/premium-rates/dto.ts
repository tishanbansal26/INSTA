export interface CreatePremiumRateDto {
  companyId: string;
  planId: string;
  ageFrom: number;
  ageTo: number;
  gender?: "MALE" | "FEMALE" | "OTHER";
  cityTier?: string;
  familyType?: string;
  sumInsured: number;
  tenure: number;
  premium: number;
  gst: number;
  isActive?: boolean;
}

export type UpdatePremiumRateDto = Partial<CreatePremiumRateDto>;
