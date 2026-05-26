"use client";

import { useState } from "react";
import { Map, List } from "lucide-react";
import { ExploreHeader } from "./components/desktop/ExploreHeader";
import { SearchFilters } from "./components/desktop/SearchFilters";
import { SpacesList } from "./components/desktop/SpacesList";
import { SpacesMap } from "./components/desktop/SpacesMap";
import { useExplore } from "./hooks/useExplore";
import { MainFooter } from "@/presentation/components/shared/layout/MainFooter";

export function ExplorePage() {
  const [selectedSpaceId, setSelectedSpaceId] = useState<string | undefined>();
  const [showMap, setShowMap] = useState(false);

  const {
    filteredSpaces,
    totalSpaces,
    page,
    setPage,
    totalPages,
    isLoading,
    isError,
    searchQuery, setSearchQuery,
    spaceType, setSpaceType,
    priceRange, setPriceRange,
    sizeRange, setSizeRange,
    conditions, setConditions,
  } = useExplore();

  return (
    <div className="bg-white dark:bg-background flex flex-col min-h-screen">
      <ExploreHeader />
      <SearchFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        spaceType={spaceType}
        onSpaceTypeChange={setSpaceType}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        sizeRange={sizeRange}
        onSizeRangeChange={setSizeRange}
        conditions={conditions}
        onConditionsChange={setConditions}
      />

      {isError && (
        <div className="px-6 py-3 bg-destructive/10 border-b border-destructive/20">
          <p className="text-sm text-destructive text-center">No se pudieron cargar los espacios. Intenta de nuevo.</p>
        </div>
      )}

      <div className="max-w-screen-2xl mx-auto w-full flex flex-1">
        <div
          className="relative transition-all duration-500 ease-in-out"
          style={{ width: showMap ? "45%" : "100%" }}
        >
          <SpacesList
            spaces={filteredSpaces}
            selectedSpaceId={selectedSpaceId}
            onSpaceSelect={setSelectedSpaceId}
            showMap={showMap}
            isLoading={isLoading}
            totalSpaces={totalSpaces}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>

        <div
          className="flex-shrink-0 transition-all duration-500 ease-in-out overflow-hidden sticky top-0 h-screen"
          style={{ width: showMap ? "55%" : "0%", opacity: showMap ? 1 : 0 }}
        >
          <div className="w-full h-full p-4 border-l border-border/30">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-sm border border-border/30">
              <SpacesMap spaces={filteredSpaces} selectedSpaceId={selectedSpaceId} onSpaceSelect={setSelectedSpaceId} />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 left-0 right-0 flex justify-center pointer-events-none z-10">
        <button
          onClick={() => setShowMap((v) => !v)}
          aria-label={showMap ? "Ver solo listado" : "Mostrar mapa"}
          className="pointer-events-auto flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
        >
          {showMap ? (<><List className="w-4 h-4" />Solo listado</>) : (<><Map className="w-4 h-4" />Mostrar mapa</>)}
        </button>
      </div>

      <MainFooter />
    </div>
  );
}
