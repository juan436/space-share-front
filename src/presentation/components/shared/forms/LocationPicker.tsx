import { Label } from "@/presentation/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/presentation/components/ui/select";
import { useLocationData } from "@/presentation/hooks/useLocationData";

interface LocationPickerProps {
  country: string;
  state: string;
  city: string;
  onUpdate: (updates: { country?: string; state?: string; city?: string }) => void;
}

export function LocationPicker({ country, state, city, onUpdate }: LocationPickerProps) {
  const { countries, states, cities } = useLocationData(country, state);

  const handleCountryChange = (value: string) => {
    onUpdate({ country: value, state: "", city: "" });
  };

  const handleStateChange = (value: string) => {
    onUpdate({ state: value, city: "" });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="space-y-1.5">
        <Label className="text-sm font-medium">País <span className="text-destructive">*</span></Label>
        <Select value={country} onValueChange={handleCountryChange}>
          <SelectTrigger className="h-10 rounded-xl border-border/50 bg-white dark:bg-card">
            <SelectValue placeholder="Seleccionar país" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((c) => (
              <SelectItem key={c.code} value={c.name}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-sm font-medium">Estado/Provincia <span className="text-destructive">*</span></Label>
        <Select value={state} onValueChange={handleStateChange} disabled={!country}>
          <SelectTrigger className="h-10 rounded-xl border-border/50 bg-white dark:bg-card">
            <SelectValue placeholder="Seleccionar" />
          </SelectTrigger>
          <SelectContent>
            {states.map((s) => (
              <SelectItem key={s.code} value={s.name}>{s.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-sm font-medium">Ciudad <span className="text-destructive">*</span></Label>
        <Select value={city} onValueChange={(v) => onUpdate({ city: v })} disabled={!state}>
          <SelectTrigger className="h-10 rounded-xl border-border/50 bg-white dark:bg-card">
            <SelectValue placeholder="Seleccionar" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
