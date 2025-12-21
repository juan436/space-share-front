import { User, CreateUserInput } from "../entities/User";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export interface AuthRepository {
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  register(input: CreateUserInput): Promise<AuthResponse>;
  logout(): Promise<void>;
  refreshSession(refreshToken: string): Promise<AuthTokens>;
  getCurrentUser(): Promise<User | null>;
}
