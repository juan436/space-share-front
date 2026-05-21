import { MapPin, Clock } from "lucide-react";
import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import { LocationPicker } from "@/presentation/components/shared/forms/LocationPicker";
import { BusinessSpaceData } from "../../../hooks/useBusinessSpaceForm";

interface LocationSectionProps {
  formData: Pick<BusinessSpaceData, "country" | "state" | "city" | "address" | "availableFrom" | "availableTo">;
  onUpdate: (updates: Partial<BusinessSpaceData>) => void;
}

export function LocationSection({ formData, onUpdate }: LocationSectionProps) {
  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Ubicación</h3>
        </div>
        <LocationPicker
          country={formData.country}
          state={formData.state}
          city={formData.city}
          onChange={(field, value) => onUpdate({ [field]: value })}
        />
        <div className="space-y-2">
          <Label>Dirección completa *</Label>
          <Input
            placeholder="Calle, número, edificio, piso..."
            value={formData.address}
            onChange={(e) => onUpdate({ address: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Horario Disponible</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Desde</Label>
            <Input type="time" value={formData.availableFrom} onChange={(e) => onUpdate({ availableFrom: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Hasta</Label>
            <Input type="time" value={formData.availableTo} onChange={(e) => onUpdate({ availableTo: e.target.value })} />
          </div>
        </div>
      </div>
    </>
  );
}
