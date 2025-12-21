import { SpaceRepository, SpaceFilters, PaginatedResult } from "@/core/domain/ports/SpaceRepository";
import { Space } from "@/core/domain/entities/Space";

export class ListSpacesUseCase {
  constructor(private readonly spaceRepository: SpaceRepository) {}

  async execute(
    filters?: SpaceFilters,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResult<Space>> {
    return this.spaceRepository.findAll(filters, page, limit);
  }
}
