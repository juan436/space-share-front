import { CalendarX2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Reservation } from "@/core/domain/entities/Reservation";
import { STATUS_CONFIG } from "@/presentation/shared/constants/reservation-status";
import { resolveImageUrl } from "@/presentation/utils/image";

interface ReservationListProps {
  reservations: Reservation[];
  emptyText: string;
  /** Muestra al cliente (vista host) o al anfitrión (vista cliente) bajo el título */
  counterpart: "client" | "host";
  onOpen: () => void;
}

export function ReservationList({ reservations, emptyText, counterpart, onOpen }: ReservationListProps) {
  if (reservations.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
        <CalendarX2 className="w-9 h-9 opacity-40" />
        <p className="text-sm">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border">
      {reservations.map((r) => {
        const status = STATUS_CONFIG[r.status];
        const image = r.space?.images?.[0];
        const person = counterpart === "client" ? r.client?.name : r.host?.name;
        return (
          <button key={r.id} onClick={onOpen} className="w-full flex items-center gap-4 px-5 py-3.5 text-left hover:bg-primary/[0.04] transition-colors">
            {image ? (
              <img src={resolveImageUrl(image)} alt="" className="w-14 h-14 rounded-xl object-cover shrink-0 bg-muted" />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-muted shrink-0" />
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground truncate">{r.space?.title ?? "Espacio"}</p>
              <p className="text-xs text-muted-foreground truncate">
                {person ? `${person} · ` : ""}
                {format(r.startDate, "d MMM", { locale: es })} – {format(r.endDate, "d MMM yyyy", { locale: es })}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-bold text-foreground">${r.totalPrice}</p>
              {status && (
                <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${status.color}`}>
                  {status.label}
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
