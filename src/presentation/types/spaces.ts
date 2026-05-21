import { SpaceType, SpaceStatus, SpaceCategory } from "@/core/domain/entities/Space";

export type SpaceTypeValue = SpaceType;
export type SpaceStatusValue = SpaceStatus;
export type SpaceCategoryValue = SpaceCategory;

export interface BusinessServicesViewModel {
  wifi?: boolean;
  parking?: boolean;
  cafeteria?: boolean;
  printer?: boolean;
  reception?: boolean;
  security?: boolean;
  airConditioning?: boolean;
}

export interface SpaceViewModel {
  id: string;
  title: string;
  description: string;
  type: SpaceTypeValue;
  squareMeters: number;
  pricePerMonth: number;
  capacity: number;
  status: SpaceStatusValue;
  climateControlled: boolean;
  securityCamera: boolean;
  privateEntrance: boolean;
  address: string;
  city: string;
  state: string;
  country: string;
  images: string[];
  category?: SpaceCategoryValue;
  businessSpaceType?: string;
  pricePerHour?: number;
  availableFrom?: string;
  availableTo?: string;
  usageConditions?: string;
  services?: BusinessServicesViewModel;
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


export const VEHICLE_SPACE_TYPES: SpaceTypeValue[] = ["garage", "parking"];

export function isVehicleSpaceType(type: SpaceTypeValue): boolean {
  return VEHICLE_SPACE_TYPES.includes(type);
}

export function calculateRecommendedPriceForUI(squareMeters: number): number {
  const basePrice = 5;
  return Math.round(squareMeters * basePrice);
}
