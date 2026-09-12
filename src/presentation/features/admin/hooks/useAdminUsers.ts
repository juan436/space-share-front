import { useState, useEffect, useMemo } from "react";
import { useUseCases } from "@/presentation/providers/usecases-context";
import { AdminUser } from "@/core/domain/entities/AdminStats";

export function useAdminUsers() {
  const { getAdminUsersUseCase, reviewKycUseCase } = useUseCases();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [reviewingId, setReviewingId] = useState<string | null>(null);

  useEffect(() => {
    getAdminUsersUseCase
      .execute()
      .then(setUsers)
      .catch(() => setError("No se pudieron cargar los usuarios"))
      .finally(() => setIsLoading(false));
  }, []);

  const reviewKyc = async (userId: string, approve: boolean, rejectionReason?: string) => {
    setReviewingId(userId);
    try {
      const updated = await reviewKycUseCase.execute(userId, approve, rejectionReason);
      setUsers((prev) => prev.map((u) => (u.id === userId ? updated : u)));
    } finally {
      setReviewingId(null);
    }
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
    );
  }, [users, search]);

  return { users, filtered, isLoading, error, search, setSearch, reviewKyc, reviewingId };
}
