import { AdminRepository } from "@/core/domain/ports/AdminRepository";
import { AdminUser } from "@/core/domain/entities/AdminStats";

export class GetAdminUsersUseCase {
  constructor(private readonly adminRepository: AdminRepository) {}

  async execute(): Promise<AdminUser[]> {
    return this.adminRepository.getUsers();
  }
}
