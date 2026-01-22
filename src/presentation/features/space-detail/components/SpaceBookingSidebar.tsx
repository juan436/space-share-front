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
    <div className="sticky top-24">
      <div className="p-6 rounded-2xl border bg-card shadow-lg">
        {/* Price Header */}
        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-3xl font-bold text-foreground">${space.pricePerMonth}</span>
          <span className="text-muted-foreground">/ mes</span>
        </div>

        {/* Rating */}
        {space.rating && (
          <div className="flex items-center gap-2 mb-6 pb-6 border-b">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-medium">{space.rating}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">{space.reviewCount} reseñas</span>
          </div>
        )}

        {/* Duration Selector */}
        <div className="space-y-3 mb-6">
          <label className="text-sm font-medium text-foreground">Duración del alquiler</label>
          <div className="grid grid-cols-3 gap-2">
            {[1, 3, 6].map((m) => (
              <button
                key={m}
                onClick={() => setMonths(m)}
                className={`py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${
                  months === m
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background hover:bg-muted border-border"
                }`}
              >
                {m} {m === 1 ? "mes" : "meses"}
              </button>
            ))}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-3 mb-6 pb-6 border-b">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              ${space.pricePerMonth} x {months} {months === 1 ? "mes" : "meses"}
            </span>
            <span className="text-foreground">${totalPrice}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              Tarifa de servicio
              <Info className="w-3 h-3" />
            </span>
            <span className="text-foreground">${serviceFee}</span>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mb-6">
          <span className="font-semibold text-foreground">Total</span>
          <span className="text-2xl font-bold text-foreground">${grandTotal}</span>
        </div>

        {/* CTA Button */}
        <Button className="w-full h-12 text-base font-semibold mb-4">
          Reservar ahora
        </Button>

        {/* Secondary Action */}
        <Button variant="outline" className="w-full gap-2">
          <Calendar className="w-4 h-4" />
          Agendar visita
        </Button>

        {/* Trust Badge */}
        <div className="flex items-center gap-2 mt-6 p-3 rounded-lg bg-emerald-50 text-emerald-700 text-sm">
          <Shield className="w-4 h-4" />
          <span>Pago seguro y protección al cliente</span>
        </div>
      </div>
    </div>
  );
}
