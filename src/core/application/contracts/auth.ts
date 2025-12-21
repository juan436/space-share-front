import { User, CreateUserInput, UserRole } from "@/core/domain/entities/User";

export interface AuthService {
  login(email: string, password: string): Promise<User>;
  register(input: CreateUserInput): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  isAuthenticated(): boolean;
}

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}
