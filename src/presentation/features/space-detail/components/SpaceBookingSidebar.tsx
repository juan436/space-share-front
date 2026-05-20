"use client";

import { Calendar as CalendarIconSVG, Shield, CalendarIcon } from "lucide-react";
import { Space } from "@/core/domain/entities/Space";
import { Button } from "@/presentation/components/ui/button";
import { Calendar } from "@/presentation/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/presentation/components/ui/popover";
import { format } from "date-fns";
import { useAuth } from "@/presentation/providers/auth-context";
import { useRouter } from "next/navigation";
import { BookingConfirmModal } from "./BookingConfirmModal";
import { useBookingLogic, MIN_RENTAL_DAYS } from "../hooks/useBookingLogic";
import {
  BookingQuantitySelector,
  BookingModeSelector,
  BookingMonthGrid,
  BookingPriceSummary,
  BookingFreeCancellation,
  BookingCTAButton,
} from "./booking";

interface SpaceBookingSidebarProps {
  space: Space;
}

export function SpaceBookingSidebar({ space }: SpaceBookingSidebarProps) {
  const {
    months, setMonths, mode, setMode, dateRange, setDateRange,
    quantity, setQuantity, startDate, setStartDate,
    showConfirmModal, setShowConfirmModal, bookingError,
    isVehicleSpace, effectiveQuantity, displayCapacity, currentMonths,
    totalPrice, serviceFee, grandTotal, isMonthAvailable, nextDate,
    handleConfirmBooking, isBookingDisabled, showFreeCancellation,
  } = useBookingLogic(space);

  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleReserveClick = () => {
    if (!isAuthenticated) {
      router.push(`/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    setShowConfirmModal(true);
  };

  return (
    <>
      <div className="p-5 rounded-[24px] bg-white dark:bg-zinc-900 shadow-[0_8px_30px_rgb(0,0,0,0.06)] ring-1 ring-black/5 dark:ring-white/10">
        <div className="flex items-baseline gap-1.5 mb-4">
          <span className="text-2xl font-extrabold text-foreground tracking-tight">${space.pricePerMonth}</span>
          <span className="text-sm font-medium text-muted-foreground">/ mes</span>
        </div>

        {isVehicleSpace && (
          <BookingQuantitySelector
            quantity={quantity}
            displayCapacity={displayCapacity}
            onDecrement={() => setQuantity(Math.max(1, quantity - 1))}
            onIncrement={() => setQuantity(Math.min(displayCapacity, quantity + 1))}
            className="mb-4"
          />
        )}

        <BookingModeSelector
          mode={mode}
          onSelectDates={() => { setMode("dates"); setMonths(1); }}
          onSelectMonths={() => { setMode("months"); setDateRange(undefined); }}
          className="mb-4"
        />

        <div className="mb-4 flex flex-col justify-center">
          {mode === "months" ? (
            <BookingMonthGrid
              months={months}
              setMonths={setMonths}
              isMonthAvailable={isMonthAvailable}
              isVehicleSpace={isVehicleSpace}
              effectiveQuantity={effectiveQuantity}
              startDate={startDate}
              nextDate={nextDate}
              setStartDate={setStartDate}
            />
          ) : (
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Selecciona tu periodo
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-semibold h-12 rounded-xl border-border bg-white dark:bg-zinc-900 ${
                      !dateRange?.from ? "text-muted-foreground" : ""
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>{format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}</>
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
                    onSelect={(range) => {
                      if (range?.from && range?.to) {
                        const today = new Date(new Date().setHours(0, 0, 0, 0));
                        if (range.from.getTime() === today.getTime()) {
                          const tomorrow = new Date(today);
                          tomorrow.setDate(today.getDate() + 1);
                          setDateRange({ from: tomorrow, to: range.to });
                          return;
                        }
                      }
                      setDateRange(range);
                    }}
                    numberOfMonths={1}
                    disabled={(date) => {
                      if (date < new Date(new Date().setHours(0, 0, 0, 0))) return true;
                      const dateStr = format(date, "yyyy-MM-dd");
                      const currentOccupancy = space.occupancyMap?.[dateStr] || 0;
                      return currentOccupancy + effectiveQuantity > displayCapacity;
                    }}
                  />
                </PopoverContent>
              </Popover>
              {dateRange?.from && (
                <p className="text-[11px] text-muted-foreground font-medium">Estadía mínima: {MIN_RENTAL_DAYS} días</p>
              )}
            </div>
          )}
        </div>

        <BookingPriceSummary
          mode={mode}
          dateRange={dateRange}
          space={space}
          currentMonths={currentMonths}
          isVehicleSpace={isVehicleSpace}
          effectiveQuantity={effectiveQuantity}
          totalPrice={totalPrice}
          serviceFee={serviceFee}
          grandTotal={grandTotal}
        />

        {showFreeCancellation && <BookingFreeCancellation />}

        <BookingCTAButton
          disabled={isBookingDisabled}
          onClick={handleReserveClick}
          bookingError={bookingError}
          label="Reservar ahora"
          capacityExceeded={mode === "months" && !isMonthAvailable(months)}
        />

        <div className="h-px w-full bg-border/40 my-4" />

        <button className="w-full flex items-center justify-center gap-2 py-2 rounded-xl font-semibold text-sm transition-colors hover:bg-muted/50 text-foreground">
          <CalendarIconSVG className="w-4 h-4" />
          Agendar visita
        </button>

        <div className="flex items-center gap-2 mt-3 justify-center text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <Shield className="w-3.5 h-3.5 shrink-0" />
          <span>Pago seguro 100% garantizado</span>
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
