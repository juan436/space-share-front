export interface InitiatePaymentInput {
  reservationId: string;
  customerEmail: string;
  redirectUrl: string;
}

export interface InitiatePaymentOutput {
  checkoutUrl: string;
  reference: string;
}

export interface InitiateCheckoutInput {
  reservationId: string;
  card: {
    numeroTarjeta: string;
    cvv: string;
    mesVencimiento: number;
    anioVencimiento: number;
  };
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  idRegion: string;
  codigoPostal: string;
  redirectUrl: string;
}

export interface InitiateCheckoutOutput {
  redirectUrl: string;
  transactionId: string;
}

export interface VerifyCheckoutOutput {
  paymentStatus: string;
}

export interface PaymentRepository {
  initiate(input: InitiatePaymentInput): Promise<InitiatePaymentOutput>;
  initiateCheckout(input: InitiateCheckoutInput): Promise<InitiateCheckoutOutput>;
  verifyCheckout(transactionId: string): Promise<VerifyCheckoutOutput>;
}
