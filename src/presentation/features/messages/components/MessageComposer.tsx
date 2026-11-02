import { useState } from "react";
import { Send } from "lucide-react";

interface MessageComposerProps {
  isSending: boolean;
  onSend: (text: string) => Promise<void>;
}

export function MessageComposer({ isSending, onSend }: MessageComposerProps) {
  const [draft, setDraft] = useState("");

  const submit = async () => {
    const text = draft.trim();
    if (!text || isSending) return;
    setDraft("");
    await onSend(text);
  };

  return (
    <div className="shrink-0 flex items-end gap-3 px-4 sm:px-6 py-4 border-t border-border/40 bg-white dark:bg-card">
      <textarea
        value={draft}
        rows={1}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        placeholder="Escribe un mensaje..."
        className="flex-1 max-h-32 min-h-11 px-4 py-2.5 rounded-2xl border border-border/60 bg-muted/30 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 [field-sizing:content]"
      />
      <button
        type="button"
        onClick={submit}
        disabled={!draft.trim() || isSending}
        aria-label="Enviar"
        className="h-11 w-11 shrink-0 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40 transition-opacity"
      >
        <Send className="w-4 h-4" />
      </button>
    </div>
  );
}
