"use client";

import { ArrowLeft, Heart, MapPin, Star, Ruler, Thermometer, Video, DoorOpen } from "lucide-react";
import { Space } from "@/core/domain/entities/Space";
import { Button } from "@/presentation/components/ui/button";
import { spaceTypeColors } from "../../data";
import { spaceTypeLabels } from "@/presentation/types/spaces";

interface MobileSpaceDetailProps {
  space: Space;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClose: () => void;
}

export function MobileSpaceDetail({ space, isFavorite, onToggleFavorite, onClose }: MobileSpaceDetailProps) {
  return (
    <div className="fixed inset-0 bg-white dark:bg-background z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border/60 bg-white dark:bg-card">
        <button
          onClick={onClose}
          className="p-2 -ml-2 rounded-xl hover:bg-muted/60 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-semibold text-base flex-1 truncate">{space.title}</h1>
        <button
          onClick={() => onToggleFavorite(space.id)}
          className={`p-2 -mr-2 rounded-xl transition-colors ${isFavorite ? "text-rose-500" : "hover:bg-muted/60"}`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Image */}
        <div className="aspect-video bg-muted flex items-center justify-center">
          <Ruler className="w-16 h-16 text-muted-foreground/20" />
        </div>

        <div className="p-4 space-y-5">
          {/* Type + Rating */}
          <div className="flex items-center justify-between gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ring-1 ring-inset ${spaceTypeColors[space.type]}`}>
              {spaceTypeLabels[space.type]}
            </span>
            {space.rating && space.rating > 0 && (
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-sm font-bold">{space.rating}</span>
                <span className="text-xs text-muted-foreground">({space.reviewCount})</span>
              </div>
            )}
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>{space.location.city}, {space.location.state}</span>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">{space.description}</p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white dark:bg-card border border-border/60 shadow-[0_1px_4px_rgba(0,0,0,0.05)] rounded-xl p-4 text-center">
              <div className="w-8 h-8 rounded-lg bg-muted/60 flex items-center justify-center mx-auto mb-2">
                <Ruler className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-xl font-bold text-foreground">{space.squareMeters}</p>
              <p className="text-xs text-muted-foreground">metros²</p>
            </div>
            <div className="bg-white dark:bg-card border border-border/60 shadow-[0_1px_4px_rgba(0,0,0,0.05)] rounded-xl p-4 text-center">
              <p className="text-xl font-bold text-foreground">${space.pricePerMonth}</p>
              <p className="text-xs text-muted-foreground">por mes</p>
            </div>
          </div>

          {/* Amenities */}
          {(space.amenities.climateControlled || space.amenities.securityCamera || space.amenities.privateEntrance) && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Características</p>
              <div className="flex flex-wrap gap-2">
                {space.amenities.climateControlled && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400">
                    <Thermometer className="w-3.5 h-3.5" />Clima controlado
                  </span>
                )}
                {space.amenities.securityCamera && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400">
                    <Video className="w-3.5 h-3.5" />Cámara de seguridad
                  </span>
                )}
                {space.amenities.privateEntrance && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-violet-50 text-violet-700 dark:bg-violet-950/20 dark:text-violet-400">
                    <DoorOpen className="w-3.5 h-3.5" />Entrada privada
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-4 border-t border-border/60 bg-white dark:bg-card safe-area-bottom">
        <Button className="w-full h-11 text-sm font-semibold rounded-xl">
          Contactar al anfitrión
        </Button>
      </div>
    </div>
  );
}
