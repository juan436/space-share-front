"use client";

import { useAuth } from "@/presentation/providers/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Button } from "@/presentation/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/presentation/components/ui/dropdown-menu";
import {
  LogOut,
  Home,
  Building2,
  Calendar,
  MessageSquare,
  Users,
  BarChart3,
  Compass,
  ChevronDown,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/presentation/utils/cn";

// ── Tab content components ──
import { UserHome, UserReservations } from "@/presentation/features/dashboard/user";
import { HostHome, HostDashboard, HostReservations } from "@/presentation/features/dashboard/host";
import { Messages } from "@/presentation/features/messages";
import { AdminHome, AdminUsers, AdminSpaces, AdminAnalytics } from "@/presentation/features/admin";

// ── Tab definitions per role ──
type TabDef = { id: string; icon: typeof Home; label: string };

const clientTabs: TabDef[] = [
  { id: "home", icon: Home, label: "Inicio" },
  { id: "reservations", icon: Calendar, label: "Mis Reservaciones" },
  { id: "messages", icon: MessageSquare, label: "Mensajes" },
];

const hostTabs: TabDef[] = [
  { id: "home", icon: Home, label: "Inicio" },
  { id: "spaces", icon: Building2, label: "Mis Espacios" },
  { id: "reservations", icon: Calendar, label: "Reservaciones" },
  { id: "messages", icon: MessageSquare, label: "Mensajes" },
];

const adminTabs: TabDef[] = [
  { id: "home", icon: Home, label: "Inicio" },
  { id: "users", icon: Users, label: "Usuarios" },
  { id: "spaces", icon: Building2, label: "Espacios" },
  { id: "analytics", icon: BarChart3, label: "Analíticas" },
];

// ── Tab content registry per role ──
function ClientContent({ tab }: { tab: string }) {
  switch (tab) {
    case "reservations": return <UserReservations />;
    case "messages": return <Messages />;
    default: return <UserHome />;
  }
}

function HostContent({ tab }: { tab: string }) {
  switch (tab) {
    case "spaces": return <HostDashboard />;
    case "reservations": return <HostReservations />;
    case "messages": return <Messages />;
    default: return <HostHome />;
  }
}

function AdminContent({ tab }: { tab: string }) {
  switch (tab) {
    case "users": return <AdminUsers />;
    case "spaces": return <AdminSpaces />;
    case "analytics": return <AdminAnalytics />;
    default: return <AdminHome />;
  }
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("home");

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

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const initials = user.name
    ? user.name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase()
    : "U";

  const roleName = user.role === "client" ? "Cliente" : user.role === "host" ? "Anfitrión" : "Admin";

  // Get tabs for current role
  const tabs = user.role === "client" ? clientTabs : user.role === "host" ? hostTabs : adminTabs;

  // Render content for current role + tab
  const renderContent = () => {
    if (user.role === "client") return <ClientContent tab={activeTab} />;
    if (user.role === "host") return <HostContent tab={activeTab} />;
    return <AdminContent tab={activeTab} />;
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 w-full glass-strong border-b border-border/40 shadow-[0_1px_12px_0_rgb(0_0_0/0.05)]">
        <div className="flex h-14 items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <span className="text-xl font-bold tracking-tight leading-none">
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Space</span>
              <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">Share</span>
            </span>
          </Link>

          {/* Right side: role badge + user dropdown */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-md bg-primary/8 text-primary text-xs font-semibold">
              <LayoutDashboard className="w-3 h-3 mr-1.5" />
              {roleName}
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-border/50 hover:border-border hover:bg-muted/30 transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
                    {initials}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-foreground max-w-[120px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground group-data-[state=open]:rotate-180 transition-transform duration-200" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8} className="w-52 rounded-xl border border-border/50 shadow-lg shadow-black/5 p-1.5">
                <div className="px-3 py-2">
                  <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{user.email}</p>
                </div>
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuItem asChild className="rounded-lg cursor-pointer gap-2.5 px-3 py-2 text-sm">
                  <Link href="/explore">
                    <Compass className="w-4 h-4 text-muted-foreground" />
                    Explorar Espacios
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
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* ── Sidebar ── */}
        <aside className="hidden md:flex w-60 flex-col bg-card/50 border-r border-border/40">
          <nav className="flex-1 px-3 py-4 space-y-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 text-left",
                    isActive
                      ? "bg-primary/10 text-primary border-l-2 border-primary ml-0"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border-l-2 border-transparent"
                  )}
                >
                  <tab.icon className={cn("h-[18px] w-[18px]", isActive && "text-primary")} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Bottom: Explore CTA */}
          <div className="px-3 pb-4">
            <Link href="/explore">
              <Button className="w-full rounded-xl h-10 bg-gradient-to-r from-primary to-primary/90 shadow-sm shadow-primary/20 font-medium text-sm gap-2 justify-center">
                <Compass className="w-4 h-4" />
                Explorar Espacios
                <ArrowRight className="w-3.5 h-3.5 ml-auto" />
              </Button>
            </Link>
          </div>
        </aside>

        {/* ── Mobile Navigation ── */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-card/95 backdrop-blur-lg safe-area-bottom">
          <div className="flex justify-around py-1.5">
            {tabs.slice(0, 4).map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex flex-col items-center gap-0.5 p-2 rounded-lg transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="text-[10px] font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* ── Main Content (tab-based, no route navigation) ── */}
        <main className="flex-1 overflow-y-auto thin-scrollbar pb-20 md:pb-0">
          <div className="mx-auto w-full max-w-6xl px-6 py-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
