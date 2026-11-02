import { Building2, Calendar, Clock, DollarSign, Plus, MessageSquare, ShieldCheck, Heart } from "lucide-react";
import { useAuth } from "@/presentation/providers/auth-context";
import { useSpaces } from "@/presentation/hooks/useSpaces";
import { WelcomeBanner } from "@/presentation/components/shared/panel/WelcomeBanner";
import { StatCard } from "@/presentation/components/shared/panel/StatCard";
import { PanelSection } from "@/presentation/components/shared/panel/PanelSection";
import { ActionList } from "@/presentation/components/shared/panel/ActionList";
import { ReservationList } from "@/presentation/components/shared/panel/ReservationList";
import { KycNotice } from "@/presentation/components/shared/panel/KycNotice";
import { useHostReservations } from "./hooks/useHostReservations";

const PAID = ["confirmed", "completed"];

interface HostHomeProps {
  onNavigate: (tab: string) => void;
}

export function HostHome({ onNavigate }: HostHomeProps) {
  const { user } = useAuth();
  const { spaces } = useSpaces();
  const { reservations } = useHostReservations();

  const pending = reservations.filter((r) => r.status === "pending").length;
  const confirmed = reservations.filter((r) => r.status === "confirmed").length;
  const earnings = reservations.filter((r) => PAID.includes(r.status)).reduce((sum, r) => sum + r.basePrice, 0);
  const recent = [...reservations].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5);

  return (
    <div className="space-y-6">
      <WelcomeBanner name={user?.name} subtitle="Gestiona tus espacios, responde solicitudes y sigue tus ingresos.">
        <button onClick={() => onNavigate("spaces")} className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-white text-primary text-sm font-bold hover:bg-white/90 transition-colors">
          <Plus className="w-4 h-4" /> Agregar espacio
        </button>
      </WelcomeBanner>

      {user && <KycNotice status={user.kycStatus} onAction={() => onNavigate("verification")} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Mis espacios" value={spaces.length} hint="Publicados en la plataforma" icon={Building2} tone="bg-sky-100 text-sky-600" onClick={() => onNavigate("spaces")} />
        <StatCard label="Solicitudes pendientes" value={pending} hint={pending ? "Esperan tu respuesta" : "Sin solicitudes nuevas"} icon={Clock} tone="bg-amber-100 text-amber-600" onClick={() => onNavigate("reservations")} />
        <StatCard label="Reservaciones confirmadas" value={confirmed} hint="Pagadas y en curso" icon={Calendar} tone="bg-violet-100 text-violet-600" onClick={() => onNavigate("reservations")} />
        <StatCard label="Ingresos" value={`$${earnings.toLocaleString()}`} hint="De reservas confirmadas" icon={DollarSign} tone="bg-emerald-100 text-emerald-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <PanelSection title="Reservaciones recientes" actionLabel="Ver todas" onAction={() => onNavigate("reservations")} className="lg:col-span-2">
          <ReservationList reservations={recent} counterpart="client" emptyText="Aún no tienes reservaciones" onOpen={() => onNavigate("reservations")} />
        </PanelSection>

        <PanelSection title="Accesos rápidos">
          <ActionList
            actions={[
              { icon: Plus, label: "Agregar espacio", description: "Publica un nuevo espacio", onClick: () => onNavigate("spaces") },
              { icon: Calendar, label: "Reservaciones", description: "Gestiona las solicitudes", onClick: () => onNavigate("reservations"), badge: pending },
              { icon: MessageSquare, label: "Mensajes", description: "Habla con tus clientes", onClick: () => onNavigate("messages") },
              { icon: ShieldCheck, label: "Verificación", description: "Estado de tu identidad", onClick: () => onNavigate("verification") },
              { icon: Heart, label: "Mis favoritos", description: "Espacios que guardaste", href: "/favorites" },
            ]}
          />
        </PanelSection>
      </div>
    </div>
  );
}
