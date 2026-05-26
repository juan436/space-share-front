import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/presentation/components/ui/select";
import { MapPin } from "lucide-react";
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
    <div className="space-y-5 animate-in fade-in duration-300">
      <div className="pb-4 border-b border-border/40">
        <h3 className="text-base font-semibold text-foreground">¿Dónde está ubicado?</h3>
        <p className="text-sm text-muted-foreground mt-0.5">Indica la ubicación exacta de tu espacio</p>
      </div>

      {/* Sección 1: Región */}
      <div className="rounded-2xl border border-border/50 bg-muted/20 p-4 space-y-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Región</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">País <span className="text-destructive">*</span></Label>
            <Select value={newSpace.country} onValueChange={onCountryChange}>
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
            <Select value={newSpace.state} onValueChange={onStateChange} disabled={!newSpace.country}>
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
            <Select value={newSpace.city} onValueChange={(v) => onUpdateNewSpace({ city: v })} disabled={!newSpace.state}>
              <SelectTrigger className="h-10 rounded-xl border-border/50 bg-white dark:bg-card">
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
      </div>

      {/* Sección 2: Dirección */}
      <div className="rounded-2xl border border-border/50 bg-muted/20 p-4 space-y-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Dirección exacta</p>

        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Dirección completa <span className="text-destructive">*</span></Label>
          <Input
            placeholder="Calle, número, colonia, referencias..."
            value={newSpace.address}
            onChange={(e) => onUpdateNewSpace({ address: e.target.value })}
            className="h-10 rounded-xl border-border/50 bg-white dark:bg-card focus-visible:ring-primary/20"
          />
        </div>

        <div className="rounded-xl bg-muted/40 border border-border/40 h-36 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <MapPin className="h-7 w-7 mx-auto mb-1.5 opacity-30" />
            <p className="text-xs">Vista previa del mapa</p>
          </div>
        </div>
      </div>
    </div>
  );
}
