import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/presentation/components/ui/dialog";
import { Calendar, MapPin, DollarSign, User, CheckCircle2, ArrowRight } from "lucide-react";
import { Reservation } from "@/core/domain/entities/Reservation";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface ReservationDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  reservation: Reservation | null;
}

export function ReservationDetailsDialog({
  isOpen,
  onClose,
  reservation,
}: ReservationDetailsDialogProps) {
  if (!reservation) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            Reserva Confirmada
          </DialogTitle>
          <DialogDescription>
            Tu espacio está reservado. Aquí tienes los detalles para tu estadía.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Space Info */}
          {reservation.space?.images?.[0] && (
            <div className="h-36 w-full rounded-xl overflow-hidden">
              <img
                src={reservation.space.images[0]}
                alt={reservation.space.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="space-y-3">
            <h3 className="font-bold text-lg">{reservation.space?.title}</h3>

            {reservation.space?.location && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>
                  {reservation.space.location.city}, {reservation.space.location.state}
                </span>
              </div>
            )}

            {/* Dates */}
            <div className="flex items-center gap-2 text-sm bg-muted/40 rounded-xl p-3">
              <Calendar className="w-4 h-4 text-primary shrink-0" />
              <span className="font-medium">
                {format(reservation.startDate, "d MMM yyyy", { locale: es })}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="font-medium">
                {format(reservation.endDate, "d MMM yyyy", { locale: es })}
              </span>
            </div>

            {/* Host contact */}
            {reservation.host && (
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl border border-border/40">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {reservation.host.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Anfitrión</p>
                  <p className="font-semibold text-sm">{reservation.host.name}</p>
                </div>
                <User className="w-4 h-4 text-muted-foreground ml-auto" />
              </div>
            )}

            {/* Total */}
            <div className="flex items-center justify-between p-3 bg-primary/5 rounded-xl border border-primary/10">
              <span className="text-sm text-muted-foreground">Total pagado</span>
              <span className="font-bold text-lg flex items-center gap-1 text-primary">
                <DollarSign className="w-4 h-4" />
                {reservation.totalPrice}
              </span>
            </div>

            {/* Confirmation note */}
            <p className="text-xs text-muted-foreground text-center bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 p-2.5 rounded-lg font-medium">
              ✓ Pago recibido · Tu espacio está asegurado para estas fechas
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
