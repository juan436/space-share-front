import { BedDouble, Boxes, ArrowRight } from "lucide-react";
import type { ListingTypeValue } from "@/presentation/types/spaces";

interface ListingTypeSelectorProps {
  onSelect: (listingType: ListingTypeValue) => void;
}

export function ListingTypeSelector({ onSelect }: ListingTypeSelectorProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-6">
      <div className="text-center max-w-sm">
        <p className="text-sm text-muted-foreground">
          ¿Qué quieres ofrecer en SpaceShare?
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
        <button
          onClick={() => onSelect("storage")}
          className="group flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-card border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.11)] hover:border-primary/40 transition-all duration-300 text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-muted/60 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
            <Boxes className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">Almacenamiento</p>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              Garajes, bodegas, sótanos y espacios de negocio
            </p>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
        </button>

        <button
          onClick={() => onSelect("lodging")}
          className="group flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-card border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.11)] hover:border-violet-400/40 transition-all duration-300 text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-muted/60 flex items-center justify-center shrink-0 group-hover:bg-violet-500/10 transition-colors">
            <BedDouble className="h-6 w-6 text-violet-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">Hospedaje</p>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              Una habitación, apartamento o casa para que alguien se quede
            </p>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-violet-600 group-hover:translate-x-0.5 transition-all shrink-0" />
        </button>
      </div>
    </div>
  );
}
