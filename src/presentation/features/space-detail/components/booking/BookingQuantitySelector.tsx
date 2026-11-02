"use client";

import { Minus, Plus } from "lucide-react";

interface BookingQuantitySelectorProps {
  quantity: number;
  displayCapacity: number;
  isVehicle?: boolean;
  pricePerUnit?: number;
  onDecrement: () => void;
  onIncrement: () => void;
  onQuantityChange: (value: number) => void;
  className?: string;
}

const stepClass =
  "w-12 self-stretch flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 disabled:opacity-30 disabled:hover:bg-transparent transition-colors";

export function BookingQuantitySelector({
  quantity,
  displayCapacity,
  isVehicle = false,
  pricePerUnit,
  onDecrement,
  onIncrement,
  onQuantityChange,
  className = "",
}: BookingQuantitySelectorProps) {
  const suffix = isVehicle ? "veh." : "m²";
  const unit = isVehicle ? "vehículo" : "m²";

  return (
    <div className={`rounded-xl border border-border/60 bg-white dark:bg-card overflow-hidden ${className}`}>
      <div className="flex items-center justify-between gap-3 px-4 pt-4">
        <span className="text-sm font-bold">{isVehicle ? "Vehículos" : "Espacio a reservar"}</span>
        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-full">
          {displayCapacity} {isVehicle ? "cupos libres" : "m² libres"}
        </span>
      </div>

      <div className="flex items-stretch h-14 mx-4 mt-3 rounded-xl border border-border/60 overflow-hidden">
        <button onClick={onDecrement} disabled={quantity <= 1} className={stepClass} aria-label="Disminuir">
          <Minus className="w-4 h-4" />
        </button>
        <div className="flex-1 min-w-0 flex items-center justify-center gap-1.5 border-x border-border/60">
          <input
            type="text"
            inputMode="numeric"
            value={quantity}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "");
              if (digits === "") return;
              onQuantityChange(Math.min(displayCapacity, Math.max(1, parseInt(digits, 10))));
            }}
            aria-label={isVehicle ? "Cantidad de vehículos" : "Cantidad de m²"}
            style={{ width: `${String(quantity).length + 1}ch` }}
            className="bg-transparent text-xl font-bold text-center focus:outline-none"
          />
          <span className="text-sm font-medium text-muted-foreground">{suffix}</span>
        </div>
        <button onClick={onIncrement} disabled={quantity >= displayCapacity} className={stepClass} aria-label="Aumentar">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {pricePerUnit !== undefined && (
        <div className="mt-4 px-4 py-3 border-t border-border/60 bg-muted/20 text-xs text-muted-foreground font-medium">
          ${pricePerUnit} por {unit} al mes
        </div>
      )}
    </div>
  );
}
