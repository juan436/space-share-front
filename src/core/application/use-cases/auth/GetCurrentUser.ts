import { AuthRepository } from "@/core/domain/ports/AuthRepository";
import { User } from "@/core/domain/entities/User";

export class GetCurrentUserUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(): Promise<User | null> {
    return this.authRepository.getCurrentUser();
  }
}
