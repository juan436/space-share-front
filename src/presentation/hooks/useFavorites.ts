import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/presentation/providers/auth-context";
import { useUseCases } from "@/presentation/providers/usecases-context";

export function useFavorites() {
  const { getFavoritesUseCase, toggleFavoriteUseCase } = useUseCases();
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setFavorites(new Set());
      return;
    }

    const fetchFavorites = async () => {
      try {
        const ids = await getFavoritesUseCase.execute();
        setFavorites(new Set(ids));
      } catch {
        // silently fail — user stays with empty favorites
      }
    };

    fetchFavorites();
  }, [isAuthenticated]);

  const toggleFavorite = useCallback(
    async (spaceId: string) => {
      if (!isAuthenticated) return false;

      // Optimistic update
      setFavorites((prev) => {
        const next = new Set(prev);
        if (next.has(spaceId)) next.delete(spaceId);
        else next.add(spaceId);
        return next;
      });

      try {
        const result = await toggleFavoriteUseCase.execute(spaceId);
        setFavorites(new Set(result.favorites));
        return result.added;
      } catch {
        // Revert on error
        setFavorites((prev) => {
          const next = new Set(prev);
          if (next.has(spaceId)) next.delete(spaceId);
          else next.add(spaceId);
          return next;
        });
        return false;
      }
    },
    [isAuthenticated]
  );

  const isFavorite = useCallback(
    (spaceId: string) => favorites.has(spaceId),
    [favorites]
  );

  return { favorites, isFavorite, toggleFavorite, isLoading };
}
