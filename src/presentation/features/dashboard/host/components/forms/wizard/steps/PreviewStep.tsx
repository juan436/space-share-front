import { ImageIcon, MapPin, Thermometer, Shield, DoorOpen, Ruler } from "lucide-react";
import { NewSpaceFormData, spaceTypeOptions, isVehicleSpaceType } from "@/presentation/types/spaces";
import { resolveImageUrl } from "@/presentation/utils/image";

interface PreviewStepProps {
  newSpace: NewSpaceFormData;
  images: string[];
}

export function PreviewStep({ newSpace, images }: PreviewStepProps) {
  const amenities = [
    newSpace.climateControlled && { key: "climate",  label: "Control de Clima", icon: Thermometer },
    newSpace.securityCamera    && { key: "security",  label: "Seguridad 24/7",   icon: Shield      },
    newSpace.privateEntrance   && { key: "entrance",  label: "Entrada Privada",  icon: DoorOpen    },
  ].filter(Boolean) as { key: string; label: string; icon: React.ElementType }[];

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="pb-4 border-b border-border/40">
        <h3 className="text-base font-semibold text-foreground">¡Todo listo para publicar!</h3>
        <p className="text-sm text-muted-foreground mt-0.5">Revisa los datos antes de publicar tu espacio</p>
      </div>

      <div className="bg-white dark:bg-card border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.07)] rounded-2xl overflow-hidden">
        {/* Imagen */}
        <div className="w-full h-40 bg-muted flex items-center justify-center">
          {images.length > 0 ? (
            <img src={resolveImageUrl(images[0])} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="h-10 w-10 text-muted-foreground opacity-40" />
          )}
        </div>

        <div className="p-4 space-y-3">
          {/* Título + precio */}
          <div className="flex justify-between items-start gap-2">
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-base truncate">{newSpace.title || "Sin título"}</h4>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <MapPin className="h-3 w-3 shrink-0" />
                <span className="truncate">
                  {newSpace.city ? `${newSpace.city}, ${newSpace.state}` : "Sin ubicación"}
                </span>
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xl font-bold text-primary">${newSpace.pricePerMonth || 0}</p>
              <p className="text-xs text-muted-foreground">/mes</p>
            </div>
          </div>

          {/* Descripción */}
          <p className="text-xs text-muted-foreground line-clamp-2">
            {newSpace.description || "Sin descripción"}
          </p>

          {/* Badges tipo + dimensiones */}
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

          {/* Amenidades activas */}
          {amenities.length > 0 && (
            <div className="pt-2 border-t border-border/40">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">Comodidades</p>
              <div className="flex gap-2 flex-wrap">
                {amenities.map(({ key, label, icon: Icon }) => (
                  <span key={key} className="flex items-center gap-1 text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                    <Icon className="h-2.5 w-2.5" />{label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
