import { MessageRepository } from "@/core/domain/ports/MessageRepository";
import { Conversation, ChatMessage, MessagesPage } from "@/core/domain/entities/Message";
import { HttpClient } from "@/infrastructure/http/HttpClient";
import { ConversationDto, MessageDto, MessagesPageDto } from "@/infrastructure/api/dtos/message";
import { MessageMapper } from "@/infrastructure/api/mappers/MessageMapper";

export class ApiMessageRepository implements MessageRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async findOrCreateConversation(spaceId: string): Promise<Conversation> {
    const response = await this.httpClient.post<ConversationDto>("/conversations", { spaceId });
    return MessageMapper.conversationToDomain(response.data);
  }

  async listConversations(): Promise<Conversation[]> {
    const response = await this.httpClient.get<ConversationDto[]>("/conversations");
    return response.data.map(MessageMapper.conversationToDomain);
  }

  async getMessages(conversationId: string, page: number = 1): Promise<MessagesPage> {
    const response = await this.httpClient.get<MessagesPageDto>(`/conversations/${conversationId}/messages?page=${page}`);
    return MessageMapper.pageToDomain(response.data);
  }

  async sendMessage(conversationId: string, text: string): Promise<ChatMessage> {
    const response = await this.httpClient.post<MessageDto>(`/conversations/${conversationId}/messages`, { text });
    return MessageMapper.messageToDomain(response.data);
  }

  async getUnreadCount(): Promise<{ count: number; conversationIds: string[] }> {
    const response = await this.httpClient.get<{ count: number; conversationIds: string[] }>("/conversations/unread-count");
    return response.data;
  }
}
