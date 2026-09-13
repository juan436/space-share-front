import { Conversation, ChatMessage, MessagesPage } from "../entities/Message";

export interface MessageRepository {
  findOrCreateConversation(spaceId: string): Promise<Conversation>;
  listConversations(): Promise<Conversation[]>;
  getMessages(conversationId: string, page?: number): Promise<MessagesPage>;
  sendMessage(conversationId: string, text: string): Promise<ChatMessage>;
}
