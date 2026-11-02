"use client";

import { useRouter } from "next/navigation";
import { MoreHorizontal, Warehouse } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/presentation/components/ui/dropdown-menu";
import { SpaceViewModel, SpaceStatusValue, spaceTypeLabels, listingTypeLabels } from "@/presentation/types/spaces";
import { SPACE_STATUS_LABEL } from "@/presentation/shared/constants/space-labels";

const DOT: Record<string, string> = {
  active: "bg-emerald-500",
  paused: "bg-amber-500",
  pending: "bg-blue-500",
  deactivated: "bg-gray-400",
};

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
    <div className="group">
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted">
        <button type="button" onClick={() => onEditSpace(space)} className="block w-full h-full" aria-label={`Editar ${space.title}`}>
          {space.images?.[0] ? (
            <img src={space.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/10 to-accent/10 text-primary/60">
              <Warehouse className="w-10 h-10" strokeWidth={1.5} />
              <span className="text-xs font-medium">Sin foto</span>
            </div>
          )}
        </button>

        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 text-foreground text-xs font-semibold shadow-sm pointer-events-none">
          <span className={`w-2 h-2 rounded-full ${DOT[space.status] ?? "bg-gray-400"}`} />
          {SPACE_STATUS_LABEL[space.status]}
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button type="button" aria-label="Acciones" className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 shadow-sm flex items-center justify-center hover:bg-white">
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
      </div>

      <p className="text-[15px] font-semibold text-foreground mt-3 truncate">{space.title}</p>
      <p className="text-sm text-muted-foreground truncate">
        {space.city}{space.state ? `, ${space.state}` : ""}
      </p>
      <p className="text-sm text-foreground mt-0.5">
        <span className="font-semibold">${space.pricePerMonth}</span>
        <span className="text-muted-foreground"> /mes · {unit} · {kind}</span>
      </p>
    </div>
  );
}
