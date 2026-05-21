import { SpaceRepository } from "@/core/domain/ports/SpaceRepository";
import { Space } from "@/core/domain/entities/Space";

export class FindHostSpacesUseCase {
  constructor(private readonly spaceRepository: SpaceRepository) {}

  async execute(hostId: string): Promise<Space[]> {
    return this.spaceRepository.findByHostId(hostId);
  }
}
