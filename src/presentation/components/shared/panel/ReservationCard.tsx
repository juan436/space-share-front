import { memo } from "react";
import { KeyRound, CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Reservation } from "@/core/domain/entities/Reservation";
import { STATUS_CONFIG } from "@/presentation/shared/constants/reservation-status";
import { RESERVATION_TONE, TONE_DOT } from "@/presentation/shared/constants/status-tones";
import { PanelCard } from "./PanelCard";

interface ReservationCardProps {
  reservation: Reservation;
  /** Etiqueta y nombre de la otra parte (Cliente / Anfitrión) */
  counterpart: { label: string; name?: string };
  /** Línea de precio ya formateada */
  priceLine: React.ReactNode;
  /** Mensaje corto de estado, opcional */
  note?: string;
  /** Botones de acción */
  children?: React.ReactNode;
  onOpen?: () => void;
}

export const ReservationCard = memo(function ReservationCard({ reservation: r, counterpart, priceLine, note, children, onOpen }: ReservationCardProps) {
  const location = r.space?.location;

  return (
    <PanelCard
      image={r.space?.images?.[0]}
      alt={r.space?.title ?? "Espacio"}
      onImageClick={onOpen}
      badge={
        <>
          <span className={`w-2 h-2 rounded-full ${TONE_DOT[RESERVATION_TONE[r.status] ?? "neutral"]}`} />
          {STATUS_CONFIG[r.status]?.label ?? r.status}
        </>
      }
      bottomLeft={
        <>
          <CalendarDays className="w-3.5 h-3.5" />
          <span>{format(r.startDate, "d MMM", { locale: es })} – {format(r.endDate, "d MMM yy", { locale: es })}</span>
        </>
      }
      bottomRight={r.eventCode ? <span className="flex items-center gap-1 tracking-wider"><KeyRound className="w-3 h-3" />{r.eventCode}</span> : undefined}
    >
      <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
        {r.space?.title ?? "Espacio"}
      </h3>
      {location && <p className="text-xs text-muted-foreground">{location.city}, {location.state}</p>}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="px-2 py-0.5 text-[11px] font-medium text-muted-foreground bg-muted/70 rounded-md">
          {counterpart.label}: {counterpart.name ?? "—"}
        </span>
      </div>
      <div className="mt-1 text-sm text-foreground">{priceLine}</div>
      {note && <p className="text-xs text-muted-foreground">{note}</p>}
      {children && <div className="mt-auto pt-2">{children}</div>}
    </PanelCard>
  );
});
