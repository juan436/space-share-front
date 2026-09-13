import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUseCases } from "@/presentation/providers/usecases-context";
import { toErrorMessage } from "@/presentation/utils/error";
import { Reservation, EvidenceStage } from "@/core/domain/entities/Reservation";

const QUERY_KEY = ["reservations", "user"] as const;

export function useUserReservations() {
  const { getClientReservationsUseCase, createReviewUseCase, submitSiteEvidenceUseCase } = useUseCases();
  const queryClient = useQueryClient();
  const [reviewedIds, setReviewedIds] = useState<Set<string>>(new Set());
  const [checkoutReservation, setCheckoutReservation] = useState<Reservation | null>(null);

  const query = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getClientReservationsUseCase.execute(),
    staleTime: 30_000,
  });

  const reservations = query.data ?? [];

  const submitReview = async (reservationId: string, rating: number, comment: string): Promise<void> => {
    const reservation = reservations.find((r) => r.id === reservationId);
    if (!reservation?.spaceId) return;
    await createReviewUseCase.execute({ reservationId, rating, comment, spaceId: reservation.spaceId });
    setReviewedIds((prev) => new Set(prev).add(reservationId));
  };

  const openCheckout = (reservationId: string) => {
    const reservation = reservations.find((r) => r.id === reservationId) ?? null;
    setCheckoutReservation(reservation);
  };

  const evidenceMutation = useMutation({
    mutationFn: ({ id, stage, photos, note }: { id: string; stage: EvidenceStage; photos: File[]; note: string }) =>
      submitSiteEvidenceUseCase.execute(id, stage, photos, note),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });

  return {
    submitEvidence: evidenceMutation.mutateAsync,
    isSubmittingEvidence: evidenceMutation.isPending,
    reservations,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error ? toErrorMessage(query.error) : null,
    reviewedIds,
    checkoutReservation,
    openCheckout,
    closeCheckout: () => setCheckoutReservation(null),
    submitReview,
  };
}
