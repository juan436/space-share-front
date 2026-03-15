import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/presentation/providers/auth-context";
import { httpClient } from "@/bootstrap/http";

export function useFavorites() {
  const { user, isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setFavorites(new Set());
      return;
    }

    const fetchFavorites = async () => {
      try {
        const response = await httpClient.get<string[]>("/users/favorites");
        setFavorites(new Set(response.data));
      } catch {
        // silently fail
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
        if (next.has(spaceId)) {
          next.delete(spaceId);
        } else {
          next.add(spaceId);
        }
        return next;
      });

      try {
        const response = await httpClient.post<{ favorites: string[]; added: boolean }>(
          `/users/favorites/${spaceId}`
        );
        setFavorites(new Set(response.data.favorites));
        return response.data.added;
      } catch {
        // Revert on error
        setFavorites((prev) => {
          const next = new Set(prev);
          if (next.has(spaceId)) {
            next.delete(spaceId);
          } else {
            next.add(spaceId);
          }
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
