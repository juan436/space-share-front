import { memo } from "react";
import Image from "next/image";
import { Button } from "@/presentation/components/ui/button";
import { Calendar, MapPin, User, MessageSquare, DollarSign, Info, Settings2 } from "lucide-react";
import { Reservation } from "@/core/domain/entities/Reservation";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { STATUS_CONFIG } from "@/presentation/shared/constants/reservation-status";

interface HostReservationCardProps {
  reservation: Reservation;
  onDetails: (id: string) => void;
}

export const HostReservationCard = memo(function HostReservationCard({
  reservation,
  onDetails,
}: HostReservationCardProps) {
  const statusCfg = STATUS_CONFIG[reservation.status] || STATUS_CONFIG.pending;
  const StatusIcon = statusCfg.icon;
  const imageUrl = reservation.space?.images?.[0];

  return (
    <div className="bg-white dark:bg-card border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.11)] hover:border-border/80 rounded-2xl overflow-hidden flex flex-col transition-all duration-300">
      {/* Image */}
      <div className="relative w-full h-32 bg-muted shrink-0 overflow-hidden">
        {imageUrl ? (
          <Image src={imageUrl} alt={reservation.space?.title ?? "Espacio"} fill sizes="(max-width: 640px) 100vw, 400px" className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/80 to-muted/40">
            <Calendar className="w-8 h-8 text-muted-foreground/30" />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/20 to-transparent" />
        <span className={`absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 shadow-sm backdrop-blur-sm ${statusCfg.color}`}>
          <StatusIcon className="w-3 h-3" />
          {statusCfg.label}
        </span>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        {/* Title + location */}
        <div>
          <h3 className="font-semibold text-sm text-foreground leading-snug line-clamp-1">
            {reservation.space?.title || "Espacio"}
          </h3>
          {reservation.space?.location && (
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3" />
              {reservation.space.location.city}, {reservation.space.location.state}
            </p>
          )}
        </div>

        {/* Client + dates */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">Cliente</p>
            <p className="text-xs font-semibold text-foreground flex items-center gap-1 truncate">
              <User className="w-3 h-3 text-muted-foreground flex-shrink-0" />
              {reservation.client?.name || "Usuario"}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">Fechas</p>
            <p className="text-xs font-semibold text-foreground">
              {format(reservation.startDate, "d MMM", { locale: es })} – {format(reservation.endDate, "d MMM yy", { locale: es })}
            </p>
          </div>
        </div>

        {/* Earnings */}
        <div className="flex items-center justify-between pt-2 border-t border-border/40">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <DollarSign className="w-3 h-3 text-emerald-600" />
            <span>Ganancia <span className="font-bold text-foreground">${reservation.basePrice}</span></span>
          </div>
          <span className="text-xs text-muted-foreground">Total: <span className="font-bold text-foreground">${reservation.totalPrice}</span></span>
        </div>

        {/* Notes */}
        {reservation.notes && (
          <div className="p-2.5 rounded-lg bg-muted/30 border border-border/40">
            <p className="text-[10px] font-semibold text-muted-foreground flex items-center gap-1 mb-0.5">
              <MessageSquare className="w-3 h-3" /> Mensaje
            </p>
            <p className="text-xs text-foreground line-clamp-1">{reservation.notes}</p>
          </div>
        )}

        <Button
          variant={reservation.status === "pending" ? "default" : "outline"}
          size="sm"
          onClick={() => onDetails(reservation.id)}
          className={`w-full rounded-xl gap-2 h-8 text-xs mt-auto ${reservation.status === "pending" ? "bg-primary hover:bg-primary/90" : ""}`}
        >
          {reservation.status === "pending"
            ? <><Settings2 className="w-3.5 h-3.5" />Gestionar</>
            : <><Info className="w-3.5 h-3.5" />Ver detalle</>
          }
        </Button>
      </div>
    </div>
  );
});
