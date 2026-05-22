import { PaymentRepository, InitiatePaymentInput, InitiatePaymentOutput } from "@/core/domain/ports/PaymentRepository";
import { HttpClient } from "@/infrastructure/http/HttpClient";

export class ApiPaymentRepository implements PaymentRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async initiate(input: InitiatePaymentInput): Promise<InitiatePaymentOutput> {
    const response = await this.httpClient.post<InitiatePaymentOutput>("/payments/initiate", input);
    return response.data;
  }
}
