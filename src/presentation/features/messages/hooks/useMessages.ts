import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/presentation/providers/auth-context";
import { useUseCases } from "@/presentation/providers/usecases-context";
import { Conversation, ChatMessage } from "@/core/domain/entities/Message";

const POLL_MS = 4000;

export function useMessages() {
  const { user } = useAuth();
  const { listConversationsUseCase, getMessagesUseCase, sendMessageUseCase } = useUseCases();
  const searchParams = useSearchParams();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(() => searchParams.get("conversationId"));
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const loadConversations = useCallback(async () => {
    const list = await listConversationsUseCase.execute();
    setConversations(list);
    return list;
  }, [listConversationsUseCase]);

  useEffect(() => {
    loadConversations().finally(() => setIsLoadingConversations(false));
  }, [loadConversations]);

  const loadMessages = useCallback(async (conversationId: string) => {
    const page = await getMessagesUseCase.execute(conversationId);
    setMessages(page.data);
  }, [getMessagesUseCase]);

  useEffect(() => {
    if (pollRef.current) clearInterval(pollRef.current);
    if (!activeId) {
      setMessages([]);
      return;
    }
    setIsLoadingMessages(true);
    loadMessages(activeId).finally(() => setIsLoadingMessages(false));
    pollRef.current = setInterval(() => loadMessages(activeId), POLL_MS);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [activeId, loadMessages]);

  const openConversation = (id: string) => setActiveId(id);
  const backToList = () => setActiveId(null);

  const send = async (text: string) => {
    if (!activeId || !text.trim()) return;
    setIsSending(true);
    try {
      await sendMessageUseCase.execute(activeId, text.trim());
      await Promise.all([loadMessages(activeId), loadConversations()]);
    } finally {
      setIsSending(false);
    }
  };

  const activeConversation = conversations.find((c) => c.id === activeId) ?? null;
  const otherParticipant = (c: Conversation) => c.participants.find((p) => p.id !== user?.id);

  return {
    conversations,
    isLoadingConversations,
    activeId,
    activeConversation,
    otherParticipant,
    messages,
    isLoadingMessages,
    isSending,
    openConversation,
    backToList,
    send,
    currentUserId: user?.id,
  };
}
