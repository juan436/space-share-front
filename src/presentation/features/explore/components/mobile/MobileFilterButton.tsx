"use client";

import { SlidersHorizontal } from "lucide-react";

interface MobileFilterButtonProps {
  activeCount: number;
  onClick: () => void;
}

export function MobileFilterButton({ activeCount, onClick }: MobileFilterButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Abrir filtros"
      className="relative flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-card border border-[hsl(214_24%_78%)] text-foreground hover:border-foreground/40 active:scale-95 transition-all"
    >
      <SlidersHorizontal className="w-4 h-4" />
      {activeCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
          {activeCount}
        </span>
      )}
    </button>
  );
}
