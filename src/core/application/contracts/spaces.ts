import { Space, CreateSpaceInput, UpdateSpaceInput } from "@/core/domain/entities/Space";
import { SpaceFilters, PaginatedResult } from "@/core/domain/ports/SpaceRepository";

export interface SpacesService {
  listSpaces(filters?: SpaceFilters, page?: number, limit?: number): Promise<PaginatedResult<Space>>;
  getSpaceById(id: string): Promise<Space | null>;
  getHostSpaces(hostId: string): Promise<Space[]>;
  createSpace(input: CreateSpaceInput): Promise<Space>;
  updateSpace(id: string, input: UpdateSpaceInput): Promise<Space>;
  deleteSpace(id: string): Promise<void>;
}
