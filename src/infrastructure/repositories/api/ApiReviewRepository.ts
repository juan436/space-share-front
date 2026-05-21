import { ReviewRepository } from "@/core/domain/ports/ReviewRepository";
import { Review, CreateReviewInput } from "@/core/domain/entities/Review";
import { HttpClient } from "@/infrastructure/http/HttpClient";
import { ReviewMapper } from "@/infrastructure/api/mappers/ReviewMapper";
import { ReviewDto } from "@/infrastructure/api/dtos/review";

export class ApiReviewRepository implements ReviewRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async findBySpaceId(spaceId: string): Promise<Review[]> {
    const res = await this.httpClient.get<ReviewDto[]>(`/reviews/space/${spaceId}`);
    return res.data.map(ReviewMapper.toDomain);
  }

  async create(input: CreateReviewInput): Promise<Review> {
    const res = await this.httpClient.post<ReviewDto>("/reviews", input);
    return ReviewMapper.toDomain(res.data);
  }

  async delete(reviewId: string): Promise<void> {
    await this.httpClient.delete(`/reviews/${reviewId}`);
  }
}
