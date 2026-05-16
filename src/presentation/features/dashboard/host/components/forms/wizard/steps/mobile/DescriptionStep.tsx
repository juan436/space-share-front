/**
 * DescriptionStep (mobile)
 *
 * Qué hace: Paso 1 del wizard mobile — captura datos básicos del espacio con layout compacto.
 * Recibe:   newSpace (formData), onUpdateNewSpace, recommendedPrice
 * Genera:   formulario mobile con título, descripción, tipo, m², precio y capacidad (tipos vehiculares)
 * Procesa:  misma lógica que versión desktop; layout optimizado para pantallas pequeñas
 */
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

export function DescriptionStep({
  newSpace,
  onUpdateNewSpace,
  recommendedPrice,
}: DescriptionStepProps) {
  return (
    <div className="space-y-4">
      <div className="bg-background rounded-xl p-4 border">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Título *</Label>
          <Input
            placeholder="Ej: Garaje amplio"
            value={newSpace.title}
            onChange={(e) => onUpdateNewSpace({ title: e.target.value })}
            className="h-11"
          />
        </div>
      </div>

      <div className="bg-background rounded-xl p-4 border">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Descripción *</Label>
          <Textarea
            placeholder="Acceso, horarios, seguridad, etc."
            value={newSpace.description}
            onChange={(e) => onUpdateNewSpace({ description: e.target.value })}
            className="min-h-[140px] resize-none"
          />
        </div>
      </div>

      <div className="bg-background rounded-xl p-4 border space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Tipo de espacio *</Label>
          <Select value={newSpace.type} onValueChange={(v: SpaceTypeValue) => {
            const updates: Partial<NewSpaceFormData> = { type: v };
            if (!isVehicleSpaceType(v)) updates.capacity = 1;
            onUpdateNewSpace(updates);
          }}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              {spaceTypeOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-sm font-medium">m² *</Label>
            <Input
              type="number"
              min="1"
              placeholder="0"
              value={newSpace.squareMeters || ""}
              onChange={(e) => onUpdateNewSpace({ squareMeters: Number(e.target.value) })}
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">$/mes *</Label>
            <Input
              type="number"
              min="1"
              placeholder="0"
              value={newSpace.pricePerMonth || ""}
              onChange={(e) => onUpdateNewSpace({ pricePerMonth: Number(e.target.value) })}
              className="h-11"
            />
          </div>
        </div>

        {newSpace.squareMeters > 0 && (
          <p className="text-xs text-muted-foreground">
            💡 Sugerido: ${recommendedPrice}/mes
          </p>
        )}

        {isVehicleSpaceType(newSpace.type) && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Capacidad (vehículos) *</Label>
            <Input
              type="number"
              min="1"
              placeholder="1"
              value={newSpace.capacity || ""}
              onChange={(e) => onUpdateNewSpace({ capacity: Math.max(1, Number(e.target.value)) })}
              className="h-11"
            />
            <p className="text-xs text-muted-foreground">
              Número de vehículos que caben simultáneamente
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
