import { ReviewRepository } from "@/core/domain/ports/ReviewRepository";

export class DeleteReviewUseCase {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async execute(reviewId: string): Promise<void> {
    return this.reviewRepository.delete(reviewId);
  }
}
