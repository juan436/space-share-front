"use client";

import { memo } from "react";
import Image from "next/image";
import { MapPin, Star, Ruler, Heart, Thermometer, Video, DoorOpen } from "lucide-react";
import { Space } from "@/core/domain/entities/Space";
import { spaceTypeColors } from "../../data";
import { spaceTypeLabels } from "@/presentation/types/spaces";
import { useRouter } from "next/navigation";
import { useAuth } from "@/presentation/providers/auth-context";
import { resolveHostId } from "@/presentation/utils/resolveHostId";

interface MobileSpaceCardProps {
  space: Space;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClick: () => void;
  returnPath?: string;
}

export const MobileSpaceCard = memo(function MobileSpaceCard({ space, isFavorite, onToggleFavorite, onClick, returnPath }: MobileSpaceCardProps) {
  const router = useRouter();
  const { user } = useAuth();
  const isOwner = user?.id === resolveHostId(space.hostId);

  const handleClick = () => {
    if (onClick) onClick();
    const query = returnPath ? `?from=${encodeURIComponent(returnPath)}` : "";
    router.push(`/space/${space.id}${query}`);
  };

  return (
    <div onClick={handleClick} className="bg-card rounded-2xl overflow-hidden shadow-sm border active:scale-[0.98] transition-transform">
      <div className="relative aspect-[16/10] bg-gradient-to-br from-primary/10 to-accent/10">
        {space.images && space.images.length > 0 ? (
          <Image src={space.images[0]} alt={space.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Ruler className="w-16 h-16 text-muted-foreground/20" />
          </div>
        )}
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ring-1 ring-inset backdrop-blur-sm ${spaceTypeColors[space.type]}`}>
          {spaceTypeLabels[space.type]}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(space.id); }}
          aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-rose-500 text-rose-500" : "text-muted-foreground"}`} />
        </button>
        <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-sm shadow-sm">
          <span className="text-lg font-bold text-primary">${space.pricePerMonth}</span>
          <span className="text-xs text-muted-foreground">/mes</span>
        </div>
        {isOwner && (
          <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-bold shadow-sm">
            Tu publicación
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-base leading-tight">{space.title}</h3>
          {space.rating && space.rating > 0 ? (
            <div className="flex items-center gap-1 shrink-0">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium">{space.rating}</span>
            </div>
          ) : (
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full ring-1 ring-emerald-200 shrink-0">Nuevo</span>
          )}
        </div>
        <div className="flex items-center gap-1.5 mt-1.5 text-sm text-muted-foreground">
          <MapPin className="w-3.5 h-3.5" /><span>{space.location.city}</span>
        </div>
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-dashed">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Ruler className="w-4 h-4" /><span>{space.squareMeters} m²</span>
          </div>
          <div className="flex items-center gap-2">
            {space.amenities.securityCamera && <Video className="w-4 h-4 text-muted-foreground" />}
            {space.amenities.climateControlled && <Thermometer className="w-4 h-4 text-muted-foreground" />}
            {space.amenities.privateEntrance && <DoorOpen className="w-4 h-4 text-muted-foreground" />}
          </div>
        </div>
      </div>
    </div>
  );
});
