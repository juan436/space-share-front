import { memo } from "react";
import { Info, Settings2 } from "lucide-react";
import { Reservation } from "@/core/domain/entities/Reservation";
import { Button } from "@/presentation/components/ui/button";
import { ReservationCard } from "@/presentation/components/shared/panel/ReservationCard";

interface HostReservationCardProps {
  reservation: Reservation;
  onDetails: (id: string) => void;
}

export const HostReservationCard = memo(function HostReservationCard({ reservation, onDetails }: HostReservationCardProps) {
  const isPending = reservation.status === "pending";

  return (
    <ReservationCard
      reservation={reservation}
      counterpart={{ label: "Cliente", name: reservation.client?.name }}
      priceLine={
        <>
          <span className="font-semibold">${reservation.basePrice}</span> <span className="text-muted-foreground">ganancia · ${reservation.totalPrice} total</span>
        </>
      }
      note={reservation.notes ? `“${reservation.notes}”` : undefined}
      onOpen={() => onDetails(reservation.id)}
    >
      <Button variant={isPending ? "default" : "outline"} onClick={() => onDetails(reservation.id)} className="w-full h-10 rounded-lg gap-2">
        {isPending ? <><Settings2 className="w-4 h-4" /> Gestionar solicitud</> : <><Info className="w-4 h-4" /> Ver detalle</>}
      </Button>
    </ReservationCard>
  );
});
