"use client";

import { useParams } from "next/navigation";
import { SpaceDetailView } from "@/presentation/features/space-detail/SpaceDetailView";
import { useSpaceById } from "@/presentation/hooks/useSpaces";

/** Respaldo para espacios sin slug (datos antiguos) o si el servidor no pudo consultar la API. */
export default function LegacySpaceRoute() {
  const params = useParams();
  const { space, isLoading } = useSpaceById(params.id as string);
  return <SpaceDetailView space={space} isLoading={isLoading} />;
}
