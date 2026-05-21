import { AdminRepository } from "@/core/domain/ports/AdminRepository";
import { AdminAnalytics } from "@/core/domain/entities/AdminStats";

export class GetAdminAnalyticsUseCase {
  constructor(private readonly adminRepository: AdminRepository) {}

  async execute(): Promise<AdminAnalytics> {
    return this.adminRepository.getAnalytics();
  }
}
