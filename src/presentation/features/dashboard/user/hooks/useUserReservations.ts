import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUseCases } from "@/presentation/providers/usecases-context";
import { useAuth } from "@/presentation/providers/auth-context";
import { toErrorMessage } from "@/presentation/utils/error";

const QUERY_KEY = ["reservations", "user"] as const;

export function useUserReservations() {
  const { getClientReservationsUseCase, createReviewUseCase, initiatePaymentUseCase } = useUseCases();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [reviewedIds, setReviewedIds] = useState<Set<string>>(new Set());

  const query = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getClientReservationsUseCase.execute(),
    staleTime: 30_000,
  });

  const reservations = query.data ?? [];

  const payMutation = useMutation({
    mutationFn: async (reservationId: string) => {
      const w = 520, h = 680;
      const left = window.screenX + (window.outerWidth - w) / 2;
      const top = window.screenY + (window.outerHeight - h) / 2;
      const newWindow = window.open("", "_blank", `width=${w},height=${h},left=${left},top=${top},toolbar=no,menubar=no,location=no,status=no`);
      const { checkoutUrl } = await initiatePaymentUseCase.execute({
        reservationId,
        customerEmail: user?.email ?? "",
        redirectUrl: `${window.location.origin}/dashboard/reservaciones?payment=result`,
      });
      if (newWindow) {
        newWindow.location.href = checkoutUrl;
      } else {
        window.location.href = checkoutUrl;
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });

  const submitReview = async (reservationId: string, rating: number, comment: string): Promise<void> => {
    const reservation = reservations.find((r) => r.id === reservationId);
    if (!reservation?.spaceId) return;
    await createReviewUseCase.execute({ reservationId, rating, comment, spaceId: reservation.spaceId });
    setReviewedIds((prev) => new Set(prev).add(reservationId));
  };

  const initiatePayment = async (reservationId: string): Promise<void> => {
    await payMutation.mutateAsync(reservationId);
  };

  return {
    reservations,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error ? toErrorMessage(query.error) : null,
    reviewedIds,
    initiatingPaymentId: payMutation.isPending ? payMutation.variables ?? null : null,
    submitReview,
    initiatePayment,
  };
}
