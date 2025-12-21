import { SpaceRepository } from "@/core/domain/ports/SpaceRepository";
import { Space, UpdateSpaceInput } from "@/core/domain/entities/Space";
import { NotFoundError } from "@/core/domain/errors";

export class UpdateSpaceUseCase {
  constructor(private readonly spaceRepository: SpaceRepository) {}

  async execute(id: string, input: UpdateSpaceInput): Promise<Space> {
    const existingSpace = await this.spaceRepository.findById(id);
    if (!existingSpace) {
      throw new NotFoundError("Space");
    }

    return this.spaceRepository.update(id, input);
  }
}
