"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { EvidenceLightbox } from "@/presentation/components/shared/EvidenceLightbox";

interface KycDocumentUploadProps {
  step: number;
  title: string;
  hint: string;
  file: File | null;
  onChange: (file: File | null) => void;
}

export function KycDocumentUpload({ step, title, hint, file, onChange }: KycDocumentUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [viewing, setViewing] = useState<number | null>(null);
  const preview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  return (
    <div className="rounded-2xl bg-white dark:bg-card border border-border/60 p-5 space-y-4">
      <div className="flex items-center gap-3">
        <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">
          {step}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-bold text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">{hint}</p>
        </div>
      </div>

      {preview ? (
        <div className="relative">
          <button type="button" onClick={() => setViewing(0)} aria-label="Ver foto en grande" className="block w-full cursor-zoom-in">
            <img src={preview} alt={title} className="w-full aspect-[4/3] object-cover rounded-xl bg-muted" />
          </button>
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label="Quitar foto"
            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full aspect-[4/3] flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border/60 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
        >
          <ImagePlus className="w-8 h-8" />
          <span className="text-sm font-medium">Subir foto</span>
        </button>
      )}

      {preview && <EvidenceLightbox photos={[preview]} index={viewing} onIndexChange={setViewing} />}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        className="hidden"
        onChange={(e) => {
          onChange(e.target.files?.[0] ?? null);
          e.target.value = "";
        }}
      />
    </div>
  );
}
