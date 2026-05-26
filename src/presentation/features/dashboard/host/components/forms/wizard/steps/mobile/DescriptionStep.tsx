import { Label } from "@/presentation/components/ui/label";
import { Input } from "@/presentation/components/ui/input";
import { Textarea } from "@/presentation/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/presentation/components/ui/select";
import { NewSpaceFormData, SpaceTypeValue, spaceTypeOptions, isVehicleSpaceType } from "@/presentation/types/spaces";

interface DescriptionStepProps {
  newSpace: NewSpaceFormData;
  onUpdateNewSpace: (updates: Partial<NewSpaceFormData>) => void;
  recommendedPrice: number;
}

export function DescriptionStep({ newSpace, onUpdateNewSpace, recommendedPrice }: DescriptionStepProps) {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-card rounded-2xl border border-border/50 p-4 space-y-4 shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Información básica</p>
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Título <span className="text-destructive">*</span></Label>
          <Input
            placeholder="Ej: Garaje amplio en zona céntrica"
            value={newSpace.title}
            onChange={(e) => onUpdateNewSpace({ title: e.target.value })}
            className="h-11 rounded-xl border-border/50 bg-white dark:bg-card"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Descripción <span className="text-destructive">*</span></Label>
          <Textarea
            placeholder="Acceso, horarios, seguridad, etc."
            value={newSpace.description}
            onChange={(e) => onUpdateNewSpace({ description: e.target.value })}
            className="min-h-[120px] resize-none rounded-xl border-border/50 bg-white dark:bg-card"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-card rounded-2xl border border-border/50 p-4 space-y-4 shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Detalles del espacio</p>
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Tipo de espacio <span className="text-destructive">*</span></Label>
          <Select value={newSpace.type} onValueChange={(v: SpaceTypeValue) => {
            const updates: Partial<NewSpaceFormData> = { type: v };
            if (!isVehicleSpaceType(v)) updates.capacity = 1;
            onUpdateNewSpace(updates);
          }}>
            <SelectTrigger className="h-11 rounded-xl border-border/50 bg-white dark:bg-card">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              {spaceTypeOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">m² <span className="text-destructive">*</span></Label>
            <Input
              type="number" min="1" placeholder="0"
              value={newSpace.squareMeters || ""}
              onChange={(e) => onUpdateNewSpace({ squareMeters: Number(e.target.value) })}
              className="h-11 rounded-xl border-border/50 bg-white dark:bg-card"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">$/mes <span className="text-destructive">*</span></Label>
            <Input
              type="number" min="1" placeholder="0"
              value={newSpace.pricePerMonth || ""}
              onChange={(e) => onUpdateNewSpace({ pricePerMonth: Number(e.target.value) })}
              className="h-11 rounded-xl border-border/50 bg-white dark:bg-card"
            />
          </div>
        </div>

        {newSpace.squareMeters > 0 && (
          <p className="text-xs text-muted-foreground">Precio sugerido: <span className="font-semibold text-foreground">${recommendedPrice}/mes</span></p>
        )}

        {isVehicleSpaceType(newSpace.type) && (
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Capacidad (vehículos) <span className="text-destructive">*</span></Label>
            <Input
              type="number" min="1" placeholder="1"
              value={newSpace.capacity || ""}
              onChange={(e) => onUpdateNewSpace({ capacity: Math.max(1, Number(e.target.value)) })}
              className="h-11 rounded-xl border-border/50 bg-white dark:bg-card"
            />
            <p className="text-xs text-muted-foreground">Vehículos simultáneos</p>
          </div>
        )}
      </div>
    </div>
  );
}
