export interface ConversationParticipant {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Conversation {
  id: string;
  spaceId: string;
  space?: { title: string; image?: string };
  participants: ConversationParticipant[];
  lastMessageText: string;
  lastMessageAt?: Date;
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  createdAt: Date;
}

export interface MessagesPage {
  data: ChatMessage[];
  total: number;
  page: number;
  limit: number;
}
