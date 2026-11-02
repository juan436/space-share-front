import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { format, isSameDay, isToday, isYesterday } from "date-fns";
import { es } from "date-fns/locale";
import { ChatMessage } from "@/core/domain/entities/Message";

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
  currentUserId?: string;
}

function dayLabel(date: Date): string {
  if (isToday(date)) return "Hoy";
  if (isYesterday(date)) return "Ayer";
  return format(date, "d 'de' MMMM", { locale: es });
}

export function MessageList({ messages, isLoading, currentUserId }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const lastId = messages[messages.length - 1]?.id;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [lastId]);

  if (isLoading && messages.length === 0) {
    return <div className="flex-1 flex justify-center items-center"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>;
  }
  if (messages.length === 0) {
    return <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">Escribe el primer mensaje</div>;
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 bg-muted/30">
      {messages.map((m, i) => {
        const prev = messages[i - 1];
        const isMine = m.senderId === currentUserId;
        const newDay = !prev || !isSameDay(prev.createdAt, m.createdAt);
        const startsGroup = newDay || prev.senderId !== m.senderId;
        return (
          <div key={m.id}>
            {newDay && (
              <div className="flex justify-center my-4">
                <span className="px-3 py-1 rounded-full bg-white dark:bg-card border border-border/50 text-[11px] font-medium text-muted-foreground">
                  {dayLabel(m.createdAt)}
                </span>
              </div>
            )}
            <div className={`flex ${isMine ? "justify-end" : "justify-start"} ${startsGroup ? "mt-3" : "mt-1"}`}>
              <div
                className={`max-w-[80%] sm:max-w-[65%] px-4 py-2.5 text-sm shadow-sm ${
                  isMine
                    ? "bg-primary text-primary-foreground rounded-2xl rounded-br-md"
                    : "bg-white dark:bg-card text-foreground border border-border/50 rounded-2xl rounded-bl-md"
                }`}
              >
                <p className="whitespace-pre-wrap break-words leading-relaxed">{m.text}</p>
                <p className={`text-[10px] mt-1 text-right ${isMine ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {format(m.createdAt, "HH:mm")}
                </p>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
