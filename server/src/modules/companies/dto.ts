export interface CreateCompanyDto {
  code: string;
  description?: string;
  isActive?: boolean;
}

export interface UpdateCompanyDto extends Partial<CreateCompanyDto> {}
