"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { EvidenceLightbox } from "@/presentation/components/shared/EvidenceLightbox";
import { Reservation } from "@/core/domain/entities/Reservation";

type EvidenceEntry = NonNullable<NonNullable<Reservation["siteEvidence"]>["checkIn"]>;

interface EvidenceStageCardProps {
  title: string;
  entry: EvidenceEntry;
  isMine: boolean;
}

export function EvidenceStageCard({ title, entry, isMine }: EvidenceStageCardProps) {
  const [selected, setSelected] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <div className="rounded-2xl border border-border/40 p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-bold text-foreground">{title}</p>
        <span className="flex items-center gap-1 text-xs text-muted-foreground text-right">
          <Lock className="w-3 h-3 shrink-0" />
          {isMine ? "Enviado por ti" : "Enviado por la otra parte"} · {format(entry.submittedAt, "d MMM, HH:mm", { locale: es })}
        </span>
      </div>

      <button type="button" onClick={() => setLightbox(selected)} className="block w-full cursor-zoom-in">
        <img src={entry.photos[selected]} alt={title} className="w-full aspect-[4/3] object-cover rounded-xl" />
      </button>

      {entry.photos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {entry.photos.map((photo, i) => (
            <button
              key={photo}
              type="button"
              onClick={() => setSelected(i)}
              className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden ring-2 transition-all ${i === selected ? "ring-primary" : "ring-transparent opacity-70 hover:opacity-100"}`}
            >
              <img src={photo} alt={`Miniatura ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {entry.note && <p className="text-sm text-muted-foreground">{entry.note}</p>}
      <EvidenceLightbox photos={entry.photos} index={lightbox} onIndexChange={setLightbox} />
    </div>
  );
}
