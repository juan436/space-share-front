import { User } from "@/core/domain/entities/User";
import { UserDto } from "../dtos/auth";

export class UserMapper {
  static toDomain(dto: UserDto): User {
    return {
      id: dto._id,
      email: dto.email,
      name: dto.name,
      role: dto.role,
      avatar: dto.avatar,
      phone: dto.phone,
      kycStatus: dto.kycStatus ?? "none",
      kycRejectionReason: dto.kycRejectionReason,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    };
  }
}
