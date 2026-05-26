import { Checkbox } from "@/presentation/components/ui/checkbox";
import { Thermometer, Shield, DoorOpen } from "lucide-react";
import { NewSpaceFormData } from "@/presentation/types/spaces";
import { cn } from "@/presentation/utils/cn";

interface AmenitiesStepProps {
  newSpace: NewSpaceFormData;
  onUpdateNewSpace: (updates: Partial<NewSpaceFormData>) => void;
}

export function AmenitiesStep({
  newSpace,
  onUpdateNewSpace,
}: AmenitiesStepProps) {
  return (
    <div className="space-y-4">
      <div className="bg-background rounded-xl p-4 border">
        <p className="font-medium">Comodidades</p>
        <p className="text-sm text-muted-foreground">Selecciona las que apliquen</p>
      </div>

      <div className="space-y-3">
        <label
          className={cn(
            "bg-background rounded-xl p-4 border flex items-center justify-between",
            newSpace.climateControlled && "border-border bg-muted/40"
          )}
        >
          <div className="flex items-center gap-3">
            <div className={cn(
              "h-10 w-10 rounded-lg flex items-center justify-center",
              newSpace.climateControlled ? "bg-blue-100 dark:bg-blue-950/40" : "bg-muted/60"
            )}>
              <Thermometer className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Control de clima</p>
              <p className="text-xs text-muted-foreground">Temperatura regulada</p>
            </div>
          </div>
          <Checkbox
            checked={newSpace.climateControlled}
            onCheckedChange={(checked) => onUpdateNewSpace({ climateControlled: checked as boolean })}
          />
        </label>

        <label
          className={cn(
            "bg-background rounded-xl p-4 border flex items-center justify-between",
            newSpace.securityCamera && "border-border bg-muted/40"
          )}
        >
          <div className="flex items-center gap-3">
            <div className={cn(
              "h-10 w-10 rounded-lg flex items-center justify-center",
              newSpace.securityCamera ? "bg-emerald-100 dark:bg-emerald-950/40" : "bg-muted/60"
            )}>
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Seguridad</p>
              <p className="text-xs text-muted-foreground">Cámaras / vigilancia</p>
            </div>
          </div>
          <Checkbox
            checked={newSpace.securityCamera}
            onCheckedChange={(checked) => onUpdateNewSpace({ securityCamera: checked as boolean })}
          />
        </label>

        <label
          className={cn(
            "bg-background rounded-xl p-4 border flex items-center justify-between",
            newSpace.privateEntrance && "border-border bg-muted/40"
          )}
        >
          <div className="flex items-center gap-3">
            <div className={cn(
              "h-10 w-10 rounded-lg flex items-center justify-center",
              newSpace.privateEntrance ? "bg-violet-100 dark:bg-violet-950/40" : "bg-muted/60"
            )}>
              <DoorOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Entrada privada</p>
              <p className="text-xs text-muted-foreground">Acceso independiente</p>
            </div>
          </div>
          <Checkbox
            checked={newSpace.privateEntrance}
            onCheckedChange={(checked) => onUpdateNewSpace({ privateEntrance: checked as boolean })}
          />
        </label>
      </div>
    </div>
  );
}
