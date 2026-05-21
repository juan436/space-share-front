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

export function checkSpaceAvailability(
  space: Space,
  months: number,
  startDate: Date,
  quantity: number
): boolean {
  const end = new Date(startDate);
  end.setMonth(startDate.getMonth() + months);
  const capacity = space.capacity || 1;
  const msPerDay = 86400000;
  const days = Math.round((end.getTime() - startDate.getTime()) / msPerDay);
  for (let i = 0; i < days; i++) {
    const d = new Date(startDate.getTime() + i * msPerDay);
    const dateStr = d.toISOString().slice(0, 10);
    const occupied = space.occupancyMap?.[dateStr] ?? 0;
    if (occupied + quantity > capacity) return false;
  }
  return true;
}

export function getNextAvailableDate(
  space: Space,
  months: number,
  quantity: number
): Date | null {
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const msPerDay = 86400000;
  for (let i = 0; i < 365; i++) {
    const d = new Date(today.getTime() + i * msPerDay);
    if (checkSpaceAvailability(space, months, d, quantity)) return d;
  }
  return null;
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
