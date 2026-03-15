import { Space, CreateSpaceInput, UpdateSpaceInput } from "@/core/domain/entities/Space";
import { SpaceDto, CreateSpaceRequestDto, UpdateSpaceRequestDto } from "../dtos/space";

const UPLOADS_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:3006";

function resolveImageUrl(filename: string): string {
  if (filename.startsWith("http")) return filename;
  return `${UPLOADS_BASE_URL}/uploads/${filename}`;
}

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
    };
  }
}
