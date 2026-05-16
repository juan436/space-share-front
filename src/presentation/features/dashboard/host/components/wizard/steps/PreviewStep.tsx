import { ImageIcon, MapPin } from "lucide-react";
import { NewSpaceFormData, spaceTypeOptions, isVehicleSpaceType } from "@/presentation/types/spaces";

const UPLOADS_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:3006";

function resolveImageUrl(filename: string): string {
  if (filename.startsWith("http") || filename.startsWith("blob:")) return filename;
  return `${UPLOADS_BASE_URL}/uploads/${filename}`;
}

interface PreviewStepProps {
  newSpace: NewSpaceFormData;
  images: string[];
}

export function PreviewStep({ newSpace, images }: PreviewStepProps) {
  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="text-center mb-2 sm:mb-4">
        <h3 className="text-lg font-semibold">¡Todo listo!</h3>
        <p className="text-muted-foreground text-sm">Revisa tu publicación antes de publicar</p>
      </div>

      {/* Preview Card - Compacto para mobile */}
      <div className="border rounded-xl overflow-hidden bg-card">
        <div className="aspect-[16/9] sm:aspect-video bg-muted flex items-center justify-center max-h-[150px] sm:max-h-[200px]">
          {images.length > 0 ? (
            <img src={resolveImageUrl(images[0])} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground" />
          )}
        </div>
        <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
          <div className="flex justify-between items-start gap-2">
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-base sm:text-lg truncate">
                {newSpace.title || "Sin título"}
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3 shrink-0" />
                <span className="truncate">
                  {newSpace.city ? `${newSpace.city}, ${newSpace.state}` : "Sin ubicación"}
                </span>
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-lg sm:text-xl font-bold text-primary">
                ${newSpace.pricePerMonth || 0}
              </p>
              <p className="text-xs text-muted-foreground">/mes</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
            {newSpace.description || "Sin descripción"}
          </p>

          <div className="flex gap-1.5 sm:gap-2 flex-wrap">
            <span className="text-[10px] sm:text-xs bg-muted px-2 py-0.5 sm:py-1 rounded-full">
              {spaceTypeOptions.find((o) => o.value === newSpace.type)?.label || newSpace.type}
            </span>
            <span className="text-[10px] sm:text-xs bg-muted px-2 py-0.5 sm:py-1 rounded-full">
              {newSpace.squareMeters} m²
            </span>
            {isVehicleSpaceType(newSpace.type) && newSpace.capacity > 1 && (
              <span className="text-[10px] sm:text-xs bg-orange-100 text-orange-700 px-2 py-0.5 sm:py-1 rounded-full">
                {newSpace.capacity} vehículos
              </span>
            )}
            {newSpace.climateControlled && (
              <span className="text-[10px] sm:text-xs bg-blue-100 text-blue-700 px-2 py-0.5 sm:py-1 rounded-full">
                Clima
              </span>
            )}
            {newSpace.securityCamera && (
              <span className="text-[10px] sm:text-xs bg-green-100 text-green-700 px-2 py-0.5 sm:py-1 rounded-full">
                Seguridad
              </span>
            )}
            {newSpace.privateEntrance && (
              <span className="text-[10px] sm:text-xs bg-purple-100 text-purple-700 px-2 py-0.5 sm:py-1 rounded-full">
                Entrada
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
