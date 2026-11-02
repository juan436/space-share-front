import Link from "next/link";
import { Calendar, CreditCard, CheckCircle2, DollarSign, Compass, MessageSquare, ShieldCheck } from "lucide-react";
import { useAuth } from "@/presentation/providers/auth-context";
import { WelcomeBanner } from "@/presentation/components/shared/panel/WelcomeBanner";
import { StatCard } from "@/presentation/components/shared/panel/StatCard";
import { PanelSection } from "@/presentation/components/shared/panel/PanelSection";
import { ActionList } from "@/presentation/components/shared/panel/ActionList";
import { ReservationList } from "@/presentation/components/shared/panel/ReservationList";
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
  const recent = [...reservations].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5);

  return (
    <div className="space-y-6">
      <WelcomeBanner name={user?.name} subtitle="Encuentra el espacio que necesitas y gestiona tus reservaciones desde aquí.">
        <Link href="/explore" className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-white text-primary text-sm font-bold hover:bg-white/90 transition-colors">
          <Compass className="w-4 h-4" /> Explorar espacios
        </Link>
      </WelcomeBanner>

      {user && <KycNotice status={user.kycStatus} onAction={() => onNavigate("verification")} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Reservaciones activas" value={active} hint="En curso o por confirmar" icon={Calendar} tone="bg-sky-100 text-sky-600" onClick={() => onNavigate("reservations")} />
        <StatCard label="Pendientes de pago" value={toPay} hint={toPay ? "Completa el pago para confirmar" : "Todo al día"} icon={CreditCard} tone="bg-violet-100 text-violet-600" onClick={() => onNavigate("reservations")} />
        <StatCard label="Completadas" value={completed} hint="Estancias finalizadas" icon={CheckCircle2} tone="bg-emerald-100 text-emerald-600" />
        <StatCard label="Total invertido" value={`$${invested.toLocaleString()}`} hint="En reservas confirmadas" icon={DollarSign} tone="bg-amber-100 text-amber-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <PanelSection title="Reservaciones recientes" actionLabel="Ver todas" onAction={() => onNavigate("reservations")} className="lg:col-span-2">
          <ReservationList reservations={recent} counterpart="host" emptyText="Aún no tienes reservaciones" onOpen={() => onNavigate("reservations")} />
        </PanelSection>

        <PanelSection title="Accesos rápidos">
          <ActionList
            actions={[
              { icon: Calendar, label: "Mis reservaciones", description: "Revisa y gestiona tus reservas", onClick: () => onNavigate("reservations") },
              { icon: MessageSquare, label: "Mensajes", description: "Habla con tus anfitriones", onClick: () => onNavigate("messages") },
              { icon: ShieldCheck, label: "Verificación", description: "Estado de tu identidad", onClick: () => onNavigate("verification") },
              { icon: Compass, label: "Explorar espacios", description: "Busca un nuevo espacio", href: "/explore" },
            ]}
          />
        </PanelSection>
      </div>
    </div>
  );
}
