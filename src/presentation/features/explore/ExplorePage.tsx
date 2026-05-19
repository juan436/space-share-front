"use client";

import { useState } from "react";
import { Map, List } from "lucide-react";
import { ExploreHeader } from "./components/desktop/ExploreHeader";
import { SearchFilters } from "./components/desktop/SearchFilters";
import { SpacesList } from "./components/desktop/SpacesList";
import { SpacesMap } from "./components/desktop/SpacesMap";
import { useExploreSpaces } from "./hooks/useExploreSpaces";
import { useExploreFilters } from "./hooks/useExploreFilters";

export function ExplorePage() {
  const [selectedSpaceId, setSelectedSpaceId] = useState<string | undefined>();
  const [showMap, setShowMap] = useState(false);

  const { spaces, isLoading } = useExploreSpaces();
  const {
    searchQuery, setSearchQuery,
    spaceType, setSpaceType,
    priceRange, setPriceRange,
    sizeRange, setSizeRange,
    conditions, setConditions,
    filteredSpaces,
  } = useExploreFilters(spaces);

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
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

      <div className="flex-1 min-h-0 max-w-screen-2xl mx-auto w-full flex overflow-hidden">
        <div
          className="overflow-y-auto thin-scrollbar relative transition-all duration-500 ease-in-out"
          style={{ width: showMap ? "45%" : "100%" }}
        >
          <SpacesList spaces={filteredSpaces} selectedSpaceId={selectedSpaceId} onSpaceSelect={setSelectedSpaceId} showMap={showMap} isLoading={isLoading} />
          <div className="sticky bottom-6 flex justify-center pointer-events-none">
            <button
              onClick={() => setShowMap((v) => !v)}
              aria-label={showMap ? "Ver solo listado" : "Mostrar mapa"}
              className="pointer-events-auto flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
            >
              {showMap ? (<><List className="w-4 h-4" />Solo listado</>) : (<><Map className="w-4 h-4" />Mostrar mapa</>)}
            </button>
          </div>
        </div>

        <div
          className="overflow-hidden flex-shrink-0 transition-all duration-500 ease-in-out"
          style={{ width: showMap ? "55%" : "0%", opacity: showMap ? 1 : 0 }}
        >
          <div className="w-full h-full p-4 border-l border-border/30">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-sm border border-border/30">
              <SpacesMap spaces={filteredSpaces} selectedSpaceId={selectedSpaceId} onSpaceSelect={setSelectedSpaceId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
