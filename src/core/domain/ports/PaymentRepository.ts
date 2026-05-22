export interface InitiatePaymentInput {
  reservationId: string;
  customerEmail: string;
  redirectUrl: string;
}

export interface InitiatePaymentOutput {
  checkoutUrl: string;
  reference: string;
}

export interface PaymentRepository {
  initiate(input: InitiatePaymentInput): Promise<InitiatePaymentOutput>;
}
