import { SpaceRepository } from "@/core/domain/ports/SpaceRepository";

export class UploadSpaceImagesUseCase {
  constructor(private readonly spaceRepository: SpaceRepository) {}

  async execute(files: File[]): Promise<string[]> {
    return this.spaceRepository.uploadImages(files);
  }
}
