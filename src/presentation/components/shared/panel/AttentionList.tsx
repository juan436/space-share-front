import React from "react";
import { CheckCircle2 } from "lucide-react";

export interface AttentionItem {
  id: string;
  icon: React.ElementType;
  title: string;
  description?: string;
  actionLabel: string;
  onAction: () => void;
}

/** Lista de pendientes que requieren acción. Si no hay ninguno, lo dice. */
export function AttentionList({ items, emptyText }: { items: AttentionItem[]; emptyText: string }) {
  if (items.length === 0) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-white dark:bg-card px-5 py-5">
        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
        <p className="text-sm text-muted-foreground">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-white dark:bg-card divide-y divide-border shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.id} className="flex items-center gap-4 px-5 py-4">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-foreground" strokeWidth={1.75} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground truncate">{item.title}</p>
              {item.description && <p className="text-xs text-muted-foreground truncate">{item.description}</p>}
            </div>
            <button
              onClick={item.onAction}
              className="shrink-0 h-9 px-4 rounded-lg border border-border text-sm font-semibold text-foreground hover:bg-select-hover transition-colors"
            >
              {item.actionLabel}
            </button>
          </div>
        );
      })}
    </div>
  );
}
