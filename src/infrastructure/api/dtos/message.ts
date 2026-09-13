export interface ConversationParticipantDto {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface ConversationDto {
  _id: string;
  spaceId: string | { _id: string; title: string; images: string[] };
  participants: ConversationParticipantDto[];
  lastMessageText: string;
  lastMessageAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MessageDto {
  _id: string;
  conversationId: string;
  senderId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface MessagesPageDto {
  data: MessageDto[];
  total: number;
  page: number;
  limit: number;
}
