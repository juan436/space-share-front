"use client";

import Image from "next/image";
import { MapPin, Star, Ruler, Heart, Thermometer, Video, DoorOpen } from "lucide-react";
import { Space } from "@/core/domain/entities/Space";
import { spaceTypeLabels, spaceTypeColors } from "../../data";

interface MobileSpaceCardProps {
  space: Space;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClick: () => void;
}

export function MobileSpaceCard({ space, isFavorite, onToggleFavorite, onClick }: MobileSpaceCardProps) {
  const handleClick = () => {
    // Open detail page in new tab
    window.open(`/space/${space.id}`, "_blank");
  };

  return (
    <div
      onClick={handleClick}
      className="bg-card rounded-2xl overflow-hidden shadow-sm border active:scale-[0.98] transition-transform"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] bg-gradient-to-br from-primary/10 to-accent/10">
        {space.images && space.images.length > 0 ? (
          <Image
            src={space.images[0]}
            alt={space.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Ruler className="w-16 h-16 text-muted-foreground/20" />
          </div>
        )}

        {/* Type Badge */}
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-white text-xs font-semibold ${spaceTypeColors[space.type]}`}>
          {spaceTypeLabels[space.type]}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(space.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>

        {/* Price Badge */}
        <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-sm shadow-sm">
          <span className="text-lg font-bold text-primary">${space.pricePerMonth}</span>
          <span className="text-xs text-muted-foreground">/mes</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title & Rating */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-base leading-tight">{space.title}</h3>
          {space.rating && (
            <div className="flex items-center gap-1 shrink-0">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium">{space.rating}</span>
            </div>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 mt-1.5 text-sm text-muted-foreground">
          <MapPin className="w-3.5 h-3.5" />
          <span>{space.location.city}</span>
        </div>

        {/* Size & Amenities */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-dashed">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Ruler className="w-4 h-4" />
            <span>{space.squareMeters} m²</span>
          </div>
          <div className="flex items-center gap-2">
            {space.amenities.securityCamera && (
              <Video className="w-4 h-4 text-muted-foreground" />
            )}
            {space.amenities.climateControlled && (
              <Thermometer className="w-4 h-4 text-muted-foreground" />
            )}
            {space.amenities.privateEntrance && (
              <DoorOpen className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
