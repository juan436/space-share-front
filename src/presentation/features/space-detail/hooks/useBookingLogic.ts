import { useState } from "react";
import { format, differenceInDays, addMonths } from "date-fns";
import { DateRange } from "react-day-picker";
import { Space } from "@/core/domain/entities/Space";
import { useRepositories } from "@/presentation/providers/repositories-context";
import { toErrorMessage } from "@/presentation/utils/error";

export const SERVICE_FEE_RATE = 0.05;
export const DAYS_PER_MONTH = 30;
export const MIN_RENTAL_DAYS = 15;
export const AVAILABLE_MONTHS = [1, 3, 6] as const;

export function useBookingLogic(space: Space) {
  const { reservationRepository } = useRepositories();
  const [months, setMonths] = useState(1);
  const [mode, setMode] = useState<"months" | "dates">("dates");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [startDate, setStartDate] = useState<Date>(new Date(new Date().setHours(0, 0, 0, 0)));
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  const isVehicleSpace = space.type === "garage" || space.type === "parking";
  const effectiveQuantity = isVehicleSpace ? quantity : 1;
  const displayCapacity = space.capacity || 1;

  let currentMonths = months;
  if (mode === "dates" && dateRange?.from && dateRange?.to) {
    const diffDays = differenceInDays(dateRange.to, dateRange.from);
    currentMonths = Math.max(1, diffDays / DAYS_PER_MONTH);
  }

  const totalPrice = Math.round(space.pricePerMonth * currentMonths * effectiveQuantity);
  const serviceFee = Math.round(totalPrice * SERVICE_FEE_RATE);
  const grandTotal = Math.round(totalPrice + serviceFee);

  const checkAvailability = (m: number, start: Date): boolean => {
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

  const getNextAvailableDate = (m: number): Date | null => {
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

  const handleConfirmBooking = async (notes: string) => {
    setBookingError(null);
    try {
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
    } catch (err) {
      setBookingError(toErrorMessage(err));
      throw err;
    }
  };

  const isBookingDisabled =
    mode === "months" ? !isMonthAvailable(months) : !dateRange?.from || !dateRange?.to;

  const showFreeCancellation =
    mode === "months"
      ? true
      : dateRange?.from && dateRange?.to
      ? differenceInDays(dateRange.to, dateRange.from) >= DAYS_PER_MONTH
      : false;

  return {
    months, setMonths,
    mode, setMode,
    dateRange, setDateRange,
    quantity, setQuantity,
    startDate, setStartDate,
    showConfirmModal, setShowConfirmModal,
    bookingError,
    isVehicleSpace,
    effectiveQuantity,
    displayCapacity,
    currentMonths,
    totalPrice,
    serviceFee,
    grandTotal,
    isMonthAvailable,
    getNextAvailableDate,
    nextDate,
    getBookingDates,
    handleConfirmBooking,
    isBookingDisabled,
    showFreeCancellation,
  };
}
