import { MessageRepository } from "@/core/domain/ports/MessageRepository";
import { MessagesPage } from "@/core/domain/entities/Message";

export class GetMessagesUseCase {
  constructor(private readonly messageRepository: MessageRepository) {}

  async execute(conversationId: string, page?: number): Promise<MessagesPage> {
    return this.messageRepository.getMessages(conversationId, page);
  }
}
