"use client";

import { useState } from "react";
import { Space } from "@/core/domain/entities/Space";
import { mockSpaces } from "../../data";
import { MobileHeader } from "./MobileHeader";
import { MobileSearchFilters } from "./MobileSearchFilters";
import { MobileSpacesList } from "./MobileSpacesList";
import { MobileSpaceDetail } from "./MobileSpaceDetail";
import { MobileMapView } from "./MobileMapView";
import { MobileBottomNav } from "./MobileBottomNav";

type ViewMode = "list" | "map";
type FilterType = "all" | "garage" | "basement" | "attic" | "storage";

export function MobileExplorePage() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
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
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!space.title.toLowerCase().includes(q) && 
          !space.location.city.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (activeFilter !== "all" && space.type !== activeFilter) {
      return false;
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
      <header className="sticky top-0 z-40 bg-card border-b safe-area-top">
        <MobileHeader />
        
        <MobileSearchFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
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
