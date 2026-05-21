import { useState, useMemo } from "react";
import { SpaceFilters } from "@/core/domain/ports/SpaceRepository";
import { FilterState } from "../components/mobile/MobileSearchFilters";
import { useExploreSpaces } from "./useExploreSpaces";

const DEFAULT_FILTERS: FilterState = {
  type: "all",
  priceRange: null,
  size: null,
  amenities: [],
};

const SERVER_AMENITIES = new Set(["climateControlled", "securityCamera", "privateEntrance"]);

export function useMobileExplore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

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
    return Object.keys(f).length > 0 ? f : undefined;
  }, [filters]);

  const { spaces: rawSpaces } = useExploreSpaces({ filters: serverFilters });

  const filteredSpaces = useMemo(() => {
    const clientAmenities = filters.amenities.filter((a) => !SERVER_AMENITIES.has(a));
    return rawSpaces.filter((space) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (
          !space.title.toLowerCase().includes(q) &&
          !space.location.city.toLowerCase().includes(q)
        )
          return false;
      }
      if (filters.size) {
        const sqm = space.squareMeters;
        if (filters.size === "small" && sqm > 15) return false;
        if (filters.size === "medium" && (sqm < 15 || sqm > 30)) return false;
        if (filters.size === "large" && (sqm < 30 || sqm > 50)) return false;
        if (filters.size === "xlarge" && sqm < 50) return false;
      }
      for (const amenity of clientAmenities) {
        if (!space.amenities[amenity as keyof typeof space.amenities]) return false;
      }
      return true;
    });
  }, [rawSpaces, searchQuery, filters]);

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filteredSpaces,
  };
}
