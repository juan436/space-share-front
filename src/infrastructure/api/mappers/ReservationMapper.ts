import { Reservation, CreateReservationInput } from "@/core/domain/entities/Reservation";
import { ReservationDto, CreateReservationRequestDto } from "../dtos/reservation";

const UPLOADS_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:3006";

function resolveImageUrl(filename: string): string {
  if (filename.startsWith("http")) return filename;
  return `${UPLOADS_BASE_URL}/uploads/${filename}`;
}

export class ReservationMapper {
  static toDomain(dto: ReservationDto): Reservation {
    const space = typeof dto.spaceId === "object" ? {
      title: dto.spaceId.title,
      images: (dto.spaceId.images || []).map(resolveImageUrl),
      type: dto.spaceId.type,
      location: dto.spaceId.location,
      pricePerMonth: dto.spaceId.pricePerMonth,
    } : undefined;

    const client = typeof dto.clientId === "object" ? {
      name: dto.clientId.name,
      email: dto.clientId.email,
      avatar: dto.clientId.avatar,
    } : undefined;

    const host = typeof dto.hostId === "object" ? {
      name: dto.hostId.name,
      email: dto.hostId.email,
      avatar: dto.hostId.avatar,
    } : undefined;

    return {
      id: dto._id,
      spaceId: typeof dto.spaceId === "object" ? dto.spaceId._id : dto.spaceId,
      clientId: typeof dto.clientId === "object" ? dto.clientId._id : dto.clientId,
      hostId: typeof dto.hostId === "object" ? dto.hostId._id : dto.hostId,
      startDate: new Date(dto.startDate),
      endDate: new Date(dto.endDate),
      basePrice: dto.basePrice,
      serviceFee: dto.serviceFee,
      totalPrice: dto.totalPrice,
      status: dto.status as Reservation["status"],
      notes: dto.notes,
      space,
      client,
      host,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    };
  }

  static toCreateDto(input: CreateReservationInput): CreateReservationRequestDto {
    return {
      spaceId: input.spaceId,
      startDate: input.startDate,
      endDate: input.endDate,
      basePrice: input.basePrice,
      serviceFee: input.serviceFee,
      totalPrice: input.totalPrice,
      notes: input.notes,
    };
  }
}
