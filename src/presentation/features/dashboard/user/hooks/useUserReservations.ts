import { useState, useEffect } from "react";
import { Reservation } from "@/core/domain/entities/Reservation";
import { reservationRepository, reviewRepository } from "@/bootstrap/application";

export function useUserReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewedIds, setReviewedIds] = useState<Set<string>>(new Set());
  const [simulatingPaymentId, setSimulatingPaymentId] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await reservationRepository.findByClientId();
        setReservations(data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  const submitReview = async (reservationId: string, rating: number, comment: string): Promise<void> => {
    await reviewRepository.create({ reservationId, rating, comment, spaceId: "" });
    setReviewedIds((prev) => new Set(prev).add(reservationId));
  };

  const simulatePayment = async (reservationId: string): Promise<void> => {
    setSimulatingPaymentId(reservationId);
    try {
      await reservationRepository.updateStatus(reservationId, "confirmed");
      const data = await reservationRepository.findByClientId();
      setReservations(data);
    } catch (error) {
      console.error("Error simulando el pago:", error);
    } finally {
      setSimulatingPaymentId(null);
    }
  };

  return { reservations, isLoading, reviewedIds, simulatingPaymentId, submitReview, simulatePayment };
}
