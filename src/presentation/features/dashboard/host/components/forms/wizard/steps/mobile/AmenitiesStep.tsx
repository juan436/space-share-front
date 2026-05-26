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
    <div className="space-y-4">
      <div className="bg-white dark:bg-card rounded-2xl border border-border/50 p-4 space-y-3 shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Selecciona las que apliquen</p>

        {/* Clima */}
        <label className={cn(
          "flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all duration-200",
          "shadow-[0_1px_3px_rgba(0,0,0,0.05)]",
          newSpace.climateControlled
            ? "border-border bg-muted/40 dark:bg-muted/20"
            : "border-border/60 bg-white dark:bg-card hover:border-border/80"
        )}>
          <div className="flex items-center gap-3">
            <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center shrink-0 transition-colors",
              newSpace.climateControlled ? "bg-blue-100 dark:bg-blue-950/40" : "bg-muted/60"
            )}>
              <Thermometer className={cn("h-4 w-4", newSpace.climateControlled ? "text-blue-600" : "text-muted-foreground")} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Control de clima</p>
              <p className="text-xs text-muted-foreground">Temperatura regulada</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {newSpace.climateControlled && <Check className="h-3.5 w-3.5 text-primary" />}
            <Checkbox
              checked={newSpace.climateControlled}
              onCheckedChange={(checked) => onUpdateNewSpace({ climateControlled: checked as boolean })}
            />
          </div>
        </label>

        {/* Seguridad */}
        <label className={cn(
          "flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all duration-200",
          "shadow-[0_1px_3px_rgba(0,0,0,0.05)]",
          newSpace.securityCamera
            ? "border-border bg-muted/40 dark:bg-muted/20"
            : "border-border/60 bg-white dark:bg-card hover:border-border/80"
        )}>
          <div className="flex items-center gap-3">
            <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center shrink-0 transition-colors",
              newSpace.securityCamera ? "bg-emerald-100 dark:bg-emerald-950/40" : "bg-muted/60"
            )}>
              <Shield className={cn("h-4 w-4", newSpace.securityCamera ? "text-emerald-600" : "text-muted-foreground")} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Seguridad</p>
              <p className="text-xs text-muted-foreground">Cámaras / vigilancia</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {newSpace.securityCamera && <Check className="h-3.5 w-3.5 text-emerald-600" />}
            <Checkbox
              checked={newSpace.securityCamera}
              onCheckedChange={(checked) => onUpdateNewSpace({ securityCamera: checked as boolean })}
            />
          </div>
        </label>

        {/* Entrada privada */}
        <label className={cn(
          "flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all duration-200",
          "shadow-[0_1px_3px_rgba(0,0,0,0.05)]",
          newSpace.privateEntrance
            ? "border-border bg-muted/40 dark:bg-muted/20"
            : "border-border/60 bg-white dark:bg-card hover:border-border/80"
        )}>
          <div className="flex items-center gap-3">
            <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center shrink-0 transition-colors",
              newSpace.privateEntrance ? "bg-violet-100 dark:bg-violet-950/40" : "bg-muted/60"
            )}>
              <DoorOpen className={cn("h-4 w-4", newSpace.privateEntrance ? "text-violet-600" : "text-muted-foreground")} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Entrada privada</p>
              <p className="text-xs text-muted-foreground">Acceso independiente</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {newSpace.privateEntrance && <Check className="h-3.5 w-3.5 text-violet-600" />}
            <Checkbox
              checked={newSpace.privateEntrance}
              onCheckedChange={(checked) => onUpdateNewSpace({ privateEntrance: checked as boolean })}
            />
          </div>
        </label>
      </div>
    </div>
  );
}
