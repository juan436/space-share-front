import { PaymentRepository, InitiatePaymentInput, InitiatePaymentOutput } from "@/core/domain/ports/PaymentRepository";

export class InitiatePaymentUseCase {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async execute(input: InitiatePaymentInput): Promise<InitiatePaymentOutput> {
    return this.paymentRepository.initiate(input);
  }
}
