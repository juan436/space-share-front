"use client";

/**
 * MobileSpacesList
 *
 * Qué hace: Lista mobile del inventario de espacios del host. Alternativa responsive a SpacesTable.
 * Recibe:   spaces (SpaceViewModel[]), isLoading, isDeleting, isUpdating, onDeleteSpace, onUpdateStatus, onEditSpace
 * Genera:   tarjetas apiladas con título, ubicación, estado y chips de tipo/m²/precio
 * Procesa:  misma lógica de menú contextual que SpacesTable; estado vacío y cargando incluidos
 */
import { useRouter } from "next/navigation";
import { Button } from "@/presentation/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/presentation/components/ui/dropdown-menu";
import { MoreHorizontal, Building2, Ruler, DollarSign, MapPin } from "lucide-react";
import { SpaceViewModel, SpaceStatusValue, spaceTypeLabels, getStatusColor, getStatusLabel } from "@/presentation/types/spaces";

interface MobileSpacesListProps {
  spaces: SpaceViewModel[];
  isLoading: boolean;
  isDeleting: boolean;
  isUpdating: boolean;
  onDeleteSpace: (id: string) => void;
  onUpdateStatus: (id: string, status: SpaceStatusValue) => void;
  onEditSpace: (space: SpaceViewModel) => void;
}

export function MobileSpacesList({ spaces, isLoading, isDeleting, isUpdating, onDeleteSpace, onUpdateStatus, onEditSpace }: MobileSpacesListProps) {
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (spaces.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        <Building2 className="mx-auto h-12 w-12 mb-4 opacity-50" />
        <p className="font-medium">No tienes espacios registrados</p>
        <p className="text-sm">Toca "Agregar Espacio" para comenzar</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {spaces.map((space) => (
        <div key={space.id} className="rounded-xl border bg-card p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-semibold truncate">{space.title}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3" />
                <span className="truncate">
                  {[space.city, space.state, space.country].filter(Boolean).join(", ") || "Sin ubicación"}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${getStatusColor(space.status)}`}>
                {getStatusLabel(space.status)}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
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

          <div className="flex flex-wrap gap-2 mt-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-[11px]">
              <Building2 className="h-3 w-3" />
              {spaceTypeLabels[space.type]}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-[11px]">
              <Ruler className="h-3 w-3" />
              {space.squareMeters} m²
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-[11px]">
              <DollarSign className="h-3 w-3" />
              ${space.pricePerMonth}/mes
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
