import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import { Textarea } from "@/presentation/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/presentation/components/ui/select";
import { NewSpaceFormData, SpaceTypeValue, spaceTypeOptions } from "@/presentation/types/spaces";

interface DescriptionStepProps {
  newSpace: NewSpaceFormData;
  onUpdateNewSpace: (updates: Partial<NewSpaceFormData>) => void;
  recommendedPrice: number;
}

export function DescriptionStep({ newSpace, onUpdateNewSpace, recommendedPrice }: DescriptionStepProps) {
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Tipo de espacio *</Label>
            <Select
              value={newSpace.type}
              onValueChange={(value: SpaceTypeValue) => onUpdateNewSpace({ type: value })}
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
        </div>
      </div>
    </div>
  );
}
