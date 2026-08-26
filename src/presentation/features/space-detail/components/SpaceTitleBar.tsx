"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, Share2, Check } from "lucide-react";

interface SpaceTitleBarProps {
  title: string;
  description: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export function SpaceTitleBar({ title, description, isFavorite, onToggleFavorite }: SpaceTitleBarProps) {
  const [shareStatus, setShareStatus] = useState<"idle" | "copied" | "error">("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: description, url: window.location.href });
        return;
      } catch { /* user cancelled */ }
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareStatus("copied");
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setShareStatus("idle"), 2000);
    } catch {
      setShareStatus("error");
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setShareStatus("idle"), 3000);
    }
  };

  return (
    <div className="flex items-start justify-between gap-4">
      <h1 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight leading-tight">
        {title}
      </h1>

      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={handleShare}
          title="Compartir"
          className="flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-semibold text-foreground hover:bg-muted/60 transition-colors"
        >
          {shareStatus === "copied" ? (
            <><Check className="w-5 h-5 text-emerald-600" /><span className="text-emerald-600">Copiado</span></>
          ) : (
            <><Share2 className="w-5 h-5" />Compartir</>
          )}
        </button>

        <button
          onClick={onToggleFavorite}
          title={isFavorite ? "Quitar de favoritos" : "Guardar"}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-semibold hover:bg-muted/60 transition-colors ${
            isFavorite ? "text-rose-600" : "text-foreground"
          }`}
        >
          <Heart className={`w-5 h-5 transition-colors ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`} />
          {isFavorite ? "Guardado" : "Guardar"}
        </button>
      </div>
    </div>
  );
}
