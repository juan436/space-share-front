import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/presentation/components/ui/card";
import { MessageSquare } from "lucide-react";

export function Messages() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Mensajes</h1>
        <p className="text-muted-foreground">Comunicación con otros usuarios</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bandeja de Entrada</CardTitle>
          <CardDescription>Tus conversaciones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <MessageSquare className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p className="text-lg font-medium">No tienes mensajes</p>
            <p className="text-sm">Tus conversaciones aparecerán aquí</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
