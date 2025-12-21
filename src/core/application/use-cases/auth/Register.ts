import { AuthRepository } from "@/core/domain/ports/AuthRepository";
import { User, CreateUserInput } from "@/core/domain/entities/User";
import { ValidationError } from "@/core/domain/errors";

export class RegisterUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(input: CreateUserInput): Promise<User> {
    if (!input.email || !input.password || !input.name) {
      throw new ValidationError("Email, password and name are required");
    }

    if (input.password.length < 6) {
      throw new ValidationError("Password must be at least 6 characters");
    }

    const response = await this.authRepository.register(input);
    return response.user;
  }
}
