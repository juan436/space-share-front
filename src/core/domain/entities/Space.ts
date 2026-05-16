export type SpaceType = "garage" | "basement" | "attic" | "storage" | "parking" | "other";

export type SpaceCategory = "normal" | "business";

export interface BusinessServices {
  wifi?: boolean;
  parking?: boolean;
  cafeteria?: boolean;
  printer?: boolean;
  reception?: boolean;
  security?: boolean;
  airConditioning?: boolean;
}

export type SpaceStatus = "active" | "paused" | "pending" | "deactivated";

export interface SpaceAmenities {
  climateControlled: boolean;
  securityCamera: boolean;
  privateEntrance: boolean;
  access247?: boolean;
}

export interface SpaceLocation {
  address: string;
  city: string;
  state: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

export interface Space {
  id: string;
  hostId: string;
  title: string;
  description: string;
  type: SpaceType;
  squareMeters: number;
  pricePerMonth: number;
  amenities: SpaceAmenities;
  location: SpaceLocation;
  images: string[];
  status: SpaceStatus;
  verified?: boolean;
  rating?: number;
  reviewCount?: number;
  bookingsCount?: number;
  occupancyRate?: number;
  totalEarnings?: number;
  capacity: number;
  occupancyMap?: Record<string, number>;
  category?: SpaceCategory;
  businessSpaceType?: string;
  pricePerHour?: number;
  availableFrom?: string;
  availableTo?: string;
  usageConditions?: string;
  services?: BusinessServices;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSpaceInput {
  hostId: string;
  title: string;
  description: string;
  type: SpaceType;
  capacity: number;
  squareMeters: number;
  pricePerMonth: number;
  amenities: SpaceAmenities;
  location: SpaceLocation;
  images?: string[];
  category?: SpaceCategory;
  businessSpaceType?: string;
  pricePerHour?: number;
  availableFrom?: string;
  availableTo?: string;
  usageConditions?: string;
  services?: BusinessServices;
}

export interface UpdateSpaceInput {
  title?: string;
  description?: string;
  type?: SpaceType;
  capacity?: number;
  squareMeters?: number;
  pricePerMonth?: number;
  amenities?: Partial<SpaceAmenities>;
  location?: Partial<SpaceLocation>;
  images?: string[];
  status?: SpaceStatus;
  category?: SpaceCategory;
  businessSpaceType?: string;
  pricePerHour?: number;
  availableFrom?: string;
  availableTo?: string;
  usageConditions?: string;
  services?: BusinessServices;
}

export function calculateRecommendedPrice(squareMeters: number): number {
  const basePrice = 5;
  return Math.round(squareMeters * basePrice);
}
