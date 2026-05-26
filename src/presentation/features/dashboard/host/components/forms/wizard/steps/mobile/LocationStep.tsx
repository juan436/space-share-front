import { Label } from "@/presentation/components/ui/label";
import { Input } from "@/presentation/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/presentation/components/ui/select";
import { NewSpaceFormData } from "@/presentation/types/spaces";
import type { Country, State } from "@/presentation/types/location";

interface LocationStepProps {
  newSpace: NewSpaceFormData;
  onUpdateNewSpace: (updates: Partial<NewSpaceFormData>) => void;
  countries: Country[];
  states: State[];
  cities: string[];
  onCountryChange: (value: string) => void;
  onStateChange: (value: string) => void;
}

export function LocationStep({ newSpace, onUpdateNewSpace, countries, states, cities, onCountryChange, onStateChange }: LocationStepProps) {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-card rounded-2xl border border-border/50 p-4 space-y-4 shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Región</p>

        <div className="space-y-1.5">
          <Label className="text-sm font-medium">País <span className="text-destructive">*</span></Label>
          <Select value={newSpace.country} onValueChange={onCountryChange}>
            <SelectTrigger className="h-11 rounded-xl border-border/50 bg-white dark:bg-card">
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
          <Label className="text-sm font-medium">Estado <span className="text-destructive">*</span></Label>
          <Select value={newSpace.state} onValueChange={onStateChange} disabled={!newSpace.country}>
            <SelectTrigger className="h-11 rounded-xl border-border/50 bg-white dark:bg-card">
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
          <Select value={newSpace.city} onValueChange={(v) => onUpdateNewSpace({ city: v })} disabled={!newSpace.state}>
            <SelectTrigger className="h-11 rounded-xl border-border/50 bg-white dark:bg-card">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-white dark:bg-card rounded-2xl border border-border/50 p-4 space-y-4 shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Dirección exacta</p>
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Dirección completa <span className="text-destructive">*</span></Label>
          <Input
            placeholder="Calle, número, referencias"
            value={newSpace.address}
            onChange={(e) => onUpdateNewSpace({ address: e.target.value })}
            className="h-11 rounded-xl border-border/50 bg-white dark:bg-card"
          />
        </div>
      </div>
    </div>
  );
}
