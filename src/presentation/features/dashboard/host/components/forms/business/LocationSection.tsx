import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import { LocationPicker } from "@/presentation/components/shared/forms/LocationPicker";
import { BusinessSpaceData } from "../../../hooks/useBusinessSpaceForm";

interface LocationSectionProps {
  formData: Pick<BusinessSpaceData, "country" | "state" | "city" | "address" | "availableFrom" | "availableTo">;
  onUpdate: (updates: Partial<BusinessSpaceData>) => void;
}

export function LocationSection({ formData, onUpdate }: LocationSectionProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border/50 bg-muted/20 p-4 space-y-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Región</p>
        <LocationPicker
          country={formData.country}
          state={formData.state}
          city={formData.city}
          onUpdate={(updates) => onUpdate(updates)}
        />
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Dirección completa <span className="text-destructive">*</span></Label>
          <Input
            placeholder="Calle, número, edificio, piso..."
            value={formData.address}
            onChange={(e) => onUpdate({ address: e.target.value })}
            className="h-10 rounded-xl border-border/50 bg-white dark:bg-card focus-visible:ring-primary/20"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-border/50 bg-muted/20 p-4 space-y-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Horario disponible</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Desde</Label>
            <Input
              type="time"
              value={formData.availableFrom}
              onChange={(e) => onUpdate({ availableFrom: e.target.value })}
              className="h-10 rounded-xl border-border/50 bg-white dark:bg-card focus-visible:ring-primary/20"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Hasta</Label>
            <Input
              type="time"
              value={formData.availableTo}
              onChange={(e) => onUpdate({ availableTo: e.target.value })}
              className="h-10 rounded-xl border-border/50 bg-white dark:bg-card focus-visible:ring-primary/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
