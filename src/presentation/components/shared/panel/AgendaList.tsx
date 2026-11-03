import { CalendarX2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Reservation } from "@/core/domain/entities/Reservation";
import { STATUS_CONFIG } from "@/presentation/shared/constants/reservation-status";
import { RESERVATION_TONE, TONE_DOT } from "@/presentation/shared/constants/status-tones";

interface AgendaListProps {
  reservations: Reservation[];
  counterpart: "client" | "host";
  emptyText: string;
  onOpen: () => void;
}

/** Agenda: una fila por reservación, con la fecha de inicio como bloque de calendario. */
export function AgendaList({ reservations, counterpart, emptyText, onOpen }: AgendaListProps) {
  if (reservations.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-14 rounded-2xl border border-dashed border-border bg-white dark:bg-card text-muted-foreground">
        <CalendarX2 className="w-8 h-8 opacity-40" />
        <p className="text-sm">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-white dark:bg-card divide-y divide-border shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
      {reservations.map((r) => {
        const person = counterpart === "client" ? r.client?.name : r.host?.name;
        const label = counterpart === "client" ? "Cliente" : "Anfitrión";
        return (
          <button key={r.id} onClick={onOpen} className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-select-hover transition-colors">
            <div className="w-14 h-14 rounded-xl bg-muted flex flex-col items-center justify-center shrink-0">
              <span className="text-xl font-bold leading-none text-foreground">{format(r.startDate, "d")}</span>
              <span className="text-[11px] font-semibold uppercase text-muted-foreground mt-1">{format(r.startDate, "MMM", { locale: es })}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground truncate">{r.space?.title ?? "Espacio"}</p>
              <p className="text-xs text-muted-foreground truncate">
                {format(r.startDate, "d MMM", { locale: es })} – {format(r.endDate, "d MMM yyyy", { locale: es })}
                {person ? ` · ${label}: ${person}` : ""}
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-foreground shrink-0">
              <span className={`w-2 h-2 rounded-full ${TONE_DOT[RESERVATION_TONE[r.status] ?? "neutral"]}`} />
              {STATUS_CONFIG[r.status]?.label ?? r.status}
            </div>
            <p className="text-sm font-bold text-foreground shrink-0 w-16 text-right">${r.totalPrice}</p>
          </button>
        );
      })}
    </div>
  );
}
