"use client";

import { X, Thermometer, Video, DoorOpen, Warehouse, Home, ArrowDown, Box, Car, Clock } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";
import { useEffect, useRef, useState } from "react";

export type FilterType = "all" | "garage" | "basement" | "attic" | "storage";

export interface FilterState {
  type: FilterType;
  priceRange: string | null;
  size: string | null;
  amenities: string[];
}

// Filtros del panel (precio, tamaño, características); el tipo va en los chips.
export const countActiveFilters = (f: FilterState) => (f.priceRange ? 1 : 0) + (f.size ? 1 : 0) + f.amenities.length;

const filterOptions: { type: FilterType; label: string; icon: typeof Home }[] = [
  { type: "all", label: "Todos", icon: Home },
  { type: "garage", label: "Parqueo", icon: Car },
  { type: "storage", label: "Bodega", icon: Box },
  { type: "basement", label: "Sótano", icon: ArrowDown },
  { type: "attic", label: "Ático", icon: Home },
];

const priceRanges = ["$0-$50", "$50-$100", "$100-$200", "$200+"];
const sizes = [
  { id: "small", label: "Pequeño", sub: "0-15m²" },
  { id: "medium", label: "Mediano", sub: "15-30m²" },
  { id: "large", label: "Grande", sub: "30-50m²" },
  { id: "xlarge", label: "Extra grande", sub: "50m²+" },
];
const amenitiesList = [
  { id: "climateControlled", icon: Thermometer, label: "Clima controlado" },
  { id: "securityCamera", icon: Video, label: "Cámara de seguridad" },
  { id: "privateEntrance", icon: DoorOpen, label: "Entrada privada" },
  { id: "access247", icon: Clock, label: "Acceso 24/7" },
];

interface MobileSearchFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  showFilters: boolean;
  onShowFiltersChange: (show: boolean) => void;
  // Oculta la fila de chips (se usa al bajar por la lista).
  collapsed?: boolean;
}

export function MobileSearchFilters({
  filters,
  onFilterChange,
  showFilters,
  onShowFiltersChange,
  collapsed = false,
}: MobileSearchFiltersProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  // Only sync when the sheet opens (false→true), not on every filters change while sheet is already open
  const prevShowFilters = useRef(false);
  useEffect(() => {
    if (showFilters && !prevShowFilters.current) {
      setLocalFilters(filters);
    }
    prevShowFilters.current = showFilters;
  }, [showFilters, filters]);

  const handleApply = () => {
    onFilterChange(localFilters);
    onShowFiltersChange(false);
  };

  const handleClear = () => {
    const cleared: FilterState = { type: "all", priceRange: null, size: null, amenities: [] };
    setLocalFilters(cleared);
    onFilterChange(cleared);
    onShowFiltersChange(false);
  };

  const toggleAmenity = (id: string) => {
    setLocalFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(id) 
        ? prev.amenities.filter(a => a !== id)
        : [...prev.amenities, id]
    }));
  };

  return (
    <>
      {/* Filter Pills with Icons */}
      <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${collapsed ? "grid-rows-[0fr]" : "grid-rows-[1fr]"}`}>
       <div className="min-h-0 overflow-hidden">
        <div className="px-4 pb-3 overflow-x-auto no-scrollbar flex items-center">
        <div className="flex gap-2">
          {filterOptions.map(({ type, label, icon: Icon }) => (
            <button
              key={type}
              onClick={() => onFilterChange({ ...filters, type })}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${filters.type === type
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "bg-card text-muted-foreground border border-[hsl(214_24%_78%)] hover:border-foreground/40 hover:text-foreground"
                }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>
        </div>
       </div>
      </div>

      {/* Filter Sheet */}
      {showFilters && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => onShowFiltersChange(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl safe-area-bottom animate-in slide-in-from-bottom duration-300 flex flex-col max-h-[90vh]">
            {/* Handle bar */}
            <div className="flex-none flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/20" />
            </div>

            <div className="flex-none p-6 pt-3 pb-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Filtros Avanzados</h2>
                <button
                  onClick={() => onShowFiltersChange(false)}
                  className="p-2 -mr-2 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 space-y-6 pb-2">
              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-sm text-foreground mb-3">Rango de precio</h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {priceRanges.map((range) => {
                    const isActive = localFilters.priceRange === range;
                    return (
                      <button
                        key={range}
                        onClick={() => setLocalFilters({ ...localFilters, priceRange: isActive ? null : range })}
                        className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                          isActive
                            ? "border-foreground/30 bg-foreground/8 text-foreground font-semibold"
                            : "border-[hsl(214_24%_78%)] hover:border-foreground/40 text-muted-foreground"
                        }`}
                      >
                        {range}/mes
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size */}
              <div>
                <h3 className="font-semibold text-sm text-foreground mb-3">Tamaño</h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {sizes.map(({ id, label, sub }) => {
                     const isActive = localFilters.size === id;
                     return (
                      <button
                        key={id}
                        onClick={() => setLocalFilters({ ...localFilters, size: isActive ? null : id })}
                        className={`py-3 px-4 rounded-xl border text-left transition-all ${
                          isActive
                            ? "border-foreground/30 bg-foreground/8"
                            : "border-[hsl(214_24%_78%)] hover:border-foreground/40"
                        }`}
                      >
                        <span className={`block text-sm font-medium ${isActive ? "text-foreground" : "text-foreground"}`}>{label}</span>
                        <span className={`block text-xs mt-0.5 ${isActive ? "text-muted-foreground" : "text-muted-foreground"}`}>{sub}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="font-semibold text-sm text-foreground mb-3">Características</h3>
                <div className="flex flex-wrap gap-2">
                  {amenitiesList.map(({ id, icon: Icon, label }) => {
                     const isActive = localFilters.amenities.includes(id);
                     return (
                      <button
                        key={id}
                        onClick={() => toggleAmenity(id)}
                        className={`flex items-center gap-2 py-2.5 px-4 rounded-full border text-sm font-medium transition-all ${
                          isActive 
                            ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25" 
                            : "border-[hsl(214_24%_78%)] hover:border-foreground/40 text-muted-foreground bg-card"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex-none p-6 pt-4 border-t border-[hsl(214_24%_78%)] bg-card">
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 h-12 rounded-xl" onClick={handleClear}>
                  Limpiar todo
                </Button>
                <Button className="flex-1 h-12 rounded-xl shadow-md shadow-primary/25" onClick={handleApply}>
                  Ver resultados
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
