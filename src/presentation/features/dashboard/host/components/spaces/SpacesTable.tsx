"use client";

/**
 * SpacesTable
 *
 * Qué hace: Tabla desktop del inventario de espacios del host con acciones por fila.
 * Recibe:   spaces (SpaceViewModel[]), isLoading, isDeleting, isUpdating, onDeleteSpace, onUpdateStatus, onEditSpace
 * Genera:   Table con columnas título/tipo/estado/m²/precio/acciones; estados vacío y cargando incluidos
 * Procesa:  menú contextual con opciones de activar/pausar/desactivar según estado actual del espacio
 */
import { useRouter } from "next/navigation";
import { Button } from "@/presentation/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/presentation/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/presentation/components/ui/dropdown-menu";
import { MoreHorizontal, Building2 } from "lucide-react";
import { SpaceViewModel, SpaceStatusValue, spaceTypeLabels, getStatusColor, getStatusLabel } from "@/presentation/types/spaces";

interface SpacesTableProps {
  spaces: SpaceViewModel[];
  isLoading: boolean;
  isDeleting: boolean;
  isUpdating: boolean;
  onDeleteSpace: (id: string) => void;
  onUpdateStatus: (id: string, status: SpaceStatusValue) => void;
  onEditSpace: (space: SpaceViewModel) => void;
}

export function SpacesTable({ spaces, isLoading, isDeleting, isUpdating, onDeleteSpace, onUpdateStatus, onEditSpace }: SpacesTableProps) {
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
      <div className="text-center py-8 text-muted-foreground">
        <Building2 className="mx-auto h-12 w-12 mb-4 opacity-50" />
        <p>No tienes espacios registrados</p>
        <p className="text-sm">Haz clic en "Agregar Espacio" para comenzar</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Espacio</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>m²</TableHead>
          <TableHead>Precio/mes</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {spaces.map((space) => (
          <TableRow key={space.id}>
            <TableCell className="font-medium">{space.title}</TableCell>
            <TableCell>{spaceTypeLabels[space.type]}</TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(space.status)}`}>
                {getStatusLabel(space.status)}
              </span>
            </TableCell>
            <TableCell>{space.squareMeters}</TableCell>
            <TableCell>${space.pricePerMonth}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
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
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
