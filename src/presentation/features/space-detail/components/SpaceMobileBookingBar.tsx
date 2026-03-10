"use client";

import { Star } from "lucide-react";
import { Space } from "@/core/domain/entities/Space";
import { Button } from "@/presentation/components/ui/button";

interface SpaceMobileBookingBarProps {
  space: Space;
}

export function SpaceMobileBookingBar({ space }: SpaceMobileBookingBarProps) {
  return (
    <div className="fixed bottom-4 left-4 right-4 md:hidden z-50 animate-in slide-in-from-bottom-6 fade-in duration-500 ease-out safe-area-bottom">
      <div className="flex items-center justify-between gap-4 p-3 bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] ring-1 ring-black/5">
        {/* Left: Price & Rating */}
        <div className="pl-3 flex flex-col justify-center">
          <div className="flex items-end gap-1.5 leading-none">
            <span className="text-[1.35rem] font-extrabold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              ${space.pricePerMonth}
            </span>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
              /mes
            </span>
          </div>
          
          {space.rating ? (
            <div className="flex items-center gap-1.5 mt-1.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold">{space.rating}</span>
              <span className="text-[10px] text-muted-foreground">({space.reviewCount} reseñas)</span>
            </div>
          ) : (
            <div className="text-[11px] font-bold text-emerald-600 mt-1.5 bg-emerald-500/10 w-fit px-2 py-0.5 rounded-full">
              Disponible ahora
            </div>
          )}
        </div>
        
        {/* Right: Button */}
        <Button className="h-[3.25rem] px-7 rounded-xl font-bold tracking-wide shadow-lg shadow-primary/20 bg-gradient-to-tr from-primary to-accent hover:opacity-90 hover:scale-[1.02] transition-all active:scale-95 text-[15px]">
          Reservar
        </Button>
      </div>
    </div>
  );
}
