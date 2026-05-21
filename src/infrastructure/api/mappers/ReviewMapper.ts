import { Review } from "@/core/domain/entities/Review";
import { ReviewDto } from "@/infrastructure/api/dtos/review";

export class ReviewMapper {
  static toDomain(dto: ReviewDto): Review {
    const client =
      typeof dto.clientId === "object"
        ? { name: dto.clientId.name, email: dto.clientId.email, avatar: dto.clientId.avatar }
        : undefined;

    return {
      id: dto._id,
      spaceId: dto.spaceId,
      clientId: typeof dto.clientId === "object" ? dto.clientId._id : dto.clientId,
      reservationId: dto.reservationId,
      rating: dto.rating,
      comment: dto.comment,
      client,
      createdAt: new Date(dto.createdAt),
    };
  }
}
