import React from "react";

export interface StatItem {
  label: string;
  value: React.ReactNode;
  hint?: string;
  onClick?: () => void;
}

export function StatStrip({ items }: { items: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 rounded-xl border border-border bg-white dark:bg-card divide-border max-lg:[&>*:nth-child(odd)]:border-r lg:divide-x [&>*]:border-border max-lg:[&>*:nth-child(n+3)]:border-t">
      {items.map((item) => {
        const Wrapper = item.onClick ? "button" : "div";
        return (
          <Wrapper
            key={item.label}
            onClick={item.onClick}
            className={`text-left px-6 py-5 ${item.onClick ? "hover:bg-muted/60 transition-colors" : ""}`}
          >
            <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
            <p className="text-3xl font-semibold text-foreground tracking-tight mt-1.5">{item.value}</p>
            {item.hint && <p className="text-xs text-muted-foreground mt-1.5 truncate">{item.hint}</p>}
          </Wrapper>
        );
      })}
    </div>
  );
}
