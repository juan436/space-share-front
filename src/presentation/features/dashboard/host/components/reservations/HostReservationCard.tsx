/**
 * HostReservationCard
 *
 * Qué hace: Tarjeta de reservación para la vista del host. Muestra detalles y permite gestionar el estado.
 * Recibe:   reservation (Reservation), updatingId (ID en proceso), onStatusUpdate callback
 * Genera:   Card con imagen, datos del cliente, fechas, ganancia/total y botones aceptar/rechazar si está pendiente
 * Procesa:  lee STATUS_CONFIG para colores y labels; formato de fechas con date-fns/es; memoizado con React.memo
 */
import { memo } from "react";
import Image from "next/image";
import { Card } from "@/presentation/components/ui/card";
import { Button } from "@/presentation/components/ui/button";
import { Calendar, CheckCircle2, XCircle, Loader2, MapPin, User, MessageSquare, DollarSign } from "lucide-react";
import { Reservation, ReservationStatus } from "@/core/domain/entities/Reservation";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { STATUS_CONFIG } from "@/presentation/shared/constants/reservation-status";

interface HostReservationCardProps {
  reservation: Reservation;
  updatingId: string | null;
  onStatusUpdate: (id: string, status: ReservationStatus) => Promise<void>;
}

export const HostReservationCard = memo(function HostReservationCard({
  reservation,
  updatingId,
  onStatusUpdate,
}: HostReservationCardProps) {
  const statusCfg = STATUS_CONFIG[reservation.status] || STATUS_CONFIG.pending;
  const StatusIcon = statusCfg.icon;

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="relative h-40 sm:h-full sm:w-48 shrink-0 bg-muted overflow-hidden">
          {reservation.space?.images?.[0] ? (
            <Image src={reservation.space.images[0]} alt={reservation.space.title ?? "Espacio"} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Calendar className="w-8 h-8 text-muted-foreground/30" />
            </div>
          )}
        </div>

        <div className="flex-1 p-5">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="font-bold text-lg">{reservation.space?.title || "Espacio"}</h3>
              {reservation.space?.location && (
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {reservation.space.location.city}, {reservation.space.location.state}
                </p>
              )}
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shrink-0 ${statusCfg.color}`}>
              <StatusIcon className="w-3.5 h-3.5" />
              {statusCfg.label}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm mb-4">
            <div>
              <p className="text-muted-foreground text-xs font-medium">Cliente</p>
              <p className="font-semibold flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-muted-foreground" />
                {reservation.client?.name || "Usuario"}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs font-medium">Fechas</p>
              <p className="font-semibold">
                {format(reservation.startDate, "d MMM", { locale: es })} - {format(reservation.endDate, "d MMM yy", { locale: es })}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs font-medium">Ganancia</p>
              <p className="font-semibold flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />${reservation.basePrice}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs font-medium">Total cliente</p>
              <p className="font-semibold">${reservation.totalPrice}</p>
            </div>
          </div>

          {reservation.notes && (
            <div className="p-3 rounded-lg bg-muted/30 border border-border/50 mb-4">
              <p className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-1">
                <MessageSquare className="w-3 h-3" /> Mensaje del cliente
              </p>
              <p className="text-sm">{reservation.notes}</p>
            </div>
          )}

          {reservation.status === "pending" && (
            <div className="flex gap-3">
              <Button size="sm" onClick={() => onStatusUpdate(reservation.id, "accepted")} disabled={!!updatingId} className="rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white">
                {updatingId === reservation.id ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <CheckCircle2 className="w-4 h-4 mr-1" />}
                Aceptar Reserva
              </Button>
              <Button size="sm" variant="outline" onClick={() => onStatusUpdate(reservation.id, "rejected")} disabled={!!updatingId} className="rounded-xl font-bold text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-950/20">
                <XCircle className="w-4 h-4 mr-1" />Rechazar
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
});
