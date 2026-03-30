"use client";

import { Heart, Share2, MapPin, Star } from "lucide-react";
import { Space } from "@/core/domain/entities/Space";
import { Button } from "@/presentation/components/ui/button";

interface SpaceDetailHeaderProps {
  space: Space;
  spaceTypeLabel: string;
  spaceTypeColor: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export function SpaceDetailHeader({ space, spaceTypeLabel, spaceTypeColor, isFavorite, onToggleFavorite }: SpaceDetailHeaderProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: space.title,
          text: space.description,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Meta info */}
      <div className="flex items-center gap-3 text-sm">
        <span className={`px-3 py-1 rounded-full text-foreground/90 font-semibold ring-1 ring-inset ${spaceTypeColor}`}>
          {spaceTypeLabel}
        </span>

        {space.rating && space.rating > 0 ? (
          <div className="flex items-center gap-1.5 pl-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-bold text-foreground">{space.rating}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground font-medium underline decoration-muted-foreground/30 hover:decoration-foreground cursor-pointer transition-colors">
              {space.reviewCount} {space.reviewCount === 1 ? "reseña" : "reseñas"}
            </span>
          </div>
        ) : (
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 px-3 py-1 rounded-full ring-1 ring-emerald-200 dark:ring-emerald-800">
            Nuevo en SpaceShare
          </span>
        )}
      </div>

      {/* Main Title & Actions inline row */}
      <div className="flex items-start justify-between gap-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-[1.15]">
          {space.title}
        </h1>

        {/* Action Buttons (Icons only for minimalist look) */}
        <div className="flex items-center gap-2 pt-1">
          <Button
            variant="outline"
            size="icon"
            onClick={handleShare}
            className="rounded-full shadow-sm hover:shadow-md transition-all border-border/50 hover:bg-muted/50"
            title="Compartir"
          >
            <Share2 className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onToggleFavorite}
            className={`rounded-full shadow-sm hover:shadow-md transition-all border-border/50 ${
              isFavorite
                ? "bg-rose-50 border-rose-200 hover:bg-rose-100 dark:bg-rose-950/30 dark:border-rose-800"
                : "hover:bg-muted/50"
            }`}
            title={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
          >
            <Heart className={`w-4 h-4 transition-colors ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Location line under title */}
      <div className="flex items-center gap-2 text-muted-foreground font-medium">
        <MapPin className="w-4 h-4 shrink-0" />
        <span className="underline decoration-muted-foreground/30 hover:decoration-foreground cursor-pointer transition-colors">
          {space.location.address}, {space.location.city}, {space.location.state}
        </span>
      </div>
    </div>
  );
}
