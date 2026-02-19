"use client";

import { useAuth } from "@/presentation/providers/auth-context";
import { Users, Building2, DollarSign, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Buenos días";
  if (hour < 18) return "Buenas tardes";
  return "Buenas noches";
}

function getTodayDate(): string {
  return new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

const stats = [
  {
    label: "Total Usuarios",
    value: "1,234",
    delta: "+12% desde el mes pasado",
    icon: Users,
    color: "from-primary/15 to-primary/5",
    iconColor: "text-primary",
  },
  {
    label: "Total Anuncios",
    value: "456",
    delta: "+8% desde el mes pasado",
    icon: Building2,
    color: "from-violet-500/15 to-violet-500/5",
    iconColor: "text-violet-600",
  },
  {
    label: "Ingresos Totales",
    value: "$45,231",
    delta: "+20% desde el mes pasado",
    icon: DollarSign,
    color: "from-emerald-500/15 to-emerald-500/5",
    iconColor: "text-emerald-600",
  },
  {
    label: "Reservas Activas",
    value: "89",
    delta: "+5% desde el mes pasado",
    icon: Calendar,
    color: "from-accent/15 to-accent/5",
    iconColor: "text-accent",
  },
];

const recentUsers = [
  { name: "María García", email: "maria@email.com", role: "Cliente", initials: "MG", gradient: "from-primary to-primary/70" },
  { name: "Carlos López", email: "carlos@email.com", role: "Anfitrión", initials: "CL", gradient: "from-accent to-accent/70" },
  { name: "Ana Martínez", email: "ana@email.com", role: "Cliente", initials: "AM", gradient: "from-violet-500 to-violet-400" },
];

const recentSpaces = [
  { title: "Garaje Centro", host: "Carlos López", price: "$120/mes" },
  { title: "Sótano Climatizado", host: "María García", price: "$200/mes" },
  { title: "Ático con Vista", host: "Juan Pérez", price: "$150/mes" },
];

export default function AdminDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          {getGreeting()}, {user?.name?.split(" ")[0]}
        </h1>
        <p className="text-muted-foreground mt-1 capitalize">{getTodayDate()}</p>
        <div className="h-0.5 w-12 bg-gradient-to-r from-primary to-accent rounded-full mt-3" />
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="group relative p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground tracking-tight">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              <p className="text-[11px] mt-2 text-muted-foreground/70">{stat.delta}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Recent Users */}
        <div className="rounded-2xl bg-card border border-border/50 overflow-hidden animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <div className="flex items-center justify-between px-5 py-4 border-b border-border/40">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Usuarios Recientes</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Últimos usuarios registrados</p>
            </div>
            <Link href="/dashboard/admin/users" className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
              Ver todos <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-border/30">
            {recentUsers.map((u, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-muted/30 transition-colors">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${u.gradient} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>
                  {u.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{u.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                </div>
                <span className="text-[11px] font-medium text-muted-foreground px-2 py-0.5 rounded-md bg-muted/50 flex-shrink-0">
                  {u.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Spaces */}
        <div className="rounded-2xl bg-card border border-border/50 overflow-hidden animate-fade-in-up" style={{ animationDelay: "480ms" }}>
          <div className="flex items-center justify-between px-5 py-4 border-b border-border/40">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Espacios Recientes</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Últimos espacios publicados</p>
            </div>
            <Link href="/dashboard/admin/spaces" className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
              Ver todos <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-border/30">
            {recentSpaces.map((space, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-muted/30 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{space.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{space.host}</p>
                </div>
                <span className="text-sm font-semibold text-foreground flex-shrink-0">
                  {space.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
