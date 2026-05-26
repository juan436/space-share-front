"use client";

import { useMemo, useState } from "react";
import { Space } from "@/core/domain/entities/Space";
import { SpaceCard } from "./SpaceCard";
import { useFavorites } from "@/presentation/hooks/useFavorites";
import { cn } from "@/presentation/utils/cn";
import { PaginationBar } from "@/presentation/components/shared/PaginationBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/presentation/components/ui/select";

interface SpacesListProps {
  spaces: Space[];
  selectedSpaceId?: string;
  onSpaceSelect?: (spaceId: string) => void;
  isLoading?: boolean;
  showMap?: boolean;
  totalSpaces?: number;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}


export function SpacesList({ spaces, selectedSpaceId, onSpaceSelect, isLoading, showMap, totalSpaces, page = 1, totalPages = 1, onPageChange }: SpacesListProps) {
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
      <div className={cn(
        "px-6 py-5",
        showMap
          ? "grid grid-cols-1 sm:grid-cols-2 gap-3"
          : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4"
      )}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <div key={i} className="rounded-2xl overflow-hidden border border-border/40">
            <div className="w-full aspect-[4/3] shimmer" />
            <div className="p-3.5 space-y-2">
              <div className="h-4 shimmer rounded-lg w-3/4" />
              <div className="h-3 shimmer rounded-lg w-1/2" />
              <div className="h-5 shimmer rounded-lg w-1/3 mt-2" />
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

  const displayTotal = totalSpaces ?? spaces.length;

  return (
    <div className="px-6 py-5 pb-8 space-y-4">
      {/* Results header */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">{displayTotal}</span> espacios disponibles
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-muted-foreground">Ordenar por:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="h-8 text-xs font-semibold bg-white dark:bg-card border border-border/50 rounded-xl px-3 w-auto focus:ring-0 focus:ring-offset-0 hover:border-border transition-colors gap-1.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recomendados</SelectItem>
              <SelectItem value="price-asc">Precio ↑</SelectItem>
              <SelectItem value="price-desc">Precio ↓</SelectItem>
              <SelectItem value="size-asc">Tamaño ↑</SelectItem>
              <SelectItem value="size-desc">Tamaño ↓</SelectItem>
              <SelectItem value="rating">Mejor valorados</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Cards */}
      <div
        className={cn(
          "transition-all duration-500",
          showMap
            ? "grid grid-cols-1 sm:grid-cols-2 gap-3"
            : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4"
        )}
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

      {/* Pagination */}
      <PaginationBar page={page} totalPages={totalPages} onPageChange={(p) => onPageChange?.(p)} className="pt-6" />
    </div>
  );
}
