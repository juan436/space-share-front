import { Label } from "@/presentation/components/ui/label";
import { Input } from "@/presentation/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/presentation/components/ui/select";
import { NewSpaceFormData } from "@/presentation/types/spaces";

interface LocationStepProps {
  newSpace: NewSpaceFormData;
  onUpdateNewSpace: (updates: Partial<NewSpaceFormData>) => void;
  countries: any[];
  states: any[];
  cities: any[];
  onCountryChange: (value: string) => void;
  onStateChange: (value: string) => void;
}

export function LocationStep({
  newSpace,
  onUpdateNewSpace,
  countries,
  states,
  cities,
  onCountryChange,
  onStateChange,
}: LocationStepProps) {
  return (
    <div className="space-y-4">
      <div className="bg-background rounded-xl p-4 border">
        <p className="font-medium">Ubicación</p>
        <p className="text-sm text-muted-foreground">Completa los campos para ubicar tu anuncio</p>
      </div>

      <div className="bg-background rounded-xl p-4 border space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">País *</Label>
          <Select value={newSpace.country} onValueChange={onCountryChange}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Seleccionar país" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((c) => (
                <SelectItem key={c.code} value={c.name}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Estado *</Label>
          <Select value={newSpace.state} onValueChange={onStateChange} disabled={!newSpace.country}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              {states.map((s) => (
                <SelectItem key={s.code} value={s.name}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Ciudad *</Label>
          <Select value={newSpace.city} onValueChange={(v) => onUpdateNewSpace({ city: v })} disabled={!newSpace.state}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Dirección *</Label>
          <Input
            placeholder="Calle, número, referencias"
            value={newSpace.address}
            onChange={(e) => onUpdateNewSpace({ address: e.target.value })}
            className="h-11"
          />
        </div>
      </div>
    </div>
  );
}
