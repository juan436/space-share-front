"use client";

import { Camera } from "lucide-react";
import { EvidenceStageCard } from "@/presentation/components/shared/EvidenceStageCard";
import { EvidenceUploadBox } from "@/presentation/components/shared/EvidenceUploadBox";
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

export function SiteEvidenceSection({ reservation, currentUserId, onSubmit, isSubmitting }: SiteEvidenceSectionProps) {
  return (
    <div className="space-y-3">
      <p className="text-base font-bold text-foreground flex items-center gap-2">
        <Camera className="w-5 h-5 text-primary" /> Estado del espacio
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-start">
        {STAGES.map((stage) => {
          const entry = reservation.siteEvidence?.[stage];
          return entry ? (
            <EvidenceStageCard key={stage} title={STAGE_LABEL[stage]} entry={entry} isMine={entry.submittedBy === currentUserId} />
          ) : (
            <EvidenceUploadBox
              key={stage}
              stage={stage}
              title={STAGE_LABEL[stage]}
              reservation={reservation}
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
            />
          );
        })}
      </div>
    </div>
  );
}
