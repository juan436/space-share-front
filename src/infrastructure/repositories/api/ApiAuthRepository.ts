import { AuthRepository, LoginCredentials, AuthResponse, AuthTokens } from "@/core/domain/ports/AuthRepository";
import { User, CreateUserInput } from "@/core/domain/entities/User";
import { HttpClient } from "@/infrastructure/http/HttpClient";
import { AuthResponseDto, LoginRequestDto, RegisterRequestDto, UserDto } from "@/infrastructure/api/dtos/auth";
import { UserMapper } from "@/infrastructure/api/mappers/UserMapper";
import { TokenStorage } from "@/infrastructure/services/TokenStorage";

const USER_KEY = "spaceshare_user";

export class ApiAuthRepository implements AuthRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const requestDto: LoginRequestDto = {
      email: credentials.email,
      password: credentials.password,
    };

    const response = await this.httpClient.post<AuthResponseDto>("/auth/login", requestDto);
    const user = UserMapper.toDomain(response.data.user);
    const tokens: AuthTokens = {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
    };

    TokenStorage.save(tokens);
    this.saveUser(user);
    this.httpClient.setAuthToken(tokens.accessToken);

    return { user, tokens };
  }

  async register(input: CreateUserInput): Promise<AuthResponse> {
    const requestDto: RegisterRequestDto = {
      email: input.email,
      password: input.password,
      name: input.name,
      role: input.role as "client" | "host",
      phone: input.phone,
    };

    const response = await this.httpClient.post<AuthResponseDto>("/auth/register", requestDto);
    const user = UserMapper.toDomain(response.data.user);
    const tokens: AuthTokens = {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
    };

    TokenStorage.save(tokens);
    this.saveUser(user);
    this.httpClient.setAuthToken(tokens.accessToken);

    return { user, tokens };
  }

  async logout(): Promise<void> {
    try {
      await this.httpClient.post("/auth/logout");
    } catch (error) {
      // Ignore 401 errors on logout - user is already unauthenticated
      console.warn("Logout request failed, clearing local session anyway");
    } finally {
      this.clearStorage();
      this.httpClient.removeAuthToken();
    }
  }

  async refreshSession(refreshToken: string): Promise<AuthTokens> {
    const response = await this.httpClient.post<{ accessToken: string; refreshToken: string }>(
      "/auth/refresh",
      { refreshToken }
    );

    const tokens: AuthTokens = {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
    };

    TokenStorage.save(tokens);
    this.httpClient.setAuthToken(tokens.accessToken);

    return tokens;
  }

  async getCurrentUser(): Promise<User | null> {
    const savedUser = this.getSavedUser();
    if (savedUser) {
      return savedUser;
    }

    const tokens = TokenStorage.get();
    if (!tokens) {
      return null;
    }

    try {
      this.httpClient.setAuthToken(tokens.accessToken);
      const response = await this.httpClient.get<{ user: UserDto }>("/auth/me");
      const user = UserMapper.toDomain(response.data.user);
      this.saveUser(user);
      return user;
    } catch {
      this.clearStorage();
      return null;
    }
  }

  private saveUser(user: User): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  private getSavedUser(): User | null {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem(USER_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return {
      ...parsed,
      createdAt: new Date(parsed.createdAt),
      updatedAt: new Date(parsed.updatedAt),
    };
  }

  private clearStorage(): void {
    TokenStorage.clear();
    if (typeof window !== "undefined") {
      localStorage.removeItem(USER_KEY);
    }
  }
}
