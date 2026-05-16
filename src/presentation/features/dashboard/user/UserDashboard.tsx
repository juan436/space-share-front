/**
 * UserDashboard
 *
 * Qué hace: Panel principal del usuario con stats de resumen y acceso rápido a reservaciones.
 * Recibe:   nada — obtiene usuario del contexto de auth
 * Genera:   grid de stat cards (hardcodeadas pendiente P1), empty state de reservaciones y CTA de exploración
 */
import { useAuth } from "@/presentation/providers/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/presentation/components/ui/card";
import { Button } from "@/presentation/components/ui/button";
import { Search, Calendar, DollarSign, Package, TrendingUp } from "lucide-react";
import Link from "next/link";

export function UserDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          ¡Hola, {user?.name}!
        </h1>
        <p className="text-muted-foreground">
          Bienvenido a tu panel de cliente
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reservaciones Activas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              1 finalizando esta semana
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gasto Mensual</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$850</div>
            <p className="text-xs text-muted-foreground">
              -8% vs mes anterior
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Espacios Alquilados</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Diferentes anfitriones
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45d</div>
            <p className="text-xs text-muted-foreground">
              Acumulado este año
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Empty state - No reservations yet */}
      <Card>
        <CardHeader>
          <CardTitle>Mis Reservaciones</CardTitle>
          <CardDescription>
            Aquí aparecerán tus reservaciones de espacios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <Search className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p className="text-lg font-medium">No tienes reservaciones aún</p>
            <p className="text-sm mb-4">Explora los espacios disponibles y haz tu primera reservación</p>
            <Link href="/">
              <Button>Buscar Espacios</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="flex flex-col md:flex-row items-center justify-between p-6">
          <div>
            <h3 className="text-lg font-semibold">¿Necesitas espacio de almacenamiento?</h3>
            <p className="text-muted-foreground">Explora los espacios disponibles cerca de ti</p>
          </div>
          <Link href="/">
            <Button className="mt-4 md:mt-0">Buscar Espacios</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
