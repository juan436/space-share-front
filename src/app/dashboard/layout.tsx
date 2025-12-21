"use client";

import { useAuth } from "@/presentation/providers/auth-context";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/presentation/components/ui/button";
import { LogOut, Home, Building2, Calendar, MessageSquare, Users, BarChart3 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/presentation/utils/cn";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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

  const getNavItems = () => {
    const baseItems = [
      { href: `/dashboard/${user.role === "client" ? "user" : user.role}`, icon: Home, label: "Inicio" },
    ];

    if (user.role === "client") {
      return [
        ...baseItems,
        { href: "/dashboard/user/reservations", icon: Calendar, label: "Mis Reservaciones" },
        { href: "/dashboard/messages", icon: MessageSquare, label: "Mensajes" },
      ];
    }

    if (user.role === "host") {
      return [
        ...baseItems,
        { href: "/dashboard/host/spaces", icon: Building2, label: "Mis Espacios" },
        { href: "/dashboard/host/reservations", icon: Calendar, label: "Reservaciones" },
        { href: "/dashboard/messages", icon: MessageSquare, label: "Mensajes" },
      ];
    }

    if (user.role === "admin") {
      return [
        ...baseItems,
        { href: "/dashboard/admin/users", icon: Users, label: "Usuarios" },
        { href: "/dashboard/admin/spaces", icon: Building2, label: "Espacios" },
        { href: "/dashboard/admin/analytics", icon: BarChart3, label: "Analíticas" },
      ];
    }

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">
              <span className="text-primary">Space</span>
              <span className="text-accent">Share</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user.name} ({user.role === "client" ? "Cliente" : user.role === "host" ? "Anfitrión" : "Admin"})
            </span>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 flex-col border-r bg-card min-h-[calc(100vh-4rem)]">
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href && "bg-accent text-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Mobile Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-card">
          <div className="flex justify-around py-2">
            {navItems.slice(0, 4).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 text-muted-foreground transition-colors",
                  pathname === item.href && "text-primary"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 pb-20 md:pb-6 overflow-x-hidden">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6 py-4 md:py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
