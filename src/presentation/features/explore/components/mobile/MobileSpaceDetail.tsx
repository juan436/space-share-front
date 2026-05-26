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
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b bg-card">
        <button 
          onClick={onClose}
          className="p-2 -ml-2 rounded-full hover:bg-muted"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-semibold text-lg flex-1 truncate">{space.title}</h1>
        <button 
          onClick={() => onToggleFavorite(space.id)}
          className="p-2 -mr-2 rounded-full hover:bg-muted"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Image */}
        <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <Ruler className="w-20 h-20 text-muted-foreground/30" />
        </div>

        {/* Info */}
        <div className="p-4 space-y-4">
          {/* Type & Rating */}
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ring-1 ring-inset ${spaceTypeColors[space.type]}`}>
              {spaceTypeLabels[space.type]}
            </span>
            {space.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-medium">{space.rating}</span>
                <span className="text-muted-foreground text-sm">({space.reviewCount})</span>
              </div>
            )}
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{space.location.city}, {space.location.state}</span>
          </div>

          {/* Description */}
          <p className="text-muted-foreground">{space.description}</p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted/50 rounded-xl p-4 text-center">
              <Ruler className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{space.squareMeters}</p>
              <p className="text-sm text-muted-foreground">metros²</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-4 text-center">
              <span className="text-2xl">💰</span>
              <p className="text-2xl font-bold text-primary">${space.pricePerMonth}</p>
              <p className="text-sm text-muted-foreground">por mes</p>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="font-semibold mb-3">Características</h3>
            <div className="flex flex-wrap gap-2">
              {space.amenities.climateControlled && (
                <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg">
                  <Thermometer className="w-4 h-4" />
                  <span className="text-sm">Clima controlado</span>
                </div>
              )}
              {space.amenities.securityCamera && (
                <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg">
                  <Video className="w-4 h-4" />
                  <span className="text-sm">Cámara de seguridad</span>
                </div>
              )}
              {space.amenities.privateEntrance && (
                <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-2 rounded-lg">
                  <DoorOpen className="w-4 h-4" />
                  <span className="text-sm">Entrada privada</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-4 border-t bg-card safe-area-bottom">
        <Button className="w-full h-12 text-base font-semibold">
          Contactar al anfitrión
        </Button>
      </div>
    </div>
  );
}
