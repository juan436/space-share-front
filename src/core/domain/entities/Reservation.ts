export type ReservationStatus = "pending" | "confirmed" | "completed" | "canceled";

export interface Reservation {
  id: string;
  spaceId: string;
  clientId: string;
  hostId: string;
  startDate: Date;
  endDate: Date;
  totalDays: number;
  pricePerDay: number;
  serviceFee: number;
  totalPrice: number;
  status: ReservationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateReservationInput {
  spaceId: string;
  startDate: Date;
  endDate: Date;
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
