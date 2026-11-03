import { CreditCard, ShieldCheck, MessageSquare } from "lucide-react";
import { useAuth } from "@/presentation/providers/auth-context";
import { PageHeader } from "@/presentation/components/shared/panel/PageHeader";
import { PanelSection } from "@/presentation/components/shared/panel/PanelSection";
import { AttentionList, AttentionItem } from "@/presentation/components/shared/panel/AttentionList";
import { AgendaList } from "@/presentation/components/shared/panel/AgendaList";
import { SummaryCard } from "@/presentation/components/shared/panel/SummaryCard";
import { useUnreadMessages } from "@/presentation/features/messages/hooks/useUnreadMessages";
import { useUserReservations } from "./hooks/useUserReservations";

const ACTIVE = ["pending", "accepted", "awaiting_payment", "confirmed"];
const PAID = ["confirmed", "completed"];

interface UserHomeProps {
  onNavigate: (tab: string) => void;
}

export function UserHome({ onNavigate }: UserHomeProps) {
  const { user } = useAuth();
  const { reservations } = useUserReservations();
  const { unreadCount } = useUnreadMessages();
  const go = (tab: string) => () => onNavigate(tab);

  const toPay = reservations.filter((r) => r.status === "awaiting_payment" || r.status === "accepted");
  const upcoming = reservations
    .filter((r) => ACTIVE.includes(r.status) && r.endDate.getTime() >= Date.now())
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
    .slice(0, 5);
  const invested = reservations.filter((r) => PAID.includes(r.status)).reduce((sum, r) => sum + r.totalPrice, 0);

  const attention: AttentionItem[] = [
    ...(user && user.kycStatus !== "approved"
      ? [{
          id: "kyc",
          icon: ShieldCheck,
          title: user.kycStatus === "pending" ? "Tu verificación está en revisión" : "Verifica tu identidad",
          description: user.kycStatus === "pending" ? "Te avisaremos cuando termine." : "La necesitas para reservar espacios.",
          actionLabel: user.kycStatus === "pending" ? "Ver estado" : "Verificar",
          onAction: go("verification"),
        }]
      : []),
    ...toPay.map((r) => ({
      id: r.id,
      icon: CreditCard,
      title: `Paga tu reservación: ${r.space?.title ?? "Espacio"}`,
      description: `Total $${r.totalPrice}`,
      actionLabel: "Pagar",
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
  ];

  return (
    <div className="space-y-8">
      <PageHeader name={user?.name} subtitle="Esto es lo que necesita tu atención hoy." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <PanelSection title="Requiere tu atención">
            <AttentionList items={attention} emptyText="No tienes nada pendiente. Todo al día." />
          </PanelSection>

          <PanelSection title="Próximas reservaciones" actionLabel="Ver todas" onAction={go("reservations")}>
            <AgendaList reservations={upcoming} counterpart="host" emptyText="Aún no tienes reservaciones próximas" onOpen={go("reservations")} />
          </PanelSection>
        </div>

        <SummaryCard
          title="Resumen"
          rows={[
            { label: "Reservaciones activas", value: reservations.filter((r) => ACTIVE.includes(r.status)).length, onClick: go("reservations") },
            { label: "Pendientes de pago", value: toPay.length, onClick: go("reservations") },
            { label: "Estancias completadas", value: reservations.filter((r) => r.status === "completed").length },
            { label: "Total invertido", value: `$${invested.toLocaleString()}` },
          ]}
        />
      </div>
    </div>
  );
}
