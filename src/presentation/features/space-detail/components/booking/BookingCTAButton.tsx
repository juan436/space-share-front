"use client";

import { Button } from "@/presentation/components/ui/button";

interface BookingCTAButtonProps {
  disabled: boolean;
  onClick: () => void;
  bookingError: string | null;
  label: string;
  capacityExceeded: boolean;
  className?: string;
}

export function BookingCTAButton({
  disabled,
  onClick,
  bookingError,
  label,
  capacityExceeded,
  className = "",
}: BookingCTAButtonProps) {
  return (
    <div className="space-y-2">
      {bookingError && (
        <p className="text-red-500 text-sm text-center">{bookingError}</p>
      )}
      <Button
        disabled={disabled}
        onClick={onClick}
        className={`w-full h-11 rounded-xl text-sm font-bold tracking-wide shadow-[0_8px_30px_rgb(0,0,0,0.12)] shadow-primary/20 bg-primary hover:bg-primary/90 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none ${className}`}
      >
        {capacityExceeded ? "Capacidad Excedida" : label}
      </Button>
      <p className="text-xs text-center text-muted-foreground font-medium">No se hará ningún cargo aún</p>
    </div>
  );
}
