import { Reservation, CreateReservationInput, ReservationStatus } from "@/core/domain/entities/Reservation";

export interface ReservationsService {
  getClientReservations(): Promise<Reservation[]>;
  getHostReservations(): Promise<Reservation[]>;
  createReservation(input: CreateReservationInput): Promise<Reservation>;
  updateReservationStatus(id: string, status: ReservationStatus): Promise<Reservation>;
}
