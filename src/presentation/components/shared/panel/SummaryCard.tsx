import React from "react";

export interface SummaryRow {
  label: string;
  value: React.ReactNode;
  onClick?: () => void;
}

/** Resumen vertical de cifras clave (columna lateral del inicio). */
export function SummaryCard({ title, rows }: { title: string; rows: SummaryRow[] }) {
  return (
    <aside className="rounded-2xl border border-border bg-white dark:bg-card shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
      <h2 className="px-5 py-4 text-base font-bold text-foreground border-b border-border">{title}</h2>
      <dl className="divide-y divide-border">
        {rows.map((row) => {
          const Wrapper = row.onClick ? "button" : "div";
          return (
            <Wrapper
              key={row.label}
              onClick={row.onClick}
              className={`w-full flex items-center justify-between gap-3 px-5 py-4 text-left ${row.onClick ? "hover:bg-select-hover transition-colors" : ""}`}
            >
              <dt className="text-sm text-muted-foreground">{row.label}</dt>
              <dd className="text-xl font-bold text-foreground tracking-tight">{row.value}</dd>
            </Wrapper>
          );
        })}
      </dl>
    </aside>
  );
}
