import { MessageRepository } from "@/core/domain/ports/MessageRepository";
import { Conversation } from "@/core/domain/entities/Message";

export class FindOrCreateConversationUseCase {
  constructor(private readonly messageRepository: MessageRepository) {}

  async execute(spaceId: string): Promise<Conversation> {
    return this.messageRepository.findOrCreateConversation(spaceId);
  }
}
