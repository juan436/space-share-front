"use client";

import { Search, X, Thermometer, Video, DoorOpen, Warehouse, Home, ArrowDown, Box, Car, Clock } from "lucide-react";
import { Input } from "@/presentation/components/ui/input";
import { Button } from "@/presentation/components/ui/button";
import { useEffect, useRef, useState } from "react";

export type FilterType = "all" | "garage" | "basement" | "attic" | "storage" | "parking";

export interface FilterState {
  type: FilterType;
  priceRange: string | null;
  size: string | null;
  amenities: string[];
}

const filterOptions: { type: FilterType; label: string; icon: typeof Home }[] = [
  { type: "all", label: "Todos", icon: Home },
  { type: "garage", label: "Garaje", icon: Warehouse },
  { type: "storage", label: "Bodega", icon: Box },
  { type: "parking", label: "Parqueo", icon: Car },
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
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  showFilters: boolean;
  onShowFiltersChange: (show: boolean) => void;
}

export function MobileSearchFilters({
  searchQuery,
  onSearchChange,
  filters,
  onFilterChange,
  showFilters,
  onShowFiltersChange,
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

  const activeFilterCount = (filters.priceRange ? 1 : 0) + (filters.size ? 1 : 0) + filters.amenities.length;

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
      <div className="px-4 pb-3 overflow-x-auto no-scrollbar flex items-center justify-between">
        <div className="flex gap-2 mr-2">
          {filterOptions.map(({ type, label, icon: Icon }) => (
            <button
              key={type}
              onClick={() => onFilterChange({ ...filters, type })}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${filters.type === type
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "bg-card text-muted-foreground border border-border/60 hover:border-primary/30 hover:text-foreground"
                }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>
        
        {/* Visual indicator for active sheet filters */}
        {activeFilterCount > 0 && (
          <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-sm animate-in fade-in zoom-in duration-200">
            {activeFilterCount}
          </div>
        )}
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
                            ? "border-primary bg-primary/10 text-primary" 
                            : "border-border/60 hover:border-primary/50 text-muted-foreground"
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
                            ? "border-primary bg-primary/10" 
                            : "border-border/60 hover:border-primary/50"
                        }`}
                      >
                        <span className={`block text-sm font-medium ${isActive ? 'text-primary' : 'text-foreground'}`}>{label}</span>
                        <span className={`block text-xs mt-0.5 ${isActive ? 'text-primary/70' : 'text-muted-foreground'}`}>{sub}</span>
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
                            : "border-border/60 hover:border-primary/50 text-muted-foreground bg-card"
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

            <div className="flex-none p-6 pt-4 border-t border-border/40 bg-card">
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
