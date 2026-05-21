import { ReservationRepository } from "@/core/domain/ports/ReservationRepository";
import { Reservation, CreateReservationInput } from "@/core/domain/entities/Reservation";

export class CreateReservationUseCase {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async execute(input: CreateReservationInput): Promise<Reservation> {
    return this.reservationRepository.create(input);
  }
}
