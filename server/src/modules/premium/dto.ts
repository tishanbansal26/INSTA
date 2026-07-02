export interface CalculatePremiumDto {
  companyId: string;
  planId: string;
  age: number;
  gender?: "MALE" | "FEMALE" | "OTHER";
  cityTier?: string;
  familyType?: string;
  sumInsured: number;
  tenure: number;
}
