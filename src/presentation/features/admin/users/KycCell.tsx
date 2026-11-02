"use client";

import { useState } from "react";
import { ShieldCheck, Clock, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";
import { KycReviewDialog } from "./KycReviewDialog";
import type { AdminUser } from "@/core/domain/entities/AdminStats";

const kycBadge: Record<string, { label: string; className: string; icon: typeof ShieldCheck }> = {
  none: { label: "Sin verificar", className: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400", icon: AlertCircle },
  pending: { label: "En revisión", className: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400", icon: Clock },
  approved: { label: "Verificado", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400", icon: ShieldCheck },
  rejected: { label: "Rechazado", className: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400", icon: XCircle },
};

interface KycCellProps {
  user: AdminUser;
  isReviewing: boolean;
  onReview: (approve: boolean, reason?: string) => Promise<void>;
}

export function KycCell({ user, isReviewing, onReview }: KycCellProps) {
  const [open, setOpen] = useState(false);
  const cfg = kycBadge[user.kycStatus] ?? kycBadge.none;
  const Icon = cfg.icon;
  const hasDocs = Boolean(user.duiImageUrl || user.selfieImageUrl);
  const isPending = user.kycStatus === "pending";

  return (
    <div className="flex items-center gap-2">
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.className}`}>
        <Icon className="w-3 h-3" />{cfg.label}
      </span>
      {hasDocs && (
        <Button size="sm" variant={isPending ? "default" : "outline"} className="h-7 px-3 text-xs rounded-lg" onClick={() => setOpen(true)}>
          {isPending ? "Revisar" : "Ver documentos"}
        </Button>
      )}
      {hasDocs && (
        <KycReviewDialog user={user} open={open} isReviewing={isReviewing} onClose={() => setOpen(false)} onReview={onReview} />
      )}
    </div>
  );
}
