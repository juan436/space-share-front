import { AdminRepository } from "@/core/domain/ports/AdminRepository";
import { AdminSpace } from "@/core/domain/entities/AdminStats";

export class GetAdminSpacesUseCase {
  constructor(private readonly adminRepository: AdminRepository) {}

  async execute(): Promise<AdminSpace[]> {
    return this.adminRepository.getSpaces();
  }
}
