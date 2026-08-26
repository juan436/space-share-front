"use client";

import { Sparkles } from "lucide-react";
import { Space } from "@/core/domain/entities/Space";

interface SpaceDetailHeaderProps {
  space: Space;
  spaceTypeLabel: string;
  spaceTypeColor: string;
}

export function SpaceDetailHeader({ space, spaceTypeLabel }: SpaceDetailHeaderProps) {
  const hasRating = space.rating && space.rating > 0;

  return (
    <div className="flex flex-col gap-5">

      {/* Row 1: subtítulo tipo + ubicación */}
      <div className="flex flex-col gap-1.5">
        <h2 className="text-2xl font-semibold text-foreground">
          {spaceTypeLabel}: espacio rentado en {space.location.city}, {space.location.country}
        </h2>

        {!hasRating && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 ring-1 ring-inset ring-amber-200 dark:ring-amber-800/50 self-start">
            <Sparkles className="w-3 h-3" />
            Nuevo en SpaceShare
          </span>
        )}
      </div>

    </div>
  );
}
