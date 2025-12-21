import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/presentation/components/ui/card";
import { Calendar } from "lucide-react";

export function HostReservations() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reservaciones</h1>
        <p className="text-muted-foreground">Gestiona las reservaciones de tus espacios</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reservaciones Recibidas</CardTitle>
          <CardDescription>Solicitudes de reservación para tus espacios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <Calendar className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p className="text-lg font-medium">No tienes reservaciones aún</p>
            <p className="text-sm">Cuando alguien reserve tus espacios, aparecerá aquí</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
