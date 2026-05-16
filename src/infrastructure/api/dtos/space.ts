export type SpaceCategoryDto = "normal" | "business";

export interface BusinessServicesDto {
  wifi?: boolean;
  parking?: boolean;
  cafeteria?: boolean;
  printer?: boolean;
  reception?: boolean;
  security?: boolean;
  airConditioning?: boolean;
}

export interface SpaceAmenitiesDto {
  climateControlled: boolean;
  securityCamera: boolean;
  privateEntrance: boolean;
}

export interface SpaceLocationDto {
  address: string;
  city: string;
  state: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

export interface SpaceDto {
  _id: string;
  hostId: string | { _id: string; name: string; email: string; avatar?: string };
  title: string;
  description: string;
  type: "garage" | "basement" | "attic" | "storage" | "parking" | "other";
  squareMeters: number;
  pricePerMonth: number;
  capacity: number;
  amenities: SpaceAmenitiesDto;
  location: SpaceLocationDto;
  images: string[];
  status: "active" | "paused" | "pending" | "deactivated";
  rating?: number;
  reviewCount?: number;
  bookingsCount?: number;
  occupancyRate?: number;
  totalEarnings?: number;
  occupancyMap?: Record<string, number>;
  category?: SpaceCategoryDto;
  businessSpaceType?: string;
  pricePerHour?: number;
  availableFrom?: string;
  availableTo?: string;
  usageConditions?: string;
  services?: BusinessServicesDto;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSpaceRequestDto {
  title: string;
  description: string;
  type: "garage" | "basement" | "attic" | "storage" | "parking" | "other";
  squareMeters: number;
  pricePerMonth: number;
  capacity?: number;
  amenities: SpaceAmenitiesDto;
  location: SpaceLocationDto;
  images?: string[];
  category?: SpaceCategoryDto;
  businessSpaceType?: string;
  pricePerHour?: number;
  availableFrom?: string;
  availableTo?: string;
  usageConditions?: string;
  services?: BusinessServicesDto;
}

export interface UpdateSpaceRequestDto {
  title?: string;
  description?: string;
  type?: "garage" | "basement" | "attic" | "storage" | "parking" | "other";
  squareMeters?: number;
  pricePerMonth?: number;
  capacity?: number;
  amenities?: Partial<SpaceAmenitiesDto>;
  location?: Partial<SpaceLocationDto>;
  images?: string[];
  status?: "active" | "paused" | "pending" | "deactivated";
  category?: SpaceCategoryDto;
  businessSpaceType?: string;
  pricePerHour?: number;
  availableFrom?: string;
  availableTo?: string;
  usageConditions?: string;
  services?: BusinessServicesDto;
}

export interface PaginatedSpacesResponseDto {
  data: SpaceDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
