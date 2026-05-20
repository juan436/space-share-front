"use client";

import { useState } from "react";
import { Star, CalendarIcon } from "lucide-react";
import { Space } from "@/core/domain/entities/Space";
import { Button } from "@/presentation/components/ui/button";
import { Calendar } from "@/presentation/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/presentation/components/ui/dialog";
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

interface SpaceMobileBookingBarProps {
  space: Space;
}

export function SpaceMobileBookingBar({ space }: SpaceMobileBookingBarProps) {
  const [isOpen, setIsOpen] = useState(false);

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
    setIsOpen(false);
    setShowConfirmModal(true);
  };

  return (
    <>
      <div className="fixed bottom-4 left-4 right-4 md:hidden z-40 animate-in slide-in-from-bottom-6 fade-in duration-500 ease-out safe-area-bottom">
        <div className="flex items-center justify-between gap-4 p-3 bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] ring-1 ring-black/5">
          <div className="pl-3 flex flex-col justify-center">
            <div className="flex items-end gap-1.5 leading-none">
              <span className="text-[1.35rem] font-extrabold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                ${space.pricePerMonth}
              </span>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">/mes</span>
            </div>
            {space.rating && space.rating > 0 ? (
              <div className="flex items-center gap-1.5 mt-1.5">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold">{space.rating}</span>
                <span className="text-[10px] text-muted-foreground">
                  ({space.reviewCount} {space.reviewCount === 1 ? "reseña" : "reseñas"})
                </span>
              </div>
            ) : (
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 px-2 py-0.5 rounded-full ring-1 ring-emerald-200 dark:ring-emerald-800 mt-1.5 w-fit">
                Nuevo en SpaceShare
              </span>
            )}
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="h-[3.25rem] px-7 rounded-xl font-bold tracking-wide shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 hover:scale-[1.02] transition-all active:scale-95 text-[15px]">
                Reservar
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] w-11/12 rounded-2xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">Reserva tu espacio</DialogTitle>
              </DialogHeader>

              <div className="mt-4">
                {isVehicleSpace && (
                  <BookingQuantitySelector
                    quantity={quantity}
                    displayCapacity={displayCapacity}
                    onDecrement={() => setQuantity(Math.max(1, quantity - 1))}
                    onIncrement={() => setQuantity(Math.min(displayCapacity, quantity + 1))}
                    className="mb-6"
                  />
                )}

                <BookingModeSelector
                  mode={mode}
                  onSelectDates={() => { setMode("dates"); setMonths(1); }}
                  onSelectMonths={() => { setMode("months"); setDateRange(undefined); }}
                  className="mb-6"
                />

                <div className="mb-6 flex flex-col justify-center">
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
                          Estadía mínima: {MIN_RENTAL_DAYS} días
                        </p>
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
                  label="Continuar"
                  capacityExceeded={mode === "months" && !isMonthAvailable(months)}
                />
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
