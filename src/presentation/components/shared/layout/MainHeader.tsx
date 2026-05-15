"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/presentation/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/presentation/components/ui/dropdown-menu";
import { useAuth } from "@/presentation/providers/auth-context";
import { LogIn, ChevronRight, LayoutDashboard, LogOut, ChevronDown, Heart } from "lucide-react";

const NAV_LINKS = [
  { href: "/explore", label: "Explorar Espacios" },
  { href: "/how-it-works", label: "Cómo Funciona" },
  { href: "/contact", label: "Contacto" },
];

interface MainHeaderProps {
  activeLink?: string;
}

export function MainHeader({ activeLink }: MainHeaderProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const dashboardPath = user?.role === "client"
    ? "/dashboard/user"
    : user?.role ? `/dashboard/${user.role}` : "/dashboard/user";

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const initials = user?.name
    ? user.name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase()
    : "U";

  return (
    <header className="sticky top-0 z-50 w-full glass-strong border-b border-border/40 shadow-[0_1px_12px_0_rgb(0_0_0/0.05)]">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between gap-8">

          <Link href="/" className="flex items-center flex-shrink-0">
            <span className="text-[1.4rem] font-bold tracking-tight leading-none">
              <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">Space</span>
              <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">Share</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {NAV_LINKS.map((link) => {
              const isActive = activeLink === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 flex-shrink-0">
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-full border border-border/50 hover:border-border hover:bg-muted/30 transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm">
                      {initials}
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-foreground max-w-[120px] truncate">{user.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground group-data-[state=open]:rotate-180 transition-transform duration-200" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={8} className="w-56 rounded-xl border border-border/50 shadow-lg shadow-black/5 p-1.5">
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
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="gap-2 rounded-full h-9 px-4 text-muted-foreground hover:text-foreground">
                    <LogIn className="w-4 h-4" />
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="rounded-full h-9 px-5 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-sm shadow-primary/20 font-medium">
                    Registrarse
                    <ChevronRight className="w-4 h-4 ml-1" />
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
