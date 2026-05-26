"use client";

import { List, Map } from "lucide-react";
import { cn } from "@/presentation/utils/cn";
import { LucideIcon } from "lucide-react";

type ViewMode = "list" | "map";

export interface BottomNavItem {
  key: string;
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  active?: boolean;
}

interface MobileBottomNavProps {
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
  items?: BottomNavItem[];
}

export function MobileBottomNav({ viewMode, onViewModeChange, items }: MobileBottomNavProps) {
  if (items) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border/40 safe-area-bottom z-40">
        <div className="flex items-center justify-around pb-1.5 pt-2">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={item.onClick}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-8 py-1 rounded-xl transition-colors",
                  item.active ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[11px] font-medium leading-none mt-0.5">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border/40 safe-area-bottom z-40">
      <div className="flex items-center justify-around pb-1.5 pt-2">
        <button
          onClick={() => onViewModeChange?.("list")}
          className={cn(
            "flex flex-col items-center gap-0.5 px-8 py-1 rounded-xl transition-colors",
            viewMode === "list" ? "text-primary" : "text-muted-foreground"
          )}
        >
          <List className="w-5 h-5" />
          <span className="text-[11px] font-medium leading-none mt-0.5">Lista</span>
        </button>
        <button
          onClick={() => onViewModeChange?.("map")}
          className={cn(
            "flex flex-col items-center gap-0.5 px-8 py-1 rounded-xl transition-colors",
            viewMode === "map" ? "text-primary" : "text-muted-foreground"
          )}
        >
          <Map className="w-5 h-5" />
          <span className="text-[11px] font-medium leading-none mt-0.5">Mapa</span>
        </button>
      </div>
    </nav>
  );
}
