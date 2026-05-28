"use client";

import { CreditCard, User } from "lucide-react";
import { Dialog, DialogContent } from "@/presentation/components/ui/dialog";
import { CheckoutPersonalForm } from "./checkout/CheckoutPersonalForm";
import { CheckoutCardForm } from "./checkout/CheckoutCardForm";
import { useWompiCheckout } from "../hooks/useWompiCheckout";
import Image from "next/image";
import { Reservation } from "@/core/domain/entities/Reservation";

interface WompiCheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservation: Reservation | null;
}

const STEPS = [
  { label: "Datos personales", icon: User },
  { label: "Tarjeta de pago", icon: CreditCard },
];

export function WompiCheckoutModal({ open, onOpenChange, reservation }: WompiCheckoutModalProps) {
  const checkout = useWompiCheckout(reservation);

  const handleClose = () => {
    if (checkout.isSubmitting) return;
    checkout.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[720px] w-[95vw] max-h-[95vh] rounded-2xl p-0 overflow-y-auto gap-0 border border-border/60 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">

        {/* Header */}
        <div className="relative bg-foreground px-6 pt-6 pb-5 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.07]">
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-primary" />
            <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-accent" />
          </div>
          <div className="relative flex items-center justify-between mb-4">
            <Image src="/images/logo-transparent.svg" alt="SpaceShare" width={64} height={64} className="shrink-0" />
            {reservation && (
              <div className="text-right">
                <p className="text-[11px] text-white/40 font-semibold uppercase tracking-wider">Total</p>
                <p className="text-3xl font-bold text-white tracking-tight">${reservation.totalPrice}</p>
              </div>
            )}
          </div>
          {reservation && (
            <div className="relative border-t border-white/10 pt-3">
              <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Espacio</p>
              <p className="text-white/90 font-semibold text-sm mt-0.5 truncate">{reservation.space?.title}</p>
            </div>
          )}
        </div>

        {/* Step indicator */}
        <div className="flex bg-muted/40 border-b border-border/40">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const active = i === checkout.step;
            const done = i < checkout.step;
            return (
              <div key={i} className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold transition-colors ${active ? "text-primary border-b-2 border-primary bg-primary/5" : done ? "text-primary/60" : "text-muted-foreground"}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${active ? "bg-primary text-white" : done ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                  {done ? "✓" : <Icon className="w-3 h-3" />}
                </div>
                {s.label}
              </div>
            );
          })}
        </div>

        {checkout.step === 0 && (
          <CheckoutPersonalForm
            form={checkout.form}
            setField={checkout.setField}
            goToStep={checkout.goToStep}
            onCancel={handleClose}
          />
        )}
        {checkout.step === 1 && (
          <CheckoutCardForm
            form={checkout.form}
            setField={checkout.setField}
            handleCardNumber={checkout.handleCardNumber}
            handleExpiry={checkout.handleExpiry}
            handleCvv={checkout.handleCvv}
            goToStep={checkout.goToStep}
            isSubmitting={checkout.isSubmitting}
            error={checkout.error}
            submit={checkout.submit}
            totalPrice={reservation?.totalPrice}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
