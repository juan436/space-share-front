/**
 * useAdminUsers
 *
 * Qué hace: Fetch y filtrado de usuarios para el panel admin.
 * Genera:   users (total), filtered (por search), isLoading, error, search, setSearch
 */
import { useState, useEffect, useMemo } from "react";
import { useRepositories } from "@/presentation/providers/repositories-context";
import { AdminUser } from "@/core/domain/entities/AdminStats";

export function useAdminUsers() {
  const { adminRepository } = useRepositories();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    adminRepository
      .getUsers()
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
