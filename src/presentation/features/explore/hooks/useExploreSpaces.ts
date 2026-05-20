import { useQuery } from "@tanstack/react-query";
import { useRepositories } from "@/presentation/providers/repositories-context";
import { SpaceFilters } from "@/core/domain/ports/SpaceRepository";

interface UseExploreSpacesOptions {
  filters?: SpaceFilters;
  page?: number;
  limit?: number;
}

export function useExploreSpaces(options?: UseExploreSpacesOptions) {
  const { spaceRepository } = useRepositories();
  const page = options?.page ?? 1;
  const limit = options?.limit ?? 50;
  const filters = options?.filters;

  const query = useQuery({
    queryKey: ["explore-spaces", { filters, page, limit }],
    queryFn: async () => {
      const result = await spaceRepository.findAll(filters, page, limit);
      return result;
    },
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
