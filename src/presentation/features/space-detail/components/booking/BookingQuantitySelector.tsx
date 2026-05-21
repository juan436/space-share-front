"use client";

import { Minus, Plus } from "lucide-react";

interface BookingQuantitySelectorProps {
  quantity: number;
  displayCapacity: number;
  onDecrement: () => void;
  onIncrement: () => void;
  className?: string;
}

export function BookingQuantitySelector({
  quantity,
  displayCapacity,
  onDecrement,
  onIncrement,
  className = "",
}: BookingQuantitySelectorProps) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-xl border border-border/60 bg-muted/20 ${className}`}>
      <div className="flex flex-col">
        <span className="text-sm font-bold">Cantidad de espacios</span>
        <span className="text-xs text-muted-foreground font-medium">Capacidad disponible: {displayCapacity}</span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onDecrement}
          disabled={quantity <= 1}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-zinc-800 shadow-sm ring-1 ring-black/5 dark:ring-white/10 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-all"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="text-sm font-bold w-4 text-center">{quantity}</span>
        <button
          onClick={onIncrement}
          disabled={quantity >= displayCapacity}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-zinc-800 shadow-sm ring-1 ring-black/5 dark:ring-white/10 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-all"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
