import { AdminRepository } from "@/core/domain/ports/AdminRepository";
import { AdminStats } from "@/core/domain/entities/AdminStats";

export class GetAdminStatsUseCase {
  constructor(private readonly adminRepository: AdminRepository) {}

  async execute(): Promise<AdminStats> {
    return this.adminRepository.getStats();
  }
}
