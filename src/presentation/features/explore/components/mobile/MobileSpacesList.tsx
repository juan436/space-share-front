"use client";

import type { UIEvent } from "react";
import { Search } from "lucide-react";
import { Space } from "@/core/domain/entities/Space";
import { MobileSpaceCard } from "./MobileSpaceCard";

interface MobileSpacesListProps {
  spaces: Space[];
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
  onSpaceSelect: (space: Space) => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
  onScroll?: (e: UIEvent<HTMLDivElement>) => void;
}

export function MobileSpacesList({
  spaces,
  isFavorite,
  onToggleFavorite,
  onSpaceSelect,
  hasMore,
  isLoadingMore,
  onLoadMore,
  onScroll,
}: MobileSpacesListProps) {
  return (
    <>
      {/* Space Cards */}
      <div onScroll={onScroll} className="flex-1 overflow-y-auto px-4 py-3 pb-24 space-y-3">
        {spaces.map((space) => (
          <MobileSpaceCard
            key={space.id}
            space={space}
            isFavorite={isFavorite(space.id)}
            onToggleFavorite={onToggleFavorite}
            onClick={() => onSpaceSelect(space)}
          />
        ))}

        {hasMore && onLoadMore && (
          <button
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="w-full py-3 rounded-2xl border border-[hsl(214_24%_78%)] text-sm font-semibold text-foreground bg-white dark:bg-card disabled:opacity-60"
          >
            {isLoadingMore ? "Cargando..." : "Ver más espacios"}
          </button>
        )}

        {spaces.length === 0 && (
          <div className="bg-white dark:bg-card border border-[hsl(214_24%_78%)] shadow-[0_2px_8px_rgba(0,0,0,0.07)] rounded-2xl p-10 flex flex-col items-center text-center gap-3 mt-4">
            <div className="w-14 h-14 rounded-2xl bg-muted/60 flex items-center justify-center">
              <Search className="w-6 h-6 text-muted-foreground" />
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
