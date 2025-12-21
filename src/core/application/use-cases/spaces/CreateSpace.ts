import { SpaceRepository } from "@/core/domain/ports/SpaceRepository";
import { Space, CreateSpaceInput } from "@/core/domain/entities/Space";
import { ValidationError } from "@/core/domain/errors";

export class CreateSpaceUseCase {
  constructor(private readonly spaceRepository: SpaceRepository) {}

  async execute(input: CreateSpaceInput): Promise<Space> {
    if (!input.title || input.title.trim().length === 0) {
      throw new ValidationError("Title is required");
    }

    if (!input.description || input.description.trim().length === 0) {
      throw new ValidationError("Description is required");
    }

    if (input.squareMeters <= 0) {
      throw new ValidationError("Square meters must be greater than 0");
    }

    if (input.pricePerMonth <= 0) {
      throw new ValidationError("Price per month must be greater than 0");
    }

    return this.spaceRepository.create(input);
  }
}
