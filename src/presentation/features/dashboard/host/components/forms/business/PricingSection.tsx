/**
 * PricingSection
 *
 * Qué hace: Sección 5 del formulario empresarial — precios y condiciones contractuales.
 * Recibe:   formData (BusinessSpaceData), onUpdate callback
 * Genera:   inputs de precio mensual, depósito, duración mínima y términos del contrato
 */
import { DollarSign, FileText } from "lucide-react";
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
    <>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Precio de Alquiler</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Precio mensual ($) *</Label>
            <Input
              type="number"
              min="0"
              placeholder="0"
              value={formData.pricePerMonth || ""}
              onChange={(e) => onUpdate({ pricePerMonth: Number(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label>Precio por hora ($)</Label>
            <Input
              type="number"
              min="0"
              placeholder="0 (opcional)"
              value={formData.pricePerHour || ""}
              onChange={(e) => onUpdate({ pricePerHour: Number(e.target.value) })}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Condiciones de Uso</h3>
        </div>
        <Textarea
          placeholder="Describe las reglas, restricciones, políticas de cancelación..."
          value={formData.usageConditions}
          onChange={(e) => onUpdate({ usageConditions: e.target.value })}
          className="min-h-[80px]"
        />
      </div>
    </>
  );
}
