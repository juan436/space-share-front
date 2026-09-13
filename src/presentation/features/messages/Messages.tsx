"use client";

import { useState } from "react";
import { MessageSquare, Send, ArrowLeft, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/presentation/components/ui/button";
import { useMessages } from "./hooks/useMessages";

export function Messages() {
  const {
    conversations, isLoadingConversations,
    activeId, activeConversation, otherParticipant,
    messages, isLoadingMessages, isSending,
    openConversation, backToList, send, currentUserId,
  } = useMessages();
  const [draft, setDraft] = useState("");

  const handleSend = async () => {
    const text = draft;
    setDraft("");
    await send(text);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mensajes</h1>
        <p className="text-sm text-muted-foreground">Comunicación con otros usuarios</p>
      </div>

      <div className="rounded-2xl bg-white dark:bg-card border border-border/60 overflow-hidden" style={{ height: "70vh" }}>
        <div className="flex h-full">
          {/* Lista de conversaciones */}
          <div className={`w-full sm:w-72 border-r border-border/40 flex-col ${activeId ? "hidden sm:flex" : "flex"}`}>
            <div className="flex-1 overflow-y-auto">
              {isLoadingConversations ? (
                <div className="flex justify-center py-8"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>
              ) : conversations.length === 0 ? (
                <div className="text-center py-12 px-4 text-muted-foreground">
                  <MessageSquare className="mx-auto h-10 w-10 mb-3 opacity-40" />
                  <p className="text-sm font-medium">No tienes mensajes</p>
                  <p className="text-xs mt-1">Tus conversaciones aparecerán aquí</p>
                </div>
              ) : (
                conversations.map((c) => {
                  const other = otherParticipant(c);
                  return (
                    <button
                      key={c.id}
                      onClick={() => openConversation(c.id)}
                      className={`w-full text-left p-3 border-b border-border/30 hover:bg-muted/40 transition-colors ${activeId === c.id ? "bg-muted/60" : ""}`}
                    >
                      <p className="text-sm font-semibold text-foreground truncate">{other?.name ?? "Usuario"}</p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{c.space?.title}</p>
                      {c.lastMessageText && (
                        <p className="text-xs text-muted-foreground/80 truncate mt-1">{c.lastMessageText}</p>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Hilo activo */}
          <div className={`flex-1 flex-col ${activeId ? "flex" : "hidden sm:flex"}`}>
            {!activeConversation ? (
              <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
                Selecciona una conversación
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 p-3 border-b border-border/40">
                  <button onClick={backToList} className="sm:hidden p-1 -ml-1 rounded-full hover:bg-muted">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{otherParticipant(activeConversation)?.name ?? "Usuario"}</p>
                    <p className="text-xs text-muted-foreground truncate">{activeConversation.space?.title}</p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {isLoadingMessages ? (
                    <div className="flex justify-center py-6"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>
                  ) : messages.length === 0 ? (
                    <p className="text-center text-sm text-muted-foreground py-6">Escribe el primer mensaje</p>
                  ) : (
                    messages.map((m) => {
                      const isMine = m.senderId === currentUserId;
                      return (
                        <div key={m.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${isMine ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                            <p className="whitespace-pre-wrap break-words">{m.text}</p>
                            <p className={`text-[10px] mt-1 ${isMine ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                              {format(m.createdAt, "d MMM, HH:mm", { locale: es })}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="p-3 border-t border-border/40 flex items-center gap-2">
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                    placeholder="Escribe un mensaje..."
                    className="flex-1 h-10 px-3 rounded-xl border border-border/60 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <Button size="icon" className="rounded-xl h-10 w-10 shrink-0" disabled={!draft.trim() || isSending} onClick={handleSend}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
