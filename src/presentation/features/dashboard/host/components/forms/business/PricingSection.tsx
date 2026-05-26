import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import { Textarea } from "@/presentation/components/ui/textarea";
import { BusinessSpaceData } from "../../../hooks/useBusinessSpaceForm";

interface PricingSectionProps {
  formData: Pick<BusinessSpaceData, "pricePerMonth" | "pricePerHour" | "usageConditions">;
  onUpdate: (updates: Partial<BusinessSpaceData>) => void;
}

export function PricingSection({ formData, onUpdate }: PricingSectionProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border/50 bg-muted/20 p-4 space-y-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Precio de alquiler</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Precio mensual ($) <span className="text-destructive">*</span></Label>
            <Input
              type="number"
              min="0"
              placeholder="0"
              value={formData.pricePerMonth || ""}
              onChange={(e) => onUpdate({ pricePerMonth: Number(e.target.value) })}
              className="h-10 rounded-xl border-border/50 bg-white dark:bg-card focus-visible:ring-primary/20"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Precio por hora ($)</Label>
            <Input
              type="number"
              min="0"
              placeholder="0 (opcional)"
              value={formData.pricePerHour || ""}
              onChange={(e) => onUpdate({ pricePerHour: Number(e.target.value) })}
              className="h-10 rounded-xl border-border/50 bg-white dark:bg-card focus-visible:ring-primary/20"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/50 bg-muted/20 p-4 space-y-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Condiciones de uso</p>
        <Textarea
          placeholder="Describe las reglas, restricciones, políticas de cancelación..."
          value={formData.usageConditions}
          onChange={(e) => onUpdate({ usageConditions: e.target.value })}
          className="min-h-[80px] resize-none rounded-xl border-border/50 bg-white dark:bg-card focus-visible:ring-primary/20"
        />
      </div>
    </div>
  );
}
