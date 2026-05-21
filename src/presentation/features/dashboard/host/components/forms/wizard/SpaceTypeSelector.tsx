import { Home, Building2 } from "lucide-react";

export type SpaceMode = "normal" | "business" | null;

interface SpaceTypeSelectorProps {
  onSelectMode: (mode: SpaceMode) => void;
}

export function SpaceTypeSelector({ onSelectMode }: SpaceTypeSelectorProps) {
  return (
    <>
      <div className="flex-1 p-6 flex flex-col items-center justify-center">
        <p className="text-muted-foreground text-center mb-8 max-w-md">
          Selecciona el tipo de espacio que mejor se adapte a lo que deseas ofrecer
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
          {/* Espacio Normal */}
          <button
            onClick={() => onSelectMode("normal")}
            className="group flex flex-col items-center p-8 rounded-2xl border-2 border-muted hover:border-primary hover:bg-primary/5 transition-all"
          >
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
              <Home className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Espacio Normal</h3>
            <p className="text-sm text-muted-foreground text-center">
              Ideal para personas que desean guardar sus cosas de manera personal. 
              Garajes, bodegas, habitaciones extra.
            </p>
          </button>

          {/* Espacio Empresarial */}
          <button
            onClick={() => onSelectMode("business")}
            className="group flex flex-col items-center p-8 rounded-2xl border-2 border-muted hover:border-primary hover:bg-primary/5 transition-all"
          >
            <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
              <Building2 className="h-10 w-10 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Espacio Empresarial</h3>
            <p className="text-sm text-muted-foreground text-center">
              Para espacios corporativos en el marketplace. 
              Oficinas, locales, bodegas comerciales, salas de reuniones.
            </p>
          </button>
        </div>
      </div>
    </>
  );
}
