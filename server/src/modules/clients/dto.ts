export interface CreateClientDto {
  firstName: string;
  middleName?: string;
  lastName: string;
  email?: string;
  phone: string;
  dob?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
  maritalStatus?: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED";
  pan?: string;
  aadhaar?: string;
  occupation?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  pincode?: string;
  notes?: string;
}

export interface UpdateClientDto extends Partial<CreateClientDto> {}
