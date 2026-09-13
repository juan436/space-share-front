import { MessageRepository } from "@/core/domain/ports/MessageRepository";
import { ChatMessage } from "@/core/domain/entities/Message";

export class SendMessageUseCase {
  constructor(private readonly messageRepository: MessageRepository) {}

  async execute(conversationId: string, text: string): Promise<ChatMessage> {
    return this.messageRepository.sendMessage(conversationId, text);
  }
}
