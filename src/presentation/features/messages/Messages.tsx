"use client";

import Link from "next/link";
import { ArrowLeft, MessageSquare, ExternalLink } from "lucide-react";
import { resolveImageUrl } from "@/presentation/utils/image";
import { useMessages } from "./hooks/useMessages";
import { ConversationList } from "./components/ConversationList";
import { MessageList } from "./components/MessageList";
import { MessageComposer } from "./components/MessageComposer";
import { ChatAvatar } from "./components/ChatAvatar";

export function Messages() {
  const {
    conversations, isLoadingConversations,
    activeId, activeConversation, otherParticipant,
    messages, isLoadingMessages, isSending,
    openConversation, backToList, send, currentUserId,
  } = useMessages();

  const other = activeConversation ? otherParticipant(activeConversation) : undefined;

  return (
    <div>
      <div className="flex rounded-2xl bg-white dark:bg-card border border-border shadow-[0_2px_8px_rgba(0,0,0,0.07)] overflow-hidden h-[calc(100vh-10rem)] min-h-[520px]">
        <aside className={`w-full md:w-80 lg:w-96 md:border-r border-border ${activeId ? "hidden md:block" : "block"}`}>
          <ConversationList
            conversations={conversations}
            isLoading={isLoadingConversations}
            activeId={activeId}
            otherParticipant={otherParticipant}
            onOpen={openConversation}
          />
        </aside>

        <section className={`flex-1 min-w-0 flex-col ${activeId ? "flex" : "hidden md:flex"}`}>
          {!activeConversation ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-2 text-muted-foreground">
              <MessageSquare className="w-10 h-10 opacity-40" />
              <p className="text-sm">Selecciona una conversación</p>
            </div>
          ) : (
            <>
              <header className="shrink-0 flex items-center gap-3 px-4 sm:px-6 py-3.5 border-b border-border bg-white dark:bg-card">
                <button onClick={backToList} aria-label="Volver" className="md:hidden p-1.5 -ml-1.5 rounded-full hover:bg-muted">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <ChatAvatar name={other?.name} src={other?.avatar} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-foreground truncate">{other?.name ?? "Usuario"}</p>
                  <p className="text-xs text-muted-foreground truncate">{activeConversation.space?.title}</p>
                </div>
                <Link
                  href={`/space/${activeConversation.spaceId}`}
                  className="shrink-0 flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full border border-border hover:border-primary/50 hover:bg-primary/[0.04] transition-colors"
                >
                  {activeConversation.space?.image && (
                    <img src={resolveImageUrl(activeConversation.space.image)} alt="" className="w-7 h-7 rounded-full object-cover" />
                  )}
                  <span className="hidden sm:inline text-xs font-semibold text-foreground">Ver espacio</span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>
              </header>
              <MessageList messages={messages} isLoading={isLoadingMessages} currentUserId={currentUserId} />
              <MessageComposer isSending={isSending} onSend={send} />
            </>
          )}
        </section>
      </div>
    </div>
  );
}
