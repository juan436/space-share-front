"use client";

import { memo } from "react";
import Image from "next/image";
import { Star, Ruler, Thermometer, Video, DoorOpen, ShieldCheck, Clock, Heart } from "lucide-react";
import { Space } from "@/core/domain/entities/Space";
import { cn } from "@/presentation/utils/cn";
import { useAuth } from "@/presentation/providers/auth-context";
import { useRouter } from "next/navigation";
import { spaceTypeLabels } from "@/presentation/types/spaces";
import { resolveHostId } from "@/presentation/utils/resolveHostId";

interface SpaceCardProps {
  space: Space;
  isSelected?: boolean;
  onClick?: () => void;
  returnPath?: string;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export const SpaceCard = memo(function SpaceCard({ space, isSelected, onClick, returnPath, isFavorite, onToggleFavorite }: SpaceCardProps) {
  const router = useRouter();
  const { user } = useAuth();
  const isOwner = user?.id === resolveHostId(space.hostId);

  const amenities = [];
  if (space.amenities.climateControlled) amenities.push({ icon: Thermometer, label: "Climatizado" });
  if (space.amenities.securityCamera) amenities.push({ icon: Video, label: "Seguridad" });
  if (space.amenities.privateEntrance) amenities.push({ icon: DoorOpen, label: "Privado" });
  if (space.amenities.access247) amenities.push({ icon: Clock, label: "24/7" });

  const handleClick = () => {
    if (onClick) onClick();
    const query = returnPath ? `?from=${encodeURIComponent(returnPath)}` : "";
    router.push(`/space/${space.id}${query}`);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "group flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-all duration-300",
        "bg-white dark:bg-card border border-border/40",
        "hover:shadow-[0_8px_30px_rgb(0,0,0,0.10)] hover:border-border/60",
        isSelected && "shadow-[0_8px_30px_rgb(0,0,0,0.10)] border-primary/30 ring-1 ring-primary/10"
      )}
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3] flex-shrink-0 bg-muted">
        {space.images && space.images.length > 0 ? (
          <Image src={space.images[0]} alt={space.title} fill className="object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
            <Ruler className="w-10 h-10 text-muted-foreground/30" />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Type + verified badge */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2.5 py-1 bg-white/90 dark:bg-card/90 backdrop-blur-sm text-foreground text-[11px] font-semibold rounded-lg shadow-sm">
          {spaceTypeLabels[space.type] ?? space.type}
          {space.verified && <ShieldCheck className="w-3 h-3 text-emerald-500" />}
        </div>

        {/* Heart */}
        {onToggleFavorite && (
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(space.id); }}
            className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 dark:bg-card/90 backdrop-blur-sm hover:bg-white dark:hover:bg-card shadow-sm transition-colors"
            aria-label={isFavorite ? "Quitar de guardados" : "Guardar espacio"}
            title={isFavorite ? "Quitar de guardados" : "Guardar espacio"}
          >
            <Heart className={cn("w-4 h-4 transition-colors", isFavorite ? "fill-rose-500 text-rose-500" : "text-muted-foreground group-hover:text-rose-500")} />
          </button>
        )}

        {/* Owner badge */}
        {isOwner && (
          <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-[11px] font-bold rounded-lg shadow-sm">
            Tu publicación
          </div>
        )}

        {/* Size */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 text-white text-xs font-medium">
          <Ruler className="w-3.5 h-3.5" /><span>{space.squareMeters} m²</span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5 p-3.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {space.title}
          </h3>
          {space.rating && space.rating > 0 ? (
            <div className="flex items-center gap-1 bg-accent/10 px-2 py-0.5 rounded-md flex-shrink-0">
              <Star className="w-3.5 h-3.5 fill-accent text-accent" />
              <span className="text-xs font-bold text-accent">{space.rating.toFixed(1)}</span>
              {space.reviewCount && space.reviewCount > 0 && (
                <span className="text-[10px] text-muted-foreground">({space.reviewCount})</span>
              )}
            </div>
          ) : (
            <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md ring-1 ring-emerald-200 dark:ring-emerald-800 flex-shrink-0">Nuevo</span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">{space.location.city}, {space.location.state}</p>
        {amenities.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            {amenities.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium text-muted-foreground bg-muted/70 rounded-md">
                <Icon className="w-3 h-3" /><span>{label}</span>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between mt-1">
          <div>
            <span className="text-base font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              ${space.pricePerMonth.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground ml-0.5">/mes</span>
          </div>
          <span className="text-xs font-semibold text-primary">Ver detalles</span>
        </div>
      </div>
    </div>
  );
});
