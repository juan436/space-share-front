export type UserRole = "client" | "host" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
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

export interface UpdateUserInput {
  name?: string;
  phone?: string;
  avatar?: string;
}
