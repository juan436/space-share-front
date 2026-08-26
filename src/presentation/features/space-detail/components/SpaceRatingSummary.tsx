"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { SpaceHostSummary } from "@/core/domain/entities/Space";

interface SpaceRatingSummaryProps {
  rating?: number;
  reviewCount?: number;
  host?: SpaceHostSummary;
}

function getHostingTenure(hostSince?: Date): string | null {
  if (!hostSince) return null;
  const months = Math.floor((Date.now() - hostSince.getTime()) / (1000 * 60 * 60 * 24 * 30));
  if (months < 12) return "Menos de 1 año anfitrionando";
  const years = Math.floor(months / 12);
  return `${years} ${years === 1 ? "año" : "años"} anfitrionando`;
}

export function SpaceRatingSummary({ rating, reviewCount, host }: SpaceRatingSummaryProps) {
  const hasRating = Boolean(rating && rating > 0);
  const isGuestFavorite = hasRating && rating! >= 4.5 && (reviewCount ?? 0) >= 3;
  const isSuperhost = hasRating && rating! >= 4.8 && (reviewCount ?? 0) >= 5;
  const tenure = getHostingTenure(host?.hostSince);

  const initials = (host?.name || "A")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (!isGuestFavorite && !hasRating && !host) return null;

  return (
    <div className="flex flex-col gap-5">
      {isGuestFavorite && (
        <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 p-6 flex items-center gap-6">
          <Star className="w-9 h-9 fill-primary text-primary shrink-0" />

          <div className="flex-1 min-w-0">
            <p className="text-base font-semibold text-foreground">Favorito entre huéspedes</p>
            <p className="text-sm text-muted-foreground mt-0.5">
              Según los huéspedes, uno de los alojamientos más populares en SpaceShare
            </p>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{rating}</p>
              <p className="text-xs text-muted-foreground whitespace-nowrap">Calificación</p>
            </div>
            <div className="w-px h-10 bg-foreground/15" />
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{reviewCount}</p>
              <p className="text-xs text-muted-foreground whitespace-nowrap">{reviewCount === 1 ? "Reseña" : "Reseñas"}</p>
            </div>
          </div>
        </div>
      )}

      {!isGuestFavorite && hasRating && (
        <div className="flex items-center gap-1.5">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-bold text-foreground">{rating}</span>
          <span className="text-sm text-muted-foreground">
            · {reviewCount} {reviewCount === 1 ? "reseña" : "reseñas"}
          </span>
        </div>
      )}

      {host && (
        <div className="flex items-center gap-4">
          {host.avatar ? (
            <Image src={host.avatar} alt={host.name} width={56} height={56} className="w-14 h-14 rounded-full object-cover shrink-0" />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-base font-bold shrink-0">
              {initials}
            </div>
          )}
          <div>
            <p className="text-sm text-muted-foreground">
              Anfitrión: <span className="font-semibold text-foreground">{host.name}</span>
            </p>
            {(isSuperhost || tenure) && (
              <p className="text-sm text-muted-foreground">
                {[isSuperhost ? "Superanfitrión" : null, tenure].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
