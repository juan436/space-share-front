import { SpaceRepository } from "@/core/domain/ports/SpaceRepository";
import { Space } from "@/core/domain/entities/Space";

export class FindSpaceBySlugUseCase {
  constructor(private readonly spaceRepository: SpaceRepository) {}

  async execute(slug: string): Promise<Space | null> {
    return this.spaceRepository.findBySlug(slug);
  }
}
