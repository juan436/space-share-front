export type SpaceType = "garage" | "basement" | "attic" | "storage" | "parking" | "other";

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
  capacity: number; // Maximum Number of slots/capacity available for rent
  occupancyMap?: Record<string, number>; // Maps 'YYYY-MM-DD' -> number of booked slots
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
}

export function calculateRecommendedPrice(squareMeters: number): number {
  const basePrice = 5;
  return Math.round(squareMeters * basePrice);
}
