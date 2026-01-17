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
}: SearchFiltersProps) {
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
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
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

          <div className="flex-1" />

          <Button variant="outline" size="sm">
            Limpiar filtros
          </Button>
        </div>
      </div>
    </div>
  );
}
