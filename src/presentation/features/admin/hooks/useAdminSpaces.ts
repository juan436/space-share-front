import { useState, useEffect, useMemo } from "react";
import { useUseCases } from "@/presentation/providers/usecases-context";
import { AdminSpace } from "@/core/domain/entities/AdminStats";

interface HostIdObject { name: string }
export function isHostIdObject(value: unknown): value is HostIdObject {
  return typeof value === "object" && value !== null && !Array.isArray(value) && "name" in value;
}

export function useAdminSpaces() {
  const { getAdminSpacesUseCase } = useUseCases();
  const [spaces, setSpaces] = useState<AdminSpace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAdminSpacesUseCase
      .execute()
      .then(setSpaces)
      .catch(() => setError("No se pudieron cargar los espacios"))
      .finally(() => setIsLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return spaces.filter((s) => {
      const hostName = isHostIdObject(s.hostId) ? s.hostId.name : "";
      return (
        s.title.toLowerCase().includes(q) ||
        s.location.city.toLowerCase().includes(q) ||
        hostName.toLowerCase().includes(q) ||
        s.type.toLowerCase().includes(q)
      );
    });
  }, [spaces, search]);

  return { spaces, filtered, isLoading, error, search, setSearch };
}
