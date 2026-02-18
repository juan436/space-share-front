"use client";

import Image from "next/image";
import { Star, Ruler, Thermometer, Video, DoorOpen, ShieldCheck, Clock } from "lucide-react";
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
  const amenities = [];

  if (space.amenities.climateControlled) {
    amenities.push({ icon: Thermometer, label: "Climatizado" });
  }
  if (space.amenities.securityCamera) {
    amenities.push({ icon: Video, label: "Seguridad" });
  }
  if (space.amenities.privateEntrance) {
    amenities.push({ icon: DoorOpen, label: "Privado" });
  }
  if (space.amenities.access247) {
    amenities.push({ icon: Clock, label: "24/7" });
  }

  const handleClick = () => {
    window.open(`/space/${space.id}`, "_blank");
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "group flex gap-4 p-3 rounded-2xl transition-all duration-300 cursor-pointer",
        "border border-transparent",
        "hover:bg-card hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-border/60",
        isSelected && "bg-card shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-primary/30 ring-1 ring-primary/10"
      )}
    >
      {/* Image */}
      <div className="relative w-52 h-40 flex-shrink-0 rounded-xl overflow-hidden bg-muted">
        {space.images && space.images.length > 0 ? (
          <Image
            src={space.images[0]}
            alt={space.title}
            fill
            className="object-cover group-hover:scale-[1.06] transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
            <Ruler className="w-10 h-10 text-muted-foreground/30" />
          </div>
        )}

        {/* Gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Type badge */}
        <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-card/90 backdrop-blur-sm text-foreground text-[11px] font-semibold rounded-lg shadow-sm">
          {spaceTypeLabels[space.type] || space.type}
        </div>

        {/* Verified badge */}
        {space.verified && (
          <div className="absolute top-2.5 right-2.5 p-1.5 bg-emerald-500 text-white rounded-lg shadow-sm">
            <ShieldCheck className="w-3 h-3" />
          </div>
        )}

        {/* Size at bottom-left on image */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 text-white text-xs font-medium">
          <Ruler className="w-3.5 h-3.5" />
          <span>{space.squareMeters} m²</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between min-w-0 py-0.5">
        <div>
          {/* Title & Rating */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors">
              {space.title}
            </h3>
            {space.rating && space.rating > 0 && (
              <div className="flex items-center gap-1 flex-shrink-0 bg-accent/10 px-2 py-0.5 rounded-md">
                <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                <span className="text-xs font-bold text-accent">{space.rating.toFixed(1)}</span>
                {space.reviewCount && space.reviewCount > 0 && (
                  <span className="text-[10px] text-muted-foreground">({space.reviewCount})</span>
                )}
              </div>
            )}
          </div>

          {/* Location */}
          <p className="text-sm text-muted-foreground mt-1.5">
            {space.location.city}, {space.location.state}
          </p>

          {/* Amenities */}
          {amenities.length > 0 && (
            <div className="flex items-center gap-1.5 mt-3 flex-wrap">
              {amenities.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium text-muted-foreground bg-muted/70 rounded-md"
                >
                  <Icon className="w-3 h-3" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price */}
        <div className="mt-auto pt-2">
          <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            ${space.pricePerMonth.toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground ml-0.5">/mes</span>
        </div>
      </div>
    </div>
  );
}
