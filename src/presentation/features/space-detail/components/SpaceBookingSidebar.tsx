"use client";

import { useState } from "react";
import { Calendar, Info, Shield, Star } from "lucide-react";
import { Space } from "@/core/domain/entities/Space";
import { Button } from "@/presentation/components/ui/button";

interface SpaceBookingSidebarProps {
  space: Space;
}

export function SpaceBookingSidebar({ space }: SpaceBookingSidebarProps) {
  const [months, setMonths] = useState(1);
  
  const totalPrice = space.pricePerMonth * months;
  const serviceFee = Math.round(totalPrice * 0.1);
  const grandTotal = totalPrice + serviceFee;

  return (
    <div className="p-8 rounded-[24px] bg-white dark:bg-zinc-900 shadow-[0_8px_30px_rgb(0,0,0,0.06)] ring-1 ring-black/5 dark:ring-white/10">
      {/* Price Header */}
      <div className="flex items-baseline gap-1.5 mb-8">
        <span className="text-3xl font-extrabold text-foreground tracking-tight">${space.pricePerMonth}</span>
        <span className="text-base font-medium text-muted-foreground">/ mes</span>
      </div>

      {/* Duration Selector */}
      <div className="space-y-4 mb-8">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Duración del alquiler
        </label>
        <div className="grid grid-cols-3 gap-2 bg-muted/30 p-1.5 rounded-2xl ring-1 ring-inset ring-black/5 dark:ring-white/5">
          {[1, 3, 6].map((m) => (
            <button
              key={m}
              onClick={() => setMonths(m)}
              className={`py-2.5 px-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                months === m
                  ? "bg-white dark:bg-zinc-800 text-foreground shadow-sm ring-1 ring-black/5 dark:ring-white/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              {m} {m === 1 ? "mes" : "meses"}
            </button>
          ))}
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-4 mb-8 pt-2">
        <div className="flex justify-between items-center text-[15px]">
          <span className="text-muted-foreground font-medium underline decoration-muted-foreground/30 hover:decoration-foreground cursor-pointer transition-colors">
            ${space.pricePerMonth} x {months} {months === 1 ? "mes" : "meses"}
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
        <Button className="w-full h-14 rounded-xl text-[15px] font-bold tracking-wide shadow-[0_8px_30px_rgb(0,0,0,0.12)] shadow-primary/20 bg-gradient-to-tr from-primary to-accent hover:opacity-90 hover:scale-[1.02] transition-all active:scale-95">
          Reservar ahora
        </Button>
        <p className="text-xs text-center text-muted-foreground font-medium">No se hará ningún cargo aún</p>
      </div>

      <div className="h-px w-full bg-border/40 my-6" />

      {/* Secondary Action */}
      <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-colors hover:bg-muted/50 text-foreground">
        <Calendar className="w-4 h-4" />
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
