import { Building2, Users, Warehouse, Store } from "lucide-react";
import { cn } from "@/presentation/utils/cn";
import type { BusinessSpaceType } from "../../../hooks/useBusinessSpaceForm";

const spaceTypeOptions = [
  { value: "office",       label: "Oficina",            icon: Building2 },
  { value: "commercial",   label: "Local Comercial",    icon: Store     },
  { value: "warehouse",    label: "Bodega",             icon: Warehouse },
  { value: "meeting_room", label: "Sala de Reuniones",  icon: Users     },
];

interface SpaceTypeSectionProps {
  spaceType: BusinessSpaceType;
  onSelect: (value: BusinessSpaceType) => void;
}

export function SpaceTypeSection({ spaceType, onSelect }: SpaceTypeSectionProps) {
  return (
    <div className="rounded-2xl border border-border/50 bg-muted/20 p-4 space-y-3">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tipo de espacio empresarial</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {spaceTypeOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = spaceType === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value as BusinessSpaceType)}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200",
                "shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]",
                isSelected
                  ? "border-violet-400/50 bg-violet-50 dark:bg-violet-950/20"
                  : "border-border/60 bg-white dark:bg-card hover:border-violet-300/40"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                isSelected ? "bg-violet-100 dark:bg-violet-950/40" : "bg-muted/60"
              )}>
                <Icon className={cn("h-5 w-5", isSelected ? "text-violet-600" : "text-muted-foreground")} />
              </div>
              <span className={cn("text-xs font-medium text-center leading-tight", isSelected ? "text-violet-700 dark:text-violet-400" : "text-muted-foreground")}>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
