"use client";

import { useRouter } from "next/navigation";
import { MoreHorizontal, Ruler } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/presentation/components/ui/dropdown-menu";
import { PanelCard } from "@/presentation/components/shared/panel/PanelCard";
import { SpaceViewModel, SpaceStatusValue, spaceTypeLabels, listingTypeLabels } from "@/presentation/types/spaces";
import { SPACE_STATUS_LABEL } from "@/presentation/shared/constants/space-labels";
import { SPACE_TONE, TONE_DOT } from "@/presentation/shared/constants/status-tones";

export interface SpaceCardActions {
  isDeleting: boolean;
  isUpdating: boolean;
  onDeleteSpace: (id: string) => void;
  onUpdateStatus: (id: string, status: SpaceStatusValue) => void;
  onEditSpace: (space: SpaceViewModel) => void;
}

export function SpaceCard({ space, actions }: { space: SpaceViewModel; actions: SpaceCardActions }) {
  const router = useRouter();
  const { isDeleting, isUpdating, onDeleteSpace, onUpdateStatus, onEditSpace } = actions;
  const kind = space.listingType === "storage" ? spaceTypeLabels[space.type] : listingTypeLabels[space.listingType];
  const unit = space.listingType === "garage" ? `${space.capacity} vehículo${space.capacity > 1 ? "s" : ""}` : `${space.squareMeters} m²`;

  return (
    <PanelCard
      image={space.images?.[0]}
      alt={space.title}
      onImageClick={() => onEditSpace(space)}
      badge={
        <>
          <span className={`w-2 h-2 rounded-full ${TONE_DOT[SPACE_TONE[space.status] ?? "neutral"]}`} />
          {SPACE_STATUS_LABEL[space.status]}
        </>
      }
      bottomLeft={<><Ruler className="w-3.5 h-3.5" /><span>{unit}</span></>}
      topRight={
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button type="button" aria-label="Acciones" className="p-1.5 rounded-full bg-white/90 dark:bg-card/90 backdrop-blur-sm hover:bg-white shadow-sm transition-colors">
              <MoreHorizontal className="w-4 h-4 text-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => onEditSpace(space)}>Editar</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => router.push(`/space/${space.id}?from=/dashboard/host/spaces`)}>Ver detalles</DropdownMenuItem>
            <DropdownMenuSeparator />
            {space.status !== "active" && (
              <DropdownMenuItem disabled={isUpdating} onSelect={() => onUpdateStatus(space.id, "active")}>Activar</DropdownMenuItem>
            )}
            {space.status === "active" && (
              <DropdownMenuItem disabled={isUpdating} onSelect={() => onUpdateStatus(space.id, "paused")}>Pausar</DropdownMenuItem>
            )}
            {(space.status === "active" || space.status === "paused") && (
              <DropdownMenuItem disabled={isUpdating} onSelect={() => onUpdateStatus(space.id, "deactivated")}>Desactivar</DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" disabled={isDeleting} onSelect={() => onDeleteSpace(space.id)}>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      }
    >
      <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">{space.title}</h3>
      <p className="text-xs text-muted-foreground">{space.city}{space.state ? `, ${space.state}` : ""}</p>
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="px-2 py-0.5 text-[11px] font-medium text-muted-foreground bg-muted/70 rounded-md">{kind}</span>
      </div>
      <div className="flex items-center justify-between mt-1">
        <div>
          <span className="text-base font-bold bg-gradient-to-r from-[hsl(var(--primary-ink))] to-[hsl(var(--primary-ink)/0.85)] bg-clip-text text-transparent">
            ${space.pricePerMonth.toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground ml-0.5">/mes</span>
        </div>
        <button type="button" onClick={() => onEditSpace(space)} className="text-xs font-semibold text-primary hover:underline">Editar</button>
      </div>
    </PanelCard>
  );
}
