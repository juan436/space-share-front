import { useState, useMemo } from "react";
import { SpaceFilters } from "@/core/domain/ports/SpaceRepository";
import { useExploreSpaces } from "./useExploreSpaces";

export function useExplore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [spaceType, setSpaceType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sizeRange, setSizeRange] = useState("all");
  const [conditions, setConditions] = useState<string[]>([]);

  const serverFilters = useMemo((): SpaceFilters | undefined => {
    const f: SpaceFilters = {};
    if (spaceType !== "all") f.type = spaceType as SpaceFilters["type"];
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
    return Object.keys(f).length > 0 ? f : undefined;
  }, [spaceType, priceRange, conditions]);

  const { spaces: rawSpaces, isLoading, isError } = useExploreSpaces({
    filters: serverFilters,
  });

  const filteredSpaces = useMemo(() => {
    return rawSpaces.filter((space) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (
          !space.title.toLowerCase().includes(q) &&
          !space.location.city.toLowerCase().includes(q) &&
          !space.location.state.toLowerCase().includes(q)
        )
          return false;
      }
      if (sizeRange !== "all") {
        if (sizeRange === "50+") {
          if (space.squareMeters < 50) return false;
        } else {
          const [min, max] = sizeRange.split("-").map(Number);
          if (space.squareMeters < min || space.squareMeters > max) return false;
        }
      }
      if (conditions.includes("24/7") && !space.amenities.access247) return false;
      if (conditions.includes("verificado") && !space.verified) return false;
      return true;
    });
  }, [rawSpaces, searchQuery, sizeRange, conditions]);

  return {
    filteredSpaces,
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
