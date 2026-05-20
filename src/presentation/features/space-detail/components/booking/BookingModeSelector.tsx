"use client";

/**
 * Qué hace: control segmentado para elegir entre modo "Fechas exactas" y "Meses".
 * Recibe: modo activo, callbacks de selección, className opcional para espaciado externo.
 * Genera: dos botones pill con estado activo resaltado (fondo blanco + sombra).
 * Procesa: aplica estilos de selección al modo activo; el modo inactivo queda en muted.
 */

interface BookingModeSelectorProps {
  mode: "dates" | "months";
  onSelectDates: () => void;
  onSelectMonths: () => void;
  className?: string;
}

export function BookingModeSelector({
  mode,
  onSelectDates,
  onSelectMonths,
  className = "",
}: BookingModeSelectorProps) {
  return (
    <div className={`flex p-1 bg-muted/40 rounded-xl ring-1 ring-inset ring-black/5 dark:ring-white/5 ${className}`}>
      <button
        onClick={onSelectDates}
        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${
          mode === "dates"
            ? "bg-white dark:bg-zinc-800 text-foreground shadow-sm ring-1 ring-black/5"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Fechas exactas
      </button>
      <button
        onClick={onSelectMonths}
        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${
          mode === "months"
            ? "bg-white dark:bg-zinc-800 text-foreground shadow-sm ring-1 ring-black/5"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Meses
      </button>
    </div>
  );
}
