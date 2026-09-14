"use client";

import { useRef, useState } from "react";
import { Camera, Upload, Loader2, Lock } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/presentation/components/ui/button";
import { EvidencePhotoCarousel } from "@/presentation/components/shared/EvidencePhotoCarousel";
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

const STAGES: EvidenceStage[] = ["checkIn", "checkOut"];

function EvidenceGallery({ reservation, currentUserId }: { reservation: Reservation; currentUserId?: string }) {
  const stagesWithEvidence = STAGES.filter((stage) => reservation.siteEvidence?.[stage]);
  const [activeStage, setActiveStage] = useState<EvidenceStage>(stagesWithEvidence[0] ?? "checkIn");
  const [photoIndex, setPhotoIndex] = useState(0);

  if (stagesWithEvidence.length === 0) return null;

  const entry = reservation.siteEvidence![activeStage] ?? reservation.siteEvidence![stagesWithEvidence[0]]!;
  const isMine = entry.submittedBy === currentUserId;

  const handleTabChange = (stage: EvidenceStage) => {
    setActiveStage(stage);
    setPhotoIndex(0);
  };

  return (
    <div className="rounded-2xl border border-border/40 p-4 space-y-3">
      {stagesWithEvidence.length > 1 && (
        <div className="flex gap-2">
          {stagesWithEvidence.map((stage) => (
            <button
              key={stage}
              type="button"
              onClick={() => handleTabChange(stage)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeStage === stage
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted/70"
              }`}
            >
              Evidencia {STAGE_LABEL[stage].toLowerCase()}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between flex-wrap gap-1.5">
        {stagesWithEvidence.length === 1 && <p className="text-sm font-bold text-foreground">{STAGE_LABEL[activeStage]}</p>}
        <span className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
          <Lock className="w-3.5 h-3.5" />
          {isMine ? "Enviado por ti" : "Enviado por la otra parte"} · {format(entry.submittedAt, "d MMM, HH:mm", { locale: es })}
        </span>
      </div>
      <EvidencePhotoCarousel photos={entry.photos} index={photoIndex} onIndexChange={setPhotoIndex} />
      {entry.note && <p className="text-sm text-muted-foreground">{entry.note}</p>}
    </div>
  );
}

function EvidenceUploadBox({
  stage, reservation, onSubmit, isSubmitting,
}: SiteEvidenceSectionProps & { stage: EvidenceStage }) {
  const canSubmit = reservation.status === "confirmed" || reservation.status === "completed";
  const [files, setFiles] = useState<File[]>([]);
  const [note, setNote] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  if (!canSubmit) {
    return (
      <div className="rounded-2xl border border-dashed border-border/40 p-4">
        <p className="text-sm font-bold text-muted-foreground">{STAGE_LABEL[stage]}</p>
        <p className="text-xs text-muted-foreground/70 mt-0.5">Disponible cuando la reserva esté confirmada</p>
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
    <div className="rounded-2xl border border-border/40 p-4 space-y-3">
      <p className="text-sm font-bold text-foreground">{STAGE_LABEL[stage]}</p>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-full flex flex-col items-center gap-2 py-8 rounded-xl border border-dashed border-border/50 hover:border-primary/40 hover:bg-primary/[0.03] transition-colors"
      >
        <Upload className="w-6 h-6 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">{files.length > 0 ? `${files.length} foto(s) seleccionada(s)` : "Subir fotos"}</span>
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
        className="w-full h-20 p-3 rounded-xl border border-border/50 bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      <Button className="w-full rounded-xl" disabled={files.length === 0 || isSubmitting} onClick={handleSubmit}>
        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Enviar evidencia"}
      </Button>
    </div>
  );
}

export function SiteEvidenceSection(props: SiteEvidenceSectionProps) {
  const { reservation, currentUserId } = props;
  const pendingStages = STAGES.filter((stage) => !reservation.siteEvidence?.[stage]);

  return (
    <div className="space-y-3">
      <p className="text-base font-bold text-foreground flex items-center gap-2">
        <Camera className="w-5 h-5 text-primary" /> Estado del espacio
      </p>

      <EvidenceGallery reservation={reservation} currentUserId={currentUserId} />

      {pendingStages.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {pendingStages.map((stage) => (
            <EvidenceUploadBox key={stage} stage={stage} {...props} />
          ))}
        </div>
      )}
    </div>
  );
}
