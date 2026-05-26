import { Calendar, MapPin, DollarSign, User, ArrowRight, MessageSquare, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Reservation, ReservationStatus } from "@/core/domain/entities/Reservation";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { BaseDialog } from "@/presentation/components/shared/BaseDialog";
import { STATUS_CONFIG } from "@/presentation/shared/constants/reservation-status";
import { Button } from "@/presentation/components/ui/button";

interface HostReservationDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  reservation: Reservation | null;
  updatingId: string | null;
  onStatusUpdate: (id: string, status: ReservationStatus) => Promise<void>;
}

export function HostReservationDetailsDialog({ isOpen, onClose, reservation, updatingId, onStatusUpdate }: HostReservationDetailsDialogProps) {
  if (!reservation) return null;

  const statusCfg = STATUS_CONFIG[reservation.status] || STATUS_CONFIG.pending;
  const StatusIcon = statusCfg.icon;
  const isPending = reservation.status === "pending";
  const isUpdating = updatingId === reservation.id;

  const handleAction = async (status: ReservationStatus) => {
    await onStatusUpdate(reservation.id, status);
    onClose();
  };

  return (
    <BaseDialog isOpen={isOpen} onClose={onClose} title="Detalle de Reservación">
      <div className="space-y-4 py-2">
        {reservation.space?.images?.[0] && (
          <div className="h-36 w-full rounded-xl overflow-hidden">
            <img src={reservation.space.images[0]} alt={reservation.space.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-lg leading-snug">{reservation.space?.title}</h3>
            <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 shrink-0 ${statusCfg.color}`}>
              <StatusIcon className="w-3 h-3" />
              {statusCfg.label}
            </span>
          </div>

          {reservation.space?.location && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{reservation.space.location.city}, {reservation.space.location.state}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm bg-muted/40 rounded-xl p-3">
            <Calendar className="w-4 h-4 text-primary shrink-0" />
            <span className="font-medium">{format(reservation.startDate, "d MMM yyyy", { locale: es })}</span>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="font-medium">{format(reservation.endDate, "d MMM yyyy", { locale: es })}</span>
          </div>

          {reservation.client && (
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl border border-border/40">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white text-sm font-bold shrink-0">
                {reservation.client.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Cliente</p>
                <p className="font-semibold text-sm">{reservation.client.name}</p>
              </div>
              <User className="w-4 h-4 text-muted-foreground ml-auto" />
            </div>
          )}

          {reservation.notes && (
            <div className="p-3 bg-muted/30 rounded-xl border border-border/40">
              <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1 mb-1">
                <MessageSquare className="w-3 h-3" /> Mensaje del cliente
              </p>
              <p className="text-sm text-foreground">{reservation.notes}</p>
            </div>
          )}

          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl border border-border/40">
            <div>
              <p className="text-xs text-muted-foreground">Base</p>
              <p className="font-semibold text-sm flex items-center gap-0.5">
                <DollarSign className="w-3.5 h-3.5 text-muted-foreground" />{reservation.basePrice}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="font-bold text-lg flex items-center gap-0.5 text-emerald-600">
                <DollarSign className="w-4 h-4" />{reservation.totalPrice}
              </p>
            </div>
          </div>

          {isPending && (
            <div className="flex gap-3 pt-1">
              <Button
                onClick={() => handleAction("accepted")}
                disabled={isUpdating}
                className="flex-1 rounded-xl gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                Aceptar
              </Button>
              <Button
                variant="outline"
                onClick={() => handleAction("rejected")}
                disabled={isUpdating}
                className="flex-1 rounded-xl gap-2 text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-950/20"
              >
                <XCircle className="w-4 h-4" />
                Rechazar
              </Button>
            </div>
          )}
        </div>
      </div>
    </BaseDialog>
  );
}
