"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/presentation/providers/auth-context";

/**
 * AuthGuard
 *
 * Qué hace: Protege cualquier árbol de componentes que requiera sesión activa.
 * Recibe:   `children` — nodos React a renderizar si la sesión está confirmada.
 * Genera:   Spinner de carga, `null` (mientras redirige), o `children` cuando hay sesión.
 * Procesa:  Lee `isLoading` e `isAuthenticated` de `useAuth`; redirige a `/login` si no hay sesión.
 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-sm text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
