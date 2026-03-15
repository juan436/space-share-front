export interface ReservationDto {
  _id: string;
  spaceId: string | {
    _id: string;
    title: string;
    images: string[];
    type: string;
    location: { city: string; state: string; country: string };
    pricePerMonth: number;
  };
  clientId: string | {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  hostId: string | {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  startDate: string;
  endDate: string;
  basePrice: number;
  serviceFee: number;
  totalPrice: number;
  status: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReservationRequestDto {
  spaceId: string;
  startDate: string;
  endDate: string;
  basePrice: number;
  serviceFee: number;
  totalPrice: number;
  notes?: string;
}
