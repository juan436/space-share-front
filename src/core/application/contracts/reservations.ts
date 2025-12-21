import { Reservation, CreateReservationInput, ReservationStatus } from "@/core/domain/entities/Reservation";
import { ReservationFilters } from "@/core/domain/ports/ReservationRepository";
import { PaginatedResult } from "@/core/domain/ports/SpaceRepository";

export interface ReservationsService {
  listReservations(filters?: ReservationFilters, page?: number, limit?: number): Promise<PaginatedResult<Reservation>>;
  getReservationById(id: string): Promise<Reservation | null>;
  getClientReservations(clientId: string): Promise<Reservation[]>;
  getHostReservations(hostId: string): Promise<Reservation[]>;
  createReservation(input: CreateReservationInput): Promise<Reservation>;
  updateReservationStatus(id: string, status: ReservationStatus): Promise<Reservation>;
  cancelReservation(id: string): Promise<void>;
}
