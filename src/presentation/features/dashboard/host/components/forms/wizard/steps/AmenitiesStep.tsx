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
      <div className="mb-6 pb-4 border-b border-border/40">
        <h3 className="text-base font-semibold text-foreground">¿Qué ofrece tu espacio?</h3>
        <p className="text-sm text-muted-foreground mt-0.5">Selecciona las comodidades disponibles</p>
      </div>

      <div className="rounded-2xl border border-border/50 bg-muted/20 p-4 space-y-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Selecciona las que apliquen</p>
        {/* Control de Clima */}
        <label className={cn(
          "flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all duration-200",
          "shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.09)]",
          newSpace.climateControlled
            ? "border-border bg-muted/40 dark:bg-muted/20"
            : "border-border/60 bg-white dark:bg-card hover:border-border/80"
        )}>
          <Checkbox
            checked={newSpace.climateControlled}
            onCheckedChange={(checked) => onUpdateNewSpace({ climateControlled: checked as boolean })}
            className="sr-only"
          />
          <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors",
            newSpace.climateControlled ? "bg-blue-100 dark:bg-blue-950/40" : "bg-muted/60"
          )}>
            <Thermometer className={cn("h-5 w-5", newSpace.climateControlled ? "text-blue-600" : "text-muted-foreground")} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">Control de Clima</p>
            <p className="text-xs text-muted-foreground">Temperatura regulada todo el año</p>
          </div>
          {newSpace.climateControlled && <Check className="h-4 w-4 text-primary shrink-0" />}
        </label>

        {/* Seguridad */}
        <label className={cn(
          "flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all duration-200",
          "shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.09)]",
          newSpace.securityCamera
            ? "border-emerald-400/50 bg-emerald-50 dark:bg-emerald-950/20"
            : "border-border/60 bg-white dark:bg-card hover:border-border/80"
        )}>
          <Checkbox
            checked={newSpace.securityCamera}
            onCheckedChange={(checked) => onUpdateNewSpace({ securityCamera: checked as boolean })}
            className="sr-only"
          />
          <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors",
            newSpace.securityCamera ? "bg-emerald-100 dark:bg-emerald-950/40" : "bg-muted/60"
          )}>
            <Shield className={cn("h-5 w-5", newSpace.securityCamera ? "text-emerald-600" : "text-muted-foreground")} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">Seguridad 24/7</p>
            <p className="text-xs text-muted-foreground">Cámaras y vigilancia permanente</p>
          </div>
          {newSpace.securityCamera && <Check className="h-4 w-4 text-emerald-600 shrink-0" />}
        </label>

        {/* Entrada Privada */}
        <label className={cn(
          "flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all duration-200",
          "shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.09)]",
          newSpace.privateEntrance
            ? "border-violet-400/50 bg-violet-50 dark:bg-violet-950/20"
            : "border-border/60 bg-white dark:bg-card hover:border-border/80"
        )}>
          <Checkbox
            checked={newSpace.privateEntrance}
            onCheckedChange={(checked) => onUpdateNewSpace({ privateEntrance: checked as boolean })}
            className="sr-only"
          />
          <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors",
            newSpace.privateEntrance ? "bg-violet-100 dark:bg-violet-950/40" : "bg-muted/60"
          )}>
            <DoorOpen className={cn("h-5 w-5", newSpace.privateEntrance ? "text-violet-600" : "text-muted-foreground")} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">Entrada Privada</p>
            <p className="text-xs text-muted-foreground">Acceso independiente exclusivo</p>
          </div>
          {newSpace.privateEntrance && <Check className="h-4 w-4 text-violet-600 shrink-0" />}
        </label>
      </div>
    </div>
  );
}
