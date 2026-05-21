export type ReservationStatus = "pending" | "accepted" | "awaiting_payment" | "confirmed" | "expired" | "rejected" | "cancelled" | "completed";

export interface Reservation {
  id: string;
  spaceId: string;
  clientId: string;
  hostId: string;
  startDate: Date;
  endDate: Date;
  basePrice: number;
  serviceFee: number;
  totalPrice: number;
  status: ReservationStatus;
  notes: string;
  space?: {
    title: string;
    images: string[];
    type: string;
    location: { city: string; state: string; country: string };
    pricePerMonth: number;
  };
  client?: { name: string; email: string; avatar?: string };
  host?: { name: string; email: string; avatar?: string };
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateReservationInput {
  spaceId: string;
  startDate: string;
  endDate: string;
  basePrice: number;
  serviceFee: number;
  totalPrice: number;
  notes?: string;
}

export const SERVICE_FEE_PERCENTAGE = 0.05;

export function calculateBookingPrice(
  pricePerMonth: number,
  months: number,
  quantity: number
): { totalPrice: number; serviceFee: number; grandTotal: number } {
  const totalPrice = Math.round(pricePerMonth * months * quantity);
  const serviceFee = Math.round(totalPrice * SERVICE_FEE_PERCENTAGE);
  return { totalPrice, serviceFee, grandTotal: totalPrice + serviceFee };
}
