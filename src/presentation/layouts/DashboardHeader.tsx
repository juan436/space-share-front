"use client";

import Link from "next/link";
import { LogOut, Compass, ChevronDown, LayoutDashboard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/presentation/components/ui/dropdown-menu";
import { Logo } from "@/presentation/components/shared/Logo";
import { User } from "@/core/domain/entities/User";

const roleNames: Record<string, string> = {
  client: "Cliente",
  host: "Anfitrión",
  admin: "Administrador",
};

interface DashboardHeaderProps {
  user: User;
  title: string;
  onLogout: () => void;
}

export function DashboardHeader({ user, title, onLogout }: DashboardHeaderProps) {
  const initials = user.name
    ? user.name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase()
    : "U";
  const roleName = roleNames[user.role] ?? user.role;

  return (
    <header className="shrink-0 z-40 w-full bg-white dark:bg-card border-b border-border shadow-[0_2px_10px_0_rgb(15_23_42/0.08)]">
      <div className="flex h-[72px] items-center justify-between px-6">
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/" className="md:hidden flex items-center shrink-0">
            <Logo className="h-7 w-auto" />
          </Link>
          <h2 className="hidden md:block text-2xl font-semibold tracking-tight text-foreground truncate">{title}</h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-semibold">
            <LayoutDashboard className="w-3 h-3 mr-1.5" />
            {roleName}
          </span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-border hover:bg-muted/60 transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
                  {initials}
                </div>
                <span className="hidden sm:block text-sm font-medium text-foreground max-w-[120px] truncate">{user.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground group-data-[state=open]:rotate-180 transition-transform duration-200" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8} className="w-52 rounded-xl border border-border/50 shadow-lg shadow-black/5 p-1.5">
              <div className="px-3 py-2">
                <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{user.email}</p>
              </div>
              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuItem asChild className="md:hidden rounded-lg cursor-pointer gap-2.5 px-3 py-2 text-sm">
                <Link href="/explore">
                  <Compass className="w-4 h-4 text-muted-foreground" />
                  Explorar espacios
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1 md:hidden" />
              <DropdownMenuItem
                onClick={onLogout}
                className="rounded-lg cursor-pointer gap-2.5 px-3 py-2 text-sm text-destructive focus:text-destructive focus:bg-destructive/8"
              >
                <LogOut className="w-4 h-4" />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
