export interface Review {
  id: string;
  spaceId: string;
  clientId: string;
  reservationId: string;
  rating: number;
  comment: string;
  client?: {
    name: string;
    email: string;
    avatar?: string;
  };
  createdAt: Date;
}

export interface CreateReviewInput {
  spaceId: string;
  reservationId: string;
  rating: number;
  comment?: string;
}
