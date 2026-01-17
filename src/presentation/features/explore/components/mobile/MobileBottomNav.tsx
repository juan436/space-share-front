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
      <div className="flex items-center justify-around py-2">
        <button 
          onClick={() => onViewModeChange("list")}
          className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-colors ${
            viewMode === "list" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <List className="w-6 h-6" />
          <span className="text-xs font-medium">Lista</span>
        </button>
        <button 
          onClick={() => onViewModeChange("map")}
          className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-colors ${
            viewMode === "map" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Map className="w-6 h-6" />
          <span className="text-xs font-medium">Mapa</span>
        </button>
      </div>
    </nav>
  );
}
