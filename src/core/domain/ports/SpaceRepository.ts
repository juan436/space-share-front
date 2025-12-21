import { Space, CreateSpaceInput, UpdateSpaceInput, SpaceType } from "../entities/Space";

export interface SpaceFilters {
  type?: SpaceType;
  minPrice?: number;
  maxPrice?: number;
  climateControlled?: boolean;
  securityCamera?: boolean;
  privateEntrance?: boolean;
  city?: string;
  hostId?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SpaceRepository {
  findAll(filters?: SpaceFilters, page?: number, limit?: number): Promise<PaginatedResult<Space>>;
  findById(id: string): Promise<Space | null>;
  findByHostId(hostId: string): Promise<Space[]>;
  create(input: CreateSpaceInput): Promise<Space>;
  update(id: string, input: UpdateSpaceInput): Promise<Space>;
  delete(id: string): Promise<void>;
}
