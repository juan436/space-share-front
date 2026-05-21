import { useState, useEffect } from "react";
import { useUseCases } from "@/presentation/providers/usecases-context";
import { AdminAnalytics as AdminAnalyticsData } from "@/core/domain/entities/AdminStats";

export function useAdminAnalytics() {
  const { getAdminAnalyticsUseCase } = useUseCases();
  const [data, setData] = useState<AdminAnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAdminAnalyticsUseCase
      .execute()
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err.message : "No se pudieron cargar las analíticas"))
      .finally(() => setIsLoading(false));
  }, []);

  const totalStatusCount = data
    ? Object.values(data.reservationsByStatus).reduce((a, b) => a + b, 0) || 1
    : 1;
  const totalRevenue = data
    ? data.monthlyRevenue.reduce((a, b) => a + b.total, 0)
    : 0;
  const maxRevenue = data && data.monthlyRevenue.length > 0
    ? Math.max(...data.monthlyRevenue.map((r) => r.total), 0) || 1
    : 1;

  return { data, isLoading, error, totalStatusCount, totalRevenue, maxRevenue };
}
