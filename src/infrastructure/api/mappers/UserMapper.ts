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
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    };
  }

  static toDto(user: User): UserDto {
    return {
      _id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
      phone: user.phone,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }
}
