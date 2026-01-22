"use client";

import { useParams } from "next/navigation";
import { SpaceDetailPage } from "@/presentation/features/space-detail";
import { mockSpaces, spaceTypeLabels, spaceTypeColors } from "@/presentation/features/explore/data";

export default function SpaceDetailRoute() {
  const params = useParams();
  const spaceId = params.id as string;

  // Find the space by ID
  const space = mockSpaces.find((s) => s.id === spaceId);

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
      spaceTypeLabel={spaceTypeLabels[space.type] || space.type}
      spaceTypeColor={spaceTypeColors[space.type] || "bg-gray-500"}
    />
  );
}
