"use client";

import { Space } from "@/core/domain/entities/Space";
import { SpaceCard } from "./SpaceCard";

interface SpacesListProps {
  spaces: Space[];
  selectedSpaceId?: string;
  onSpaceSelect?: (spaceId: string) => void;
  isLoading?: boolean;
}

export function SpacesList({ spaces, selectedSpaceId, onSpaceSelect, isLoading }: SpacesListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="flex gap-4 p-4 bg-card rounded-xl">
              <div className="w-48 h-36 bg-muted rounded-lg" />
              <div className="flex-1 space-y-3">
                <div className="h-5 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
                <div className="h-4 bg-muted rounded w-1/4" />
                <div className="h-6 bg-muted rounded w-1/3 mt-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (spaces.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No se encontraron espacios
        </h3>
        <p className="text-muted-foreground max-w-sm">
          Intenta ajustar los filtros de búsqueda o explora otras ubicaciones.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Results count */}
      <div className="flex items-center justify-between pb-2 border-b">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{spaces.length}</span> espacios disponibles
        </p>
        <select className="text-sm bg-transparent border-none text-muted-foreground cursor-pointer focus:outline-none">
          <option value="recommended">Ordenar: Recomendados</option>
          <option value="price-asc">Precio: Menor a Mayor</option>
          <option value="price-desc">Precio: Mayor a Menor</option>
          <option value="size-asc">Tamaño: Menor a Mayor</option>
          <option value="size-desc">Tamaño: Mayor a Menor</option>
          <option value="rating">Mejor valorados</option>
        </select>
      </div>

      {/* Space Cards */}
      <div className="space-y-3">
        {spaces.map((space) => (
          <SpaceCard
            key={space.id}
            space={space}
            isSelected={space.id === selectedSpaceId}
            onClick={() => onSpaceSelect?.(space.id)}
          />
        ))}
      </div>
    </div>
  );
}
