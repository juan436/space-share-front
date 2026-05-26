import { ImageIcon, MapPin, Users, Ruler, Clock, Wifi, Car, Coffee, Printer, Phone, Shield, Snowflake } from "lucide-react";
import { resolveImageUrl } from "@/presentation/utils/image";
import { BusinessSpaceData } from "../../../hooks/useBusinessSpaceForm";

const spaceTypeLabels: Record<string, string> = {
  office: "Oficina",
  commercial: "Local Comercial",
  warehouse: "Bodega",
  meeting_room: "Sala de Reuniones",
};

const serviceIcons: { key: keyof BusinessSpaceData["services"]; label: string; icon: React.ElementType }[] = [
  { key: "wifi",           label: "WiFi",              icon: Wifi      },
  { key: "parking",        label: "Estacionamiento",   icon: Car       },
  { key: "cafeteria",      label: "Cafetería",         icon: Coffee    },
  { key: "printer",        label: "Impresora",         icon: Printer   },
  { key: "reception",      label: "Recepción",         icon: Phone     },
  { key: "security",       label: "Seguridad 24/7",    icon: Shield    },
  { key: "airConditioning",label: "Aire Acond.",       icon: Snowflake },
];

interface BusinessPreviewStepProps {
  formData: BusinessSpaceData;
  images: string[];
}

export function BusinessPreviewStep({ formData, images }: BusinessPreviewStepProps) {
  const activeServices = serviceIcons.filter((s) => formData.services[s.key]);

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="pb-4 border-b border-border/40">
        <h3 className="text-base font-semibold text-foreground">¡Todo listo para publicar!</h3>
        <p className="text-sm text-muted-foreground mt-0.5">Revisa los datos antes de publicar tu espacio</p>
      </div>

      {/* Card preview */}
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
              <h4 className="font-semibold text-base truncate">{formData.title || "Sin título"}</h4>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <MapPin className="h-3 w-3 shrink-0" />
                <span className="truncate">
                  {formData.city ? `${formData.city}, ${formData.state}` : "Sin ubicación"}
                </span>
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xl font-bold text-primary">${formData.pricePerMonth || 0}</p>
              <p className="text-xs text-muted-foreground">/mes</p>
              {formData.pricePerHour > 0 && (
                <p className="text-xs text-muted-foreground">${formData.pricePerHour}/hr</p>
              )}
            </div>
          </div>

          {/* Descripción */}
          <p className="text-xs text-muted-foreground line-clamp-2">
            {formData.description || "Sin descripción"}
          </p>

          {/* Badges tipo + dimensiones */}
          <div className="flex gap-1.5 flex-wrap">
            {formData.spaceType && (
              <span className="text-[10px] bg-violet-50 text-violet-700 dark:bg-violet-950/20 dark:text-violet-400 px-2 py-0.5 rounded-full font-medium">
                {spaceTypeLabels[formData.spaceType] ?? formData.spaceType}
              </span>
            )}
            {formData.squareMeters > 0 && (
              <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full flex items-center gap-1">
                <Ruler className="h-2.5 w-2.5" />{formData.squareMeters} m²
              </span>
            )}
            {formData.maxCapacity > 0 && (
              <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full flex items-center gap-1">
                <Users className="h-2.5 w-2.5" />{formData.maxCapacity} personas
              </span>
            )}
            {(formData.availableFrom || formData.availableTo) && (
              <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full flex items-center gap-1">
                <Clock className="h-2.5 w-2.5" />{formData.availableFrom}–{formData.availableTo}
              </span>
            )}
          </div>

          {/* Servicios activos */}
          {activeServices.length > 0 && (
            <div className="pt-2 border-t border-border/40">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">Servicios</p>
              <div className="flex gap-2 flex-wrap">
                {activeServices.map(({ key, label, icon: Icon }) => (
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
