import { PaymentRepository, InitiatePaymentInput, InitiatePaymentOutput, InitiateCheckoutInput, InitiateCheckoutOutput, VerifyCheckoutOutput } from "@/core/domain/ports/PaymentRepository";
import { HttpClient } from "@/infrastructure/http/HttpClient";

export class ApiPaymentRepository implements PaymentRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async initiate(input: InitiatePaymentInput): Promise<InitiatePaymentOutput> {
    const response = await this.httpClient.post<InitiatePaymentOutput>("/payments/initiate", input);
    return response.data;
  }

  async initiateCheckout(input: InitiateCheckoutInput): Promise<InitiateCheckoutOutput> {
    const response = await this.httpClient.post<InitiateCheckoutOutput>("/payments/initiate-checkout", input);
    return response.data;
  }

  async verifyCheckout(transactionId: string): Promise<VerifyCheckoutOutput> {
    const response = await this.httpClient.get<VerifyCheckoutOutput>(`/payments/verify-checkout/${transactionId}`);
    return response.data;
  }
}
