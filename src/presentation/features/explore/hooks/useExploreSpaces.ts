import { useQuery } from "@tanstack/react-query";
import { useUseCases } from "@/presentation/providers/usecases-context";
import { SpaceFilters } from "@/core/domain/ports/SpaceRepository";

interface UseExploreSpacesOptions {
  filters?: SpaceFilters;
  page?: number;
  limit?: number;
}

export function useExploreSpaces(options?: UseExploreSpacesOptions) {
  const { listSpacesUseCase } = useUseCases();
  const page = options?.page ?? 1;
  const limit = options?.limit ?? 50;
  const filters = options?.filters;

  const query = useQuery({
    queryKey: ["explore-spaces", { filters, page, limit }],
    queryFn: () => listSpacesUseCase.execute(filters, page, limit),
    staleTime: 30_000,
  });

  const spaces = query.data?.data ?? [];

  return {
    spaces,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    total: query.data?.total ?? 0,
    page: query.data?.page ?? page,
    totalPages: query.data?.totalPages ?? 1,
  };
}
