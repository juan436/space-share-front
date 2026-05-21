export interface ReviewDto {
  _id: string;
  spaceId: string;
  clientId: string | { _id: string; name: string; email: string; avatar?: string };
  reservationId: string;
  rating: number;
  comment: string;
  createdAt: string;
}
