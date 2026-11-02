import { memo } from "react";
import { CreditCard, Info, Star, CheckCircle2 } from "lucide-react";
import { Reservation } from "@/core/domain/entities/Reservation";
import { Button } from "@/presentation/components/ui/button";
import { ReservationCard } from "@/presentation/components/shared/panel/ReservationCard";

const NOTES: Record<string, string> = {
  pending: "Esperando respuesta del anfitrión",
  accepted: "El anfitrión aprobó tu solicitud",
  rejected: "El anfitrión rechazó esta solicitud",
  expired: "El tiempo para pagar expiró y el espacio fue liberado",
};

interface UserReservationCardProps {
  reservation: Reservation;
  reviewedIds: Set<string>;
  onPay: (id: string) => void;
  onDetails: (id: string) => void;
  onReview: (id: string) => void;
}

export const UserReservationCard = memo(function UserReservationCard({ reservation, reviewedIds, onPay, onDetails, onReview }: UserReservationCardProps) {
  const { id, status } = reservation;
  const canPay = status === "awaiting_payment" || status === "accepted";
  const canReview = status === "completed" && !reviewedIds.has(id);

  return (
    <ReservationCard
      reservation={reservation}
      counterpart={{ label: "Anfitrión", name: reservation.host?.name }}
      priceLine={<><span className="font-semibold">${reservation.totalPrice}</span> <span className="text-muted-foreground">total</span></>}
      note={NOTES[status]}
      onOpen={status === "confirmed" || status === "completed" ? () => onDetails(id) : undefined}
    >
      {canPay && (
        <Button onClick={() => onPay(id)} className="w-full h-10 rounded-lg gap-2">
          <CreditCard className="w-4 h-4" /> Pagar ahora
        </Button>
      )}
      {status === "confirmed" && (
        <Button variant="outline" onClick={() => onDetails(id)} className="w-full h-10 rounded-lg gap-2">
          <Info className="w-4 h-4" /> Ver detalles
        </Button>
      )}
      {canReview && (
        <Button variant="outline" onClick={() => onReview(id)} className="w-full h-10 rounded-lg gap-2">
          <Star className="w-4 h-4" /> Dejar reseña
        </Button>
      )}
      {reviewedIds.has(id) && (
        <p className="text-sm text-emerald-600 font-medium flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4" /> Reseña enviada
        </p>
      )}
    </ReservationCard>
  );
});
