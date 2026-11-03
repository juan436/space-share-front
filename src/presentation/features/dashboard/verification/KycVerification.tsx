"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";
import { useAuth } from "@/presentation/providers/auth-context";
import { useUseCases } from "@/presentation/providers/usecases-context";
import { toErrorMessage } from "@/presentation/utils/error";
import { KycStatusBanner } from "./KycStatusBanner";
import { KycDocumentUpload } from "./KycDocumentUpload";
import { KycSteps } from "./KycSteps";

export function KycVerification() {
  const { user, updateUser } = useAuth();
  const { submitKycUseCase } = useUseCases();
  const [duiFile, setDuiFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!user) return null;

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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <div className="lg:col-span-2 space-y-6">
        <KycStatusBanner status={user.kycStatus} rejectionReason={user.kycRejectionReason} />

        {canSubmit && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <KycDocumentUpload step={1} title="Foto de tu DUI" hint="Que se lea claro, sin reflejos" file={duiFile} onChange={setDuiFile} />
              <KycDocumentUpload step={2} title="Selfie" hint="Tu rostro visible y con buena luz" file={selfieFile} onChange={setSelfieFile} />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button onClick={handleSubmit} disabled={!duiFile || !selfieFile || isSubmitting} className="w-full h-12 rounded-xl text-base">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Enviar para revisión"}
            </Button>
          </>
        )}
      </div>

      <KycSteps status={user.kycStatus} />
    </div>
  );
}
