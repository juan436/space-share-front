import { Clock, ShieldCheck, MessageSquare, Plus } from "lucide-react";
import { useAuth } from "@/presentation/providers/auth-context";
import { useSpaces } from "@/presentation/hooks/useSpaces";
import { PageHeader } from "@/presentation/components/shared/panel/PageHeader";
import { PanelSection } from "@/presentation/components/shared/panel/PanelSection";
import { AttentionList, AttentionItem } from "@/presentation/components/shared/panel/AttentionList";
import { AgendaList } from "@/presentation/components/shared/panel/AgendaList";
import { SummaryCard } from "@/presentation/components/shared/panel/SummaryCard";
import { useUnreadMessages } from "@/presentation/features/messages/hooks/useUnreadMessages";
import { useHostReservations } from "./hooks/useHostReservations";

const PAID = ["confirmed", "completed"];

interface HostHomeProps {
  onNavigate: (tab: string) => void;
}

export function HostHome({ onNavigate }: HostHomeProps) {
  const { user } = useAuth();
  const { spaces } = useSpaces();
  const { reservations } = useHostReservations();
  const { unreadCount } = useUnreadMessages();
  const go = (tab: string) => () => onNavigate(tab);

  const pending = reservations.filter((r) => r.status === "pending");
  const upcoming = reservations
    .filter((r) => ["confirmed", "accepted", "awaiting_payment"].includes(r.status) && r.endDate.getTime() >= Date.now())
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
    .slice(0, 5);
  const earnings = reservations.filter((r) => PAID.includes(r.status)).reduce((sum, r) => sum + r.basePrice, 0);

  const attention: AttentionItem[] = [
    ...(user && user.kycStatus !== "approved"
      ? [{
          id: "kyc",
          icon: ShieldCheck,
          title: user.kycStatus === "pending" ? "Tu verificación está en revisión" : "Verifica tu identidad",
          description: user.kycStatus === "pending" ? "Mientras tanto tus espacios quedan pendientes." : "Tus espacios se publican cuando te verifiquemos.",
          actionLabel: user.kycStatus === "pending" ? "Ver estado" : "Verificar",
          onAction: go("verification"),
        }]
      : []),
    ...pending.map((r) => ({
      id: r.id,
      icon: Clock,
      title: `Solicitud de ${r.client?.name ?? "un cliente"}`,
      description: r.space?.title,
      actionLabel: "Responder",
      onAction: go("reservations"),
    })),
    ...(unreadCount > 0
      ? [{
          id: "messages",
          icon: MessageSquare,
          title: `Tienes ${unreadCount} mensaje${unreadCount > 1 ? "s" : ""} sin leer`,
          actionLabel: "Abrir",
          onAction: go("messages"),
        }]
      : []),
    ...(spaces.length === 0
      ? [{
          id: "first-space",
          icon: Plus,
          title: "Publica tu primer espacio",
          description: "Empieza a recibir reservaciones.",
          actionLabel: "Agregar",
          onAction: go("spaces"),
        }]
      : []),
  ];

  return (
    <div className="space-y-8">
      <PageHeader name={user?.name} subtitle="Esto es lo que necesita tu atención hoy." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <PanelSection title="Requiere tu atención">
            <AttentionList items={attention} emptyText="No tienes nada pendiente. Todo al día." />
          </PanelSection>

          <PanelSection title="Próximas llegadas" actionLabel="Ver todas" onAction={go("reservations")}>
            <AgendaList reservations={upcoming} counterpart="client" emptyText="Aún no tienes reservaciones próximas" onOpen={go("reservations")} />
          </PanelSection>
        </div>

        <SummaryCard
          title="Resumen"
          rows={[
            { label: "Mis espacios", value: spaces.length, onClick: go("spaces") },
            { label: "Solicitudes pendientes", value: pending.length, onClick: go("reservations") },
            { label: "Reservaciones confirmadas", value: reservations.filter((r) => r.status === "confirmed").length, onClick: go("reservations") },
            { label: "Ingresos", value: `$${earnings.toLocaleString()}` },
          ]}
        />
      </div>
    </div>
  );
}
