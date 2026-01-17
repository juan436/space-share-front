"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { Space } from "@/core/domain/entities/Space";
import { MobileSpaceCard } from "./MobileSpaceCard";

interface MobileSpacesListProps {
  spaces: Space[];
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  onSpaceSelect: (space: Space) => void;
  onShowFilters: () => void;
}

export function MobileSpacesList({
  spaces,
  favorites,
  onToggleFavorite,
  onSpaceSelect,
  onShowFilters,
}: MobileSpacesListProps) {
  return (
    <>
      {/* Results Count */}
      <div className="px-4 py-3 flex items-center justify-between bg-background">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{spaces.length}</span> espacios encontrados
        </p>
        <button 
          onClick={onShowFilters}
          className="flex items-center gap-1.5 text-sm text-primary font-medium"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filtros
        </button>
      </div>

      {/* Space Cards */}
      <div className="flex-1 overflow-y-auto px-4 pb-24 space-y-4">
        {spaces.map((space) => (
          <MobileSpaceCard
            key={space.id}
            space={space}
            isFavorite={favorites.has(space.id)}
            onToggleFavorite={onToggleFavorite}
            onClick={() => onSpaceSelect(space)}
          />
        ))}

        {spaces.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 mb-4 rounded-full bg-muted flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-1">Sin resultados</h3>
            <p className="text-sm text-muted-foreground">
              Intenta con otros filtros
            </p>
          </div>
        )}
      </div>
    </>
  );
}
