import React from "react";

interface PanelSectionProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  children: React.ReactNode;
}

export function PanelSection({ title, actionLabel, onAction, className = "", children }: PanelSectionProps) {
  return (
    <section className={`rounded-2xl bg-white dark:bg-card border border-border ${className}`}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h2 className="text-base font-bold text-foreground">{title}</h2>
        {actionLabel && onAction && (
          <button onClick={onAction} className="text-sm font-semibold text-primary hover:underline">
            {actionLabel}
          </button>
        )}
      </div>
      {children}
    </section>
  );
}
