import { ReservationRepository } from "@/core/domain/ports/ReservationRepository";
import { Reservation, ReservationStatus } from "@/core/domain/entities/Reservation";

export class UpdateReservationStatusUseCase {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async execute(id: string, status: ReservationStatus): Promise<Reservation> {
    return this.reservationRepository.updateStatus(id, status);
  }
}
