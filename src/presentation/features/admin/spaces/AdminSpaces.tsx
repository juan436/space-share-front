import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/presentation/components/ui/card";
import { Building2 } from "lucide-react";

export function AdminSpaces() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Gestión de Espacios</h1>
        <p className="text-muted-foreground">Administra los espacios de la plataforma</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Espacios</CardTitle>
          <CardDescription>Lista de espacios registrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <Building2 className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p className="text-lg font-medium">Gestión de espacios</p>
            <p className="text-sm">Próximamente disponible</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
