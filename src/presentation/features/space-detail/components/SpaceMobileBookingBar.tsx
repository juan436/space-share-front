"use client";

import { useState } from "react";
import { Star, CalendarIcon, Info, Minus, Plus } from "lucide-react";
import { Space } from "@/core/domain/entities/Space";
import { Button } from "@/presentation/components/ui/button";
import { Calendar } from "@/presentation/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/presentation/components/ui/dialog";
import { format, differenceInDays, addMonths } from "date-fns";
import { DateRange } from "react-day-picker";
import { useAuth } from "@/presentation/providers/auth-context";
import { useRouter } from "next/navigation";
import { reservationRepository } from "@/bootstrap/application";
import { BookingConfirmModal } from "./BookingConfirmModal";

interface SpaceMobileBookingBarProps {
  space: Space;
}

export function SpaceMobileBookingBar({ space }: SpaceMobileBookingBarProps) {
  const [months, setMonths] = useState(1);
  const [mode, setMode] = useState<"months" | "dates">("dates");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [startDate, setStartDate] = useState<Date>(new Date(new Date().setHours(0, 0, 0, 0)));
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  const isVehicleSpace = space.type === "garage" || space.type === "parking";
  const effectiveQuantity = isVehicleSpace ? quantity : 1;
  const displayCapacity = space.capacity || 1;

  // Calculate pricing based on mode
  let currentMonths = months;
  if (mode === "dates" && dateRange?.from && dateRange?.to) {
    const diffDays = differenceInDays(dateRange.to, dateRange.from);
    currentMonths = Math.max(1, diffDays / 30);
  }

  const totalPrice = Math.round(space.pricePerMonth * currentMonths * effectiveQuantity);
  const serviceFee = Math.round(totalPrice * 0.05);
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
      if (currentOccupancy + effectiveQuantity > displayCapacity) return false;
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

  const getBookingDates = (): { start: string; end: string } => {
    if (mode === "dates" && dateRange?.from && dateRange?.to) {
      return {
        start: dateRange.from.toISOString(),
        end: dateRange.to.toISOString(),
      };
    }
    return {
      start: startDate.toISOString(),
      end: addMonths(startDate, months).toISOString(),
    };
  };

  const handleReserveClick = () => {
    if (!isAuthenticated) {
      router.push(`/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    setIsOpen(false);
    setShowConfirmModal(true);
  };

  const handleConfirmBooking = async (notes: string) => {
    const dates = getBookingDates();
    await reservationRepository.create({
      spaceId: space.id,
      startDate: dates.start,
      endDate: dates.end,
      basePrice: totalPrice,
      serviceFee,
      totalPrice: grandTotal,
      notes,
    });
  };

  const isBookingDisabled = mode === "months" ? !isMonthAvailable(months) : (!dateRange?.from || !dateRange?.to);

  return (
    <>
      <div className="fixed bottom-4 left-4 right-4 md:hidden z-40 animate-in slide-in-from-bottom-6 fade-in duration-500 ease-out safe-area-bottom">
        <div className="flex items-center justify-between gap-4 p-3 bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] ring-1 ring-black/5">
          {/* Left: Price & Rating */}
          <div className="pl-3 flex flex-col justify-center">
            <div className="flex items-end gap-1.5 leading-none">
              <span className="text-[1.35rem] font-extrabold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                ${space.pricePerMonth}
              </span>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
                /mes
              </span>
            </div>

            {space.rating ? (
              <div className="flex items-center gap-1.5 mt-1.5">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold">{space.rating}</span>
                <span className="text-[10px] text-muted-foreground">({space.reviewCount} reseñas)</span>
              </div>
            ) : (
              <div className="text-[11px] font-bold text-emerald-600 mt-1.5 bg-emerald-500/10 w-fit px-2 py-0.5 rounded-full">
                Disponible ahora
              </div>
            )}
          </div>

          {/* Right: Trigger Button */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="h-[3.25rem] px-7 rounded-xl font-bold tracking-wide shadow-lg shadow-primary/20 bg-gradient-to-tr from-primary to-accent hover:opacity-90 hover:scale-[1.02] transition-all active:scale-95 text-[15px]">
                Reservar
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] w-11/12 rounded-2xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">Reserva tu espacio</DialogTitle>
              </DialogHeader>

              <div className="mt-4">
                {/* Quantity Selector (Shared Capacity - Only for Garages/Parking) */}
                {isVehicleSpace && (
                  <div className="flex items-center justify-between mb-6 p-4 rounded-xl border border-border/60 bg-muted/20">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">Cantidad de espacios</span>
                      <span className="text-xs text-muted-foreground font-medium">Capacidad disponible: {displayCapacity}</span>
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
                        onClick={() => setQuantity(Math.min(displayCapacity, quantity + 1))}
                        disabled={quantity >= displayCapacity}
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

                {/* Selection Content */}
                <div className="mb-6 flex flex-col justify-center">
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
                        <div className="mt-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 w-full space-y-2">
                          <p className="text-[12px] text-amber-700 dark:text-amber-400 font-bold flex items-center gap-1.5">
                            <Info className="w-3.5 h-3.5" />
                            Cupo limitado para hoy
                          </p>
                          <p className="text-[11px] text-amber-600/80 dark:text-amber-400/60 leading-relaxed font-medium text-left">
                            Una reserva por meses requiere disponibilidad continua los {months * 30} días seguidos.
                            Como hay fechas sueltas ya reservadas en este período, se interrumpe la disponibilidad y no podemos ofrecerte el <b>{isVehicleSpace ? effectiveQuantity + (effectiveQuantity === 1 ? ' espacio' : ' espacios') : 'lugar'}</b> sin pausas.
                          </p>
                          {nextDate && (
                            <button
                              onClick={() => setStartDate(nextDate)}
                              className="text-[11px] text-primary font-extrabold hover:underline mt-1 block text-left"
                            >
                              Disponible desde el {format(nextDate, "d 'de' MMMM", { locale: require('date-fns/locale').es })}. ¿Cambiar fecha?
                            </button>
                          )}
                        </div>
                      )}
                      {isMonthAvailable(months) && startDate.getTime() !== new Date(new Date().setHours(0, 0, 0, 0)).getTime() && (
                        <p className="text-[11px] text-emerald-600 font-bold mt-2 w-full text-left">
                          Iniciando el {format(startDate, "d 'de' MMMM", { locale: require('date-fns/locale').es })}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3 flex flex-col items-center">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground self-start w-full">
                        Selecciona tu periodo
                      </label>
                      <div className="w-full bg-white dark:bg-zinc-900 border border-border rounded-2xl overflow-hidden self-center">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={dateRange?.from}
                          selected={dateRange}
                          onSelect={setDateRange}
                          numberOfMonths={1}
                          className="w-full flex justify-center"
                          disabled={(date) => {
                            if (date < new Date(new Date().setHours(0, 0, 0, 0))) return true;
                            const dateStr = format(date, "yyyy-MM-dd");
                            const currentOccupancy = space.occupancyMap?.[dateStr] || 0;
                            return currentOccupancy + effectiveQuantity > displayCapacity;
                          }}
                        />
                      </div>
                      {dateRange?.from && (
                        <p className="text-[11px] text-muted-foreground font-medium self-start w-full">
                          Estadía mínima: 15 días
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-4 mb-8 pt-2">
                  <div className="flex justify-between items-center text-[15px]">
                    <span className="text-muted-foreground font-medium underline decoration-muted-foreground/30">
                      ${space.pricePerMonth} x {months} {months === 1 ? "mes" : "meses"} {isVehicleSpace && `x ${effectiveQuantity} unid.`}
                    </span>
                    <span className="text-foreground font-semibold">${totalPrice}</span>
                  </div>
                  <div className="flex justify-between items-center text-[15px]">
                    <span className="text-muted-foreground font-medium flex items-center gap-1.5 underline decoration-muted-foreground/30">
                      Tarifa de servicio (5%)
                      <Info className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-foreground font-semibold">${serviceFee}</span>
                  </div>
                  <div className="h-px w-full bg-border/40" />
                  <div className="flex justify-between items-end">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="text-2xl font-extrabold text-foreground tracking-tight">${grandTotal}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    disabled={isBookingDisabled}
                    onClick={handleReserveClick}
                    className="w-full h-14 rounded-xl text-[15px] font-bold tracking-wide shadow-lg shadow-primary/20 bg-gradient-to-tr from-primary to-accent disabled:opacity-50 disabled:scale-100 disabled:from-muted disabled:to-muted disabled:text-muted-foreground disabled:shadow-none"
                  >
                    {mode === "months" && !isMonthAvailable(months) ? "Capacidad Excedida" : "Continuar"}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground font-medium">No se hará ningún cargo aún</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <BookingConfirmModal
        open={showConfirmModal}
        onOpenChange={setShowConfirmModal}
        onConfirm={handleConfirmBooking}
        totalPrice={grandTotal}
      />
    </>
  );
}
