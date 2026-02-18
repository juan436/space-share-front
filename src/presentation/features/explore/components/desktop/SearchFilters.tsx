"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/presentation/components/ui/input";
import { Button } from "@/presentation/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/presentation/components/ui/select";

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  spaceType: string;
  onSpaceTypeChange: (value: string) => void;
  priceRange: string;
  onPriceRangeChange: (value: string) => void;
  sizeRange: string;
  onSizeRangeChange: (value: string) => void;
  conditions: string[];
  onConditionsChange: (value: string[]) => void;
}

export function SearchFilters({
  searchQuery,
  onSearchChange,
  spaceType,
  onSpaceTypeChange,
  priceRange,
  onPriceRangeChange,
  sizeRange,
  onSizeRangeChange,
  conditions,
  onConditionsChange,
}: SearchFiltersProps) {
  const toggleCondition = (condition: string) => {
    if (conditions.includes(condition)) {
      onConditionsChange(conditions.filter((c) => c !== condition));
    } else {
      onConditionsChange([...conditions, condition]);
    }
  };

  const quickChips = [
    { id: "24/7", label: "Acceso 24/7" },
    { id: "verificado", label: "Verificado" },
    { id: "climatizado", label: "Climatizado" },
    { id: "privado", label: "Entrada privada" },
  ];

  // Calculate active filters
  const activeFilters = [
    spaceType !== "all" && { label: spaceType === "garage" ? "Garaje" : spaceType === "storage" ? "Bodega" : spaceType, type: "type", value: spaceType },
    priceRange !== "all" && { label: priceRange, type: "price", value: priceRange },
    sizeRange !== "all" && { label: sizeRange, type: "size", value: sizeRange },
    ...conditions.map(c => ({ label: quickChips.find(q => q.id === c)?.label || c, type: "condition", value: c }))
  ].filter(Boolean) as { label: string; type: string; value: string }[];

  const activeCount = activeFilters.length;

  const removeFilter = (filter: { type: string; value: string }) => {
    switch (filter.type) {
      case "type": onSpaceTypeChange("all"); break;
      case "price": onPriceRangeChange("all"); break;
      case "size": onSizeRangeChange("all"); break;
      case "condition": toggleCondition(filter.value); break;
    }
  };

  const clearAll = () => {
    onSpaceTypeChange("all");
    onPriceRangeChange("all");
    onSizeRangeChange("all");
    onConditionsChange([]);
    onSearchChange("");
  };

  return (
    <div className="bg-card border-b">
      {/* Main Search Bar */}
      <div className="bg-primary/5 border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar por ciudad o ubicación..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 h-12 bg-card border-2 border-primary/20 focus:border-primary"
              />
            </div>
            <Button className="h-12 px-6 bg-primary hover:bg-primary/90">
              <Search className="w-5 h-5 mr-2" />
              Buscar
            </Button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex flex-col gap-3">
          {/* Main Filters Row */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-fit">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filtros:</span>
            </div>

            <Select value={spaceType} onValueChange={onSpaceTypeChange}>
              <SelectTrigger className="w-[160px] bg-card">
                <SelectValue placeholder="Tipo de espacio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="garage">Garaje</SelectItem>
                <SelectItem value="basement">Sótano</SelectItem>
                <SelectItem value="attic">Ático</SelectItem>
                <SelectItem value="storage">Bodega</SelectItem>
                <SelectItem value="other">Otro</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={onPriceRangeChange}>
              <SelectTrigger className="w-[160px] bg-card">
                <SelectValue placeholder="Precio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Cualquier precio</SelectItem>
                <SelectItem value="0-100">$0 - $100/mes</SelectItem>
                <SelectItem value="100-300">$100 - $300/mes</SelectItem>
                <SelectItem value="300-500">$300 - $500/mes</SelectItem>
                <SelectItem value="500+">$500+/mes</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sizeRange} onValueChange={onSizeRangeChange}>
              <SelectTrigger className="w-[160px] bg-card">
                <SelectValue placeholder="Tamaño" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Cualquier tamaño</SelectItem>
                <SelectItem value="0-10">Pequeño (0-10 m²)</SelectItem>
                <SelectItem value="10-30">Mediano (10-30 m²)</SelectItem>
                <SelectItem value="30-50">Grande (30-50 m²)</SelectItem>
                <SelectItem value="50+">Extra grande (50+ m²)</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={conditions.length > 0 ? "selected" : "all"}
              onValueChange={(v) => {
                if (v === "all") onConditionsChange([]);
              }}
            >
              <SelectTrigger className="w-[160px] bg-card">
                <SelectValue placeholder="Condiciones" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <div className="p-2 gap-2 flex flex-col">
                  {quickChips.map((chip) => (
                    <label key={chip.id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/50 p-1 rounded">
                      <input
                        type="checkbox"
                        checked={conditions.includes(chip.id)}
                        onChange={() => toggleCondition(chip.id)}
                        className="rounded border-gray-300"
                      />
                      {chip.label}
                    </label>
                  ))}
                </div>
              </SelectContent>
            </Select>

            <div className="flex-1" />

            {activeCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="text-muted-foreground hover:text-foreground"
              >
                Limpiar todo ({activeCount})
              </Button>
            )}
          </div>

          {/* Active Chips & Quick Chips Row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide min-h-[32px]">
            {activeFilters.length > 0 ? (
              <>
                {activeFilters.map((filter, idx) => (
                  <div
                    key={`${filter.type}-${filter.value}-${idx}`}
                    className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20"
                  >
                    <span>{filter.label}</span>
                    <button
                      onClick={() => removeFilter(filter)}
                      className="hover:bg-primary/20 rounded-full p-0.5"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                  </div>
                ))}
              </>
            ) : (
              // Show suggestions when no filters active
              quickChips.map((chip) => (
                <button
                  key={chip.id}
                  onClick={() => toggleCondition(chip.id)}
                  className="px-3 py-1 rounded-full text-sm font-medium bg-muted hover:bg-muted/80 text-muted-foreground transition-colors whitespace-nowrap"
                >
                  {chip.label}
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
