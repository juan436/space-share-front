"use client";

import { useAuth } from "@/presentation/providers/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/presentation/components/ui/button";
import { Building2, Users, Shield } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      const dashboardRoutes: Record<string, string> = {
        client: "/dashboard/user",
        host: "/dashboard/host",
        admin: "/dashboard/admin",
      };
      router.push(dashboardRoutes[user.role] || "/dashboard/user");
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight">
              <span className="text-primary">Space</span>
              <span className="text-accent">Share</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Conectamos personas que tienen espacios de almacenamiento extra con quienes los necesitan.
              Tu garaje, sótano o ático puede generar ingresos.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="w-full sm:w-auto">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Registrarse
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            ¿Cómo funciona?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-background shadow-sm">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Para Anfitriones
              </h3>
              <p className="text-muted-foreground">
                Publica tu espacio disponible y comienza a generar ingresos pasivos de manera sencilla.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-background shadow-sm">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Para Clientes
              </h3>
              <p className="text-muted-foreground">
                Encuentra espacios de almacenamiento cerca de ti a precios accesibles.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-background shadow-sm">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                <Shield className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Seguro y Confiable
              </h3>
              <p className="text-muted-foreground">
                Sistema de verificación y reseñas para garantizar transacciones seguras.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-background border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; 2024 SpaceShare. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
