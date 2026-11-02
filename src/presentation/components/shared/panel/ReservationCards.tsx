import { CalendarX2 } from "lucide-react";
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

interface ReservationCardsProps {
  reservations: Reservation[];
  emptyText: string;
  counterpart: "client" | "host";
  onOpen: () => void;
}

export function ReservationCards({ reservations, emptyText, counterpart, onOpen }: ReservationCardsProps) {
  if (reservations.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 rounded-xl border border-dashed border-border bg-white dark:bg-card text-muted-foreground">
        <CalendarX2 className="w-9 h-9 opacity-40" />
        <p className="text-sm">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8">
      {reservations.map((r) => {
        const image = r.space?.images?.[0];
        const person = counterpart === "client" ? r.client?.name : r.host?.name;
        return (
          <button key={r.id} onClick={onOpen} className="group text-left">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted">
              {image && (
                <img src={resolveImageUrl(image)} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              )}
              <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 text-foreground text-xs font-semibold shadow-sm">
                <span className={`w-2 h-2 rounded-full ${DOT[r.status] ?? "bg-gray-400"}`} />
                {STATUS_CONFIG[r.status]?.label ?? r.status}
              </span>
            </div>
            <p className="text-[15px] font-semibold text-foreground mt-3 truncate">{r.space?.title ?? "Espacio"}</p>
            <p className="text-sm text-muted-foreground truncate">
              {format(r.startDate, "d MMM", { locale: es })} – {format(r.endDate, "d MMM yyyy", { locale: es })}
            </p>
            <p className="text-sm text-foreground mt-0.5">
              <span className="font-semibold">${r.totalPrice}</span>
              {person && <span className="text-muted-foreground"> · {person}</span>}
            </p>
          </button>
        );
      })}
    </div>
  );
}
