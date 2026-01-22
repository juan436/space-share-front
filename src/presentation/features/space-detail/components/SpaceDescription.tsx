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
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
          <div className="p-2 rounded-lg bg-primary/10">
            <Ruler className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{squareMeters}</p>
            <p className="text-sm text-muted-foreground">metros²</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 rounded-xl bg-accent/5 border border-accent/10">
          <div className="p-2 rounded-lg bg-accent/10">
            <Calendar className="w-5 h-5 text-accent" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">Flexible</p>
            <p className="text-sm text-muted-foreground">duración</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 col-span-2 sm:col-span-1">
          <div className="p-2 rounded-lg bg-emerald-500/10">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">Verificado</p>
            <p className="text-sm text-muted-foreground">por SpaceShare</p>
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
