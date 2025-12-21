import { SpaceRepository } from "@/core/domain/ports/SpaceRepository";
import { NotFoundError } from "@/core/domain/errors";

export class DeleteSpaceUseCase {
  constructor(private readonly spaceRepository: SpaceRepository) {}

  async execute(id: string): Promise<void> {
    const existingSpace = await this.spaceRepository.findById(id);
    if (!existingSpace) {
      throw new NotFoundError("Space");
    }

    await this.spaceRepository.delete(id);
  }
}
