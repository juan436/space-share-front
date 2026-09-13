import { MessageRepository } from "@/core/domain/ports/MessageRepository";
import { Conversation } from "@/core/domain/entities/Message";

export class ListConversationsUseCase {
  constructor(private readonly messageRepository: MessageRepository) {}

  async execute(): Promise<Conversation[]> {
    return this.messageRepository.listConversations();
  }
}
