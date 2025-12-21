import { AuthRepository } from "@/core/domain/ports/AuthRepository";

export class LogoutUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(): Promise<void> {
    await this.authRepository.logout();
  }
}
