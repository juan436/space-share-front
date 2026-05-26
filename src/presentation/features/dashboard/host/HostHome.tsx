import { useAuth } from "@/presentation/providers/auth-context";
import { Building2, TrendingUp, DollarSign, Calendar, ArrowRight, Plus, MessageSquare, Heart, MessageCircle } from "lucide-react";
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
          {getGreeting()}, {user?.name?.split(" ")[0] ?? "Usuario"}
        </h1>
        <p className="text-muted-foreground mt-1 capitalize">{getTodayDate()}</p>
        <div className="h-0.5 w-12 bg-gradient-to-r from-primary to-accent rounded-full mt-3" />
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="group relative p-3 sm:p-4 rounded-2xl bg-white dark:bg-card border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.11)] hover:border-border/80 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className="mb-2.5">
                <div className="w-8 h-8 rounded-xl bg-muted/60 flex items-center justify-center">
                  <Icon className={`w-4 h-4 ${stat.iconColor}`} />
                </div>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">{stat.value}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 leading-snug">{stat.label}</p>
              <p className="text-[10px] mt-1 text-muted-foreground/70 leading-snug">{stat.delta}</p>
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
            const sharedClass = "group flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-card border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.11)] hover:border-border/80 transition-all duration-300 animate-fade-in-up text-left";
            const content = (
              <>
                <div className="w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center flex-shrink-0 group-hover:bg-muted/80 transition-colors">
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
      {/* Promo + Soporte */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="relative rounded-2xl bg-foreground dark:bg-card border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.10)] p-6 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-white to-transparent pointer-events-none" />
          <div className="relative">
            <TrendingUp className="w-6 h-6 text-background/60 mb-3" />
            <h3 className="text-lg font-bold text-background leading-snug">Maximiza tus ingresos con SpaceShare</h3>
            <p className="text-sm text-background/55 mt-2 leading-relaxed">
              Hemos notado una alta demanda en tu zona. ¡Considera ajustar tus precios para obtener un 15% más de rentabilidad!
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold px-4 py-2 rounded-lg bg-background/10 hover:bg-background/18 text-background transition-colors border border-background/20"
            >
              Ver reporte completo
            </Link>
          </div>
        </div>

        <div className="rounded-2xl bg-white dark:bg-card border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.07)] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-muted/60 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-sm font-semibold text-foreground">Soporte Host</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              ¿Necesitas ayuda para configurar un nuevo espacio o resolver dudas sobre pagos?
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1 mt-5 text-xs font-semibold text-primary hover:underline"
          >
            Contactar Asesoría →
          </Link>
        </div>
      </div>
    </div>
  );
}
