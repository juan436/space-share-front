"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/presentation/components/ui/input";

interface MobileSearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function MobileSearchInput({ value, onChange }: MobileSearchInputProps) {
  return (
    <div className="relative flex-1 min-w-0">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Buscar espacio"
        aria-label="Buscar espacio"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 pr-9 h-10 bg-white dark:bg-card border border-[hsl(214_24%_78%)] rounded-full text-sm shadow-[0_1px_4px_rgba(0,0,0,0.05)] focus:shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Borrar búsqueda"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full bg-muted-foreground/15 hover:bg-muted-foreground/25 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
