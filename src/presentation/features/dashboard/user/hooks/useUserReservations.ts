/**
 * useUserReservations
 *
 * Qué hace: Fetch y mutaciones de reservaciones del usuario via React Query.
 * Recibe:   nada — usa el userId del contexto de auth
 * Genera:   reservations[], isLoading, isError, errorMessage, submitReview, simulatePayment, reviewedIds, simulatingPaymentId
 * Procesa:  cache con staleTime 30s; invalidación automática tras simulatePayment; spaceId extraído de la reservación al crear review
 */
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRepositories } from "@/presentation/providers/repositories-context";
import { toErrorMessage } from "@/presentation/utils/error";

const QUERY_KEY = ["reservations", "user"] as const;

export function useUserReservations() {
  const { reservationRepository, reviewRepository } = useRepositories();
  const queryClient = useQueryClient();
  const [reviewedIds, setReviewedIds] = useState<Set<string>>(new Set());

  const query = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => reservationRepository.findByClientId(),
    staleTime: 30_000,
  });

  const reservations = query.data ?? [];

  const payMutation = useMutation({
    mutationFn: (reservationId: string) =>
      reservationRepository.updateStatus(reservationId, "confirmed"),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });

  const submitReview = async (reservationId: string, rating: number, comment: string): Promise<void> => {
    const reservation = reservations.find((r) => r.id === reservationId);
    if (!reservation?.spaceId) return;
    await reviewRepository.create({ reservationId, rating, comment, spaceId: reservation.spaceId });
    setReviewedIds((prev) => new Set(prev).add(reservationId));
  };

  const simulatePayment = async (reservationId: string): Promise<void> => {
    await payMutation.mutateAsync(reservationId);
  };

  return {
    reservations,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error ? toErrorMessage(query.error) : null,
    reviewedIds,
    simulatingPaymentId: payMutation.isPending ? payMutation.variables ?? null : null,
    submitReview,
    simulatePayment,
  };
}
