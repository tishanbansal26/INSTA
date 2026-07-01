export interface ClientCreateInput {
  firstName: string;
  lastName?: string;
  email?: string;
  phone: string;
  dob?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
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

export interface ClientUpdateInput extends Partial<ClientCreateInput> {}

export interface ClientListQuery {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: string;
}
