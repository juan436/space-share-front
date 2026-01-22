"use client";

import { Space } from "@/core/domain/entities/Space";
import { Button } from "@/presentation/components/ui/button";

interface SpaceMobileBookingBarProps {
  space: Space;
}

export function SpaceMobileBookingBar({ space }: SpaceMobileBookingBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t p-4 md:hidden z-40 safe-area-bottom">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-foreground">${space.pricePerMonth}</span>
            <span className="text-sm text-muted-foreground">/ mes</span>
          </div>
          {space.rating && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>⭐ {space.rating}</span>
              <span>·</span>
              <span>{space.reviewCount} reseñas</span>
            </div>
          )}
        </div>
        <Button className="px-8 h-12 font-semibold">
          Reservar
        </Button>
      </div>
    </div>
  );
}
