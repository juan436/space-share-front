"use client";

import { MainHeader } from "@/presentation/components/shared/layout/MainHeader";
import { CompactSearchFilters } from "./CompactSearchFilters";

interface ExploreHeaderProps {
  showCompactSlot: boolean;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  spaceType: string;
  onSpaceTypeChange: (value: string) => void;
  priceRange: string;
  onPriceRangeChange: (value: string) => void;
  sizeRange: string;
  onSizeRangeChange: (value: string) => void;
}

export function ExploreHeader({ showCompactSlot, ...filterProps }: ExploreHeaderProps) {
  return (
    <MainHeader
      activeLink="/explore"
      showCompactSlot={showCompactSlot}
      scrollCompactSlot={<CompactSearchFilters {...filterProps} />}
    />
  );
}
