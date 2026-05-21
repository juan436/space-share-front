/**
 * useAdminStats
 *
 * Qué hace: Fetch de estadísticas globales del admin.
 * Genera:   stats, isLoading, error
 */
import { useState, useEffect } from "react";
import { useUseCases } from "@/presentation/providers/usecases-context";
import { AdminStats } from "@/core/domain/entities/AdminStats";

export function useAdminStats() {
  const { getAdminStatsUseCase } = useUseCases();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAdminStatsUseCase
      .execute()
      .then(setStats)
      .catch(() => setError("No se pudieron cargar las estadísticas"))
      .finally(() => setIsLoading(false));
  }, []);

  return { stats, isLoading, error };
}
