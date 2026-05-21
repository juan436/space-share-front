import { ReviewRepository } from "@/core/domain/ports/ReviewRepository";
import { Review, CreateReviewInput } from "@/core/domain/entities/Review";
import { HttpClient } from "@/infrastructure/http/HttpClient";
import { ReviewMapper, ReviewDto } from "@/infrastructure/api/mappers/ReviewMapper";

export class ApiReviewRepository implements ReviewRepository {
  constructor(private http: HttpClient) {}

  async findBySpaceId(spaceId: string): Promise<Review[]> {
    const res = await this.http.get<ReviewDto[]>(`/reviews/space/${spaceId}`);
    return res.data.map(ReviewMapper.toDomain);
  }

  async create(input: CreateReviewInput): Promise<Review> {
    const res = await this.http.post<ReviewDto>("/reviews", input);
    return ReviewMapper.toDomain(res.data);
  }

  async delete(reviewId: string): Promise<void> {
    await this.http.delete(`/reviews/${reviewId}`);
  }
}
