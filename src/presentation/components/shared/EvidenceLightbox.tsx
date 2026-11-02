"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/presentation/components/ui/dialog";

interface EvidenceLightboxProps {
  photos: string[];
  index: number | null;
  onIndexChange: (index: number | null) => void;
}

export function EvidenceLightbox({ photos, index, onIndexChange }: EvidenceLightboxProps) {
  const open = index !== null;
  const current = index ?? 0;
  const go = (delta: number) => onIndexChange((current + delta + photos.length) % photos.length);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onIndexChange(null)}>
      <DialogContent className="max-w-4xl p-3 bg-black/95 border-none">
        <DialogTitle className="sr-only">Evidencia</DialogTitle>
        {open && (
          <div className="relative flex items-center justify-center">
            <img src={photos[current]} alt={`Evidencia ${current + 1}`} className="max-h-[80vh] w-auto rounded-lg object-contain" />
            {photos.length > 1 && (
              <>
                <button type="button" onClick={() => go(-1)} aria-label="Anterior" className="absolute left-2 p-2 rounded-full bg-white/90 shadow-lg">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button type="button" onClick={() => go(1)} aria-label="Siguiente" className="absolute right-2 p-2 rounded-full bg-white/90 shadow-lg">
                  <ChevronRight className="w-5 h-5" />
                </button>
                <span className="absolute bottom-2 px-2.5 py-1 rounded-full bg-black/60 text-white text-xs font-semibold">
                  {current + 1} / {photos.length}
                </span>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
