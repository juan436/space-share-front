/**
 * UserHome
 *
 * Qué hace: Pantalla de inicio del dashboard de usuario con saludo, stats y acciones rápidas.
 * Recibe:   nada — obtiene usuario del contexto de auth
 * Genera:   saludo dinámico, grid de stat cards (hardcodeadas pendiente P1-A5) y tarjetas de acción rápida
 * Procesa:  getGreeting() y getTodayDate() calculados en runtime; animaciones escalonadas por índice
 */
import { useAuth } from "@/presentation/providers/auth-context";
import { Calendar, DollarSign, Package, TrendingUp, ArrowRight, Compass, MessageSquare } from "lucide-react";
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
    label: "Reservaciones Activas",
    value: "3",
    delta: "1 finalizando esta semana",
    icon: Calendar,
    color: "from-primary/15 to-primary/5",
    iconColor: "text-primary",
  },
  {
    label: "Gasto Mensual",
    value: "$850",
    delta: "-8% vs mes anterior",
    deltaDown: true,
    icon: DollarSign,
    color: "from-emerald-500/15 to-emerald-500/5",
    iconColor: "text-emerald-600",
  },
  {
    label: "Espacios Alquilados",
    value: "2",
    delta: "Diferentes anfitriones",
    icon: Package,
    color: "from-violet-500/15 to-violet-500/5",
    iconColor: "text-violet-600",
  },
  {
    label: "Tiempo Total",
    value: "45d",
    delta: "Acumulado este año",
    icon: TrendingUp,
    color: "from-accent/15 to-accent/5",
    iconColor: "text-accent",
  },
];

const quickActions = [
  {
    icon: Compass,
    label: "Explorar Espacios",
    description: "Encuentra el espacio perfecto para ti",
    href: "/explore",
  },
  {
    icon: Calendar,
    label: "Mis Reservaciones",
    description: "Revisa y gestiona tus reservaciones",
    href: "/dashboard/user/reservations",
  },
  {
    icon: MessageSquare,
    label: "Mensajes",
    description: "Contacta con tus anfitriones",
    href: "/dashboard/messages",
  },
];

export function UserHome() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          {getGreeting()}, {user?.name?.split(" ")[0] ?? "Usuario"}
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
              <p className={`text-[11px] mt-2 ${stat.deltaDown ? "text-red-500" : "text-muted-foreground/70"}`}>
                {stat.delta}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Acciones rápidas</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-md transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${(idx + 4) * 80}ms` }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/12 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{action.label}</p>
                  <p className="text-xs text-muted-foreground truncate">{action.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
