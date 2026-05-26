import { useAuth } from "@/presentation/providers/auth-context";
import { Calendar, DollarSign, Package, TrendingUp, ArrowRight, Compass, MessageSquare, ShieldCheck, Clock, Star, Zap } from "lucide-react";
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

const STATS = [
  {
    label: "Reservaciones Activas",
    value: "3",
    delta: "1 finalizando esta semana",
    icon: Calendar,
    iconClass: "text-sky-600",
    bgClass: "bg-sky-50 dark:bg-sky-950/30",
  },
  {
    label: "Gasto Mensual",
    value: "$850",
    delta: "-8% vs mes anterior",
    deltaDown: true,
    icon: DollarSign,
    iconClass: "text-emerald-600",
    bgClass: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    label: "Espacios Alquilados",
    value: "2",
    delta: "Diferentes anfitriones",
    icon: Package,
    iconClass: "text-violet-600",
    bgClass: "bg-violet-50 dark:bg-violet-950/30",
  },
  {
    label: "Tiempo Total",
    value: "45d",
    delta: "Acumulado este año",
    icon: TrendingUp,
    iconClass: "text-amber-600",
    bgClass: "bg-amber-50 dark:bg-amber-950/30",
  },
];

const QUICK_ACTIONS = [
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

const BENEFITS = [
  { icon: ShieldCheck, label: "Pagos protegidos", desc: "Tu dinero seguro hasta confirmar el espacio" },
  { icon: Clock, label: "Acceso 24/7", desc: "Entra a tu espacio cuando lo necesites" },
  { icon: Star, label: "Anfitriones verificados", desc: "Cada espacio revisado por nuestro equipo" },
  { icon: Zap, label: "Reserva en minutos", desc: "Sin papeleo, sin complicaciones" },
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
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {STATS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-card border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.11)] hover:border-border/80 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className="mb-2.5">
                <div className={`w-8 h-8 rounded-xl ${stat.bgClass} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${stat.iconClass}`} />
                </div>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">{stat.value}</p>
              <p className="text-[10px] sm:text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mt-0.5 leading-snug">{stat.label}</p>
              <p className={`text-[10px] mt-1 leading-snug ${stat.deltaDown ? "text-red-500" : "text-muted-foreground/70"}`}>
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
          {QUICK_ACTIONS.map((action, idx) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-card border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.11)] hover:border-border/80 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${(idx + 4) * 80}ms` }}
              >
                <div className="w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center flex-shrink-0 group-hover:bg-muted/80 transition-colors">
                  <Icon className="w-5 h-5 text-foreground/60" />
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

      {/* Promo section */}
      <div className="grid sm:grid-cols-5 gap-5">
        {/* Dark banner — become a host */}
        <div className="sm:col-span-3 relative rounded-2xl bg-foreground dark:bg-card border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.10)] p-7 overflow-hidden flex flex-col justify-between min-h-[200px]">
          <div className="absolute inset-0 pointer-events-none opacity-[0.07] bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary via-accent to-transparent" />
          <div className="relative space-y-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/10 border border-background/15 text-background/70 text-[11px] font-semibold">
              <Zap className="w-3 h-3" /> Para ti
            </span>
            <h3 className="text-xl font-bold text-background leading-snug max-w-xs">
              ¿Tienes espacio disponible? Genera ingresos extra con SpaceShare
            </h3>
            <p className="text-sm text-background/55 leading-relaxed max-w-sm">
              Publica tu garaje, bodega o cuarto en minutos. Miles de personas buscan exactamente lo que tú tienes.
            </p>
          </div>
          <Link
            href="/contact"
            className="relative inline-flex items-center gap-2 mt-5 self-start text-sm font-semibold px-5 py-2.5 rounded-xl bg-background/10 hover:bg-background/18 text-background border border-background/20 transition-colors"
          >
            Quiero ser Anfitrión
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Benefits grid */}
        <div className="sm:col-span-2 grid grid-cols-2 gap-3">
          {BENEFITS.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.label}
                className="p-4 rounded-2xl bg-white dark:bg-card border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.07)] flex flex-col gap-2"
              >
                <div className="w-8 h-8 rounded-lg bg-muted/60 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-xs font-semibold text-foreground leading-snug">{b.label}</p>
                <p className="text-[10px] text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
