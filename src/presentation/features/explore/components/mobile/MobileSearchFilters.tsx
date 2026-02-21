"use client";

import { Search, X, SlidersHorizontal, Thermometer, Video, DoorOpen, Warehouse, Home, ArrowDown, Box, Car, Clock } from "lucide-react";
import { Input } from "@/presentation/components/ui/input";
import { Button } from "@/presentation/components/ui/button";
import { spaceTypeLabels } from "../../data";

type FilterType = "all" | "garage" | "basement" | "attic" | "storage" | "parking";

const filterOptions: { type: FilterType; label: string; icon: typeof Home }[] = [
  { type: "all", label: "Todos", icon: Home },
  { type: "garage", label: "Garaje", icon: Warehouse },
  { type: "storage", label: "Bodega", icon: Box },
  { type: "parking", label: "Parqueo", icon: Car },
  { type: "basement", label: "Sótano", icon: ArrowDown },
  { type: "attic", label: "Ático", icon: Home },
];

interface MobileSearchFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  showFilters: boolean;
  onShowFiltersChange: (show: boolean) => void;
}

export function MobileSearchFilters({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  showFilters,
  onShowFiltersChange,
}: MobileSearchFiltersProps) {
  return (
    <>
      {/* Search Bar */}
      <div className="px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground/70" />
          <Input
            type="text"
            placeholder="¿Dónde necesitas espacio?"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-11 pr-10 h-12 bg-muted/40 border border-border/40 rounded-2xl text-base shadow-sm focus:shadow-md focus:bg-card transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-muted-foreground/15 hover:bg-muted-foreground/25 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Pills with Icons */}
      <div className="px-4 pb-3 overflow-x-auto no-scrollbar">
        <div className="flex gap-2">
          {filterOptions.map(({ type, label, icon: Icon }) => (
            <button
              key={type}
              onClick={() => onFilterChange(type)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeFilter === type
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "bg-card text-muted-foreground border border-border/60 hover:border-primary/30 hover:text-foreground"
                }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Sheet */}
      {showFilters && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => onShowFiltersChange(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl safe-area-bottom animate-in slide-in-from-bottom duration-300">
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/20" />
            </div>

            <div className="p-6 pt-3">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Filtros</h2>
                <button
                  onClick={() => onShowFiltersChange(false)}
                  className="p-2 -mr-2 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6 max-h-[60vh] overflow-y-auto">
                {/* Price Range */}
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">Rango de precio</h3>
                  <div className="grid grid-cols-2 gap-2.5">
                    {["$0-$50", "$50-$100", "$100-$200", "$200+"].map((range) => (
                      <button
                        key={range}
                        className="py-3 px-4 rounded-xl border border-border/60 text-sm font-medium hover:border-primary hover:text-primary hover:bg-primary/5 active:bg-primary/10 transition-all"
                      >
                        {range}/mes
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">Tamaño</h3>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { label: "Pequeño", sub: "0-15m²" },
                      { label: "Mediano", sub: "15-30m²" },
                      { label: "Grande", sub: "30-50m²" },
                      { label: "Extra grande", sub: "50m²+" },
                    ].map(({ label, sub }) => (
                      <button
                        key={label}
                        className="py-3 px-4 rounded-xl border border-border/60 text-left hover:border-primary hover:bg-primary/5 active:bg-primary/10 transition-all"
                      >
                        <span className="block text-sm font-medium">{label}</span>
                        <span className="block text-xs text-muted-foreground mt-0.5">{sub}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">Características</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { icon: Thermometer, label: "Clima controlado" },
                      { icon: Video, label: "Cámara de seguridad" },
                      { icon: DoorOpen, label: "Entrada privada" },
                      { icon: Clock, label: "Acceso 24/7" },
                    ].map(({ icon: Icon, label }) => (
                      <button
                        key={label}
                        className="flex items-center gap-2 py-2.5 px-4 rounded-full border border-border/60 text-sm font-medium hover:border-primary hover:text-primary hover:bg-primary/5 active:bg-primary/10 transition-all"
                      >
                        <Icon className="w-4 h-4" />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-4 border-t">
                <Button variant="outline" className="flex-1 h-12 rounded-xl" onClick={() => onShowFiltersChange(false)}>
                  Limpiar
                </Button>
                <Button className="flex-1 h-12 rounded-xl shadow-md shadow-primary/25" onClick={() => onShowFiltersChange(false)}>
                  Aplicar filtros
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
