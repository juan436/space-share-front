"use client";

import { Info, CalendarIcon } from "lucide-react";
import { format, addMonths, isSameDay } from "date-fns";
import { Calendar } from "@/presentation/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/presentation/components/ui/popover";
import { es } from "date-fns/locale";
import { AVAILABLE_MONTHS, DAYS_PER_MONTH } from "@/core/domain/entities/Reservation";

interface BookingMonthGridProps {
  months: number;
  setMonths: (m: number) => void;
  isMonthAvailable: (m: number) => boolean;
  isStartDateAvailable: (date: Date) => boolean;
  allowsMultiUnit: boolean;
  effectiveQuantity: number;
  startDate: Date;
  nextDate: Date | null;
  setStartDate: (d: Date) => void;
}

export function BookingMonthGrid({
  months,
  setMonths,
  isMonthAvailable,
  isStartDateAvailable,
  allowsMultiUnit,
  effectiveQuantity,
  startDate,
  nextDate,
  setStartDate,
}: BookingMonthGridProps) {
  const today = new Date(new Date().setHours(0, 0, 0, 0));
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
              {allowsMultiUnit
                ? effectiveQuantity + (effectiveQuantity === 1 ? " espacio" : " espacios")
                : "lugar"}
            </b>{" "}
            sin pausas.
          </p>
          {nextDate && (
            <button
              onClick={() => setStartDate(nextDate)}
              className="text-[11px] text-primary font-bold hover:underline mt-1 block text-left"
            >
              Disponible desde el {format(nextDate, "d 'de' MMMM", { locale: es })}. ¿Cambiar fecha?
            </button>
          )}
        </div>
      )}

      <div className="space-y-2 pt-1">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          ¿Cuándo quieres empezar?
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="w-full flex items-center gap-2 h-12 px-4 rounded-xl border border-border bg-white dark:bg-zinc-900 text-left text-sm font-semibold hover:bg-select-hover transition-colors"
            >
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span className="flex-1">{format(startDate, "d 'de' MMMM yyyy", { locale: es })}</span>
              {isSameDay(startDate, today) && <span className="text-xs font-medium text-muted-foreground">Hoy</span>}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
            <Calendar
              initialFocus
              mode="single"
              locale={es}
              defaultMonth={startDate}
              selected={startDate}
              onSelect={(d) => d && setStartDate(new Date(d.setHours(0, 0, 0, 0)))}
              disabled={(d) => d < today || !isStartDateAvailable(d)}
            />
          </PopoverContent>
        </Popover>
        {isMonthAvailable(months) && (
          <p className="text-[11px] text-muted-foreground font-medium">
            Termina el {format(addMonths(startDate, months), "d 'de' MMMM yyyy", { locale: es })}
          </p>
        )}
      </div>
    </div>
  );
}
