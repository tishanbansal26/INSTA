export interface CreateQuotationDto {
  clientId: string;
  companyId: string;
  planId: string;
  premiumRateId?: string;
  age: number;
  sumInsured: number;
  tenure: number;
  gender?: "MALE" | "FEMALE" | "OTHER";
  validTill?: string;
  remarks?: string;
}

export interface UpdateQuotationDto extends Partial<CreateQuotationDto> {}
