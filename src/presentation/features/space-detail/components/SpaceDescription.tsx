"use client";

import { Ruler, Calendar, CheckCircle2 } from "lucide-react";

interface SpaceDescriptionProps {
  description: string;
  squareMeters: number;
}

export function SpaceDescription({ description, squareMeters }: SpaceDescriptionProps) {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl bg-white dark:bg-card border border-border/60 shadow-[0_4px_12px_rgba(0,0,0,0.09)]">
          <div className="p-2 rounded-lg bg-muted/60 shrink-0">
            <Ruler className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="min-w-0">
            <p className="text-xl sm:text-2xl font-bold text-foreground truncate">{squareMeters}</p>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">metros²</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl bg-white dark:bg-card border border-border/60 shadow-[0_4px_12px_rgba(0,0,0,0.09)]">
          <div className="p-2 rounded-lg bg-muted/60 shrink-0">
            <Calendar className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="min-w-0">
            <p className="text-xl sm:text-2xl font-bold text-foreground truncate">Flexible</p>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">duración</p>
          </div>
        </div>

        <div className="flex items-center justify-center sm:justify-start gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl bg-white dark:bg-card border border-border/60 shadow-[0_4px_12px_rgba(0,0,0,0.09)] col-span-2 sm:col-span-1">
          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 shrink-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="min-w-0">
            <p className="text-xl sm:text-2xl font-bold text-foreground truncate">Verificado</p>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">por SpaceShare</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-3">Descripción</h2>
        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
          {description}
        </p>
      </div>
    </div>
  );
}
