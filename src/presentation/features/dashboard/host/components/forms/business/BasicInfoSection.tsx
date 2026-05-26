import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import { Textarea } from "@/presentation/components/ui/textarea";
import { BusinessSpaceData } from "../../../hooks/useBusinessSpaceForm";

interface BasicInfoSectionProps {
  formData: Pick<BusinessSpaceData, "title" | "description" | "maxCapacity" | "squareMeters">;
  onUpdate: (updates: Partial<BusinessSpaceData>) => void;
}

export function BasicInfoSection({ formData, onUpdate }: BasicInfoSectionProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border/50 bg-muted/20 p-4 space-y-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Información básica</p>

        <div className="space-y-1.5">
          <Label htmlFor="title" className="text-sm font-medium">Título del espacio <span className="text-destructive">*</span></Label>
          <Input
            id="title"
            placeholder="Ej: Oficina moderna en zona empresarial"
            value={formData.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            className="h-10 rounded-xl border-border/50 bg-white dark:bg-card focus-visible:ring-primary/20"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="description" className="text-sm font-medium">Descripción <span className="text-destructive">*</span></Label>
          <Textarea
            id="description"
            placeholder="Describe las características del espacio, ambiente, ventajas..."
            value={formData.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            className="min-h-[90px] resize-none rounded-xl border-border/50 bg-white dark:bg-card focus-visible:ring-primary/20"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-border/50 bg-muted/20 p-4 space-y-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Dimensiones</p>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="capacity" className="text-sm font-medium">Capacidad máxima <span className="text-destructive">*</span></Label>
            <Input
              id="capacity"
              type="number"
              min="1"
              placeholder="Personas"
              value={formData.maxCapacity || ""}
              onChange={(e) => onUpdate({ maxCapacity: Number(e.target.value) })}
              className="h-10 rounded-xl border-border/50 bg-white dark:bg-card focus-visible:ring-primary/20"
            />
            <p className="text-xs text-muted-foreground">Personas simultáneas</p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sqm" className="text-sm font-medium">Superficie (m²) <span className="text-destructive">*</span></Label>
            <Input
              id="sqm"
              type="number"
              min="1"
              placeholder="m²"
              value={formData.squareMeters || ""}
              onChange={(e) => onUpdate({ squareMeters: Number(e.target.value) })}
              className="h-10 rounded-xl border-border/50 bg-white dark:bg-card focus-visible:ring-primary/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
