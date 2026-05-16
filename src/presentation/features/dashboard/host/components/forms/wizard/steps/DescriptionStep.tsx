/**
 * DescriptionStep (desktop)
 *
 * Qué hace: Paso 1 del wizard — captura los datos básicos del espacio.
 * Recibe:   newSpace (formData), onUpdateNewSpace, recommendedPrice
 * Genera:   formulario con título, descripción, tipo, m², precio/mes y capacidad (solo tipos vehiculares)
 * Procesa:  resetea capacity a 1 al cambiar a tipo no vehicular; muestra precio sugerido si m² > 0
 */
import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import { Textarea } from "@/presentation/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/presentation/components/ui/select";
import { NewSpaceFormData, SpaceTypeValue, spaceTypeOptions, isVehicleSpaceType } from "@/presentation/types/spaces";

interface DescriptionStepProps {
  newSpace: NewSpaceFormData;
  onUpdateNewSpace: (updates: Partial<NewSpaceFormData>) => void;
  recommendedPrice: number;
}

export function DescriptionStep({ newSpace, onUpdateNewSpace, recommendedPrice }: DescriptionStepProps) {
  const showCapacity = isVehicleSpaceType(newSpace.type);

  const handleTypeChange = (value: SpaceTypeValue) => {
    const updates: Partial<NewSpaceFormData> = { type: value };
    if (!isVehicleSpaceType(value)) {
      updates.capacity = 1;
    }
    onUpdateNewSpace(updates);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold">Describe tu espacio</h3>
        <p className="text-muted-foreground text-sm">Cuéntanos sobre el espacio que quieres publicar</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium">
            Título del anuncio *
          </Label>
          <Input
            id="title"
            placeholder="Ej: Garaje amplio en zona céntrica"
            value={newSpace.title}
            onChange={(e) => onUpdateNewSpace({ title: e.target.value })}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">
            Descripción *
          </Label>
          <Textarea
            id="description"
            placeholder="Describe las características de tu espacio, acceso, horarios disponibles..."
            value={newSpace.description}
            onChange={(e) => onUpdateNewSpace({ description: e.target.value })}
            className="min-h-[100px] resize-none"
          />
        </div>

        <div className={`grid grid-cols-1 ${showCapacity ? "sm:grid-cols-2" : "sm:grid-cols-3"} gap-4`}>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Tipo de espacio *</Label>
            <Select
              value={newSpace.type}
              onValueChange={(value: SpaceTypeValue) => handleTypeChange(value)}
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                {spaceTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="squareMeters" className="text-sm font-medium">
              Tamaño (m²) *
            </Label>
            <Input
              id="squareMeters"
              type="number"
              min="1"
              placeholder="0"
              value={newSpace.squareMeters || ""}
              onChange={(e) => onUpdateNewSpace({ squareMeters: Number(e.target.value) })}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm font-medium">
              Precio mensual ($) *
            </Label>
            <Input
              id="price"
              type="number"
              min="1"
              placeholder="0"
              value={newSpace.pricePerMonth || ""}
              onChange={(e) => onUpdateNewSpace({ pricePerMonth: Number(e.target.value) })}
              className="h-11"
            />
            {newSpace.squareMeters > 0 && (
              <p className="text-xs text-muted-foreground">
                💡 Precio sugerido: ${recommendedPrice}/mes
              </p>
            )}
          </div>

          {showCapacity && (
            <div className="space-y-2">
              <Label htmlFor="capacity" className="text-sm font-medium">
                Capacidad (vehículos) *
              </Label>
              <Input
                id="capacity"
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
    </div>
  );
}
