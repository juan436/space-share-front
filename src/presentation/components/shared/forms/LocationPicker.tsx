import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";

interface LocationPickerProps {
  country: string;
  state: string;
  city: string;
  onChange: (field: "country" | "state" | "city", value: string) => void;
}

export function LocationPicker({ country, state, city, onChange }: LocationPickerProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label>País</Label>
        <Input
          placeholder="País"
          value={country}
          onChange={(e) => onChange("country", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>Estado/Provincia</Label>
        <Input
          placeholder="Estado"
          value={state}
          onChange={(e) => onChange("state", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>Ciudad</Label>
        <Input
          placeholder="Ciudad"
          value={city}
          onChange={(e) => onChange("city", e.target.value)}
        />
      </div>
    </div>
  );
}
