import { PaymentRepository, VerifyCheckoutOutput } from "@/core/domain/ports/PaymentRepository";

export class VerifyCheckoutUseCase {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async execute(transactionId: string): Promise<VerifyCheckoutOutput> {
    return this.paymentRepository.verifyCheckout(transactionId);
  }
}
