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
    if (!isVehicleSpaceType(value)) updates.capacity = 1;
    onUpdateNewSpace(updates);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      <div className="pb-4 border-b border-border/40">
        <h3 className="text-base font-semibold text-foreground">Describe tu espacio</h3>
        <p className="text-sm text-muted-foreground mt-0.5">Cuéntanos sobre el espacio que quieres publicar</p>
      </div>

      {/* Sección 1: Texto */}
      <div className="rounded-2xl border border-border/50 bg-muted/20 p-4 space-y-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Información básica</p>

        <div className="space-y-1.5">
          <Label htmlFor="title" className="text-sm font-medium">Título del anuncio <span className="text-destructive">*</span></Label>
          <Input
            id="title"
            placeholder="Ej: Garaje amplio en zona céntrica"
            value={newSpace.title}
            onChange={(e) => onUpdateNewSpace({ title: e.target.value })}
            className="h-10 rounded-xl border-border/50 bg-white dark:bg-card focus-visible:ring-primary/20"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="description" className="text-sm font-medium">Descripción <span className="text-destructive">*</span></Label>
          <Textarea
            id="description"
            placeholder="Describe las características de tu espacio, acceso, horarios disponibles..."
            value={newSpace.description}
            onChange={(e) => onUpdateNewSpace({ description: e.target.value })}
            className="min-h-[90px] resize-none rounded-xl border-border/50 bg-white dark:bg-card focus-visible:ring-primary/20"
          />
        </div>
      </div>

      {/* Sección 2: Detalles numéricos */}
      <div className="rounded-2xl border border-border/50 bg-muted/20 p-4 space-y-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Detalles del espacio</p>

        <div className={`grid grid-cols-1 ${showCapacity ? "sm:grid-cols-2" : "sm:grid-cols-3"} gap-4`}>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Tipo de espacio <span className="text-destructive">*</span></Label>
            <Select value={newSpace.type} onValueChange={(v: SpaceTypeValue) => handleTypeChange(v)}>
              <SelectTrigger className="h-10 rounded-xl border-border/50 bg-white dark:bg-card">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                {spaceTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="squareMeters" className="text-sm font-medium">Tamaño (m²) <span className="text-destructive">*</span></Label>
            <Input
              id="squareMeters"
              type="number"
              min="1"
              placeholder="0"
              value={newSpace.squareMeters || ""}
              onChange={(e) => onUpdateNewSpace({ squareMeters: Number(e.target.value) })}
              className="h-10 rounded-xl border-border/50 bg-white dark:bg-card focus-visible:ring-primary/20"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="price" className="text-sm font-medium">Precio mensual ($) <span className="text-destructive">*</span></Label>
            <Input
              id="price"
              type="number"
              min="1"
              placeholder="0"
              value={newSpace.pricePerMonth || ""}
              onChange={(e) => onUpdateNewSpace({ pricePerMonth: Number(e.target.value) })}
              className="h-10 rounded-xl border-border/50 bg-white dark:bg-card focus-visible:ring-primary/20"
            />
            {newSpace.squareMeters > 0 && (
              <p className="text-xs text-muted-foreground">Precio sugerido: <span className="font-semibold text-foreground">${recommendedPrice}/mes</span></p>
            )}
          </div>

          {showCapacity && (
            <div className="space-y-1.5">
              <Label htmlFor="capacity" className="text-sm font-medium">Capacidad (vehículos) <span className="text-destructive">*</span></Label>
              <Input
                id="capacity"
                type="number"
                min="1"
                placeholder="1"
                value={newSpace.capacity || ""}
                onChange={(e) => onUpdateNewSpace({ capacity: Math.max(1, Number(e.target.value)) })}
                className="h-10 rounded-xl border-border/50 bg-white dark:bg-card focus-visible:ring-primary/20"
              />
              <p className="text-xs text-muted-foreground">Vehículos simultáneos</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
