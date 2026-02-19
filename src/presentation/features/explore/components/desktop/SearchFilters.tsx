"use client";

import { Search, X, Clock, ShieldCheck, Snowflake, DoorOpen, LayoutGrid, DollarSign, Maximize2 } from "lucide-react";
import { Input } from "@/presentation/components/ui/input";
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

  const conditionOptions = [
    { id: "24/7", label: "Acceso 24/7", icon: Clock },
    { id: "verificado", label: "Verificado", icon: ShieldCheck },
    { id: "climatizado", label: "Climatizado", icon: Snowflake },
    { id: "privado", label: "Entrada privada", icon: DoorOpen },
  ];

  const spaceTypeLabels: Record<string, string> = {
    garage: "Garaje", basement: "Sótano", attic: "Ático", storage: "Bodega", parking: "Parqueo", other: "Otro"
  };
  const priceLabels: Record<string, string> = {
    "0-100": "$0 – $100/mes", "100-300": "$100 – $300/mes", "300-500": "$300 – $500/mes", "500+": "$500+/mes"
  };
  const sizeLabels: Record<string, string> = {
    "0-10": "Pequeño (0–10 m²)", "10-30": "Mediano (10–30 m²)", "30-50": "Grande (30–50 m²)", "50+": "Extra grande (50+ m²)"
  };

  const activeFilters = [
    spaceType !== "all" && { label: spaceTypeLabels[spaceType] || spaceType, type: "type", value: spaceType },
    priceRange !== "all" && { label: priceLabels[priceRange] || priceRange, type: "price", value: priceRange },
    sizeRange !== "all" && { label: sizeLabels[sizeRange] || sizeRange, type: "size", value: sizeRange },
    ...conditions.map(c => ({ label: conditionOptions.find(q => q.id === c)?.label || c, type: "condition", value: c }))
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
    <div className="border-b border-border/40 bg-card/80 glass-strong">
      <div className="max-w-screen-2xl mx-auto px-6 py-3">
        {/* Centered search bar — unified pill */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-0 bg-background/60 border border-border/50 rounded-xl shadow-sm overflow-hidden w-full max-w-4xl">
            {/* Search input */}
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
              <Input
                type="text"
                placeholder="Buscar ciudad o zona..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 h-10 bg-transparent border-none shadow-none rounded-none text-sm placeholder:text-muted-foreground/40 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted text-muted-foreground transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-border/50 flex-shrink-0" />

            {/* Tipo */}
            <Select value={spaceType} onValueChange={onSpaceTypeChange}>
              <SelectTrigger className="h-10 bg-transparent border-none shadow-none text-sm font-medium hover:bg-muted/40 rounded-none transition-colors gap-1.5 px-3 w-auto focus:ring-0 focus:ring-offset-0">
                <LayoutGrid className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
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

            {/* Divider */}
            <div className="w-px h-6 bg-border/50 flex-shrink-0" />

            {/* Precio */}
            <Select value={priceRange} onValueChange={onPriceRangeChange}>
              <SelectTrigger className="h-10 bg-transparent border-none shadow-none text-sm font-medium hover:bg-muted/40 rounded-none transition-colors gap-1.5 px-3 w-auto focus:ring-0 focus:ring-offset-0">
                <DollarSign className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                <SelectValue placeholder="Precio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Cualquier precio</SelectItem>
                <SelectItem value="0-100">$0 – $100 / mes</SelectItem>
                <SelectItem value="100-300">$100 – $300 / mes</SelectItem>
                <SelectItem value="300-500">$300 – $500 / mes</SelectItem>
                <SelectItem value="500+">$500+ / mes</SelectItem>
              </SelectContent>
            </Select>

            {/* Divider */}
            <div className="w-px h-6 bg-border/50 flex-shrink-0" />

            {/* Tamaño */}
            <Select value={sizeRange} onValueChange={onSizeRangeChange}>
              <SelectTrigger className="h-10 bg-transparent border-none shadow-none text-sm font-medium hover:bg-muted/40 rounded-none transition-colors gap-1.5 px-3 w-auto focus:ring-0 focus:ring-offset-0">
                <Maximize2 className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                <SelectValue placeholder="Tamaño" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Cualquier tamaño</SelectItem>
                <SelectItem value="0-10">Pequeño (0–10 m²)</SelectItem>
                <SelectItem value="10-30">Mediano (10–30 m²)</SelectItem>
                <SelectItem value="30-50">Grande (30–50 m²)</SelectItem>
                <SelectItem value="50+">Extra grande (50+ m²)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Row 2: Conditions + Active chips — centered */}
        <div className="flex items-center justify-center gap-2 mt-2.5 flex-wrap">
          {/* Condition toggle buttons */}
          {conditionOptions.map((opt) => {
            const Icon = opt.icon;
            const isActive = conditions.includes(opt.id);
            return (
              <button
                key={opt.id}
                onClick={() => toggleCondition(opt.id)}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 whitespace-nowrap border
                  ${isActive
                    ? "bg-primary/10 text-primary border-primary/20 shadow-sm"
                    : "text-muted-foreground hover:text-foreground bg-background/50 border-border/40 hover:border-border hover:bg-background/80"
                  }
                `}
              >
                <Icon className="w-3.5 h-3.5" />
                {opt.label}
              </button>
            );
          })}

          {/* Active filter chips */}
          {activeFilters.filter(f => f.type !== "condition").length > 0 && (
            <>
              <div className="w-px h-4 bg-border/40 mx-1" />
              {activeFilters.filter(f => f.type !== "condition").map((filter, idx) => (
                <div
                  key={`${filter.type}-${filter.value}-${idx}`}
                  className="flex items-center gap-1 pl-2.5 pr-1.5 py-1 bg-primary/8 text-primary rounded-md text-[11px] font-semibold border border-primary/12 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  <span>{filter.label}</span>
                  <button
                    onClick={() => removeFilter(filter)}
                    className="p-0.5 rounded hover:bg-primary/15 transition-colors"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
              ))}
            </>
          )}

          {/* Clear all */}
          {activeCount > 0 && (
            <>
              <div className="w-px h-4 bg-border/40 mx-1" />
              <button
                onClick={clearAll}
                className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-destructive transition-colors"
              >
                <X className="w-3 h-3" />
                Limpiar ({activeCount})
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
