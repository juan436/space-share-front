import { SpaceRepository } from "@/core/domain/ports/SpaceRepository";
import { Space } from "@/core/domain/entities/Space";

export class FindSpaceByIdUseCase {
  constructor(private readonly spaceRepository: SpaceRepository) {}

  async execute(id: string): Promise<Space | null> {
    return this.spaceRepository.findById(id);
  }
}
