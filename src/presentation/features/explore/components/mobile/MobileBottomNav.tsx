"use client";

import { List, Map, Heart } from "lucide-react";

type ViewMode = "list" | "map";

interface MobileBottomNavProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function MobileBottomNav({ viewMode, onViewModeChange }: MobileBottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t safe-area-bottom z-40">
      <div className="flex items-center justify-around pb-1.5 pt-2">
        <button 
          onClick={() => onViewModeChange("list")}
          className={`flex flex-col items-center gap-0.5 px-8 py-1 rounded-xl transition-colors ${
            viewMode === "list" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <List className="w-5 h-5" />
          <span className="text-[11px] font-medium leading-none mt-0.5">Lista</span>
        </button>
        <button 
          onClick={() => onViewModeChange("map")}
          className={`flex flex-col items-center gap-0.5 px-8 py-1 rounded-xl transition-colors ${
            viewMode === "map" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Map className="w-5 h-5" />
          <span className="text-[11px] font-medium leading-none mt-0.5">Mapa</span>
        </button>
      </div>
    </nav>
  );
}
