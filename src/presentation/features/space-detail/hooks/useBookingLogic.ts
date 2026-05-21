import { useState } from "react";
import { differenceInDays, addMonths } from "date-fns";
import { DateRange } from "react-day-picker";
import { Space, checkSpaceAvailability, getNextAvailableDate } from "@/core/domain/entities/Space";
import { calculateBookingPrice, DAYS_PER_MONTH, AVAILABLE_MONTHS } from "@/core/domain/entities/Reservation";
import { useUseCases } from "@/presentation/providers/usecases-context";
import { toErrorMessage } from "@/presentation/utils/error";


export function useBookingLogic(space: Space) {
  const { createReservationUseCase } = useUseCases();
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

  const { totalPrice, serviceFee, grandTotal } = calculateBookingPrice(
    space.pricePerMonth,
    currentMonths,
    effectiveQuantity
  );

  const isMonthAvailable = (m: number) =>
    checkSpaceAvailability(space, m, startDate, effectiveQuantity);

  const nextDate = getNextAvailableDate(space, months, effectiveQuantity);

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
      await createReservationUseCase.execute({
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
    nextDate,
    getBookingDates,
    handleConfirmBooking,
    isBookingDisabled,
    showFreeCancellation,
  };
}
