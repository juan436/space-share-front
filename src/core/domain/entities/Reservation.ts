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

export function calculateReservationPrice(
  pricePerMonth: number,
  startDate: Date,
  endDate: Date
): { totalDays: number; pricePerDay: number; subtotal: number; serviceFee: number; total: number } {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const pricePerDay = pricePerMonth / 30;
  const subtotal = pricePerDay * totalDays;
  const serviceFee = subtotal * SERVICE_FEE_PERCENTAGE;
  const total = subtotal + serviceFee;

  return {
    totalDays,
    pricePerDay: Math.round(pricePerDay * 100) / 100,
    subtotal: Math.round(subtotal * 100) / 100,
    serviceFee: Math.round(serviceFee * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
}
