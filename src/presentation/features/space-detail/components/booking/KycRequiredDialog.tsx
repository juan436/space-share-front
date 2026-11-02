"use client";

import { ShieldAlert, Clock, XCircle } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/presentation/components/ui/dialog";

type KycStatus = "none" | "pending" | "approved" | "rejected";

const CONTENT = {
  none: {
    icon: ShieldAlert,
    iconClass: "bg-primary/10 text-primary",
    title: "Verifica tu identidad para reservar",
    text: "Es un paso único y rápido: sube tu DUI y una selfie. Así protegemos a anfitriones y clientes.",
    action: "Verificar ahora",
  },
  rejected: {
    icon: XCircle,
    iconClass: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
    title: "Tu verificación fue rechazada",
    text: "Necesitas volver a enviar tus documentos para poder reservar.",
    action: "Volver a enviar",
  },
  pending: {
    icon: Clock,
    iconClass: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
    title: "Tu verificación está en revisión",
    text: "Podrás reservar en cuanto la aprobemos. Te avisaremos cuando esté lista.",
    action: "Ver estado",
  },
  approved: {
    icon: ShieldAlert,
    iconClass: "bg-primary/10 text-primary",
    title: "Verifica tu identidad para reservar",
    text: "Necesitamos confirmar tu identidad antes de continuar.",
    action: "Verificar ahora",
  },
} as const;

interface KycRequiredDialogProps {
  open: boolean;
  status: KycStatus;
  onClose: () => void;
  onGoVerify: () => void;
}

export function KycRequiredDialog({ open, status, onClose, onGoVerify }: KycRequiredDialogProps) {
  const c = CONTENT[status] ?? CONTENT.none;
  const Icon = c.icon;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl p-8">
        <div className="flex flex-col items-center text-center gap-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${c.iconClass}`}>
            <Icon className="w-8 h-8" />
          </div>
          <DialogTitle className="text-xl font-bold">{c.title}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground max-w-xs">{c.text}</DialogDescription>
          <div className="flex flex-col w-full gap-2 pt-2">
            <Button className="h-11 rounded-xl" onClick={onGoVerify}>{c.action}</Button>
            <Button variant="ghost" className="h-11 rounded-xl" onClick={onClose}>Ahora no</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
