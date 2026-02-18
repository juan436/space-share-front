"use client";

import { useState } from "react";
import { Map, List } from "lucide-react";
import { ExploreHeader } from "./components/desktop/ExploreHeader";
import { SearchFilters } from "./components/desktop/SearchFilters";
import { SpacesList } from "./components/desktop/SpacesList";
import { SpacesMap } from "./components/desktop/SpacesMap";
import { mockSpaces } from "./data";

export function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [spaceType, setSpaceType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sizeRange, setSizeRange] = useState("all");
  const [conditions, setConditions] = useState<string[]>([]);
  const [selectedSpaceId, setSelectedSpaceId] = useState<string | undefined>();
  const [showMap, setShowMap] = useState(false);

  const filteredSpaces = mockSpaces.filter((space) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        space.title.toLowerCase().includes(query) ||
        space.location.city.toLowerCase().includes(query) ||
        space.location.state.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    if (spaceType !== "all" && space.type !== spaceType) return false;

    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map((v) => (v === "500+" ? Infinity : parseInt(v)));
      if (priceRange === "500+") {
        if (space.pricePerMonth < 500) return false;
      } else {
        if (space.pricePerMonth < min || space.pricePerMonth > max) return false;
      }
    }

    if (sizeRange !== "all") {
      const [min, max] = sizeRange.split("-").map((v) => (v === "50+" ? Infinity : parseInt(v)));
      if (sizeRange === "50+") {
        if (space.squareMeters < 50) return false;
      } else {
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

      {/* Constrained content area — always max-w-7xl centered */}
      <div className="flex-1 min-h-0 max-w-screen-2xl mx-auto w-full flex overflow-hidden">

        {/* List panel */}
        <div
          className="overflow-y-auto thin-scrollbar relative transition-all duration-500 ease-in-out"
          style={{ width: showMap ? "45%" : "100%" }}
        >
          <SpacesList
            spaces={filteredSpaces}
            selectedSpaceId={selectedSpaceId}
            onSpaceSelect={setSelectedSpaceId}
            showMap={showMap}
          />

          {/* Floating toggle button */}
          <div className="sticky bottom-6 flex justify-center pointer-events-none">
            <button
              onClick={() => setShowMap((v) => !v)}
              className="pointer-events-auto flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
            >
              {showMap ? (
                <><List className="w-4 h-4" />Solo listado</>
              ) : (
                <><Map className="w-4 h-4" />Mostrar mapa</>
              )}
            </button>
          </div>
        </div>

        {/* Map panel — slides in from right, inside the same max-w-7xl box */}
        <div
          className="overflow-hidden flex-shrink-0 transition-all duration-500 ease-in-out"
          style={{
            width: showMap ? "55%" : "0%",
            opacity: showMap ? 1 : 0,
          }}
        >
          <div className="w-full h-full p-4 border-l border-border/30">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-sm border border-border/30">
              <SpacesMap
                spaces={filteredSpaces}
                selectedSpaceId={selectedSpaceId}
                onSpaceSelect={setSelectedSpaceId}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
