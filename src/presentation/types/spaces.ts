import { SpaceType, SpaceStatus, SpaceCategory, ListingType } from "@/core/domain/entities/Space";

export type SpaceTypeValue = SpaceType;
export type SpaceStatusValue = SpaceStatus;
export type SpaceCategoryValue = SpaceCategory;
export type ListingTypeValue = ListingType;

export const listingTypeLabels: Record<ListingTypeValue, string> = {
  lodging: "Hospedaje",
  storage: "Almacenamiento",
  garage: "Garaje",
};

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
  listingType: ListingTypeValue;
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
  listingType: ListingTypeValue;
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
  { value: "basement", label: "Sótano" },
  { value: "attic", label: "Ático" },
  { value: "storage", label: "Almacén" },
  { value: "other", label: "Otro" },
];

export const spaceTypeLabels: Record<SpaceTypeValue, string> = {
  basement: "Sótano",
  attic: "Ático",
  storage: "Almacén",
  other: "Otro",
};


export function calculateRecommendedPriceForUI(squareMeters: number): number {
  const basePrice = 5;
  return Math.round(squareMeters * basePrice);
}
