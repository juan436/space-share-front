import { memo } from "react";
import { Card } from "@/presentation/components/ui/card";
import { Calendar, MapPin, DollarSign, ArrowRight, Star, CreditCard, Info, Loader2, CheckCircle2 } from "lucide-react";
import { Reservation } from "@/core/domain/entities/Reservation";
import { Button } from "@/presentation/components/ui/button";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { STATUS_CONFIG } from "@/presentation/shared/constants/reservation-status";

interface UserReservationCardProps {
  reservation: Reservation;
  reviewedIds: Set<string>;
  simulatingPaymentId: string | null;
  onPay: (id: string) => void;
  onDetails: (id: string) => void;
  onReview: (id: string) => void;
}

export const UserReservationCard = memo(function UserReservationCard({
  reservation,
  reviewedIds,
  simulatingPaymentId,
  onPay,
  onDetails,
  onReview,
}: UserReservationCardProps) {
  const statusCfg = STATUS_CONFIG[reservation.status] || STATUS_CONFIG.pending;
  const StatusIcon = statusCfg.icon;

  return (
    <Card key={reservation.id} className="overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      <div className="h-40 w-full bg-muted shrink-0 overflow-hidden">
        {reservation.space?.images?.[0] ? (
          <img src={reservation.space.images[0]} alt={reservation.space.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Calendar className="w-8 h-8 text-muted-foreground/30" />
          </div>
        )}
      </div>

      <div className="p-4 space-y-3 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-bold">{reservation.space?.title || "Espacio"}</h3>
            {reservation.space?.location && (
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3" />
                {reservation.space.location.city}, {reservation.space.location.state}
              </p>
            )}
          </div>
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 shrink-0 ${statusCfg.color}`}>
            <StatusIcon className="w-3 h-3" />
            {statusCfg.label}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">{format(reservation.startDate, "d MMM yy", { locale: es })}</span>
          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="font-medium">{format(reservation.endDate, "d MMM yy", { locale: es })}</span>
        </div>

        {reservation.host && (
          <p className="text-xs text-muted-foreground">
            Anfitrión: <span className="font-medium text-foreground">{reservation.host.name}</span>
          </p>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-border/40">
          <span className="text-sm text-muted-foreground">Total</span>
          <span className="font-bold text-lg flex items-center gap-1">
            <DollarSign className="w-4 h-4 text-primary" />
            {reservation.totalPrice}
          </span>
        </div>

        {reservation.status === "pending" && (
          <p className="text-xs text-amber-600 dark:text-amber-400 font-medium bg-amber-50 dark:bg-amber-950/20 p-2 rounded-lg">Esperando respuesta del anfitrión...</p>
        )}
        {reservation.status === "accepted" && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/20 p-2 rounded-lg">Tu reserva ha sido aprobada por el anfitrión.</p>
        )}
        {reservation.status === "rejected" && (
          <p className="text-xs text-red-600 dark:text-red-400 font-medium bg-red-50 dark:bg-red-950/20 p-2 rounded-lg">El anfitrión ha rechazado esta solicitud.</p>
        )}
        {reservation.status === "expired" && (
          <p className="text-xs text-gray-500 font-medium bg-gray-100 dark:bg-gray-800/40 p-2 rounded-lg">El tiempo para pagar expiró. El espacio fue liberado.</p>
        )}

        {(reservation.status === "awaiting_payment" || reservation.status === "accepted") && (
          <Button size="sm" onClick={() => onPay(reservation.id)} disabled={simulatingPaymentId === reservation.id} className="w-full rounded-xl gap-2 mt-1 bg-violet-600 hover:bg-violet-700 text-white">
            {simulatingPaymentId === reservation.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-3.5 h-3.5" />}
            {simulatingPaymentId === reservation.id ? "Procesando..." : "Pagar ahora"}
          </Button>
        )}
        {reservation.status === "confirmed" && (
          <Button variant="outline" size="sm" onClick={() => onDetails(reservation.id)} className="w-full rounded-xl gap-2 mt-1">
            <Info className="w-3.5 h-3.5" />Ver detalles
          </Button>
        )}
        {reservation.status === "completed" && !reviewedIds.has(reservation.id) && (
          <Button variant="outline" size="sm" onClick={() => onReview(reservation.id)} className="w-full rounded-xl gap-2 mt-1">
            <Star className="w-3.5 h-3.5" />Dejar reseña
          </Button>
        )}
        {reviewedIds.has(reservation.id) && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5 pt-2">
            <CheckCircle2 className="w-3.5 h-3.5" />Reseña enviada
          </p>
        )}
      </div>
    </Card>
  );
});
