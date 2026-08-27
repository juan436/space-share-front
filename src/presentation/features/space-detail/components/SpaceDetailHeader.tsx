"use client";

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
          <span className="text-base font-semibold text-foreground underline underline-offset-4 decoration-1">
            Recién publicado
          </span>
        )}
      </div>

    </div>
  );
}
