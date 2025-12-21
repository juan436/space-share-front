import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/presentation/components/ui/card";
import { Users } from "lucide-react";

export function AdminUsers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Gestión de Usuarios</h1>
        <p className="text-muted-foreground">Administra los usuarios de la plataforma</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Usuarios</CardTitle>
          <CardDescription>Lista de usuarios registrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <Users className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p className="text-lg font-medium">Gestión de usuarios</p>
            <p className="text-sm">Próximamente disponible</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
