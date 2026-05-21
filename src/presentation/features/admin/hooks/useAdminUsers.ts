/**
 * useAdminUsers
 *
 * Qué hace: Fetch y filtrado de usuarios para el panel admin.
 * Genera:   users (total), filtered (por search), isLoading, error, search, setSearch
 */
import { useState, useEffect, useMemo } from "react";
import { useUseCases } from "@/presentation/providers/usecases-context";
import { AdminUser } from "@/core/domain/entities/AdminStats";

export function useAdminUsers() {
  const { getAdminUsersUseCase } = useUseCases();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAdminUsersUseCase
      .execute()
      .then(setUsers)
      .catch(() => setError("No se pudieron cargar los usuarios"))
      .finally(() => setIsLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
    );
  }, [users, search]);

  return { users, filtered, isLoading, error, search, setSearch };
}
