import { ReservationRepository } from "@/core/domain/ports/ReservationRepository";
import { Reservation, CreateReservationInput, ReservationStatus, EvidenceStage } from "@/core/domain/entities/Reservation";
import { HttpClient } from "@/infrastructure/http/HttpClient";
import { ReservationDto } from "@/infrastructure/api/dtos/reservation";
import { ReservationMapper } from "@/infrastructure/api/mappers/ReservationMapper";

export class ApiReservationRepository implements ReservationRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async findByClientId(): Promise<Reservation[]> {
    const response = await this.httpClient.get<ReservationDto[]>("/reservations/client");
    return response.data.map(ReservationMapper.toDomain);
  }

  async findByHostId(): Promise<Reservation[]> {
    const response = await this.httpClient.get<ReservationDto[]>("/reservations/host");
    return response.data.map(ReservationMapper.toDomain);
  }

  async create(input: CreateReservationInput): Promise<Reservation> {
    const dto = ReservationMapper.toCreateDto(input);
    const response = await this.httpClient.post<ReservationDto>("/reservations", dto);
    return ReservationMapper.toDomain(response.data);
  }

  async updateStatus(id: string, status: ReservationStatus): Promise<Reservation> {
    const response = await this.httpClient.patch<ReservationDto>(`/reservations/${id}/status`, { status });
    return ReservationMapper.toDomain(response.data);
  }

  async submitSiteEvidence(id: string, stage: EvidenceStage, photos: File[], note: string): Promise<Reservation> {
    const formData = new FormData();
    photos.forEach((file) => formData.append("photos", file));
    formData.append("note", note);
    const response = await this.httpClient.postFormData<ReservationDto>(`/reservations/${id}/evidence/${stage}`, formData);
    return ReservationMapper.toDomain(response.data);
  }
}
