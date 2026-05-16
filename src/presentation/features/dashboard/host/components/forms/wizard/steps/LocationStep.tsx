/**
 * LocationStep (desktop)
 *
 * Qué hace: Paso 4 del wizard — captura la ubicación del espacio en selects encadenados.
 * Recibe:   newSpace, onUpdateNewSpace, countries, states, cities (listas precargadas), onCountryChange, onStateChange
 * Genera:   selects en cascada (país → estado → ciudad) + input de dirección + placeholder de mapa
 * Procesa:  selects dependientes: estado deshabilitado sin país, ciudad deshabilitada sin estado
 */
import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/presentation/components/ui/select";
import { MapPin } from "lucide-react";
import { NewSpaceFormData } from "@/presentation/types/spaces";

interface Country {
  code: string;
  name: string;
}

interface State {
  code: string;
  name: string;
}

interface LocationStepProps {
  newSpace: NewSpaceFormData;
  onUpdateNewSpace: (updates: Partial<NewSpaceFormData>) => void;
  countries: Country[];
  states: State[];
  cities: string[];
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
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold">¿Dónde está ubicado?</h3>
        <p className="text-muted-foreground text-sm">Indica la ubicación exacta de tu espacio</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
            <Label className="text-sm font-medium">Estado/Provincia *</Label>
            <Select
              value={newSpace.state}
              onValueChange={onStateChange}
              disabled={!newSpace.country}
            >
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
            <Select
              value={newSpace.city}
              onValueChange={(v) => onUpdateNewSpace({ city: v })}
              disabled={!newSpace.state}
            >
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
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Dirección completa *</Label>
          <Input
            placeholder="Calle, número, colonia, referencias..."
            value={newSpace.address}
            onChange={(e) => onUpdateNewSpace({ address: e.target.value })}
            className="h-11"
          />
        </div>

        {/* Mapa placeholder */}
        <div className="bg-muted rounded-xl h-48 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <MapPin className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">Vista previa del mapa</p>
          </div>
        </div>
      </div>
    </div>
  );
}
