import { ReviewRepository } from "@/core/domain/ports/ReviewRepository";
import { Review, CreateReviewInput } from "@/core/domain/entities/Review";

export class CreateReviewUseCase {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async execute(input: CreateReviewInput): Promise<Review> {
    return this.reviewRepository.create(input);
  }
}
