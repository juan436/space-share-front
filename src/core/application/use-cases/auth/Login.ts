import { AuthRepository, LoginCredentials } from "@/core/domain/ports/AuthRepository";
import { User } from "@/core/domain/entities/User";
import { AuthenticationError } from "@/core/domain/errors";

export class LoginUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await this.authRepository.login(credentials);
      return response.user;
    } catch (error) {
      throw new AuthenticationError("Invalid email or password");
    }
  }
}
