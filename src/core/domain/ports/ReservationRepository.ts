import { Reservation, CreateReservationInput, ReservationStatus } from "../entities/Reservation";

export interface ReservationRepository {
  findByClientId(): Promise<Reservation[]>;
  findByHostId(): Promise<Reservation[]>;
  create(input: CreateReservationInput): Promise<Reservation>;
  updateStatus(id: string, status: ReservationStatus): Promise<Reservation>;
}
