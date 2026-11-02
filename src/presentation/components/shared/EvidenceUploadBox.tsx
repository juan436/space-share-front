"use client";

import { useState } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";
import { EvidenceUploadDialog } from "@/presentation/components/shared/EvidenceUploadDialog";
import { Reservation, EvidenceStage } from "@/core/domain/entities/Reservation";

interface EvidenceUploadBoxProps {
  stage: EvidenceStage;
  title: string;
  reservation: Reservation;
  onSubmit: (stage: EvidenceStage, photos: File[], note: string) => Promise<unknown>;
  isSubmitting: boolean;
}

export function EvidenceUploadBox({ stage, title, reservation, onSubmit, isSubmitting }: EvidenceUploadBoxProps) {
  const canSubmit = reservation.status === "confirmed" || reservation.status === "completed";
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-border/40 p-5 flex flex-col items-center text-center gap-3">
      <p className="text-base font-bold text-foreground">{title}</p>
      {canSubmit ? (
        <>
          <Button variant="outline" className="rounded-xl gap-2" onClick={() => setOpen(true)}>
            <Camera className="w-4 h-4" /> Subir fotos
          </Button>
          <EvidenceUploadDialog
            open={open}
            title={title}
            isSubmitting={isSubmitting}
            onClose={() => setOpen(false)}
            onSubmit={(photos, note) => onSubmit(stage, photos, note)}
          />
        </>
      ) : (
        <p className="text-xs text-muted-foreground">Disponible cuando la reserva esté confirmada</p>
      )}
    </div>
  );
}
