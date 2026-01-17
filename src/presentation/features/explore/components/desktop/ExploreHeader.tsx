"use client";

import Link from "next/link";
import { Button } from "@/presentation/components/ui/button";
import { useAuth } from "@/presentation/providers/auth-context";
import { User, LogIn } from "lucide-react";

export function ExploreHeader() {
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">
              <span className="text-primary">Space</span>
              <span className="text-accent">Share</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/explore" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Explorar Espacios
            </Link>
            <Link 
              href="/how-it-works" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Cómo Funciona
            </Link>
            <Link 
              href="/become-host" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Conviértete en Anfitrión
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              <>
                <Link href={`/dashboard/${user.role === "client" ? "user" : user.role}`}>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">{user.name}</span>
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <LogIn className="w-4 h-4" />
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    Registrarse
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
