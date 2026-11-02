"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ImagePlus, Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/presentation/components/ui/dialog";

const MAX_PHOTOS = 10;
const MAX_MB = 10;

interface EvidenceUploadDialogProps {
  open: boolean;
  title: string;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (photos: File[], note: string) => Promise<unknown>;
}

export function EvidenceUploadDialog({ open, title, isSubmitting, onClose, onSubmit }: EvidenceUploadDialogProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [selected, setSelected] = useState(0);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const previews = useMemo(() => files.map((f) => URL.createObjectURL(f)), [files]);
  useEffect(() => () => previews.forEach((url) => URL.revokeObjectURL(url)), [previews]);

  const addFiles = (list: FileList | null) => {
    const incoming = Array.from(list ?? []);
    const valid = incoming.filter((f) => f.size <= MAX_MB * 1024 * 1024);
    const room = MAX_PHOTOS - files.length;
    setError(valid.length < incoming.length ? `Hay fotos de más de ${MAX_MB} MB que no se agregaron.` : valid.length > room ? `Máximo ${MAX_PHOTOS} fotos.` : "");
    if (files.length === 0) setSelected(0);
    setFiles((prev) => [...prev, ...valid.slice(0, room)]);
  };
  const removeSelected = () => {
    setFiles((prev) => prev.filter((_, i) => i !== selected));
    setSelected((s) => Math.max(0, s - 1));
    setError("");
  };
  const handleSubmit = async () => {
    await onSubmit(files, note);
    setFiles([]);
    setNote("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && !isSubmitting && onClose()}>
      <DialogContent className="flex flex-col w-[calc(100%-2rem)] max-w-xl max-h-[90vh] p-0 gap-0 overflow-hidden rounded-2xl">
        <div className="shrink-0 flex items-center gap-3 px-6 py-4 pr-14 border-b border-border/50">
          <DialogTitle className="text-base font-bold">{title}</DialogTitle>
          <span className="text-sm text-muted-foreground">{files.length}/{MAX_PHOTOS}</span>
        </div>

        <div className="flex-1 min-h-0 min-w-0 overflow-y-auto p-6 space-y-4">
          {files.length === 0 ? (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="w-full flex flex-col items-center gap-3 py-16 rounded-2xl border-2 border-dashed border-border/60 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
            >
              <ImagePlus className="w-9 h-9" />
              <span className="text-sm font-medium">Seleccionar fotos</span>
            </button>
          ) : (
            <>
              <div className="relative rounded-2xl bg-muted/40 overflow-hidden">
                <img src={previews[selected]} alt={`Foto ${selected + 1}`} className="w-full h-72 object-contain" />
                <button
                  type="button"
                  onClick={removeSelected}
                  className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/65 text-white text-xs font-semibold hover:bg-black/80"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Quitar
                </button>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 min-w-0">
                {previews.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setSelected(i)}
                    className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden ring-2 transition-all ${i === selected ? "ring-primary" : "ring-transparent opacity-60 hover:opacity-100"}`}
                  >
                    <img src={src} alt={`Miniatura ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
                {files.length < MAX_PHOTOS && (
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    aria-label="Agregar fotos"
                    className="shrink-0 w-16 h-16 flex items-center justify-center rounded-xl border-2 border-dashed border-border/60 text-muted-foreground hover:border-primary/50 hover:text-primary"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                )}
              </div>
            </>
          )}
          {error && <p className="text-xs text-destructive">{error}</p>}
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png"
            multiple
            className="hidden"
            onChange={(e) => {
              addFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </div>

        {files.length > 0 && (
          <div className="shrink-0 px-6 py-4 border-t border-border/50 space-y-3">
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Añadir una nota (opcional)"
              className="w-full h-11 px-3 rounded-xl border border-border/50 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Button className="w-full h-11 rounded-xl" disabled={isSubmitting} onClick={handleSubmit}>
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : `Enviar ${files.length} foto${files.length > 1 ? "s" : ""}`}
            </Button>
            <p className="text-center text-xs text-muted-foreground">No se puede editar después de enviar</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
