"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, MessageSquare } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/presentation/components/ui/dialog";

interface BookingConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (notes: string) => Promise<void>;
  totalPrice: number;
}

export function BookingConfirmModal({ open, onOpenChange, onConfirm, totalPrice }: BookingConfirmModalProps) {
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      await onConfirm(notes);
      setIsSubmitting(false);
      setIsSuccess(true);
    } catch {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setNotes("");
    setIsSuccess(false);
    setIsSubmitting(false);
    onOpenChange(false);
  };

  if (isSuccess) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[425px] w-11/12 rounded-2xl">
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold">Solicitud enviada</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Tu solicitud de reserva por <b>${totalPrice}</b> ha sido enviada al anfitrión.
              Recibirás una respuesta pronto.
            </p>
            <Button onClick={handleClose} className="mt-4 rounded-xl">
              Entendido
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] w-11/12 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            Solicitar reserva
          </DialogTitle>
          <DialogDescription>
            Escribe un breve mensaje al anfitrión (opcional)
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ej: Hola, me interesa tu espacio para guardar muebles durante 3 meses..."
            className="w-full h-28 p-3 rounded-xl border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            maxLength={500}
          />
          <p className="text-xs text-muted-foreground text-right">{notes.length}/500</p>

          <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50">
            <span className="text-sm font-medium">Total a pagar</span>
            <span className="text-lg font-bold">${totalPrice}</span>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={handleClose} className="flex-1 rounded-xl" disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button onClick={handleConfirm} className="flex-1 rounded-xl font-bold" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Solicitar reserva"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
