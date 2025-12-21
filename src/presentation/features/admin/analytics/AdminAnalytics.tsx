import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/presentation/components/ui/card";
import { BarChart3 } from "lucide-react";

export function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analíticas</h1>
        <p className="text-muted-foreground">Estadísticas de la plataforma</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dashboard de Analíticas</CardTitle>
          <CardDescription>Métricas y estadísticas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <BarChart3 className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p className="text-lg font-medium">Analíticas</p>
            <p className="text-sm">Próximamente disponible</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
