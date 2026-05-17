import { Space, CreateSpaceInput, UpdateSpaceInput } from "@/core/domain/entities/Space";
import { SpaceDto, CreateSpaceRequestDto, UpdateSpaceRequestDto } from "../dtos/space";
import { resolveImageUrl } from "@/presentation/utils/image";

export class SpaceMapper {
  static toDomain(dto: SpaceDto): Space {
    return {
      id: dto._id,
      hostId: typeof dto.hostId === "object" ? dto.hostId._id : dto.hostId,
      title: dto.title,
      description: dto.description,
      type: dto.type,
      squareMeters: dto.squareMeters,
      pricePerMonth: dto.pricePerMonth,
      amenities: dto.amenities,
      location: dto.location,
      images: (dto.images || []).map(resolveImageUrl),
      status: dto.status,
      rating: dto.rating,
      reviewCount: dto.reviewCount,
      bookingsCount: dto.bookingsCount,
      occupancyRate: dto.occupancyRate,
      totalEarnings: dto.totalEarnings,
      capacity: dto.capacity ?? 1,
      occupancyMap: dto.occupancyMap,
      category: dto.category,
      businessSpaceType: dto.businessSpaceType,
      pricePerHour: dto.pricePerHour,
      availableFrom: dto.availableFrom,
      availableTo: dto.availableTo,
      usageConditions: dto.usageConditions,
      services: dto.services,
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
      capacity: input.capacity,
      amenities: input.amenities,
      location: input.location,
      images: input.images,
      category: input.category,
      businessSpaceType: input.businessSpaceType,
      pricePerHour: input.pricePerHour,
      availableFrom: input.availableFrom,
      availableTo: input.availableTo,
      usageConditions: input.usageConditions,
      services: input.services,
    };
  }

  static toUpdateDto(input: UpdateSpaceInput): UpdateSpaceRequestDto {
    return {
      title: input.title,
      description: input.description,
      type: input.type,
      squareMeters: input.squareMeters,
      pricePerMonth: input.pricePerMonth,
      capacity: input.capacity,
      amenities: input.amenities,
      location: input.location,
      images: input.images,
      status: input.status,
      category: input.category,
      businessSpaceType: input.businessSpaceType,
      pricePerHour: input.pricePerHour,
      availableFrom: input.availableFrom,
      availableTo: input.availableTo,
      usageConditions: input.usageConditions,
      services: input.services,
    };
  }
}
