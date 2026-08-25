"use client";

import { MapPin, LayoutGrid, DollarSign, Maximize2 } from "lucide-react";
import { Input } from "@/presentation/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/presentation/components/ui/select";

interface CompactSearchFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit?: () => void;
  spaceType: string;
  onSpaceTypeChange: (value: string) => void;
  priceRange: string;
  onPriceRangeChange: (value: string) => void;
  sizeRange: string;
  onSizeRangeChange: (value: string) => void;
}

export function CompactSearchFilters({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  spaceType,
  onSpaceTypeChange,
  priceRange,
  onPriceRangeChange,
  sizeRange,
  onSizeRangeChange,
}: CompactSearchFiltersProps) {
  return (
    <div className="flex items-center gap-0 bg-white border border-border rounded-full shadow-sm overflow-hidden h-12 w-full max-w-2xl animate-fade-in-up">
      <div className="relative flex-1 min-w-[90px] max-w-[280px]">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/50" />
        <Input
          type="text"
          aria-label="Buscar espacios"
          placeholder="Ciudad o zona..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") onSearchSubmit?.(); }}
          className="pl-8 h-12 bg-transparent border-none shadow-none rounded-none text-xs placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      <div className="w-px h-5 bg-border flex-shrink-0" />

      <Select value={spaceType} onValueChange={onSpaceTypeChange}>
        <SelectTrigger className="h-12 bg-transparent border-none shadow-none text-xs font-medium hover:bg-muted/40 rounded-none transition-colors gap-1 px-2 w-auto max-w-[136px] focus:ring-0 focus:ring-offset-0 [&>svg:last-child]:hidden">
          <LayoutGrid className="w-3 h-3 text-muted-foreground flex-shrink-0" />
          <SelectValue placeholder="Tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los tipos</SelectItem>
          <SelectItem value="garage">Garaje</SelectItem>
          <SelectItem value="basement">Sótano</SelectItem>
          <SelectItem value="attic">Ático</SelectItem>
          <SelectItem value="storage">Bodega</SelectItem>
          <SelectItem value="parking">Parqueo</SelectItem>
          <SelectItem value="other">Otro</SelectItem>
        </SelectContent>
      </Select>

      <div className="w-px h-5 bg-border flex-shrink-0" />

      <Select value={priceRange} onValueChange={onPriceRangeChange}>
        <SelectTrigger className="h-12 bg-transparent border-none shadow-none text-xs font-medium hover:bg-muted/40 rounded-none transition-colors gap-1 px-2 w-auto max-w-[136px] focus:ring-0 focus:ring-offset-0 [&>svg:last-child]:hidden">
          <DollarSign className="w-3 h-3 text-muted-foreground flex-shrink-0" />
          <SelectValue placeholder="Precio" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Cualquier precio</SelectItem>
          <SelectItem value="0-100">$0 – $100</SelectItem>
          <SelectItem value="100-300">$100 – $300</SelectItem>
          <SelectItem value="300-500">$300 – $500</SelectItem>
          <SelectItem value="500+">$500+</SelectItem>
        </SelectContent>
      </Select>

      <div className="w-px h-5 bg-border flex-shrink-0" />

      <Select value={sizeRange} onValueChange={onSizeRangeChange}>
        <SelectTrigger className="h-12 bg-transparent border-none shadow-none text-xs font-medium hover:bg-muted/40 rounded-none transition-colors gap-1 px-2 w-auto max-w-[136px] focus:ring-0 focus:ring-offset-0 [&>svg:last-child]:hidden">
          <Maximize2 className="w-3 h-3 text-muted-foreground flex-shrink-0" />
          <SelectValue placeholder="Tamaño" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Cualquier tamaño</SelectItem>
          <SelectItem value="0-10">Pequeño</SelectItem>
          <SelectItem value="10-30">Mediano</SelectItem>
          <SelectItem value="30-50">Grande</SelectItem>
          <SelectItem value="50+">Extra grande</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
