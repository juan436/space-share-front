import { MessageSquare, Loader2 } from "lucide-react";
import { format, isToday, isYesterday } from "date-fns";
import { es } from "date-fns/locale";
import { Conversation, ConversationParticipant } from "@/core/domain/entities/Message";
import { ChatAvatar } from "./ChatAvatar";

interface ConversationListProps {
  conversations: Conversation[];
  isLoading: boolean;
  activeId: string | null;
  otherParticipant: (c: Conversation) => ConversationParticipant | undefined;
  onOpen: (id: string) => void;
}

function formatListTime(date?: Date): string {
  if (!date) return "";
  if (isToday(date)) return format(date, "HH:mm");
  if (isYesterday(date)) return "Ayer";
  return format(date, "d MMM", { locale: es });
}

export function ConversationList({ conversations, isLoading, activeId, otherParticipant, onOpen }: ConversationListProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-4 border-b border-border/40">
        <h2 className="text-base font-bold text-foreground">Conversaciones</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center py-10"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>
        ) : conversations.length === 0 ? (
          <div className="text-center py-16 px-6 text-muted-foreground">
            <MessageSquare className="mx-auto h-10 w-10 mb-3 opacity-40" />
            <p className="text-sm font-medium">No tienes mensajes</p>
            <p className="text-xs mt-1">Tus conversaciones aparecerán aquí</p>
          </div>
        ) : (
          conversations.map((c) => {
            const other = otherParticipant(c);
            const active = activeId === c.id;
            return (
              <button
                key={c.id}
                onClick={() => onOpen(c.id)}
                className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors border-l-4 ${
                  active ? "bg-primary/[0.06] border-primary" : "border-transparent hover:bg-muted/40"
                }`}
              >
                <ChatAvatar name={other?.name} src={other?.avatar} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-sm font-semibold text-foreground truncate">{other?.name ?? "Usuario"}</p>
                    <span className="text-[11px] text-muted-foreground shrink-0">{formatListTime(c.lastMessageAt)}</span>
                  </div>
                  <p className="text-xs text-primary/80 font-medium truncate mt-0.5">{c.space?.title}</p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{c.lastMessageText || "Sin mensajes"}</p>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
