import { PaymentRepository, InitiateCheckoutInput, InitiateCheckoutOutput } from "@/core/domain/ports/PaymentRepository";

export class InitiateDirectPaymentUseCase {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async execute(input: InitiateCheckoutInput): Promise<InitiateCheckoutOutput> {
    return this.paymentRepository.initiateCheckout(input);
  }
}
