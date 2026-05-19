import { useState, useMemo } from "react";
import { Space } from "@/core/domain/entities/Space";
import { FilterState } from "../components/mobile/MobileSearchFilters";

const DEFAULT_FILTERS: FilterState = {
  type: "all",
  priceRange: null,
  size: null,
  amenities: [],
};

export function useMobileExploreFilters(spaces: Space[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const filteredSpaces = useMemo(() => {
    return spaces.filter((space) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (
          !space.title.toLowerCase().includes(q) &&
          !space.location.city.toLowerCase().includes(q)
        ) {
          return false;
        }
      }

      if (filters.type !== "all" && space.type !== filters.type) return false;

      if (filters.priceRange) {
        const price = space.pricePerMonth;
        if (filters.priceRange === "$0-$50" && price > 50) return false;
        if (filters.priceRange === "$50-$100" && (price < 50 || price > 100)) return false;
        if (filters.priceRange === "$100-$200" && (price < 100 || price > 200)) return false;
        if (filters.priceRange === "$200+" && price < 200) return false;
      }

      if (filters.size) {
        const sqMeters = space.squareMeters;
        if (filters.size === "small" && sqMeters > 15) return false;
        if (filters.size === "medium" && (sqMeters < 15 || sqMeters > 30)) return false;
        if (filters.size === "large" && (sqMeters < 30 || sqMeters > 50)) return false;
        if (filters.size === "xlarge" && sqMeters < 50) return false;
      }

      if (filters.amenities.length > 0) {
        for (const amenity of filters.amenities) {
          if (!space.amenities[amenity as keyof typeof space.amenities]) return false;
        }
      }

      return true;
    });
  }, [spaces, searchQuery, filters]);

  return {
    searchQuery, setSearchQuery,
    filters, setFilters,
    filteredSpaces,
  };
}
