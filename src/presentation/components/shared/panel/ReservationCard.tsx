import { memo } from "react";
import { KeyRound, Warehouse } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Reservation } from "@/core/domain/entities/Reservation";
import { STATUS_CONFIG } from "@/presentation/shared/constants/reservation-status";
import { resolveImageUrl } from "@/presentation/utils/image";

const DOT: Record<string, string> = {
  pending: "bg-amber-500",
  accepted: "bg-emerald-500",
  awaiting_payment: "bg-violet-500",
  confirmed: "bg-emerald-500",
  completed: "bg-blue-500",
  rejected: "bg-red-500",
  cancelled: "bg-gray-400",
  expired: "bg-gray-400",
};

interface ReservationCardProps {
  reservation: Reservation;
  /** Etiqueta y nombre de la otra parte (Cliente / Anfitrión) */
  counterpart: { label: string; name?: string };
  /** Texto de precio ya formateado, p. ej. "$1,573 total" */
  priceLine: React.ReactNode;
  /** Mensaje corto de estado, opcional */
  note?: string;
  /** Botones de acción */
  children?: React.ReactNode;
  onOpen?: () => void;
}

export const ReservationCard = memo(function ReservationCard({ reservation: r, counterpart, priceLine, note, children, onOpen }: ReservationCardProps) {
  const image = r.space?.images?.[0];
  const location = r.space?.location;

  return (
    <article className="group flex flex-col">
      <button type="button" onClick={onOpen} disabled={!onOpen} className="relative block aspect-[4/3] rounded-xl overflow-hidden bg-muted text-left">
        {image ? (
          <img src={resolveImageUrl(image)} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/10 to-accent/10 text-primary/60">
            <Warehouse className="w-10 h-10" strokeWidth={1.5} />
            <span className="text-xs font-medium">Sin foto</span>
          </div>
        )}
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 text-foreground text-xs font-semibold shadow-sm">
          <span className={`w-2 h-2 rounded-full ${DOT[r.status] ?? "bg-gray-400"}`} />
          {STATUS_CONFIG[r.status]?.label ?? r.status}
        </span>
        {r.eventCode && (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 text-primary text-xs font-bold tracking-wider shadow-sm">
            <KeyRound className="w-3 h-3" /> {r.eventCode}
          </span>
        )}
      </button>

      <div className="mt-3 flex-1">
        <p className="text-[15px] font-semibold text-foreground truncate">{r.space?.title ?? "Espacio"}</p>
        {location && <p className="text-sm text-muted-foreground truncate">{location.city}, {location.state}</p>}
        <p className="text-sm text-foreground mt-1">
          {format(r.startDate, "d MMM", { locale: es })} – {format(r.endDate, "d MMM yyyy", { locale: es })}
        </p>
        <p className="text-sm text-muted-foreground truncate">{counterpart.label}: {counterpart.name ?? "—"}</p>
        <p className="text-sm text-foreground mt-1">{priceLine}</p>
        {note && <p className="text-xs text-muted-foreground mt-2">{note}</p>}
      </div>

      {children && <div className="mt-3">{children}</div>}
    </article>
  );
});
