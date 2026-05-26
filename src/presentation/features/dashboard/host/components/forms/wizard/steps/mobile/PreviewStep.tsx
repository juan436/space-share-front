import { MapPin, ImageIcon, Ruler, Thermometer, Shield, DoorOpen } from "lucide-react";
import { NewSpaceFormData, spaceTypeOptions, isVehicleSpaceType } from "@/presentation/types/spaces";
import { resolveImageUrl } from "@/presentation/utils/image";

interface PreviewStepProps {
  newSpace: NewSpaceFormData;
  images: string[];
}

export function PreviewStep({ newSpace, images }: PreviewStepProps) {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-card rounded-2xl border border-border/50 p-4 shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
        <p className="text-sm font-semibold text-foreground">Vista previa</p>
        <p className="text-xs text-muted-foreground mt-0.5">Así verán tu anuncio los usuarios</p>
      </div>

      <div className="bg-white dark:bg-card border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.07)] rounded-2xl overflow-hidden">
        <div className="w-full h-44 bg-muted flex items-center justify-center">
          {images.length > 0 ? (
            <img src={resolveImageUrl(images[0])} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="h-10 w-10 text-muted-foreground opacity-40" />
          )}
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-semibold text-base truncate">{newSpace.title || "Sin título"}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <MapPin className="h-3 w-3 shrink-0" />
                <span className="truncate">{newSpace.city ? `${newSpace.city}, ${newSpace.state}` : "Sin ubicación"}</span>
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-lg font-bold text-foreground">${newSpace.pricePerMonth || 0}</p>
              <p className="text-xs text-muted-foreground">/mes</p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2">
            {newSpace.description || "Sin descripción"}
          </p>

          <div className="flex gap-1.5 flex-wrap">
            {newSpace.type && (
              <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">
                {spaceTypeOptions.find((o) => o.value === newSpace.type)?.label ?? newSpace.type}
              </span>
            )}
            {newSpace.squareMeters > 0 && (
              <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full flex items-center gap-1">
                <Ruler className="h-2.5 w-2.5" />{newSpace.squareMeters} m²
              </span>
            )}
            {isVehicleSpaceType(newSpace.type) && newSpace.capacity > 1 && (
              <span className="text-[10px] bg-orange-50 text-orange-700 dark:bg-orange-950/20 dark:text-orange-400 px-2 py-0.5 rounded-full">
                {newSpace.capacity} vehículos
              </span>
            )}
          </div>

          {(newSpace.climateControlled || newSpace.securityCamera || newSpace.privateEntrance) && (
            <div className="pt-2 border-t border-border/40">
              <div className="flex gap-1.5 flex-wrap">
                {newSpace.climateControlled && (
                  <span className="flex items-center gap-1 text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                    <Thermometer className="h-2.5 w-2.5" />Clima
                  </span>
                )}
                {newSpace.securityCamera && (
                  <span className="flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                    <Shield className="h-2.5 w-2.5" />Seguridad
                  </span>
                )}
                {newSpace.privateEntrance && (
                  <span className="flex items-center gap-1 text-[10px] bg-violet-50 text-violet-700 dark:bg-violet-950/20 dark:text-violet-400 px-2 py-0.5 rounded-full">
                    <DoorOpen className="h-2.5 w-2.5" />Entrada
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
