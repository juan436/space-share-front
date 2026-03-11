"use client";

import { useState } from "react";
import { Calendar as CalendarIconSVG, Info, Shield, Star, CalendarIcon, Minus, Plus } from "lucide-react";
import { Space } from "@/core/domain/entities/Space";
import { Button } from "@/presentation/components/ui/button";
import { Calendar } from "@/presentation/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/presentation/components/ui/popover";
import { format, differenceInDays } from "date-fns";
import { DateRange } from "react-day-picker";

interface SpaceBookingSidebarProps {
  space: Space;
}

export function SpaceBookingSidebar({ space }: SpaceBookingSidebarProps) {
  const [months, setMonths] = useState(1);
  const [mode, setMode] = useState<"months" | "dates">("dates");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [startDate, setStartDate] = useState<Date>(new Date(new Date().setHours(0, 0, 0, 0)));

  // Calculate pricing based on mode
  let currentMonths = months;
  if (mode === "dates" && dateRange?.from && dateRange?.to) {
    const diffDays = differenceInDays(dateRange.to, dateRange.from);
    // Approximate months for pricing if custom dates
    currentMonths = Math.max(1, diffDays / 30);
  }

  const totalPrice = Math.round(space.pricePerMonth * currentMonths * quantity);
  const serviceFee = Math.round(totalPrice * 0.1);
  const grandTotal = Math.round(totalPrice + serviceFee);

  // Math logic for Month Button validation
  const checkAvailability = (m: number, start: Date) => {
    const end = new Date(start);
    end.setMonth(start.getMonth() + m);
    const days = differenceInDays(end, start);

    for (let i = 0; i < days; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const dateStr = format(d, "yyyy-MM-dd");
      const currentOccupancy = space.occupancyMap?.[dateStr] || 0;
      if (currentOccupancy + quantity > space.capacity) return false;
    }
    return true;
  };

  const isMonthAvailable = (m: number) => checkAvailability(m, startDate);

  const getNextAvailableDate = (m: number) => {
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      if (checkAvailability(m, d)) return d;
    }
    return null;
  };

  const nextDate = getNextAvailableDate(months);
  const isAvailableToday = checkAvailability(months, new Date(new Date().setHours(0, 0, 0, 0)));

  return (
    <div className="p-8 rounded-[24px] bg-white dark:bg-zinc-900 shadow-[0_8px_30px_rgb(0,0,0,0.06)] ring-1 ring-black/5 dark:ring-white/10">
      {/* Price Header */}
      <div className="flex items-baseline gap-1.5 mb-6">
        <span className="text-3xl font-extrabold text-foreground tracking-tight">${space.pricePerMonth}</span>
        <span className="text-base font-medium text-muted-foreground">/ mes</span>
      </div>

      {/* Quantity Selector (Shared Capacity) */}
      {space.capacity > 1 && (
        <div className="flex items-center justify-between mb-6 p-4 rounded-xl border border-border/60 bg-muted/20">
          <div className="flex flex-col">
            <span className="text-sm font-bold">Cantidad de espacios</span>
            <span className="text-xs text-muted-foreground font-medium">Capacidad disponible: {space.capacity}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-zinc-800 shadow-sm ring-1 ring-black/5 dark:ring-white/10 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-all"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-sm font-bold w-4 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(space.capacity, quantity + 1))}
              disabled={quantity >= space.capacity}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-zinc-800 shadow-sm ring-1 ring-black/5 dark:ring-white/10 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-all"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Segmented Control */}
      <div className="flex p-1 bg-muted/40 rounded-xl mb-6 ring-1 ring-inset ring-black/5 dark:ring-white/5">
        <button
          onClick={() => setMode("dates")}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${
            mode === "dates"
              ? "bg-white dark:bg-zinc-800 text-foreground shadow-sm ring-1 ring-black/5"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Fechas exactas
        </button>
        <button
          onClick={() => setMode("months")}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${
            mode === "months"
              ? "bg-white dark:bg-zinc-800 text-foreground shadow-sm ring-1 ring-black/5"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Meses
        </button>
      </div>

      {/* Duration Selector Content */}
      <div className="mb-8 min-h-[88px] flex flex-col justify-center">
        {mode === "months" ? (
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Duración del alquiler
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 3, 6].map((m) => {
                const available = isMonthAvailable(m);
                return (
                  <button
                    key={m}
                    onClick={() => available && setMonths(m)}
                    disabled={!available}
                    className={`py-3 px-2 rounded-xl text-sm font-bold transition-all duration-300 ${
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
              <div className="mt-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                <p className="text-[12px] text-amber-700 dark:text-amber-400 font-bold flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  Cupo limitado para hoy
                </p>
                <p className="text-[11px] text-amber-600/80 dark:text-amber-400/60 leading-relaxed font-medium">
                  Una reserva por meses requiere disponibilidad continua los {months * 30} días seguidos. 
                  Como hay fechas sueltas ya reservadas en este período, se interrumpe la disponibilidad y no podemos ofrecerte los <b>{quantity} {quantity === 1 ? 'espacio' : 'espacios'}</b> sin pausas.
                </p>
                {nextDate && (
                  <button 
                    onClick={() => setStartDate(nextDate)}
                    className="text-[11px] text-primary font-extrabold hover:underline mt-1 block"
                  >
                    Disponible desde el {format(nextDate, "d 'de' MMMM", { locale: require('date-fns/locale').es })}. ¿Cambiar fecha?
                  </button>
                )}
              </div>
            )}
            {isMonthAvailable(months) && startDate.getTime() !== new Date(new Date().setHours(0, 0, 0, 0)).getTime() && (
              <p className="text-[11px] text-emerald-600 font-bold mt-2">
                Iniciando el {format(startDate, "d 'de' MMMM", { locale: require('date-fns/locale').es })}
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Selecciona tu periodo
            </label>
            <div className="grid gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={`w-full justify-start text-left font-semibold h-12 rounded-xl border-border bg-white dark:bg-zinc-900 ${
                      !dateRange?.from ? "text-muted-foreground" : ""
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span className="font-medium">Seleccionar fechas</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={1}
                    disabled={(date) => {
                      // Deshabilitar fechas pasadas
                      if (date < new Date(new Date().setHours(0, 0, 0, 0))) return true;
                      
                      // Deshabilitar fechas sin capacidad
                      const dateStr = format(date, "yyyy-MM-dd");
                      const currentOccupancy = space.occupancyMap?.[dateStr] || 0;
                      return currentOccupancy + quantity > space.capacity;
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            {dateRange?.from && <p className="text-[11px] text-muted-foreground font-medium">Estadía mínima: 15 días</p>}
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-4 mb-8 pt-2">
        <div className="flex justify-between items-center text-[15px]">
          <span className="text-muted-foreground font-medium underline decoration-muted-foreground/30 hover:decoration-foreground cursor-pointer transition-colors">
            ${space.pricePerMonth} x {months} {months === 1 ? "mes" : "meses"} {space.capacity > 1 && `x ${quantity} unid.`}
          </span>
          <span className="text-foreground font-semibold">${totalPrice}</span>
        </div>
        <div className="flex justify-between items-center text-[15px]">
          <span className="text-muted-foreground font-medium underline decoration-muted-foreground/30 hover:decoration-foreground cursor-pointer transition-colors flex items-center gap-1.5">
            Tarifa de servicio
            <Info className="w-3.5 h-3.5" />
          </span>
          <span className="text-foreground font-semibold">${serviceFee}</span>
        </div>
      </div>

      <div className="h-px w-full bg-border/40 mb-8" />

      {/* Total */}
      <div className="flex justify-between items-end mb-8">
        <span className="font-bold text-foreground">Total</span>
        <span className="text-2xl font-extrabold text-foreground tracking-tight">${grandTotal}</span>
      </div>

      {/* CTA Button */}
      <div className="space-y-3">
        <Button 
          disabled={mode === "months" ? !isMonthAvailable(months) : (!dateRange?.from || !dateRange?.to)}
          className="w-full h-14 rounded-xl text-[15px] font-bold tracking-wide shadow-[0_8px_30px_rgb(0,0,0,0.12)] shadow-primary/20 bg-gradient-to-tr from-primary to-accent hover:opacity-90 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:from-muted disabled:to-muted disabled:text-muted-foreground disabled:shadow-none"
        >
          {mode === "months" && !isMonthAvailable(months) ? "Capacidad Excedida" : "Reservar ahora"}
        </Button>
        <p className="text-xs text-center text-muted-foreground font-medium">No se hará ningún cargo aún</p>
      </div>

      <div className="h-px w-full bg-border/40 my-6" />

      {/* Secondary Action */}
      <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-colors hover:bg-muted/50 text-foreground">
        <CalendarIconSVG className="w-4 h-4" />
        Agendar visita
      </button>

      {/* Trust Badge */}
      <div className="flex items-center gap-2 mt-4 justify-center text-[13px] font-medium text-emerald-600 dark:text-emerald-400">
        <Shield className="w-4 h-4 shrink-0" />
        <span>Pago seguro 100% garantizado</span>
      </div>
    </div>
  );
}
