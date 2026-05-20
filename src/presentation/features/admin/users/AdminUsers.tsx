"use client";

import { useState, useEffect, useMemo } from "react";
import { useRepositories } from "@/presentation/providers/repositories-context";
import { AdminUser } from "@/core/domain/entities/AdminStats";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/presentation/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/presentation/components/ui/table";
import { Users, Loader2, AlertCircle, Search } from "lucide-react";

const roleBadge: Record<string, string> = {
  admin: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  host: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
  client: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
};

const roleLabel: Record<string, string> = {
  admin: "Admin",
  host: "Anfitrión",
  client: "Cliente",
};

export function AdminUsers() {
  const { adminRepository } = useRepositories();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    adminRepository
      .getUsers()
      .then(setUsers)
      .catch(() => setError("No se pudieron cargar los usuarios"))
      .finally(() => setIsLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
    );
  }, [users, search]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Gestión de Usuarios</h1>
        <p className="text-muted-foreground">Administra los usuarios de la plataforma</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Usuarios</CardTitle>
              <CardDescription>{users.length} usuarios registrados</CardDescription>
            </div>
            <div className="relative">
              <label htmlFor="admin-user-search" className="sr-only">Buscar usuarios</label>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                id="admin-user-search"
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
              <Users className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p className="text-sm">No se encontraron usuarios</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Registro</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleBadge[user.role] || roleBadge.client}`}>
                        {roleLabel[user.role] || user.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.isActive ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}>
                        {user.isActive ? "Activo" : "Inactivo"}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(user.createdAt).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
