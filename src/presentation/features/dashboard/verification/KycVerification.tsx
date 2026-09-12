"use client";

import { useRef, useState } from "react";
import { ShieldCheck, Clock, XCircle, Upload, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";
import { useAuth } from "@/presentation/providers/auth-context";
import { useUseCases } from "@/presentation/providers/usecases-context";
import { toErrorMessage } from "@/presentation/utils/error";

const STATUS_CONFIG = {
  none: { label: "Sin verificar", icon: AlertCircle, className: "bg-muted text-muted-foreground" },
  pending: { label: "En revisión", icon: Clock, className: "bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400" },
  approved: { label: "Verificado", icon: ShieldCheck, className: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400" },
  rejected: { label: "Rechazado", icon: XCircle, className: "bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400" },
};

export function KycVerification() {
  const { user, updateUser } = useAuth();
  const { submitKycUseCase } = useUseCases();
  const [duiFile, setDuiFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const duiInputRef = useRef<HTMLInputElement>(null);
  const selfieInputRef = useRef<HTMLInputElement>(null);

  if (!user) return null;

  const status = STATUS_CONFIG[user.kycStatus] ?? STATUS_CONFIG.none;
  const StatusIcon = status.icon;
  const canSubmit = user.kycStatus === "none" || user.kycStatus === "rejected";

  const handleSubmit = async () => {
    if (!duiFile || !selfieFile) return;
    setError(null);
    setIsSubmitting(true);
    try {
      const updated = await submitKycUseCase.execute(duiFile, selfieFile);
      updateUser(updated);
      setDuiFile(null);
      setSelfieFile(null);
    } catch (err) {
      setError(toErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Verificación de identidad</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Necesitas verificarte para publicar espacios o reservar en SpaceShare.
        </p>
      </div>

      <div className="flex items-center gap-2 p-4 rounded-2xl bg-white dark:bg-card border border-border/60">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${status.className}`}>
          <StatusIcon className="w-3.5 h-3.5" />
          {status.label}
        </span>
        {user.kycStatus === "rejected" && user.kycRejectionReason && (
          <p className="text-sm text-muted-foreground">Motivo: {user.kycRejectionReason}</p>
        )}
      </div>

      {canSubmit && (
        <div className="rounded-2xl bg-white dark:bg-card border border-border/60 p-5 space-y-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Sube tu DUI y una selfie
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => duiInputRef.current?.click()}
              className="flex flex-col items-center gap-2 p-6 rounded-xl border border-dashed border-border/60 hover:border-primary/40 transition-colors"
            >
              <Upload className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium">{duiFile ? duiFile.name : "Foto del DUI"}</span>
            </button>
            <input ref={duiInputRef} type="file" accept="image/jpeg,image/png" className="hidden"
              onChange={(e) => setDuiFile(e.target.files?.[0] ?? null)} />

            <button
              type="button"
              onClick={() => selfieInputRef.current?.click()}
              className="flex flex-col items-center gap-2 p-6 rounded-xl border border-dashed border-border/60 hover:border-primary/40 transition-colors"
            >
              <Upload className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium">{selfieFile ? selfieFile.name : "Selfie"}</span>
            </button>
            <input ref={selfieInputRef} type="file" accept="image/jpeg,image/png" className="hidden"
              onChange={(e) => setSelfieFile(e.target.files?.[0] ?? null)} />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button onClick={handleSubmit} disabled={!duiFile || !selfieFile || isSubmitting} className="w-full rounded-xl">
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Enviar para revisión"}
          </Button>
        </div>
      )}

      {user.kycStatus === "pending" && (
        <p className="text-sm text-muted-foreground">Un admin revisará tus documentos pronto.</p>
      )}
    </div>
  );
}
