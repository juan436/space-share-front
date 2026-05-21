import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../providers/auth-context";
import { toErrorMessage } from "../utils/error";
import { useUseCases } from "@/presentation/providers/usecases-context";
import type { Space, CreateSpaceInput, UpdateSpaceInput } from "@/core/domain/entities/Space";

interface UseSpacesOptions {
  hostId?: string;
  page?: number;
  limit?: number;
}

export function useSpaces(options?: UseSpacesOptions) {
  const { findHostSpacesUseCase, createSpaceUseCase, updateSpaceUseCase, deleteSpaceUseCase } = useUseCases();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const effectiveHostId = options?.hostId ?? user?.id;

  const listKey = ["spaces", { hostId: effectiveHostId }];

  const listQuery = useQuery({
    queryKey: listKey,
    queryFn: async () => {
      if (!effectiveHostId) return [];
      return findHostSpacesUseCase.execute(effectiveHostId);
    },
    enabled: !!effectiveHostId,
    staleTime: 30_000,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["spaces"] });

  const createMutation = useMutation({
    mutationFn: async (input: Omit<CreateSpaceInput, "hostId">) => {
      if (!user?.id) throw new Error("Usuario no autenticado");
      return createSpaceUseCase.execute({ hostId: user.id, ...input });
    },
    onSuccess: invalidate,
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, input }: { id: string; input: UpdateSpaceInput }) =>
      updateSpaceUseCase.execute(id, input),
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => deleteSpaceUseCase.execute(id),
    onSuccess: invalidate,
  });

  return {
    spaces: listQuery.data ?? [],
    isLoading: listQuery.isLoading,
    isFetching: listQuery.isFetching,
    isError: listQuery.isError,
    error: listQuery.error,
    errorMessage: listQuery.error ? toErrorMessage(listQuery.error) : null,
    refetch: listQuery.refetch,
    create: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    update: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    delete: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
}

export function useSpaceById(id: string | null) {
  const { findSpaceByIdUseCase } = useUseCases();
  const query = useQuery({
    enabled: Boolean(id),
    queryKey: ["space", { id }],
    queryFn: async () => {
      if (!id) return null;
      return findSpaceByIdUseCase.execute(id);
    },
    staleTime: 15_000,
  });

  return {
    space: query.data ?? null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    errorMessage: query.error ? toErrorMessage(query.error) : null,
    refetch: query.refetch,
  };
}
