import { ReservationRepository } from "@/core/domain/ports/ReservationRepository";
import { Reservation } from "@/core/domain/entities/Reservation";

export class GetHostReservationsUseCase {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async execute(): Promise<Reservation[]> {
    return this.reservationRepository.findByHostId();
  }
}
