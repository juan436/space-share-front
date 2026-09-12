import { AuthRepository } from "@/core/domain/ports/AuthRepository";
import { User } from "@/core/domain/entities/User";

export class SubmitKycUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(dui: File, selfie: File): Promise<User> {
    return this.authRepository.submitKyc(dui, selfie);
  }
}
