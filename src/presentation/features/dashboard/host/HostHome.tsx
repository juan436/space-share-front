import { Calendar, Plus, MessageSquare, ShieldCheck, Building2 } from "lucide-react";
import { useAuth } from "@/presentation/providers/auth-context";
import { useSpaces } from "@/presentation/hooks/useSpaces";
import { PageHeader } from "@/presentation/components/shared/panel/PageHeader";
import { StatStrip } from "@/presentation/components/shared/panel/StatStrip";
import { PanelSection } from "@/presentation/components/shared/panel/PanelSection";
import { ActionList } from "@/presentation/components/shared/panel/ActionList";
import { ReservationCards } from "@/presentation/components/shared/panel/ReservationCards";
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
  const recent = [...reservations].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 4);
  const go = (tab: string) => () => onNavigate(tab);

  return (
    <div className="space-y-10">
      <PageHeader name={user?.name} subtitle="Gestiona tus espacios, responde solicitudes y sigue tus ingresos.">
        <button onClick={go("spaces")} className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> Agregar espacio
        </button>
      </PageHeader>

      {user && <KycNotice status={user.kycStatus} onAction={go("verification")} />}

      <StatStrip
        items={[
          { label: "Mis espacios", value: spaces.length, hint: "Publicados", onClick: go("spaces") },
          { label: "Solicitudes pendientes", value: pending, hint: pending ? "Esperan tu respuesta" : "Sin solicitudes nuevas", onClick: go("reservations") },
          { label: "Reservaciones confirmadas", value: confirmed, hint: "Pagadas y en curso", onClick: go("reservations") },
          { label: "Ingresos", value: `$${earnings.toLocaleString()}`, hint: "De reservas confirmadas" },
        ]}
      />

      <PanelSection title="Reservaciones recientes" actionLabel="Ver todas" onAction={go("reservations")}>
        <ReservationCards reservations={recent} counterpart="client" emptyText="Aún no tienes reservaciones" onOpen={go("reservations")} />
      </PanelSection>

      <PanelSection title="Atajos">
        <ActionList
          actions={[
            { icon: Building2, label: "Mis espacios", description: "Edita y publica tus espacios", onClick: go("spaces") },
            { icon: Calendar, label: "Reservaciones", description: "Gestiona las solicitudes", onClick: go("reservations"), badge: pending },
            { icon: MessageSquare, label: "Mensajes", description: "Habla con tus clientes", onClick: go("messages") },
            { icon: ShieldCheck, label: "Verificación", description: "Estado de tu identidad", onClick: go("verification") },
          ]}
        />
      </PanelSection>
    </div>
  );
}
