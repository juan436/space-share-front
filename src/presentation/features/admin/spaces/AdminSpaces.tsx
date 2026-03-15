"use client";

import { useState, useEffect } from "react";
import { adminRepository } from "@/bootstrap/application";
import { AdminSpace } from "@/core/domain/entities/AdminStats";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/presentation/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/presentation/components/ui/table";
import { Building2, Loader2, AlertCircle, Search, Star, MapPin } from "lucide-react";

const statusBadge: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  paused: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  pending: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  deactivated: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
};

const statusLabel: Record<string, string> = {
  active: "Activo",
  paused: "Pausado",
  pending: "Pendiente",
  deactivated: "Desactivado",
};

const typeLabel: Record<string, string> = {
  garage: "Garaje",
  parking: "Parking",
  basement: "Sótano",
  attic: "Ático",
  storage: "Almacén",
  other: "Otro",
};

export function AdminSpaces() {
  const [spaces, setSpaces] = useState<AdminSpace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    adminRepository
      .getSpaces()
      .then(setSpaces)
      .catch(() => setError("No se pudieron cargar los espacios"))
      .finally(() => setIsLoading(false));
  }, []);

  const filtered = spaces.filter((s) => {
    const q = search.toLowerCase();
    const hostName = typeof s.hostId === "object" ? s.hostId.name : "";
    return (
      s.title.toLowerCase().includes(q) ||
      s.location.city.toLowerCase().includes(q) ||
      hostName.toLowerCase().includes(q) ||
      s.type.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Gestión de Espacios</h1>
        <p className="text-muted-foreground">Administra los espacios de la plataforma</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Espacios</CardTitle>
              <CardDescription>{spaces.length} espacios registrados</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="flex items-center gap-3 p-5 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Building2 className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p className="text-sm">No se encontraron espacios</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Espacio</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead>Anfitrión</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((space) => {
                  const hostName = typeof space.hostId === "object" ? space.hostId.name : "—";
                  return (
                    <TableRow key={space._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {space.images[0] ? (
                            <img
                              src={space.images[0]}
                              alt={space.title}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                              <Building2 className="w-5 h-5 text-muted-foreground" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-sm">{space.title}</p>
                            <p className="text-xs text-muted-foreground">{space.squareMeters} m²</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{typeLabel[space.type] || space.type}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5" />
                          {space.location.city}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{hostName}</TableCell>
                      <TableCell className="font-medium text-sm">${space.pricePerMonth}/mes</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                          {(space.rating || 0).toFixed(1)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge[space.status] || statusBadge.pending}`}>
                          {statusLabel[space.status] || space.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
