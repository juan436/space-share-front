"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserCircle2, LogIn, UserPlus, X, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "@/presentation/providers/auth-context";

export function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const dashboardPath =
    user?.role === "client"
      ? "/dashboard/user"
      : user?.role
        ? `/dashboard/${user.role}`
        : "/dashboard/user";

  const handleLogout = async () => {
    setIsMenuOpen(false);
    await logout();
    router.push("/");
  };

  // Close menu on outside tap
  useEffect(() => {
    if (!isMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isMenuOpen]);

  // Get initials from name
  const initials = user?.name
    ? user.name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
    : "U";

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <Link href="/" className="text-xl font-bold tracking-tight">
        <span className="text-primary">Space</span>
        <span className="text-accent">Share</span>
      </Link>

      {/* User Icon & Dropdown */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`relative flex items-center justify-center w-10 h-10 rounded-full border border-border/50 transition-all active:scale-95 ${
            isAuthenticated ? "bg-gradient-to-br from-primary to-accent shadow-sm" : "bg-gradient-to-br from-primary/10 to-accent/10"
          }`}
          aria-label="Menú de usuario"
        >
          {isAuthenticated ? (
             <span className="text-white text-sm font-bold">{initials}</span>
          ) : (
            <UserCircle2 className="w-5 h-5 text-primary" />
          )}
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <>
            {/* Backdrop for mobile */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-56 bg-card rounded-2xl shadow-xl border border-border/60 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Menu Header */}
              {isAuthenticated && user ? (
                <div className="px-4 py-3 bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border/40">
                  <p className="text-xs font-medium text-muted-foreground">¡Hola,</p>
                  <p className="text-sm font-semibold text-foreground mt-0.5 truncate">{user.name}!</p>
                </div>
              ) : (
                <div className="px-4 py-3 bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border/40">
                  <p className="text-xs font-medium text-muted-foreground">¡Bienvenido!</p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">Accede a tu cuenta</p>
                </div>
              )}

              {/* Menu Items */}
              <div className="p-2">
                {isAuthenticated ? (
                  <>
                    <Link
                      href={dashboardPath}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-primary/5 active:bg-primary/10 transition-colors"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                        <LayoutDashboard className="w-4 h-4 text-primary" />
                      </div>
                      Panel administrativo
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/5 active:bg-destructive/10 transition-colors"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-destructive/10">
                        <LogOut className="w-4 h-4 text-destructive" />
                      </div>
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-primary/5 active:bg-primary/10 transition-colors"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                        <LogIn className="w-4 h-4 text-primary" />
                      </div>
                      Iniciar Sesión
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-accent/5 active:bg-accent/10 transition-colors"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10">
                        <UserPlus className="w-4 h-4 text-accent" />
                      </div>
                      Registrarse
                    </Link>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
