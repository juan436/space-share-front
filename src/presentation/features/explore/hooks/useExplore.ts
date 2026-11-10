import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SpaceFilters } from "@/core/domain/ports/SpaceRepository";
import { useExploreSpaces } from "./useExploreSpaces";

const ITEMS_PER_PAGE = 40;

export function useExplore() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get("q") ?? "");
  // Un solo selector de "Tipo": o es una categoría de primer nivel
  // (lodging/garage) o un subtipo de Almacenamiento (basement/attic/...).
  const [spaceType, setSpaceType] = useState(() => searchParams.get("type") ?? "all");
  const [priceRange, setPriceRange] = useState(() => searchParams.get("price") ?? "all");
  const [sizeRange, setSizeRange] = useState(() => searchParams.get("size") ?? "all");
  const [conditions, setConditions] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  // La búsqueda ahora va al servidor: se espera a que el usuario deje de teclear.
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery), 350);
    return () => clearTimeout(t);
  }, [searchQuery]);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, spaceType, priceRange, sizeRange, conditions]);

  const serverFilters = useMemo((): SpaceFilters | undefined => {
    const f: SpaceFilters = {};
    if (spaceType === "lodging" || spaceType === "garage") {
      f.listingType = spaceType as SpaceFilters["listingType"];
    } else if (spaceType !== "all") {
      f.type = spaceType as SpaceFilters["type"];
    }
    if (priceRange !== "all") {
      if (priceRange === "500+") {
        f.minPrice = 500;
      } else {
        const [min, max] = priceRange.split("-").map(Number);
        f.minPrice = min;
        f.maxPrice = max;
      }
    }
    if (conditions.includes("climatizado")) f.climateControlled = true;
    if (conditions.includes("seguridad")) f.securityCamera = true;
    if (conditions.includes("privado")) f.privateEntrance = true;
    if (conditions.includes("24/7")) f.access247 = true;
    if (conditions.includes("verificado")) f.verified = true;
    const q = debouncedQuery.trim();
    if (q) f.q = q;
    if (sizeRange !== "all") {
      if (sizeRange === "50+") {
        f.minSize = 50;
      } else {
        const [min, max] = sizeRange.split("-").map(Number);
        f.minSize = min;
        f.maxSize = max;
      }
    }
    return Object.keys(f).length > 0 ? f : undefined;
  }, [spaceType, priceRange, conditions, debouncedQuery, sizeRange]);

  // Paginación en el servidor: el API ordena (más nuevos primero) y devuelve
  // total y totalPages sobre TODOS los espacios, no solo los primeros N.
  const { spaces: rawSpaces, isLoading, isError, total, totalPages } = useExploreSpaces({
    filters: serverFilters,
    page,
    limit: ITEMS_PER_PAGE,
  });

  return {
    filteredSpaces: rawSpaces,
    totalSpaces: total,
    page,
    setPage,
    totalPages,
    isLoading,
    isError,
    searchQuery,
    setSearchQuery,
    spaceType,
    setSpaceType,
    priceRange,
    setPriceRange,
    sizeRange,
    setSizeRange,
    conditions,
    setConditions,
  };
}
