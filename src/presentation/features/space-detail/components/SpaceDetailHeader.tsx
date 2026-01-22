"use client";

import { Heart, Share2, MapPin, Star } from "lucide-react";
import { Space } from "@/core/domain/entities/Space";
import { Button } from "@/presentation/components/ui/button";

interface SpaceDetailHeaderProps {
  space: Space;
  spaceTypeLabel: string;
  spaceTypeColor: string;
}

export function SpaceDetailHeader({ space, spaceTypeLabel, spaceTypeColor }: SpaceDetailHeaderProps) {
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
    <div className="space-y-4">
      {/* Title Row */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${spaceTypeColor}`}>
              {spaceTypeLabel}
            </span>
            {space.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold">{space.rating}</span>
                <span className="text-muted-foreground">({space.reviewCount} reseñas)</span>
              </div>
            )}
          </div>
          
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            {space.title}
          </h1>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>
              {space.location.address}, {space.location.city}, {space.location.state}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Compartir</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Heart className="w-4 h-4" />
            <span className="hidden sm:inline">Guardar</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
