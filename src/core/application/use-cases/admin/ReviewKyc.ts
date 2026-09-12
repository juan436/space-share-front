import { AdminRepository } from "@/core/domain/ports/AdminRepository";
import { AdminUser } from "@/core/domain/entities/AdminStats";

export class ReviewKycUseCase {
  constructor(private readonly adminRepository: AdminRepository) {}

  async execute(userId: string, approve: boolean, rejectionReason?: string): Promise<AdminUser> {
    return this.adminRepository.reviewKyc(userId, approve, rejectionReason);
  }
}
