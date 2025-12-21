import { Space, CreateSpaceInput, UpdateSpaceInput } from "@/core/domain/entities/Space";
import { SpaceDto, CreateSpaceRequestDto, UpdateSpaceRequestDto } from "../dtos/space";

export class SpaceMapper {
  static toDomain(dto: SpaceDto): Space {
    return {
      id: dto._id,
      hostId: dto.hostId,
      title: dto.title,
      description: dto.description,
      type: dto.type,
      squareMeters: dto.squareMeters,
      pricePerMonth: dto.pricePerMonth,
      amenities: dto.amenities,
      location: dto.location,
      images: dto.images,
      status: dto.status,
      rating: dto.rating,
      reviewCount: dto.reviewCount,
      bookingsCount: dto.bookingsCount,
      occupancyRate: dto.occupancyRate,
      totalEarnings: dto.totalEarnings,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    };
  }

  static toCreateDto(input: CreateSpaceInput): CreateSpaceRequestDto {
    return {
      title: input.title,
      description: input.description,
      type: input.type,
      squareMeters: input.squareMeters,
      pricePerMonth: input.pricePerMonth,
      amenities: input.amenities,
      location: input.location,
      images: input.images,
    };
  }

  static toUpdateDto(input: UpdateSpaceInput): UpdateSpaceRequestDto {
    return {
      title: input.title,
      description: input.description,
      type: input.type,
      squareMeters: input.squareMeters,
      pricePerMonth: input.pricePerMonth,
      amenities: input.amenities,
      location: input.location,
      images: input.images,
      status: input.status,
    };
  }
}
