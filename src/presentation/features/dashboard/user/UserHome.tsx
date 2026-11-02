import Link from "next/link";
import { Calendar, Compass, MessageSquare, ShieldCheck, Heart } from "lucide-react";
import { useAuth } from "@/presentation/providers/auth-context";
import { PageHeader } from "@/presentation/components/shared/panel/PageHeader";
import { StatStrip } from "@/presentation/components/shared/panel/StatStrip";
import { PanelSection } from "@/presentation/components/shared/panel/PanelSection";
import { ActionList } from "@/presentation/components/shared/panel/ActionList";
import { ReservationCards } from "@/presentation/components/shared/panel/ReservationCards";
import { KycNotice } from "@/presentation/components/shared/panel/KycNotice";
import { useUserReservations } from "./hooks/useUserReservations";

const ACTIVE = ["pending", "accepted", "awaiting_payment", "confirmed"];
const PAID = ["confirmed", "completed"];

interface UserHomeProps {
  onNavigate: (tab: string) => void;
}

export function UserHome({ onNavigate }: UserHomeProps) {
  const { user } = useAuth();
  const { reservations } = useUserReservations();

  const active = reservations.filter((r) => ACTIVE.includes(r.status)).length;
  const toPay = reservations.filter((r) => r.status === "awaiting_payment").length;
  const completed = reservations.filter((r) => r.status === "completed").length;
  const invested = reservations.filter((r) => PAID.includes(r.status)).reduce((sum, r) => sum + r.totalPrice, 0);
  const recent = [...reservations].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 4);
  const go = (tab: string) => () => onNavigate(tab);

  return (
    <div className="space-y-10">
      <PageHeader name={user?.name} subtitle="Encuentra el espacio que necesitas y gestiona tus reservaciones.">
        <Link href="/explore" className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-foreground text-background text-sm font-semibold hover:opacity-85 transition-opacity">
          <Compass className="w-4 h-4" /> Explorar espacios
        </Link>
      </PageHeader>

      {user && <KycNotice status={user.kycStatus} onAction={go("verification")} />}

      <StatStrip
        items={[
          { label: "Reservaciones activas", value: active, hint: "En curso o por confirmar", onClick: go("reservations") },
          { label: "Pendientes de pago", value: toPay, hint: toPay ? "Completa el pago para confirmar" : "Todo al día", onClick: go("reservations") },
          { label: "Estancias completadas", value: completed, hint: "Finalizadas" },
          { label: "Total invertido", value: `$${invested.toLocaleString()}`, hint: "En reservas confirmadas" },
        ]}
      />

      <PanelSection title="Tus reservaciones" actionLabel="Ver todas" onAction={go("reservations")}>
        <ReservationCards reservations={recent} counterpart="host" emptyText="Aún no tienes reservaciones" onOpen={go("reservations")} />
      </PanelSection>

      <PanelSection title="Atajos">
        <ActionList
          actions={[
            { icon: Calendar, label: "Mis reservaciones", description: "Revisa y gestiona tus reservas", onClick: go("reservations") },
            { icon: MessageSquare, label: "Mensajes", description: "Habla con tus anfitriones", onClick: go("messages") },
            { icon: ShieldCheck, label: "Verificación", description: "Estado de tu identidad", onClick: go("verification") },
            { icon: Heart, label: "Favoritos", description: "Espacios que guardaste", href: "/favorites" },
          ]}
        />
      </PanelSection>
    </div>
  );
}
