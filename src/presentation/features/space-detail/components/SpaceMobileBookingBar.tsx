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
import { useBookingLogic } from "../hooks/useBookingLogic";
import { MIN_RENTAL_DAYS } from "@/core/domain/entities/Reservation";
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
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    setIsOpen(false);
    setShowConfirmModal(true);
  };

  return (
    <>
      <div className="fixed bottom-4 left-4 right-4 md:hidden z-40 animate-in slide-in-from-bottom-6 fade-in duration-500 ease-out safe-area-bottom">
        <div className="flex items-center justify-between gap-4 p-3 bg-white dark:bg-card border border-border/60 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
          <div className="pl-2 flex flex-col justify-center">
            <div className="flex items-baseline gap-1 leading-none">
              <span className="text-xl font-extrabold text-foreground">${space.pricePerMonth}</span>
              <span className="text-xs font-medium text-muted-foreground">/mes</span>
            </div>
            {space.rating && space.rating > 0 ? (
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold">{space.rating}</span>
                <span className="text-[10px] text-muted-foreground">
                  ({space.reviewCount} {space.reviewCount === 1 ? "reseña" : "reseñas"})
                </span>
              </div>
            ) : (
              <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 dark:bg-amber-950/30 dark:text-amber-400 px-2 py-0.5 rounded-full mt-1 w-fit">
                Nuevo
              </span>
            )}
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="h-12 px-6 rounded-xl font-bold text-sm shadow-md shadow-primary/20 hover:scale-[1.02] transition-all active:scale-95">
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
                      <div className="w-full bg-white dark:bg-card border border-border/60 rounded-2xl overflow-hidden self-center">
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
