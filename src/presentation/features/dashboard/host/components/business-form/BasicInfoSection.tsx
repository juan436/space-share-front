import { FileText, Users, Ruler } from "lucide-react";
import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import { Textarea } from "@/presentation/components/ui/textarea";
import { BusinessSpaceData } from "../../hooks/useBusinessSpaceForm";

interface BasicInfoSectionProps {
  formData: Pick<BusinessSpaceData, "title" | "description" | "maxCapacity" | "squareMeters">;
  onUpdate: (updates: Partial<BusinessSpaceData>) => void;
}

export function BasicInfoSection({ formData, onUpdate }: BasicInfoSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Información Básica</h3>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título del espacio *</Label>
          <Input
            id="title"
            placeholder="Ej: Oficina moderna en zona empresarial"
            value={formData.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Descripción *</Label>
          <Textarea
            id="description"
            placeholder="Describe las características del espacio, ambiente, ventajas..."
            value={formData.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            className="min-h-[100px]"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="capacity" className="flex items-center gap-1">
              <Users className="h-4 w-4" /> Capacidad máxima *
            </Label>
            <Input
              id="capacity"
              type="number"
              min="1"
              placeholder="Personas"
              value={formData.maxCapacity || ""}
              onChange={(e) => onUpdate({ maxCapacity: Number(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sqm" className="flex items-center gap-1">
              <Ruler className="h-4 w-4" /> Superficie (m²) *
            </Label>
            <Input
              id="sqm"
              type="number"
              min="1"
              placeholder="m²"
              value={formData.squareMeters || ""}
              onChange={(e) => onUpdate({ squareMeters: Number(e.target.value) })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
