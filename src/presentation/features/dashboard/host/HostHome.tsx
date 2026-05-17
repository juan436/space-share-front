/**
 * HostHome
 *
 * Qué hace: Pantalla de inicio del host. Muestra métricas de resumen y accesos rápidos a secciones.
 * Recibe:   onNavigate — callback para cambiar de tab dentro del dashboard
 * Genera:   cards de estadísticas y grid de acciones rápidas
 * Procesa:  saludo dinámico según hora del día; stats de ingresos/ocupación aún hardcodeados (P3 pendiente)
 */
import { useAuth } from "@/presentation/providers/auth-context";
import { Building2, TrendingUp, DollarSign, Calendar, ArrowRight, Plus, MessageSquare, Heart } from "lucide-react";
import { useSpaces } from "@/presentation/hooks/useSpaces";
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

interface HostHomeProps {
  onNavigate: (tab: string) => void;
}

export function HostHome({ onNavigate }: HostHomeProps) {
  const { user } = useAuth();
  const { spaces } = useSpaces();

  const stats = [
    {
      label: "Total Espacios",
      value: String(spaces.length),
      delta: "+2 este mes",
      icon: Building2,
      color: "from-primary/15 to-primary/5",
      iconColor: "text-primary",
    },
    {
      label: "Ingresos Mensuales",
      value: "$2,450",
      delta: "+12% vs mes anterior",
      icon: DollarSign,
      color: "from-emerald-500/15 to-emerald-500/5",
      iconColor: "text-emerald-600",
    },
    {
      label: "Tasa Ocupación",
      value: "78%",
      delta: "+5% vs mes anterior",
      icon: TrendingUp,
      color: "from-violet-500/15 to-violet-500/5",
      iconColor: "text-violet-600",
    },
    {
      label: "Reservaciones Activas",
      value: "12",
      delta: "3 finalizando esta semana",
      icon: Calendar,
      color: "from-accent/15 to-accent/5",
      iconColor: "text-accent",
    },
  ];

  const quickActions: { icon: typeof Plus; label: string; description: string; tab?: string; href?: string }[] = [
    {
      icon: Plus,
      label: "Agregar Espacio",
      description: "Publica un nuevo espacio disponible",
      tab: "spaces",
    },
    {
      icon: Calendar,
      label: "Reservaciones",
      description: "Gestiona las solicitudes de reservación",
      tab: "reservations",
    },
    {
      icon: MessageSquare,
      label: "Mensajes",
      description: "Contacta con tus arrendatarios",
      tab: "messages",
    },
    {
      icon: Heart,
      label: "Mis Favoritos",
      description: "Espacios que marcaste como favoritos",
      href: "/favorites",
    },
  ];

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

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Acciones rápidas</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            const sharedClass = "group flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-md transition-all duration-300 animate-fade-in-up text-left";
            const content = (
              <>
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/12 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{action.label}</p>
                  <p className="text-xs text-muted-foreground truncate">{action.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </>
            );
            return action.href ? (
              <Link
                key={action.label}
                href={action.href}
                className={sharedClass}
                style={{ animationDelay: `${(idx + 4) * 80}ms` }}
              >
                {content}
              </Link>
            ) : (
              <button
                key={action.label}
                onClick={() => action.tab && onNavigate(action.tab)}
                className={sharedClass}
                style={{ animationDelay: `${(idx + 4) * 80}ms` }}
              >
                {content}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
