"use client";

import { Info } from "lucide-react";
import { DAYS_PER_MONTH } from "@/core/domain/entities/Reservation";
import type { Space } from "@/core/domain/entities/Space";

interface BookingPriceSummaryProps {
  mode: "dates" | "months";
  dateRange: { from?: Date; to?: Date } | undefined;
  space: Space;
  currentMonths: number;
  isVehicleSpace: boolean;
  effectiveQuantity: number;
  totalPrice: number;
  serviceFee: number;
  grandTotal: number;
}

export function BookingPriceSummary({
  mode,
  dateRange,
  space,
  currentMonths,
  isVehicleSpace,
  effectiveQuantity,
  totalPrice,
  serviceFee,
  grandTotal,
}: BookingPriceSummaryProps) {
  if (mode === "dates" && (!dateRange?.from || !dateRange?.to)) {
    return (
      <div className="mb-4 py-3 rounded-xl bg-muted/30 text-center">
        <p className="text-sm text-muted-foreground font-medium">Selecciona las fechas para ver el total</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 mb-4 pt-1">
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground font-medium underline decoration-muted-foreground/30 hover:decoration-foreground cursor-pointer transition-colors">
          {currentMonths < 1
            ? `$${space.pricePerMonth}/mes × ${Math.round(currentMonths * DAYS_PER_MONTH)} días`
            : `$${space.pricePerMonth} × ${Number.isInteger(currentMonths) ? currentMonths : currentMonths.toFixed(1)} ${currentMonths === 1 ? "mes" : "meses"}`}
          {isVehicleSpace && ` × ${effectiveQuantity} unid.`}
        </span>
        <span className="text-foreground font-semibold">${totalPrice}</span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground font-medium underline decoration-muted-foreground/30 hover:decoration-foreground cursor-pointer transition-colors flex items-center gap-1">
          Tarifa de servicio (5%)
          <Info className="w-3 h-3" />
        </span>
        <span className="text-foreground font-semibold">${serviceFee}</span>
      </div>
      <div className="h-px w-full bg-border/40" />
      <div className="flex justify-between items-center">
        <span className="font-bold text-foreground">Total</span>
        <span className="text-xl font-extrabold text-foreground tracking-tight">${grandTotal}</span>
      </div>
    </div>
  );
}
