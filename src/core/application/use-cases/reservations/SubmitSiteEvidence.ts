import { ReservationRepository } from "@/core/domain/ports/ReservationRepository";
import { Reservation, EvidenceStage } from "@/core/domain/entities/Reservation";

export class SubmitSiteEvidenceUseCase {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async execute(id: string, stage: EvidenceStage, photos: File[], note: string): Promise<Reservation> {
    return this.reservationRepository.submitSiteEvidence(id, stage, photos, note);
  }
}
