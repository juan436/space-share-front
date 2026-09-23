import { Home, Building2 } from "lucide-react";
import type { ListingTypeValue } from "@/presentation/types/spaces";
import { WizardOptionGrid, WizardOption } from "./WizardOptionGrid";

export type SpaceMode = "normal" | "business" | null;

interface SpaceTypeSelectorProps {
  listingType: Extract<ListingTypeValue, "storage" | "lodging">;
  onSelectMode: (mode: SpaceMode) => void;
}

const OPTIONS_BY_LISTING_TYPE: Record<"storage" | "lodging", WizardOption<NonNullable<SpaceMode>>[]> = {
  storage: [
    {
      value: "normal",
      label: "Espacio Normal",
      description: "Bodegas, sótanos, áticos y almacenamiento personal",
      icon: Home,
      accent: "primary",
    },
    {
      value: "business",
      label: "Espacio Empresarial",
      description: "Oficinas, locales y bodegas comerciales",
      icon: Building2,
      accent: "violet",
    },
  ],
  lodging: [
    {
      value: "normal",
      label: "Hospedaje Normal",
      description: "Una habitación, apartamento o casa para hospedaje personal",
      icon: Home,
      accent: "primary",
    },
    {
      value: "business",
      label: "Hospedaje Empresarial",
      description: "Para operaciones más grandes, con servicios y precios adicionales",
      icon: Building2,
      accent: "violet",
    },
  ],
};

export function SpaceTypeSelector({ listingType, onSelectMode }: SpaceTypeSelectorProps) {
  const options = OPTIONS_BY_LISTING_TYPE[listingType];
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-7">
      <div className="text-center max-w-sm">
        <p className="text-sm text-muted-foreground">
          Selecciona el tipo de espacio que mejor se adapte a lo que deseas ofrecer
        </p>
      </div>

      <WizardOptionGrid options={options} onSelect={onSelectMode} columns={2} />
    </div>
  );
}
