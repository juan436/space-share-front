"use client";

import { ShieldCheck } from "lucide-react";

/**
 * Qué hace: badge de cancelación gratuita con ícono de escudo y texto informativo.
 * Recibe: nada.
 * Genera: card verde con "Cancelación gratuita" y "Cancela sin costo hasta 15 días antes."
 * Procesa: nada — puro display estático.
 */

export function BookingFreeCancellation() {
  return (
    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 ring-1 ring-emerald-200 dark:ring-emerald-800 mb-4">
      <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
      <div>
        <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Cancelación gratuita</p>
        <p className="text-[11px] text-emerald-600/80 dark:text-emerald-400/70">Cancela sin costo hasta 15 días antes.</p>
      </div>
    </div>
  );
}
