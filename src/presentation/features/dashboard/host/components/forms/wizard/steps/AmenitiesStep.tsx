import { Checkbox } from "@/presentation/components/ui/checkbox";
import { Thermometer, Shield, DoorOpen, Check } from "lucide-react";
import { NewSpaceFormData } from "@/presentation/types/spaces";
import { cn } from "@/presentation/utils/cn";

interface AmenitiesStepProps {
  newSpace: NewSpaceFormData;
  onUpdateNewSpace: (updates: Partial<NewSpaceFormData>) => void;
}

export function AmenitiesStep({ newSpace, onUpdateNewSpace }: AmenitiesStepProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold">¿Qué ofrece tu espacio?</h3>
        <p className="text-muted-foreground text-sm">Selecciona las comodidades disponibles</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <label
          className={cn(
            "flex flex-col items-center p-6 rounded-xl border-2 cursor-pointer transition-all",
            newSpace.climateControlled
              ? "border-primary bg-primary/5"
              : "border-muted hover:border-muted-foreground/30"
          )}
        >
          <Checkbox
            checked={newSpace.climateControlled}
            onCheckedChange={(checked) =>
              onUpdateNewSpace({ climateControlled: checked as boolean })
            }
            className="sr-only"
          />
          <div
            className={cn(
              "w-14 h-14 rounded-full flex items-center justify-center mb-3",
              newSpace.climateControlled ? "bg-primary text-primary-foreground" : "bg-muted"
            )}
          >
            <Thermometer className="h-7 w-7" />
          </div>
          <span className="font-medium">Control de Clima</span>
          <span className="text-xs text-muted-foreground text-center mt-1">
            Temperatura regulada
          </span>
          {newSpace.climateControlled && <Check className="h-5 w-5 text-primary mt-2" />}
        </label>

        <label
          className={cn(
            "flex flex-col items-center p-6 rounded-xl border-2 cursor-pointer transition-all",
            newSpace.securityCamera
              ? "border-primary bg-primary/5"
              : "border-muted hover:border-muted-foreground/30"
          )}
        >
          <Checkbox
            checked={newSpace.securityCamera}
            onCheckedChange={(checked) =>
              onUpdateNewSpace({ securityCamera: checked as boolean })
            }
            className="sr-only"
          />
          <div
            className={cn(
              "w-14 h-14 rounded-full flex items-center justify-center mb-3",
              newSpace.securityCamera ? "bg-primary text-primary-foreground" : "bg-muted"
            )}
          >
            <Shield className="h-7 w-7" />
          </div>
          <span className="font-medium">Seguridad 24/7</span>
          <span className="text-xs text-muted-foreground text-center mt-1">
            Cámaras y vigilancia
          </span>
          {newSpace.securityCamera && <Check className="h-5 w-5 text-primary mt-2" />}
        </label>

        <label
          className={cn(
            "flex flex-col items-center p-6 rounded-xl border-2 cursor-pointer transition-all",
            newSpace.privateEntrance
              ? "border-primary bg-primary/5"
              : "border-muted hover:border-muted-foreground/30"
          )}
        >
          <Checkbox
            checked={newSpace.privateEntrance}
            onCheckedChange={(checked) =>
              onUpdateNewSpace({ privateEntrance: checked as boolean })
            }
            className="sr-only"
          />
          <div
            className={cn(
              "w-14 h-14 rounded-full flex items-center justify-center mb-3",
              newSpace.privateEntrance ? "bg-primary text-primary-foreground" : "bg-muted"
            )}
          >
            <DoorOpen className="h-7 w-7" />
          </div>
          <span className="font-medium">Entrada Privada</span>
          <span className="text-xs text-muted-foreground text-center mt-1">
            Acceso independiente
          </span>
          {newSpace.privateEntrance && <Check className="h-5 w-5 text-primary mt-2" />}
        </label>
      </div>
    </div>
  );
}
