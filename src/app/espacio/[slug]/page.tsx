"use client";

import { useParams } from "next/navigation";
import { SpaceDetailView } from "@/presentation/features/space-detail/SpaceDetailView";
import { useSpaceBySlug } from "@/presentation/hooks/useSpaces";

export default function SpaceBySlugRoute() {
  const params = useParams();
  const { space, isLoading } = useSpaceBySlug(params.slug as string);
  return <SpaceDetailView space={space} isLoading={isLoading} />;
}
