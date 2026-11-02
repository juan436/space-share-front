import { CalendarX2 } from "lucide-react";
import { Reservation } from "@/core/domain/entities/Reservation";
import { ReservationCard } from "./ReservationCard";

interface ReservationCardsProps {
  reservations: Reservation[];
  emptyText: string;
  counterpart: "client" | "host";
  onOpen: () => void;
}

/** Rejilla de reservaciones para los inicios del panel (solo lectura, abre la sección). */
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {reservations.map((r) => (
        <ReservationCard
          key={r.id}
          reservation={r}
          counterpart={
            counterpart === "client"
              ? { label: "Cliente", name: r.client?.name }
              : { label: "Anfitrión", name: r.host?.name }
          }
          priceLine={<><span className="font-bold">${r.totalPrice}</span> <span className="text-xs text-muted-foreground">total</span></>}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}
