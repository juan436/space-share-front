export type UserRole = "client" | "host" | "admin";

export type KycStatus = "none" | "pending" | "approved" | "rejected";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  kycStatus: KycStatus;
  kycRejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  phone?: string;
}
