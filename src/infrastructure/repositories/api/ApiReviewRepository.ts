import { ReviewRepository } from "@/core/domain/ports/ReviewRepository";
import { Review, CreateReviewInput } from "@/core/domain/entities/Review";
import { HttpClient } from "@/infrastructure/http/HttpClient";

interface ReviewDto {
  _id: string;
  spaceId: string;
  clientId: string | { _id: string; name: string; email: string; avatar?: string };
  reservationId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

function mapToDomain(dto: ReviewDto): Review {
  const client = typeof dto.clientId === "object" ? {
    name: dto.clientId.name,
    email: dto.clientId.email,
    avatar: dto.clientId.avatar,
  } : undefined;

  return {
    id: dto._id,
    spaceId: typeof dto.spaceId === "string" ? dto.spaceId : dto.spaceId,
    clientId: typeof dto.clientId === "object" ? dto.clientId._id : dto.clientId,
    reservationId: dto.reservationId,
    rating: dto.rating,
    comment: dto.comment,
    client,
    createdAt: new Date(dto.createdAt),
  };
}

export class ApiReviewRepository implements ReviewRepository {
  constructor(private http: HttpClient) {}

  async findBySpaceId(spaceId: string): Promise<Review[]> {
    const res = await this.http.get<ReviewDto[]>(`/reviews/space/${spaceId}`);
    return res.data.map(mapToDomain);
  }

  async create(input: CreateReviewInput): Promise<Review> {
    const res = await this.http.post<ReviewDto>("/reviews", input);
    return mapToDomain(res.data);
  }

  async delete(reviewId: string): Promise<void> {
    await this.http.delete(`/reviews/${reviewId}`);
  }
}
