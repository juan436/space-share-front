import { useState, useMemo, useEffect } from "react";
import { SpaceFilters } from "@/core/domain/ports/SpaceRepository";
import { FilterState } from "../components/mobile/MobileSearchFilters";
import { useExploreSpaces } from "./useExploreSpaces";

const DEFAULT_FILTERS: FilterState = {
  type: "all",
  priceRange: null,
  size: null,
  amenities: [],
};

const PAGE_SIZE = 40;

export function useMobileExplore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  // Sin páginas numeradas en móvil: "Ver más" agranda el límite pedido al servidor.
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery), 350);
    return () => clearTimeout(t);
  }, [searchQuery]);
  useEffect(() => {
    setLimit(PAGE_SIZE);
  }, [debouncedQuery, filters]);

  const serverFilters = useMemo((): SpaceFilters | undefined => {
    const f: SpaceFilters = {};
    if (filters.type !== "all") f.type = filters.type as SpaceFilters["type"];
    if (filters.priceRange) {
      if (filters.priceRange === "$0-$50") { f.minPrice = 0; f.maxPrice = 50; }
      else if (filters.priceRange === "$50-$100") { f.minPrice = 50; f.maxPrice = 100; }
      else if (filters.priceRange === "$100-$200") { f.minPrice = 100; f.maxPrice = 200; }
      else if (filters.priceRange === "$200+") { f.minPrice = 200; }
    }
    if (filters.amenities.includes("climateControlled")) f.climateControlled = true;
    if (filters.amenities.includes("securityCamera")) f.securityCamera = true;
    if (filters.amenities.includes("privateEntrance")) f.privateEntrance = true;
    if (filters.amenities.includes("access247")) f.access247 = true;
    const q = debouncedQuery.trim();
    if (q) f.q = q;
    if (filters.size === "small") f.maxSize = 15;
    else if (filters.size === "medium") { f.minSize = 15; f.maxSize = 30; }
    else if (filters.size === "large") { f.minSize = 30; f.maxSize = 50; }
    else if (filters.size === "xlarge") f.minSize = 50;
    return Object.keys(f).length > 0 ? f : undefined;
  }, [filters, debouncedQuery]);

  const { spaces: filteredSpaces, total, isFetching } = useExploreSpaces({ filters: serverFilters, limit });
  const hasMore = filteredSpaces.length < total;
  const loadMore = () => setLimit((l) => l + PAGE_SIZE);

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filteredSpaces,
    total,
    hasMore,
    isFetching,
    loadMore,
  };
}
