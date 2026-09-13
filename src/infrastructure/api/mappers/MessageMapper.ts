import { Conversation, ChatMessage, MessagesPage } from "@/core/domain/entities/Message";
import { ConversationDto, MessageDto, MessagesPageDto } from "../dtos/message";
import { resolveImageUrl } from "@/infrastructure/utils/imageUrl";

export class MessageMapper {
  static conversationToDomain(dto: ConversationDto): Conversation {
    const space = typeof dto.spaceId === "object"
      ? { title: dto.spaceId.title, image: dto.spaceId.images?.[0] ? resolveImageUrl(dto.spaceId.images[0]) : undefined }
      : undefined;

    return {
      id: dto._id,
      spaceId: typeof dto.spaceId === "object" ? dto.spaceId._id : dto.spaceId,
      space,
      participants: dto.participants.map((p) => ({
        id: p._id,
        name: p.name,
        email: p.email,
        avatar: p.avatar,
      })),
      lastMessageText: dto.lastMessageText,
      lastMessageAt: dto.lastMessageAt ? new Date(dto.lastMessageAt) : undefined,
      createdAt: new Date(dto.createdAt),
    };
  }

  static messageToDomain(dto: MessageDto): ChatMessage {
    return {
      id: dto._id,
      conversationId: dto.conversationId,
      senderId: dto.senderId,
      text: dto.text,
      createdAt: new Date(dto.createdAt),
    };
  }

  static pageToDomain(dto: MessagesPageDto): MessagesPage {
    return {
      data: dto.data.map(MessageMapper.messageToDomain),
      total: dto.total,
      page: dto.page,
      limit: dto.limit,
    };
  }
}
