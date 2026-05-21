/**
 * useHostReservations
 *
 * Qué hace: Fetch y mutaciones de reservaciones del host via React Query.
 * Recibe:   nada — usa el userId del contexto de auth
 * Genera:   reservations[], isLoading, isError, errorMessage, updateStatus (mutation)
 * Procesa:  cache compartido con staleTime 30s; invalidación automática tras updateStatus
 */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ReservationStatus } from "@/core/domain/entities/Reservation";
import { useUseCases } from "@/presentation/providers/usecases-context";
import { toErrorMessage } from "@/presentation/utils/error";

const QUERY_KEY = ["reservations", "host"] as const;

export function useHostReservations() {
  const { getHostReservationsUseCase, updateReservationStatusUseCase } = useUseCases();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getHostReservationsUseCase.execute(),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ReservationStatus }) =>
      updateReservationStatusUseCase.execute(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });

  return {
    reservations: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error ? toErrorMessage(query.error) : null,
    updateStatus: updateMutation.mutateAsync,
    updatingId: updateMutation.isPending ? updateMutation.variables?.id ?? null : null,
  };
}
