"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, Share2, MapPin, Star, Sparkles, Check, Link as LinkIcon } from "lucide-react";
import { Space } from "@/core/domain/entities/Space";

interface SpaceDetailHeaderProps {
  space: Space;
  spaceTypeLabel: string;
  spaceTypeColor: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export function SpaceDetailHeader({ space, spaceTypeLabel, spaceTypeColor, isFavorite, onToggleFavorite }: SpaceDetailHeaderProps) {
  const [shareStatus, setShareStatus] = useState<"idle" | "copied" | "error">("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: space.title, text: space.description, url: window.location.href });
        return;
      } catch { /* user cancelled */ }
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareStatus("copied");
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setShareStatus("idle"), 2000);
    } catch {
      setShareStatus("error");
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setShareStatus("idle"), 3000);
    }
  };

  const hasRating = space.rating && space.rating > 0;

  return (
    <div className="flex flex-col gap-5">

      {/* Row 1: tipo + acciones */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ring-1 ring-inset ${spaceTypeColor}`}>
            {spaceTypeLabel}
          </span>

          {hasRating ? (
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-sm font-bold text-foreground">{space.rating}</span>
              <span className="text-muted-foreground text-sm">·</span>
              <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors underline underline-offset-2 decoration-muted-foreground/30">
                {space.reviewCount} {space.reviewCount === 1 ? "reseña" : "reseñas"}
              </span>
            </div>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 ring-1 ring-inset ring-amber-200 dark:ring-amber-800/50">
              <Sparkles className="w-3 h-3" />
              Nuevo en SpaceShare
            </span>
          )}
        </div>

        {/* Botones acción */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleShare}
            title="Compartir"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground bg-white dark:bg-card border border-border/60 shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all"
          >
            {shareStatus === "copied" ? (
              <><Check className="w-3.5 h-3.5 text-emerald-600" /><span className="text-emerald-600">Copiado</span></>
            ) : (
              <><Share2 className="w-3.5 h-3.5" />Compartir</>
            )}
          </button>

          <button
            onClick={onToggleFavorite}
            title={isFavorite ? "Quitar de favoritos" : "Guardar"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all ${
              isFavorite
                ? "bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/30 dark:border-rose-800 dark:text-rose-400"
                : "bg-white dark:bg-card border-border/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            <Heart className={`w-3.5 h-3.5 transition-colors ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`} />
            {isFavorite ? "Guardado" : "Guardar"}
          </button>
        </div>
      </div>

      {/* Row 2: Título */}
      <div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-[1.1]">
          {space.title}
        </h1>
      </div>

      {/* Row 3: Precio + ubicación */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl md:text-3xl font-extrabold text-foreground">${space.pricePerMonth.toLocaleString()}</span>
          <span className="text-sm font-medium text-muted-foreground">/mes</span>
        </div>

        <div className="w-px h-5 bg-border/60 hidden sm:block" />

        <div className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer group">
          <MapPin className="w-4 h-4 shrink-0 text-primary group-hover:text-primary" />
          <span className="underline underline-offset-2 decoration-muted-foreground/30 group-hover:decoration-foreground">
            {space.location.address}, {space.location.city}, {space.location.state}
          </span>
        </div>
      </div>

    </div>
  );
}
