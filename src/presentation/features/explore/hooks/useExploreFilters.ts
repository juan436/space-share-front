import { useState, useMemo } from "react";
import { Space } from "@/core/domain/entities/Space";

export function useExploreFilters(spaces: Space[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [spaceType, setSpaceType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sizeRange, setSizeRange] = useState("all");
  const [conditions, setConditions] = useState<string[]>([]);

  const filteredSpaces = useMemo(() => {
    return spaces.filter((space) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches =
          space.title.toLowerCase().includes(q) ||
          space.location.city.toLowerCase().includes(q) ||
          space.location.state.toLowerCase().includes(q);
        if (!matches) return false;
      }

      if (spaceType !== "all" && space.type !== spaceType) return false;

      if (priceRange !== "all") {
        if (priceRange === "500+") {
          if (space.pricePerMonth < 500) return false;
        } else {
          const [min, max] = priceRange.split("-").map(Number);
          if (space.pricePerMonth < min || space.pricePerMonth > max) return false;
        }
      }

      if (sizeRange !== "all") {
        if (sizeRange === "50+") {
          if (space.squareMeters < 50) return false;
        } else {
          const [min, max] = sizeRange.split("-").map(Number);
          if (space.squareMeters < min || space.squareMeters > max) return false;
        }
      }

      if (conditions.length > 0) {
        if (conditions.includes("24/7") && !space.amenities.access247) return false;
        if (conditions.includes("climatizado") && !space.amenities.climateControlled) return false;
        if (conditions.includes("seguridad") && !space.amenities.securityCamera) return false;
        if (conditions.includes("privado") && !space.amenities.privateEntrance) return false;
        if (conditions.includes("verificado") && !space.verified) return false;
      }

      return true;
    });
  }, [spaces, searchQuery, spaceType, priceRange, sizeRange, conditions]);

  return {
    searchQuery, setSearchQuery,
    spaceType, setSpaceType,
    priceRange, setPriceRange,
    sizeRange, setSizeRange,
    conditions, setConditions,
    filteredSpaces,
  };
}
