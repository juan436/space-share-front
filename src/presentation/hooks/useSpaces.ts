import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../providers/auth-context";
import { toErrorMessage } from "../utils/error";
import { useRepositories } from "@/presentation/providers/repositories-context";
import { useUseCases } from "@/presentation/providers/usecases-context";
import type { Space, CreateSpaceInput, UpdateSpaceInput } from "@/core/domain/entities/Space";

interface UseSpacesOptions {
  hostId?: string;
  page?: number;
  limit?: number;
}

export function useSpaces(options?: UseSpacesOptions) {
  const { spaceRepository } = useRepositories();
  const { createSpaceUseCase, updateSpaceUseCase, deleteSpaceUseCase } = useUseCases();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const effectiveHostId = options?.hostId ?? user?.id;
  const page = options?.page ?? 1;
  const limit = options?.limit ?? 20;

  const listKey = ["spaces", { hostId: effectiveHostId, page, limit }];

  const listQuery = useQuery({
    queryKey: listKey,
    queryFn: async () => {
      if (!effectiveHostId) return [];
      const spaces = await spaceRepository.findByHostId(effectiveHostId);
      return spaces;
    },
    enabled: !!effectiveHostId,
    staleTime: 30_000,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["spaces"] });

  const createMutation = useMutation({
    mutationFn: async (input: Omit<CreateSpaceInput, "hostId">) => {
      if (!user?.id) throw new Error("Usuario no autenticado");
      const space = await createSpaceUseCase.execute({
        hostId: user.id,
        ...input,
      });
      return space;
    },
    onSuccess: invalidate,
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, input }: { id: string; input: UpdateSpaceInput }) => {
      const space = await updateSpaceUseCase.execute(id, input);
      return space;
    },
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await deleteSpaceUseCase.execute(id);
    },
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
  const { spaceRepository } = useRepositories();
  const query = useQuery({
    enabled: Boolean(id),
    queryKey: ["space", { id }],
    queryFn: async () => {
      if (!id) return null;
      const space = await spaceRepository.findById(id);
      return space;
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
