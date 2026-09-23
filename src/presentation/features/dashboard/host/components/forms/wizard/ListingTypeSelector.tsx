import { BedDouble, Boxes, Car } from "lucide-react";
import type { ListingTypeValue } from "@/presentation/types/spaces";
import { WizardOptionGrid, WizardOption } from "./WizardOptionGrid";

interface ListingTypeSelectorProps {
  onSelect: (listingType: ListingTypeValue) => void;
}

const OPTIONS: WizardOption<ListingTypeValue>[] = [
  {
    value: "storage",
    label: "Almacenamiento",
    description: "Bodegas, sótanos, áticos y espacios de negocio",
    icon: Boxes,
    accent: "primary",
  },
  {
    value: "lodging",
    label: "Hospedaje",
    description: "Una habitación, apartamento o casa para que alguien se quede",
    icon: BedDouble,
    accent: "violet",
  },
  {
    value: "garage",
    label: "Parqueo",
    description: "Espacio para guardar un vehículo",
    icon: Car,
    accent: "sky",
  },
];

export function ListingTypeSelector({ onSelect }: ListingTypeSelectorProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-7">
      <div className="text-center max-w-sm">
        <p className="text-sm text-muted-foreground">
          ¿Qué quieres ofrecer en SpaceShare?
        </p>
      </div>

      <WizardOptionGrid options={OPTIONS} onSelect={onSelect} columns={3} />
    </div>
  );
}
