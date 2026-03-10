"use client";

import { useState } from "react";
import { Space } from "@/core/domain/entities/Space";
import { mockSpaces } from "../../data";
import { MobileHeader } from "./MobileHeader";
import { MobileSearchFilters, FilterState } from "./MobileSearchFilters";
import { MobileSpacesList } from "./MobileSpacesList";
import { MobileSpaceDetail } from "./MobileSpaceDetail";
import { MobileMapView } from "./MobileMapView";
import { MobileBottomNav } from "./MobileBottomNav";

type ViewMode = "list" | "map";

export function MobileExplorePage() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    type: "all",
    priceRange: null,
    size: null,
    amenities: [],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [mapSelectedSpace, setMapSelectedSpace] = useState<Space | null>(null);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavs = new Set(prev);
      if (newFavs.has(id)) {
        newFavs.delete(id);
      } else {
        newFavs.add(id);
      }
      return newFavs;
    });
  };

  const filteredSpaces = mockSpaces.filter(space => {
    // 1. Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!space.title.toLowerCase().includes(q) &&
        !space.location.city.toLowerCase().includes(q)) {
        return false;
      }
    }
    
    // 2. Type Filter
    if (filters.type !== "all" && space.type !== filters.type) {
      return false;
    }

    // 3. Price Filter (Simple mock logic)
    if (filters.priceRange) {
      const price = space.pricePerMonth;
      if (filters.priceRange === "$0-$50" && price > 50) return false;
      if (filters.priceRange === "$50-$100" && (price < 50 || price > 100)) return false;
      if (filters.priceRange === "$100-$200" && (price < 100 || price > 200)) return false;
      if (filters.priceRange === "$200+" && price < 200) return false;
    }

    // 4. Size Filter (Simple mock logic)
    if (filters.size) {
      const sqMeters = space.squareMeters;
      if (filters.size === "small" && sqMeters > 15) return false;
      if (filters.size === "medium" && (sqMeters < 15 || sqMeters > 30)) return false;
      if (filters.size === "large" && (sqMeters < 30 || sqMeters > 50)) return false;
      if (filters.size === "xlarge" && sqMeters < 50) return false;
    }

    // 5. Amenities Filter
    if (filters.amenities.length > 0) {
      for (const amenity of filters.amenities) {
        if (!space.amenities[amenity as keyof typeof space.amenities]) {
          return false;
        }
      }
    }

    return true;
  });

  // Space Detail View
  if (selectedSpace) {
    return (
      <MobileSpaceDetail
        space={selectedSpace}
        isFavorite={favorites.has(selectedSpace.id)}
        onToggleFavorite={toggleFavorite}
        onClose={() => setSelectedSpace(null)}
      />
    );
  }

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-card border-b safe-area-top shadow-sm">
        <MobileHeader />

        <MobileSearchFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filters={filters}
          onFilterChange={setFilters}
          showFilters={showFilters}
          onShowFiltersChange={setShowFilters}
        />
      </header>

      {/* Content Area - List or Map */}
      {viewMode === "list" ? (
        <MobileSpacesList
          spaces={filteredSpaces}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onSpaceSelect={setSelectedSpace}
          onShowFilters={() => setShowFilters(true)}
        />
      ) : (
        <div className="flex-1 relative">
          <MobileMapView
            spaces={filteredSpaces}
            selectedSpace={mapSelectedSpace}
            onSpaceSelect={setMapSelectedSpace}
            onSpaceDetail={setSelectedSpace}
          />
        </div>
      )}

      {/* Bottom Navigation */}
      <MobileBottomNav
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
    </div>
  );
}
