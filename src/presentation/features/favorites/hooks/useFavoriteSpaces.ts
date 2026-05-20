import { useState, useEffect } from "react";
import { Space } from "@/core/domain/entities/Space";
import { useRepositories } from "@/presentation/providers/repositories-context";
import { useFavorites } from "@/presentation/hooks/useFavorites";

export function useFavoriteSpaces() {
  const { spaceRepository } = useRepositories();
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (favorites.size === 0) {
        setSpaces([]);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const ids = Array.from(favorites);
        const results = await Promise.allSettled(ids.map((id) => spaceRepository.findById(id)));
        setSpaces(
          results
            .filter((r): r is PromiseFulfilledResult<Space> => r.status === "fulfilled")
            .map((r) => r.value)
            .filter((s): s is Space => s !== null)
        );
      } catch {
        setSpaces([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFavorites();
  }, [favorites]);

  const handleToggleFavorite = async (id: string) => {
    await toggleFavorite(id);
    setSpaces((prev) => prev.filter((s) => s.id !== id));
  };

  return { spaces, isLoading, isFavorite, handleToggleFavorite };
}
