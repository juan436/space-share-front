"use client";

import { CheckCircle2, XCircle, X } from "lucide-react";
import { cn } from "@/presentation/utils/cn";

export interface PaymentResultBannerProps {
  status: "APPROVED" | "DECLINED";
  reason?: string;
  onDismiss: () => void;
}

export function PaymentResultBanner({ status, reason, onDismiss }: PaymentResultBannerProps) {
  const isApproved = status === "APPROVED";

  return (
    <div
      className={cn(
        "relative flex items-start gap-3 rounded-2xl border p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] animate-in fade-in slide-in-from-top-1 duration-300",
        isApproved
          ? "border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/10"
          : "border-destructive/25 bg-destructive/5 dark:border-destructive/30 dark:bg-destructive/10"
      )}
    >
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
          isApproved
            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
            : "bg-destructive/15 text-destructive"
        )}
      >
        {isApproved ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
      </div>

      <div className="min-w-0 flex-1 pt-0.5">
        <p className="text-sm font-semibold text-foreground">
          {isApproved ? "Pago aprobado" : "Pago no aprobado"}
        </p>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {isApproved
            ? "Tu reservación ha sido confirmada."
            : reason
              ? `El banco rechazó la transacción: ${reason}.`
              : "El pago fue rechazado. Intenta de nuevo o usa otro método de pago."}
        </p>
      </div>

      <button
        onClick={onDismiss}
        aria-label="Cerrar"
        className="shrink-0 rounded-lg p-1 text-muted-foreground/50 transition-colors hover:bg-muted/60 hover:text-foreground"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
