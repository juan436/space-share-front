"use client";

import Image from "next/image";
import { Star, Ruler, Thermometer, Video, DoorOpen } from "lucide-react";
import { Space } from "@/core/domain/entities/Space";
import { cn } from "@/presentation/utils/cn";

interface SpaceCardProps {
  space: Space;
  isSelected?: boolean;
  onClick?: () => void;
}

const spaceTypeLabels: Record<string, string> = {
  garage: "Garaje",
  basement: "Sótano",
  attic: "Ático",
  storage: "Bodega",
  other: "Otro",
};

export function SpaceCard({ space, isSelected, onClick }: SpaceCardProps) {
  const amenitiesIcons = [];
  
  if (space.amenities.climateControlled) {
    amenitiesIcons.push({ icon: Thermometer, label: "Clima controlado" });
  }
  if (space.amenities.securityCamera) {
    amenitiesIcons.push({ icon: Video, label: "Cámara de seguridad" });
  }
  if (space.amenities.privateEntrance) {
    amenitiesIcons.push({ icon: DoorOpen, label: "Entrada privada" });
  }

  const handleClick = () => {
    // Open detail page in new tab
    window.open(`/space/${space.id}`, "_blank");
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "group flex gap-4 p-4 bg-card rounded-xl border-2 transition-all cursor-pointer hover:shadow-lg",
        isSelected 
          ? "border-primary shadow-lg" 
          : "border-transparent hover:border-primary/30"
      )}
    >
      {/* Image */}
      <div className="relative w-48 h-36 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
        {space.images && space.images.length > 0 ? (
          <Image
            src={space.images[0]}
            alt={space.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
            <Ruler className="w-12 h-12 text-muted-foreground/50" />
          </div>
        )}
        {/* Badge de tipo */}
        <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-md">
          {spaceTypeLabels[space.type] || space.type}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          {/* Title and Rating */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground text-lg truncate">
              {space.title}
            </h3>
            {space.rating && space.rating > 0 && (
              <div className="flex items-center gap-1 flex-shrink-0">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span className="text-sm font-medium">{space.rating.toFixed(1)}</span>
                {space.reviewCount && space.reviewCount > 0 && (
                  <span className="text-xs text-muted-foreground">
                    ({space.reviewCount})
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Location */}
          <p className="text-sm text-muted-foreground mt-1">
            {space.location.city}, {space.location.state}
          </p>

          {/* Size */}
          <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
            <Ruler className="w-4 h-4" />
            <span>{space.squareMeters} m²</span>
          </div>

          {/* Amenities */}
          {amenitiesIcons.length > 0 && (
            <div className="flex items-center gap-3 mt-2">
              {amenitiesIcons.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1 text-xs text-muted-foreground"
                  title={label}
                >
                  <Icon className="w-4 h-4" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price */}
        <div className="mt-3">
          <span className="text-xl font-bold text-primary">
            ${space.pricePerMonth.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground">/mes</span>
        </div>
      </div>
    </div>
  );
}
