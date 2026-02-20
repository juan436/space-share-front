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
  hostId: string;
  title: string;
  description: string;
  type: "garage" | "basement" | "attic" | "storage" | "parking" | "other";
  squareMeters: number;
  pricePerMonth: number;
  amenities: SpaceAmenitiesDto;
  location: SpaceLocationDto;
  images: string[];
  status: "active" | "paused" | "pending";
  rating?: number;
  reviewCount?: number;
  bookingsCount?: number;
  occupancyRate?: number;
  totalEarnings?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSpaceRequestDto {
  title: string;
  description: string;
  type: "garage" | "basement" | "attic" | "storage" | "parking" | "other";
  squareMeters: number;
  pricePerMonth: number;
  amenities: SpaceAmenitiesDto;
  location: SpaceLocationDto;
  images?: string[];
}

export interface UpdateSpaceRequestDto {
  title?: string;
  description?: string;
  type?: "garage" | "basement" | "attic" | "storage" | "parking" | "other";
  squareMeters?: number;
  pricePerMonth?: number;
  amenities?: Partial<SpaceAmenitiesDto>;
  location?: Partial<SpaceLocationDto>;
  images?: string[];
  status?: "active" | "paused" | "pending";
}

export interface PaginatedSpacesResponseDto {
  data: SpaceDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
