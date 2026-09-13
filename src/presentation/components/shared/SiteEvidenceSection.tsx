"use client";

import { useRef, useState } from "react";
import { Camera, Upload, Loader2, Lock } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/presentation/components/ui/button";
import { Reservation, EvidenceStage } from "@/core/domain/entities/Reservation";

interface SiteEvidenceSectionProps {
  reservation: Reservation;
  currentUserId?: string;
  onSubmit: (stage: EvidenceStage, photos: File[], note: string) => Promise<unknown>;
  isSubmitting: boolean;
}

const STAGE_LABEL: Record<EvidenceStage, string> = {
  checkIn: "Al inicio",
  checkOut: "Al final",
};

function EvidenceBlock({
  stage, reservation, currentUserId, onSubmit, isSubmitting,
}: SiteEvidenceSectionProps & { stage: EvidenceStage }) {
  const entry = reservation.siteEvidence?.[stage];
  const canSubmit = reservation.status === "confirmed" || reservation.status === "completed";
  const [files, setFiles] = useState<File[]>([]);
  const [note, setNote] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  if (entry) {
    const isMine = entry.submittedBy === currentUserId;
    return (
      <div className="rounded-xl border border-border/40 p-3 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-foreground">{STAGE_LABEL[stage]}</p>
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Lock className="w-3 h-3" />
            {isMine ? "Enviado por ti" : "Enviado por la otra parte"} · {format(entry.submittedAt, "d MMM, HH:mm", { locale: es })}
          </span>
        </div>
        {entry.photos.length > 0 && (
          <div className="grid grid-cols-4 gap-1.5">
            {entry.photos.map((url) => (
              <img key={url} src={url} alt="Evidencia" className="w-full aspect-square object-cover rounded-lg" />
            ))}
          </div>
        )}
        {entry.note && <p className="text-xs text-muted-foreground">{entry.note}</p>}
      </div>
    );
  }

  if (!canSubmit) {
    return (
      <div className="rounded-xl border border-dashed border-border/40 p-3">
        <p className="text-xs font-semibold text-muted-foreground">{STAGE_LABEL[stage]}</p>
        <p className="text-[11px] text-muted-foreground/70 mt-0.5">Disponible cuando la reserva esté confirmada</p>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (files.length === 0) return;
    await onSubmit(stage, files, note);
    setFiles([]);
    setNote("");
  };

  return (
    <div className="rounded-xl border border-border/40 p-3 space-y-2">
      <p className="text-xs font-semibold text-foreground">{STAGE_LABEL[stage]}</p>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-full flex flex-col items-center gap-1 py-4 rounded-lg border border-dashed border-border/50 hover:border-primary/40 transition-colors"
      >
        <Upload className="w-4 h-4 text-muted-foreground" />
        <span className="text-[11px] text-muted-foreground">{files.length > 0 ? `${files.length} foto(s) seleccionada(s)` : "Subir fotos"}</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        multiple
        className="hidden"
        onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
      />
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Nota corta (opcional)"
        className="w-full h-16 p-2 rounded-lg border border-border/50 bg-background text-xs resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      <Button size="sm" className="w-full rounded-lg" disabled={files.length === 0 || isSubmitting} onClick={handleSubmit}>
        {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Enviar evidencia"}
      </Button>
    </div>
  );
}

export function SiteEvidenceSection(props: SiteEvidenceSectionProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
        <Camera className="w-3.5 h-3.5" /> Estado del espacio
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <EvidenceBlock {...props} stage="checkIn" />
        <EvidenceBlock {...props} stage="checkOut" />
      </div>
    </div>
  );
}
