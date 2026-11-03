"use client";

import { SpaceDetailPage } from "@/presentation/features/space-detail";
import { Space } from "@/core/domain/entities/Space";
import { spaceTypeLabels } from "@/presentation/types/spaces";
import { spaceTypeColors } from "@/presentation/features/explore/data";

export function SpaceDetailView({ space, isLoading }: { space: Space | null; isLoading: boolean }) {

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!space) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
          <p className="text-muted-foreground mb-6">Espacio no encontrado</p>
          <a
            href="/explore"
            className="text-primary hover:underline"
          >
            Volver a explorar
          </a>
        </div>
      </div>
    );
  }

  return (
    <SpaceDetailPage
      space={space}
      spaceTypeLabel={spaceTypeLabels[space.type as keyof typeof spaceTypeLabels] || space.type}
      spaceTypeColor={spaceTypeColors[space.type] || "bg-gray-500"}
    />
  );
}
