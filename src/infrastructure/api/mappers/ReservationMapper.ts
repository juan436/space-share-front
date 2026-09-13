import { Reservation, CreateReservationInput, SiteEvidence } from "@/core/domain/entities/Reservation";
import { ReservationDto, CreateReservationRequestDto, SiteEvidenceDto, SiteEvidenceEntryDto } from "../dtos/reservation";
import { resolveImageUrl } from "@/infrastructure/utils/imageUrl";

function evidenceEntryToDomain(dto?: SiteEvidenceEntryDto) {
  if (!dto) return undefined;
  return {
    photos: (dto.photos || []).map(resolveImageUrl),
    note: dto.note,
    submittedBy: dto.submittedBy,
    submittedAt: new Date(dto.submittedAt),
  };
}

function siteEvidenceToDomain(dto?: SiteEvidenceDto): SiteEvidence | undefined {
  if (!dto) return undefined;
  return {
    checkIn: evidenceEntryToDomain(dto.checkIn),
    checkOut: evidenceEntryToDomain(dto.checkOut),
  };
}

export class ReservationMapper {
  static toDomain(dto: ReservationDto): Reservation {
    const space = dto.spaceId !== null && typeof dto.spaceId === "object" ? {
      title: dto.spaceId.title,
      images: (dto.spaceId.images || []).map(resolveImageUrl),
      type: dto.spaceId.type,
      location: dto.spaceId.location,
      pricePerMonth: dto.spaceId.pricePerMonth,
    } : undefined;

    const client = dto.clientId !== null && typeof dto.clientId === "object" ? {
      name: dto.clientId.name,
      email: dto.clientId.email,
      avatar: dto.clientId.avatar,
    } : undefined;

    const host = dto.hostId !== null && typeof dto.hostId === "object" ? {
      name: dto.hostId.name,
      email: dto.hostId.email,
      avatar: dto.hostId.avatar,
    } : undefined;

    return {
      id: dto._id,
      spaceId: dto.spaceId !== null && typeof dto.spaceId === "object" ? dto.spaceId._id : dto.spaceId as string,
      clientId: dto.clientId !== null && typeof dto.clientId === "object" ? dto.clientId._id : dto.clientId as string,
      hostId: dto.hostId !== null && typeof dto.hostId === "object" ? dto.hostId._id : dto.hostId as string,
      startDate: new Date(dto.startDate),
      endDate: new Date(dto.endDate),
      basePrice: dto.basePrice,
      serviceFee: dto.serviceFee,
      totalPrice: dto.totalPrice,
      status: dto.status as Reservation["status"],
      notes: dto.notes,
      quantity: dto.quantity ?? 1,
      eventCode: dto.eventCode,
      siteEvidence: siteEvidenceToDomain(dto.siteEvidence),
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
      quantity: input.quantity,
    };
  }
}
