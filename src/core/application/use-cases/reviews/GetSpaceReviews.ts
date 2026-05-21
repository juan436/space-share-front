import { ReviewRepository } from "@/core/domain/ports/ReviewRepository";
import { Review } from "@/core/domain/entities/Review";

export class GetSpaceReviewsUseCase {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async execute(spaceId: string): Promise<Review[]> {
    return this.reviewRepository.findBySpaceId(spaceId);
  }
}
