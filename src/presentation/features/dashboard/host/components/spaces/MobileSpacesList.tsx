"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/presentation/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/presentation/components/ui/dropdown-menu";
import { MoreHorizontal, Building2, Ruler, DollarSign, MapPin } from "lucide-react";
import { SpaceViewModel, SpaceStatusValue, spaceTypeLabels } from "@/presentation/types/spaces";
import { SPACE_STATUS_BADGE, SPACE_STATUS_LABEL } from "@/presentation/shared/constants/space-labels";

interface MobileSpacesListProps {
  spaces: SpaceViewModel[];
  isLoading: boolean;
  isDeleting: boolean;
  isUpdating: boolean;
  onDeleteSpace: (id: string) => void;
  onUpdateStatus: (id: string, status: SpaceStatusValue) => void;
  onEditSpace: (space: SpaceViewModel) => void;
}

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-card border border-border/60 rounded-2xl p-4 space-y-3 animate-pulse">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2 flex-1 min-w-0">
          <div className="h-4 bg-muted rounded-lg w-3/4" />
          <div className="h-3 bg-muted rounded-lg w-1/2" />
        </div>
        <div className="h-6 w-16 bg-muted rounded-full shrink-0" />
      </div>
      <div className="flex gap-2">
        <div className="h-6 w-20 bg-muted rounded-full" />
        <div className="h-6 w-16 bg-muted rounded-full" />
        <div className="h-6 w-24 bg-muted rounded-full" />
      </div>
    </div>
  );
}

export function MobileSpacesList({ spaces, isLoading, isDeleting, isUpdating, onDeleteSpace, onUpdateStatus, onEditSpace }: MobileSpacesListProps) {
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="space-y-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (spaces.length === 0) {
    return (
      <div className="bg-white dark:bg-card border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.07)] rounded-2xl p-8 flex flex-col items-center text-center gap-3">
        <div className="h-14 w-14 rounded-xl bg-muted/60 flex items-center justify-center">
          <Building2 className="h-7 w-7 text-muted-foreground/60" />
        </div>
        <div>
          <p className="font-semibold text-foreground">Sin espacios registrados</p>
          <p className="text-sm text-muted-foreground mt-0.5">Toca "Agregar Espacio" para comenzar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {spaces.map((space) => (
        <div key={space.id} className="bg-white dark:bg-card border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.07)] rounded-2xl p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm text-foreground truncate">{space.title}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <MapPin className="h-3 w-3 shrink-0" />
                <span className="truncate">
                  {[space.city, space.state, space.country].filter(Boolean).join(", ") || "Sin ubicación"}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${SPACE_STATUS_BADGE[space.status]}`}>
                {SPACE_STATUS_LABEL[space.status]}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl hover:bg-muted/60">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-xl">
                  <DropdownMenuItem onSelect={() => onEditSpace(space)}>
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => router.push(`/space/${space.id}?from=/dashboard/host/spaces`)}>
                    Ver Detalles
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {space.status !== "active" && (
                    <DropdownMenuItem
                      disabled={isUpdating}
                      onSelect={() => onUpdateStatus(space.id, "active")}
                    >
                      Activar
                    </DropdownMenuItem>
                  )}
                  {space.status === "active" && (
                    <DropdownMenuItem
                      disabled={isUpdating}
                      onSelect={() => onUpdateStatus(space.id, "paused")}
                    >
                      Pausar
                    </DropdownMenuItem>
                  )}
                  {(space.status === "active" || space.status === "paused") && (
                    <DropdownMenuItem
                      disabled={isUpdating}
                      onSelect={() => onUpdateStatus(space.id, "deactivated")}
                    >
                      Desactivar
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive"
                    disabled={isDeleting}
                    onSelect={() => onDeleteSpace(space.id)}
                  >
                    Eliminar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border/40">
            <span className="inline-flex items-center gap-1 rounded-full bg-muted text-muted-foreground px-2.5 py-1 text-[11px] font-medium">
              <Building2 className="h-3 w-3" />
              {spaceTypeLabels[space.type]}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-muted text-muted-foreground px-2.5 py-1 text-[11px] font-medium">
              <Ruler className="h-3 w-3" />
              {space.squareMeters} m²
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 px-2.5 py-1 text-[11px] font-medium">
              <DollarSign className="h-3 w-3" />
              ${space.pricePerMonth}/mes
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
