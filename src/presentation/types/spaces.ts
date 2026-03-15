export type SpaceTypeValue = "garage" | "parking" | "basement" | "attic" | "storage" | "other";
export type SpaceStatusValue = "active" | "paused" | "pending" | "deactivated";

export interface SpaceViewModel {
  id: string;
  title: string;
  description: string;
  type: SpaceTypeValue;
  squareMeters: number;
  pricePerMonth: number;
  status: SpaceStatusValue;
  climateControlled: boolean;
  securityCamera: boolean;
  privateEntrance: boolean;
  address: string;
  city: string;
  state: string;
  country: string;
}

export interface NewSpaceFormData {
  title: string;
  description: string;
  type: SpaceTypeValue;
  squareMeters: number;
  pricePerMonth: number;
  capacity: number;
  climateControlled: boolean;
  securityCamera: boolean;
  privateEntrance: boolean;
  address: string;
  city: string;
  state: string;
  country: string;
  images?: string[];
}

export interface SpaceTypeOption {
  value: SpaceTypeValue;
  label: string;
}

export const spaceTypeOptions: SpaceTypeOption[] = [
  { value: "garage", label: "Garaje" },
  { value: "parking", label: "Parking" },
  { value: "basement", label: "Sótano" },
  { value: "attic", label: "Ático" },
  { value: "storage", label: "Almacén" },
  { value: "other", label: "Otro" },
];

export const spaceTypeLabels: Record<SpaceTypeValue, string> = {
  garage: "Garaje",
  parking: "Parking",
  basement: "Sótano",
  attic: "Ático",
  storage: "Almacén",
  other: "Otro",
};

export const getStatusColor = (status: SpaceStatusValue): string => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "paused":
      return "bg-yellow-100 text-yellow-800";
    case "pending":
      return "bg-blue-100 text-blue-800";
    case "deactivated":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getStatusLabel = (status: SpaceStatusValue): string => {
  switch (status) {
    case "active":
      return "Activo";
    case "paused":
      return "Pausado";
    case "pending":
      return "Pendiente";
    case "deactivated":
      return "Desactivado";
    default:
      return status;
  }
};

export const VEHICLE_SPACE_TYPES: SpaceTypeValue[] = ["garage", "parking"];

export function isVehicleSpaceType(type: SpaceTypeValue): boolean {
  return VEHICLE_SPACE_TYPES.includes(type);
}

export function calculateRecommendedPriceForUI(squareMeters: number): number {
  const basePrice = 5;
  return Math.round(squareMeters * basePrice);
}
