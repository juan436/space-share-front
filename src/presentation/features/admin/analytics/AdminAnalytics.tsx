"use client";

import { useAdminAnalytics } from "@/presentation/features/admin/hooks/useAdminAnalytics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/presentation/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/presentation/components/ui/table";
import {
  BarChart3, Users, Building2, Calendar,
  Loader2, AlertCircle, TrendingUp, Star, DollarSign,
} from "lucide-react";
import { RESERVATION_STATUS_LABEL, RESERVATION_STATUS_COLOR } from "@/presentation/shared/constants/space-labels";

export function AdminAnalytics() {
  const { data, isLoading, error, totalStatusCount, totalRevenue, maxRevenue } = useAdminAnalytics();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analíticas</h1>
          <p className="text-muted-foreground">Estadísticas de la plataforma</p>
        </div>
        <div className="flex items-center gap-3 p-5 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analíticas</h1>
        <p className="text-muted-foreground">Estadísticas detalladas de la plataforma</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Usuarios", value: data.totalUsers, icon: Users, color: "text-primary" },
          { label: "Espacios", value: data.totalSpaces, icon: Building2, color: "text-violet-600" },
          { label: "Reservas", value: data.totalReservations, icon: Calendar, color: "text-accent" },
          { label: "Ingresos Totales", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-emerald-600" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{item.value}</p>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Reservation Status Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Reservas por Estado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(data.reservationsByStatus).map(([status, count]) => (
              <div key={status} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{RESERVATION_STATUS_LABEL[status] || status}</span>
                  <span className="font-medium">{count}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full ${RESERVATION_STATUS_COLOR[status] || "bg-gray-400"}`}
                    style={{ width: `${(count / totalStatusCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Monthly Revenue */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Ingresos Mensuales
            </CardTitle>
            <CardDescription>Últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            {data.monthlyRevenue.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">Sin datos de ingresos aún</p>
            ) : (
              <div className="space-y-3">
                {data.monthlyRevenue.map((m) => (
                  <div key={m.month} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{m.month}</span>
                      <span className="font-medium">${m.total.toLocaleString()} ({m.count} reservas)</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{ width: `${(m.total / maxRevenue) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5" />
              Usuarios Recientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Registro</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.recentUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs capitalize">{user.role}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {user.createdAt.toLocaleDateString("es-ES", { day: "numeric", month: "short" })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Spaces */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="w-5 h-5" />
              Espacios Destacados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Espacio</TableHead>
                  <TableHead>Reservas</TableHead>
                  <TableHead>Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.topSpaces.map((space) => (
                  <TableRow key={space.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{space.title}</p>
                        <p className="text-xs text-muted-foreground">${space.pricePerMonth}/mes</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{space.bookingsCount}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                        {space.rating.toFixed(1)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
