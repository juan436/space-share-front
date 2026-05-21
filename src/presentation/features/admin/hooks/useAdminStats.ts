/**
 * useAdminStats
 *
 * Qué hace: Fetch de estadísticas globales del admin.
 * Genera:   stats, isLoading, error
 */
import { useState, useEffect } from "react";
import { useRepositories } from "@/presentation/providers/repositories-context";
import { AdminStats } from "@/core/domain/entities/AdminStats";

export function useAdminStats() {
  const { adminRepository } = useRepositories();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminRepository
      .getStats()
      .then(setStats)
      .catch(() => setError("No se pudieron cargar las estadísticas"))
      .finally(() => setIsLoading(false));
  }, []);

  return { stats, isLoading, error };
}
