import { MapPin, ImageIcon } from "lucide-react";
import { NewSpaceFormData, spaceTypeOptions, isVehicleSpaceType } from "@/presentation/types/spaces";

interface PreviewStepProps {
  newSpace: NewSpaceFormData;
  images: string[];
}

export function PreviewStep({
  newSpace,
  images,
}: PreviewStepProps) {
  return (
    <div className="space-y-4">
      <div className="bg-background rounded-xl p-4 border">
        <p className="font-medium">Vista previa</p>
        <p className="text-sm text-muted-foreground">Así verán tu anuncio</p>
      </div>

      <div className="border rounded-xl overflow-hidden bg-card">
        <div className="bg-muted flex items-center justify-center h-44">
          {images.length > 0 ? (
            <img src={images[0]} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="h-10 w-10 text-muted-foreground" />
          )}
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-semibold text-base truncate">{newSpace.title || "Sin título"}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span className="truncate">{newSpace.city ? `${newSpace.city}, ${newSpace.state}` : "Sin ubicación"}</span>
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-lg font-bold text-primary">${newSpace.pricePerMonth || 0}</p>
              <p className="text-xs text-muted-foreground">/mes</p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2">
            {newSpace.description || "Sin descripción"}
          </p>

          <div className="flex gap-2 flex-wrap">
            <span className="text-[10px] bg-muted px-2 py-1 rounded-full">
              {spaceTypeOptions.find((o) => o.value === newSpace.type)?.label || newSpace.type}
            </span>
            <span className="text-[10px] bg-muted px-2 py-1 rounded-full">
              {newSpace.squareMeters} m²
            </span>
            {isVehicleSpaceType(newSpace.type) && newSpace.capacity > 1 && (
              <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                {newSpace.capacity} vehículos
              </span>
            )}
            {newSpace.climateControlled && (
              <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Clima</span>
            )}
            {newSpace.securityCamera && (
              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full">Seguridad</span>
            )}
            {newSpace.privateEntrance && (
              <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Entrada</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
