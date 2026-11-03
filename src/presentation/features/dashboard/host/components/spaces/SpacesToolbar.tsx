"use client";

import { Search } from "lucide-react";
import { SpaceStatusValue, SpaceViewModel } from "@/presentation/types/spaces";

export type SpaceFilter = "all" | SpaceStatusValue;

const FILTERS: { value: SpaceFilter; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "active", label: "Activos" },
  { value: "paused", label: "Pausados" },
  { value: "pending", label: "Pendientes" },
  { value: "deactivated", label: "Desactivados" },
];

interface SpacesToolbarProps {
  spaces: SpaceViewModel[];
  search: string;
  onSearchChange: (value: string) => void;
  filter: SpaceFilter;
  onFilterChange: (value: SpaceFilter) => void;
}

export function SpacesToolbar({ spaces, search, onSearchChange, filter, onFilterChange }: SpacesToolbarProps) {
  const count = (value: SpaceFilter) => (value === "all" ? spaces.length : spaces.filter((s) => s.status === value).length);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
      <div className="relative w-full lg:w-80">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por nombre o ubicación"
          className="w-full h-11 pl-11 pr-4 rounded-full border border-border bg-white dark:bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
        {FILTERS.filter((f) => f.value === "all" || count(f.value) > 0).map((f) => {
          const active = filter === f.value;
          return (
            <button
              key={f.value}
              onClick={() => onFilterChange(f.value)}
              className={`shrink-0 h-10 px-4 rounded-full border text-sm font-medium transition-colors ${
                active ? "border-primary bg-primary/10 text-primary" : "border-border bg-white dark:bg-card text-foreground hover:border-foreground/40"
              }`}
            >
              {f.label} <span className={active ? "text-primary/70" : "text-muted-foreground"}>{count(f.value)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
