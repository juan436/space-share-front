"use client";

import { Search } from "lucide-react";

export interface FilterOption<K extends string = string> {
  key: K;
  label: string;
  count: number;
}

interface FilterBarProps<K extends string> {
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  options: FilterOption<K>[];
  active: K;
  onChange: (key: K) => void;
}

/** Búsqueda en píldora + filtros por estado con conteo. */
export function FilterBar<K extends string>({ search, onSearchChange, searchPlaceholder, options, active, onChange }: FilterBarProps<K>) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
      <div className="relative w-full lg:w-80 shrink-0">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full h-11 pl-11 pr-4 rounded-full border border-border bg-white dark:bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-hide">
        {options.map((o) => {
          const isActive = active === o.key;
          return (
            <button
              key={o.key}
              onClick={() => onChange(o.key)}
              className={`shrink-0 h-10 px-4 rounded-full border text-sm font-medium transition-colors ${
                isActive ? "border-primary bg-primary/10 text-primary" : "border-border bg-white dark:bg-card text-foreground hover:border-foreground/40"
              }`}
            >
              {o.label} <span className={isActive ? "text-primary/70" : "text-muted-foreground"}>{o.count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
