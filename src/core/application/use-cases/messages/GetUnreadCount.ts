import { MessageRepository } from "@/core/domain/ports/MessageRepository";

export class GetUnreadCountUseCase {
  constructor(private readonly messageRepository: MessageRepository) {}

  async execute(): Promise<{ count: number; conversationIds: string[] }> {
    return this.messageRepository.getUnreadCount();
  }
}
