import { Reservation, CreateReservationInput, ReservationStatus } from "../entities/Reservation";
import { PaginatedResult } from "./SpaceRepository";

export interface ReservationFilters {
  clientId?: string;
  hostId?: string;
  spaceId?: string;
  status?: ReservationStatus;
  startDate?: Date;
  endDate?: Date;
}

export interface ReservationRepository {
  findAll(filters?: ReservationFilters, page?: number, limit?: number): Promise<PaginatedResult<Reservation>>;
  findById(id: string): Promise<Reservation | null>;
  findByClientId(clientId: string): Promise<Reservation[]>;
  findByHostId(hostId: string): Promise<Reservation[]>;
  create(input: CreateReservationInput): Promise<Reservation>;
  updateStatus(id: string, status: ReservationStatus): Promise<Reservation>;
  cancel(id: string): Promise<void>;
}
