import { useQuery, useQueries, useMutation, useQueryClient } from "@tanstack/react-query";
import { ReservationStatus } from "@/core/domain/entities/Reservation";
import { useUseCases } from "@/presentation/providers/usecases-context";
import { toErrorMessage } from "@/presentation/utils/error";

const QUERY_KEY = ["reservations", "host"] as const;

export function useHostReservations() {
  const { getHostReservationsUseCase, updateReservationStatusUseCase, findSpaceByIdUseCase } = useUseCases();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getHostReservationsUseCase.execute(),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  const rawReservations = query.data ?? [];

  const missingImageSpaceIds = Array.from(new Set(
    rawReservations
      .filter((r) => !r.space?.images?.length)
      .map((r) => r.spaceId),
  ));

  const spaceQueries = useQueries({
    queries: missingImageSpaceIds.map((id) => ({
      queryKey: ["space", { id }],
      queryFn: () => findSpaceByIdUseCase.execute(id),
      staleTime: 60_000,
      enabled: missingImageSpaceIds.length > 0,
    })),
  });

  const spacesById = Object.fromEntries(
    missingImageSpaceIds.map((id, i) => [id, spaceQueries[i]?.data]),
  );

  const reservations = rawReservations.map((r) => {
    if (r.space?.images?.length) return r;
    const fetched = spacesById[r.spaceId];
    if (!fetched) return r;
    return {
      ...r,
      space: {
        title: r.space?.title ?? fetched.title,
        images: fetched.images,
        type: r.space?.type ?? fetched.type,
        location: r.space?.location ?? fetched.location,
        pricePerMonth: r.space?.pricePerMonth ?? fetched.pricePerMonth,
      },
    };
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ReservationStatus }) =>
      updateReservationStatusUseCase.execute(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });

  return {
    reservations,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error ? toErrorMessage(query.error) : null,
    updateStatus: updateMutation.mutateAsync,
    updatingId: updateMutation.isPending ? updateMutation.variables?.id ?? null : null,
  };
}
