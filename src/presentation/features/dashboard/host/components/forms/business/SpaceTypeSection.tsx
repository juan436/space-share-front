/**
 * SpaceTypeSection
 *
 * Qué hace: Sección 1 del formulario empresarial — selección del tipo de espacio corporativo.
 * Recibe:   spaceType (BusinessSpaceType), onSelect callback
 * Genera:   tarjetas clickeables para oficina, local, bodega y sala de reuniones
 */
import { Building2, Users } from "lucide-react";
import { cn } from "@/presentation/utils/cn";
import type { BusinessSpaceType } from "../../../hooks/useBusinessSpaceForm";

const spaceTypeOptions = [
  { value: "office", label: "Oficina", icon: Building2 },
  { value: "commercial", label: "Local Comercial", icon: Building2 },
  { value: "warehouse", label: "Bodega", icon: Building2 },
  { value: "meeting_room", label: "Sala de Reuniones", icon: Users },
];

interface SpaceTypeSectionProps {
  spaceType: BusinessSpaceType;
  onSelect: (value: BusinessSpaceType) => void;
}

export function SpaceTypeSection({ spaceType, onSelect }: SpaceTypeSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Building2 className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Tipo de Espacio Empresarial</h3>
      </div>
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
                "flex flex-col items-center p-4 rounded-xl border-2 transition-all",
                isSelected ? "border-primary bg-primary/5" : "border-muted hover:border-muted-foreground/30"
              )}
            >
              <Icon className={cn("h-6 w-6 mb-2", isSelected ? "text-primary" : "text-muted-foreground")} />
              <span className={cn("text-sm font-medium", isSelected && "text-primary")}>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
