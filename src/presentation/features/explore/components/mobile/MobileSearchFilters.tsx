"use client";

import { Search, X, SlidersHorizontal, Thermometer, Video, DoorOpen } from "lucide-react";
import { Input } from "@/presentation/components/ui/input";
import { Button } from "@/presentation/components/ui/button";
import { spaceTypeLabels } from "../../data";

type FilterType = "all" | "garage" | "basement" | "attic" | "storage";

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
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="¿Dónde necesitas espacio?"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-12 bg-muted/50 border-0 rounded-xl text-base"
          />
          {searchQuery && (
            <button 
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full bg-muted-foreground/20"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Pills */}
      <div className="px-4 pb-3 overflow-x-auto no-scrollbar">
        <div className="flex gap-2">
          {(["all", "garage", "storage", "basement", "attic"] as FilterType[]).map((filter) => (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === filter
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {filter === "all" ? "Todos" : spaceTypeLabels[filter]}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Sheet */}
      {showFilters && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => onShowFiltersChange(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl p-6 safe-area-bottom animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Filtros</h2>
              <button 
                onClick={() => onShowFiltersChange(false)}
                className="p-2 -mr-2 rounded-full hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-3">Rango de precio</h3>
                <div className="grid grid-cols-2 gap-3">
                  {["$0-$50", "$50-$100", "$100-$200", "$200+"].map((range) => (
                    <button
                      key={range}
                      className="py-3 px-4 rounded-xl border text-sm font-medium hover:border-primary hover:text-primary transition-colors"
                    >
                      {range}/mes
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <h3 className="font-medium mb-3">Tamaño</h3>
                <div className="grid grid-cols-2 gap-3">
                  {["Pequeño (0-15m²)", "Mediano (15-30m²)", "Grande (30-50m²)", "Extra grande (50m²+)"].map((size) => (
                    <button
                      key={size}
                      className="py-3 px-4 rounded-xl border text-sm font-medium hover:border-primary hover:text-primary transition-colors"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="font-medium mb-3">Características</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { icon: Thermometer, label: "Clima controlado" },
                    { icon: Video, label: "Cámara" },
                    { icon: DoorOpen, label: "Entrada privada" },
                  ].map(({ icon: Icon, label }) => (
                    <button
                      key={label}
                      className="flex items-center gap-2 py-2 px-4 rounded-full border text-sm font-medium hover:border-primary hover:text-primary transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <Button variant="outline" className="flex-1 h-12" onClick={() => onShowFiltersChange(false)}>
                Limpiar
              </Button>
              <Button className="flex-1 h-12" onClick={() => onShowFiltersChange(false)}>
                Aplicar filtros
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
