"use client";

import { Info } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { AVAILABLE_MONTHS, DAYS_PER_MONTH } from "@/presentation/features/space-detail/hooks/useBookingLogic";

interface BookingMonthGridProps {
  months: number;
  setMonths: (m: number) => void;
  isMonthAvailable: (m: number) => boolean;
  isVehicleSpace: boolean;
  effectiveQuantity: number;
  startDate: Date;
  nextDate: Date | null;
  setStartDate: (d: Date) => void;
}

export function BookingMonthGrid({
  months,
  setMonths,
  isMonthAvailable,
  isVehicleSpace,
  effectiveQuantity,
  startDate,
  nextDate,
  setStartDate,
}: BookingMonthGridProps) {
  return (
    <div className="space-y-3">
      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Duración del alquiler
      </label>
      <div className="grid grid-cols-3 gap-2">
        {AVAILABLE_MONTHS.map((m) => {
          const available = isMonthAvailable(m);
          return (
            <button
              key={m}
              onClick={() => available && setMonths(m)}
              disabled={!available}
              className={`py-2 px-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                !available
                  ? "bg-muted/10 text-muted-foreground/40 cursor-not-allowed opacity-50 ring-1 ring-inset ring-border/30"
                  : months === m
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/50 ring-1 ring-inset ring-border/50"
              }`}
            >
              {m} {m === 1 ? "mes" : "meses"}
            </button>
          );
        })}
      </div>

      {!isMonthAvailable(months) && (
        <div className="mt-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 w-full space-y-2">
          <p className="text-[12px] text-amber-700 dark:text-amber-400 font-bold flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            Cupo limitado para hoy
          </p>
          <p className="text-[11px] text-amber-600/80 dark:text-amber-400/60 leading-relaxed font-medium text-left">
            Una reserva por meses requiere disponibilidad continua los {months * DAYS_PER_MONTH} días seguidos.
            Como hay fechas sueltas ya reservadas en este período, se interrumpe la disponibilidad y no podemos
            ofrecerte el{" "}
            <b>
              {isVehicleSpace
                ? effectiveQuantity + (effectiveQuantity === 1 ? " espacio" : " espacios")
                : "lugar"}
            </b>{" "}
            sin pausas.
          </p>
          {nextDate && (
            <button
              onClick={() => setStartDate(nextDate)}
              className="text-[11px] text-primary font-extrabold hover:underline mt-1 block text-left"
            >
              Disponible desde el {format(nextDate, "d 'de' MMMM", { locale: es })}. ¿Cambiar fecha?
            </button>
          )}
        </div>
      )}

      {isMonthAvailable(months) &&
        startDate.getTime() !== new Date(new Date().setHours(0, 0, 0, 0)).getTime() && (
          <p className="text-[11px] text-emerald-600 font-bold mt-2 w-full text-left">
            Iniciando el {format(startDate, "d 'de' MMMM", { locale: es })}
          </p>
        )}
    </div>
  );
}
