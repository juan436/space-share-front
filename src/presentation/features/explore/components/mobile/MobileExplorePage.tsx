"use client";

import { useState } from "react";
import { Space } from "@/core/domain/entities/Space";
import { useMobileExplore } from "../../hooks/useMobileExplore";
import { useFavorites } from "@/presentation/hooks/useFavorites";
import { MobileHeader } from "./MobileHeader";
import { MobileSearchFilters } from "./MobileSearchFilters";
import { MobileSpacesList } from "./MobileSpacesList";
import { MobileSpaceDetail } from "./MobileSpaceDetail";
import { MobileMapView } from "./MobileMapView";
import { MobileBottomNav } from "./MobileBottomNav";

type ViewMode = "list" | "map";

export function MobileExplorePage() {
  const { searchQuery, setSearchQuery, filters, setFilters, filteredSpaces } = useMobileExplore();
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const { isFavorite, toggleFavorite } = useFavorites();
  const [mapSelectedSpace, setMapSelectedSpace] = useState<Space | null>(null);

  // Space Detail View
  if (selectedSpace) {
    return (
      <MobileSpaceDetail
        space={selectedSpace}
        isFavorite={isFavorite(selectedSpace.id)}
        onToggleFavorite={toggleFavorite}
        onClose={() => setSelectedSpace(null)}
      />
    );
  }

  return (
    <div className="h-screen bg-white dark:bg-background flex flex-col overflow-hidden">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border/40 safe-area-top shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
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
          isFavorite={isFavorite}
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
