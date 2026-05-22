export type PaymentStatus = "PENDING" | "APPROVED" | "DECLINED" | "ERROR";

export interface PaymentTransaction {
  id: string;
  reservationId: string;
  wompiTransactionId?: string;
  reference: string;
  amountInCents: number;
  currency: "USD";
  status: PaymentStatus;
  checkoutUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
