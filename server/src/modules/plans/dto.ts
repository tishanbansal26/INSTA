export interface CreatePlanDto {
  name: string;
  code: string;
  category?: string;
  description?: string;
  companyId: string;
  isActive?: boolean;
}

export interface UpdatePlanDto extends Partial<CreatePlanDto> {}
