"use client";

import { useState } from "react";
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

  // Filter spaces based on current filters
  const filteredSpaces = mockSpaces.filter((space) => {
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        space.title.toLowerCase().includes(query) ||
        space.location.city.toLowerCase().includes(query) ||
        space.location.state.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Space type filter
    if (spaceType !== "all" && space.type !== spaceType) {
      return false;
    }

    // Price range filter
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map((v) => (v === "500+" ? Infinity : parseInt(v)));
      if (priceRange === "500+") {
        if (space.pricePerMonth < 500) return false;
      } else {
        if (space.pricePerMonth < min || space.pricePerMonth > max) return false;
      }
    }

    // Size range filter
    if (sizeRange !== "all") {
      const [min, max] = sizeRange.split("-").map((v) => (v === "50+" ? Infinity : parseInt(v)));
      if (sizeRange === "50+") {
        if (space.squareMeters < 50) return false;
      } else {
        if (space.squareMeters < min || space.squareMeters > max) return false;
      }
    }

    // Conditions filter
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <ExploreHeader />

      {/* Search & Filters */}
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

      {/* Main Content - Split View */}
      <div className="flex-1 flex">
        <div className="max-w-7xl mx-auto w-full flex">
          {/* Left Column - Spaces List */}
          <div className="w-1/2 p-6 overflow-y-auto" style={{ maxHeight: "calc(100vh - 180px)" }}>
            <SpacesList
              spaces={filteredSpaces}
              selectedSpaceId={selectedSpaceId}
              onSpaceSelect={setSelectedSpaceId}
            />
          </div>

          {/* Right Column - Map */}
          <div className="w-1/2 p-6 pl-0">
            <div className="sticky top-0" style={{ height: "calc(100vh - 180px)" }}>
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
