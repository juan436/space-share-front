import React from "react";

interface PanelSectionProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  children: React.ReactNode;
}

/** Sección al estilo editorial: título grande sobre el fondo, sin caja alrededor. */
export function PanelSection({ title, actionLabel, onAction, className = "", children }: PanelSectionProps) {
  return (
    <section className={className}>
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-2xl font-semibold text-foreground tracking-tight">{title}</h2>
        {actionLabel && onAction && (
          <button onClick={onAction} className="text-sm font-semibold text-foreground underline underline-offset-4 hover:text-primary">
            {actionLabel}
          </button>
        )}
      </div>
      {children}
    </section>
  );
}
