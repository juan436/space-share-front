"use client";

import { useMemo, useState } from "react";
import { Space } from "@/core/domain/entities/Space";
import { SpaceCard } from "./SpaceCard";
import { useFavorites } from "@/presentation/hooks/useFavorites";

interface SpacesListProps {
  spaces: Space[];
  selectedSpaceId?: string;
  onSpaceSelect?: (spaceId: string) => void;
  isLoading?: boolean;
  showMap?: boolean;
}

export function SpacesList({ spaces, selectedSpaceId, onSpaceSelect, isLoading, showMap }: SpacesListProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [sortBy, setSortBy] = useState("recommended");

  const sortedSpaces = useMemo(() => {
    const sorted = [...spaces];
    switch (sortBy) {
      case "price-asc": return sorted.sort((a, b) => a.pricePerMonth - b.pricePerMonth);
      case "price-desc": return sorted.sort((a, b) => b.pricePerMonth - a.pricePerMonth);
      case "size-asc": return sorted.sort((a, b) => a.squareMeters - b.squareMeters);
      case "size-desc": return sorted.sort((a, b) => b.squareMeters - a.squareMeters);
      case "rating": return sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      default: return sorted;
    }
  }, [spaces, sortBy]);

  if (isLoading) {
    return (
      <div className={showMap ? "space-y-3 px-6 py-5" : "grid grid-cols-2 gap-4 px-6 py-5"}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-4 p-3 rounded-2xl">
            <div className="w-52 h-40 shimmer rounded-xl" />
            <div className="flex-1 space-y-3 py-1">
              <div className="h-5 shimmer rounded-lg w-3/4" />
              <div className="h-4 shimmer rounded-lg w-1/2" />
              <div className="flex gap-1.5 mt-3">
                <div className="h-5 shimmer rounded-md w-16" />
                <div className="h-5 shimmer rounded-md w-14" />
              </div>
              <div className="h-6 shimmer rounded-lg w-24 mt-auto" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (spaces.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-6">
        <div className="w-20 h-20 mb-5 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
          <svg className="w-10 h-10 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-1.5">No se encontraron espacios</h3>
        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
          Ajusta los filtros de búsqueda o explora otras ubicaciones.
        </p>
      </div>
    );
  }

  return (
    <div className="px-6 py-5 pb-20 space-y-4">
      {/* Results header */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">{spaces.length}</span> espacios disponibles
          </p>
        </div>
        <select
          aria-label="Ordenar espacios"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-xs font-medium bg-background/50 border border-border/50 rounded-full px-3 py-1.5 text-muted-foreground cursor-pointer focus:outline-none focus:border-primary/40 transition-colors"
        >
          <option value="recommended">Recomendados</option>
          <option value="price-asc">Precio ↑</option>
          <option value="price-desc">Precio ↓</option>
          <option value="size-asc">Tamaño ↑</option>
          <option value="size-desc">Tamaño ↓</option>
          <option value="rating">Mejor valorados</option>
        </select>
      </div>

      {/* Cards — single column with map, 2-column grid without */}
      <div
        className={`transition-all duration-500 ${showMap
            ? "space-y-2"
            : "grid grid-cols-1 lg:grid-cols-2 gap-4"
          }`}
      >
        {sortedSpaces.map((space, idx) => (
          <div
            key={space.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${idx * 40}ms` }}
          >
            <SpaceCard
              space={space}
              isSelected={space.id === selectedSpaceId}
              onClick={() => onSpaceSelect?.(space.id)}
              isFavorite={isFavorite(space.id)}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
