"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { Space } from "@/core/domain/entities/Space";
import { MobileSpaceCard } from "./MobileSpaceCard";

interface MobileSpacesListProps {
  spaces: Space[];
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
  onSpaceSelect: (space: Space) => void;
  onShowFilters: () => void;
}

export function MobileSpacesList({
  spaces,
  isFavorite,
  onToggleFavorite,
  onSpaceSelect,
  onShowFilters,
}: MobileSpacesListProps) {
  return (
    <>
      {/* Results bar */}
      <div className="px-4 py-2.5 flex items-center justify-between bg-white dark:bg-card border-b border-border/40">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{spaces.length}</span> espacios encontrados
        </p>
        <button
          onClick={onShowFilters}
          aria-label="Abrir filtros"
          className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground bg-muted/60 hover:bg-muted/80 px-3 py-1.5 rounded-full transition-colors"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Filtros
        </button>
      </div>

      {/* Space Cards */}
      <div className="flex-1 overflow-y-auto px-4 py-3 pb-24 space-y-3">
        {spaces.map((space) => (
          <MobileSpaceCard
            key={space.id}
            space={space}
            isFavorite={isFavorite(space.id)}
            onToggleFavorite={onToggleFavorite}
            onClick={() => onSpaceSelect(space)}
          />
        ))}

        {spaces.length === 0 && (
          <div className="bg-white dark:bg-card border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.07)] rounded-2xl p-10 flex flex-col items-center text-center gap-3 mt-4">
            <div className="w-14 h-14 rounded-2xl bg-muted/60 flex items-center justify-center">
              <Search className="w-6 h-6 text-muted-foreground/50" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Sin resultados</p>
              <p className="text-sm text-muted-foreground mt-0.5">Intenta con otros filtros</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
