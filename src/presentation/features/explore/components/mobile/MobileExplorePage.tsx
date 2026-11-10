"use client";

import { useRef, useState, type UIEvent } from "react";
import { List, Map } from "lucide-react";
import { Space } from "@/core/domain/entities/Space";
import { useMobileExplore } from "../../hooks/useMobileExplore";
import { useFavorites } from "@/presentation/hooks/useFavorites";
import { MobileHeader } from "./MobileHeader";
import { MobileSearchFilters, countActiveFilters } from "./MobileSearchFilters";
import { MobileSearchInput } from "./MobileSearchInput";
import { MobileFilterButton } from "./MobileFilterButton";
import { MobileSpacesList } from "./MobileSpacesList";
import { MobileSpaceDetail } from "./MobileSpaceDetail";
import { MobileMapView } from "./MobileMapView";
import { MobileBottomNav } from "./MobileBottomNav";

type ViewMode = "list" | "map";

export function MobileExplorePage() {
  const { searchQuery, setSearchQuery, filters, setFilters, filteredSpaces, hasMore, isFetching, loadMore } = useMobileExplore();
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const { isFavorite, toggleFavorite } = useFavorites();
  const [mapSelectedSpace, setMapSelectedSpace] = useState<Space | null>(null);

  // El header se oculta al bajar por la lista y reaparece al subir (solo presentación).
  const [headerHidden, setHeaderHidden] = useState(false);
  const lastScrollTop = useRef(0);
  const handleListScroll = (e: UIEvent<HTMLDivElement>) => {
    const top = e.currentTarget.scrollTop;
    const delta = top - lastScrollTop.current;
    if (Math.abs(delta) < 8) return;
    lastScrollTop.current = top;
    setHeaderHidden(delta > 0 && top > 80);
  };

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
      <header className="relative z-50 bg-card border-b border-[hsl(214_24%_78%)] safe-area-top shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
        <MobileHeader>
          <MobileSearchInput value={searchQuery} onChange={setSearchQuery} />
          <MobileFilterButton activeCount={countActiveFilters(filters)} onClick={() => setShowFilters(true)} />
        </MobileHeader>

        <MobileSearchFilters
          filters={filters}
          onFilterChange={setFilters}
          showFilters={showFilters}
          onShowFiltersChange={setShowFilters}
          collapsed={headerHidden && viewMode === "list"}
        />
      </header>

      {/* Content Area - List or Map */}
      {viewMode === "list" ? (
        <MobileSpacesList
          spaces={filteredSpaces}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          onSpaceSelect={setSelectedSpace}
          onScroll={handleListScroll}
          hasMore={hasMore}
          isLoadingMore={isFetching}
          onLoadMore={loadMore}
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
        items={[
          { key: "list", label: "Lista", icon: List, onClick: () => setViewMode("list"), active: viewMode === "list" },
          { key: "map", label: "Mapa", icon: Map, onClick: () => setViewMode("map"), active: viewMode === "map" },
        ]}
      />
    </div>
  );
}
