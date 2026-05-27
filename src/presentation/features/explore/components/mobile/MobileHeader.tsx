"use client";

import Link from "next/link";
import { Logo } from "@/presentation/components/shared/Logo";
import { useRouter } from "next/navigation";
import { UserCircle2, LogIn, UserPlus, LayoutDashboard, LogOut, Heart } from "lucide-react";
import { useAuth } from "@/presentation/providers/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/presentation/components/ui/dropdown-menu";

export function MobileHeader() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const dashboardPath =
    user?.role === "client"
      ? "/dashboard/user"
      : user?.role
        ? `/dashboard/${user.role}`
        : "/dashboard/user";

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

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
    <div className="flex items-center justify-between px-4 pt-0 pb-[0.1rem] border-b border-border/50">
      <Link href="/" className="flex items-center">
        <Logo className="h-12 w-12" />
      </Link>

      {/* User Icon & Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={`relative flex items-center justify-center w-10 h-10 rounded-full border border-border/50 transition-all active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
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
        </DropdownMenuTrigger>

        {isAuthenticated && user ? (
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-56 rounded-xl border border-border/50 shadow-lg shadow-black/5 p-1.5"
          >
            {/* User info header */}
            <div className="px-3 py-2.5 mb-1">
              <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate mt-0.5">{user.email}</p>
            </div>

            <DropdownMenuSeparator className="my-1" />

            <DropdownMenuItem asChild className="rounded-lg cursor-pointer gap-2.5 px-3 py-2 text-sm">
              <Link href={dashboardPath}>
                <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                Panel administrativo
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="rounded-lg cursor-pointer gap-2.5 px-3 py-2 text-sm">
              <Link href="/favorites">
                <Heart className="w-4 h-4 text-muted-foreground" />
                Guardados
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-1" />

            <DropdownMenuItem
              onClick={handleLogout}
              className="rounded-lg cursor-pointer gap-2.5 px-3 py-2 text-sm text-destructive focus:text-destructive focus:bg-destructive/8"
            >
              <LogOut className="w-4 h-4" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-56 rounded-xl border border-border/50 shadow-lg shadow-black/5 p-1.5"
          >
            <div className="px-3 py-2.5 mb-1 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-border/40">
              <p className="text-xs font-medium text-muted-foreground">¡Bienvenido!</p>
              <p className="text-sm font-semibold text-foreground mt-0.5">Accede a tu cuenta</p>
            </div>

            <DropdownMenuSeparator className="my-1" />

            <DropdownMenuItem asChild className="rounded-lg cursor-pointer gap-2.5 px-3 py-2 text-sm">
              <Link href="/login">
                <LogIn className="w-4 h-4 text-primary" />
                Iniciar Sesión
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild className="rounded-lg cursor-pointer gap-2.5 px-3 py-2 text-sm">
              <Link href="/register">
                <UserPlus className="w-4 h-4 text-accent" />
                Registrarse
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  );
}
