import { Reservation, CreateReservationInput, ReservationStatus, EvidenceStage } from "../entities/Reservation";

export interface ReservationRepository {
  findByClientId(): Promise<Reservation[]>;
  findByHostId(): Promise<Reservation[]>;
  create(input: CreateReservationInput): Promise<Reservation>;
  updateStatus(id: string, status: ReservationStatus): Promise<Reservation>;
  submitSiteEvidence(id: string, stage: EvidenceStage, photos: File[], note: string): Promise<Reservation>;
}
