"use client";

import { useState } from "react";
import { Loader2, Check, X, ImageOff } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/presentation/components/ui/dialog";
import { EvidenceLightbox } from "@/presentation/components/shared/EvidenceLightbox";
import type { AdminUser } from "@/core/domain/entities/AdminStats";

interface KycReviewDialogProps {
  user: AdminUser;
  open: boolean;
  isReviewing: boolean;
  onClose: () => void;
  onReview: (approve: boolean, reason?: string) => Promise<void>;
}

function DocumentCard({ label, src, onOpen }: { label: string; src?: string; onOpen: () => void }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-foreground">{label}</p>
      {src ? (
        <button type="button" onClick={onOpen} aria-label={`Ver ${label} en grande`} className="block w-full cursor-zoom-in">
          <img src={src} alt={label} className="w-full aspect-[4/3] object-cover rounded-xl bg-muted" />
        </button>
      ) : (
        <div className="w-full aspect-[4/3] flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border/60 text-muted-foreground">
          <ImageOff className="w-7 h-7" />
          <span className="text-xs">No se subió</span>
        </div>
      )}
    </div>
  );
}

export function KycReviewDialog({ user, open, isReviewing, onClose, onReview }: KycReviewDialogProps) {
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");
  const [viewing, setViewing] = useState<number | null>(null);
  const isPending = user.kycStatus === "pending";
  const photos = [user.duiImageUrl, user.selfieImageUrl].filter((p): p is string => Boolean(p));

  const openPhoto = (src?: string) => src && setViewing(photos.indexOf(src));
  const close = () => { setRejecting(false); setReason(""); onClose(); };
  const decide = async (approve: boolean) => {
    await onReview(approve, approve ? undefined : reason.trim() || undefined);
    close();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(o) => !o && !isReviewing && close()}>
        <DialogContent className="flex flex-col w-[calc(100%-2rem)] max-w-3xl max-h-[92vh] p-0 gap-0 overflow-hidden rounded-2xl">
          <div className="shrink-0 px-6 py-4 pr-14 border-b border-border/50">
            <DialogTitle className="text-base font-bold">{user.name}</DialogTitle>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <DocumentCard label="DUI" src={user.duiImageUrl} onOpen={() => openPhoto(user.duiImageUrl)} />
              <DocumentCard label="Selfie" src={user.selfieImageUrl} onOpen={() => openPhoto(user.selfieImageUrl)} />
            </div>
            {rejecting && (
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Motivo del rechazo (opcional): el usuario lo verá"
                className="w-full h-24 p-3 rounded-xl border border-border/60 bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            )}
          </div>

          {isPending && (
            <div className="shrink-0 flex gap-3 px-6 py-4 border-t border-border/50">
              {rejecting ? (
                <>
                  <Button variant="outline" className="flex-1 h-11 rounded-xl" disabled={isReviewing} onClick={() => setRejecting(false)}>
                    Cancelar
                  </Button>
                  <Button className="flex-1 h-11 rounded-xl bg-red-600 hover:bg-red-700 text-white" disabled={isReviewing} onClick={() => decide(false)}>
                    {isReviewing ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirmar rechazo"}
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="flex-1 h-11 rounded-xl gap-2 text-red-600 border-red-200 hover:bg-red-50" disabled={isReviewing} onClick={() => setRejecting(true)}>
                    <X className="w-4 h-4" /> Rechazar
                  </Button>
                  <Button className="flex-1 h-11 rounded-xl gap-2 bg-emerald-600 hover:bg-emerald-700 text-white" disabled={isReviewing} onClick={() => decide(true)}>
                    {isReviewing ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Check className="w-4 h-4" /> Aprobar</>}
                  </Button>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
      <EvidenceLightbox photos={photos} index={viewing} onIndexChange={setViewing} />
    </>
  );
}
