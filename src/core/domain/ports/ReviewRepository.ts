import { Review, CreateReviewInput } from "../entities/Review";

export interface ReviewRepository {
  findBySpaceId(spaceId: string): Promise<Review[]>;
  create(input: CreateReviewInput): Promise<Review>;
  delete(reviewId: string): Promise<void>;
}
