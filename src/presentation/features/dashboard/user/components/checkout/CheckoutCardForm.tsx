import { CreditCard, Lock, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import { WompiVerifiedBanner } from "@/presentation/components/shared/WompiVerifiedBanner";
import type { CheckoutForm } from "../../hooks/useWompiCheckout";

const INPUT_CLS = "rounded-xl h-11 border-border/60 focus-visible:ring-primary/30 bg-card text-sm";
const LABEL_CLS = "text-xs font-semibold text-foreground/60";

interface CheckoutCardFormProps {
  form: CheckoutForm;
  setField: (field: keyof CheckoutForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleCardNumber: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleExpiry: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCvv: (e: React.ChangeEvent<HTMLInputElement>) => void;
  goToStep: (n: number) => void;
  isSubmitting: boolean;
  error: string | null;
  submit: () => Promise<void>;
  totalPrice: number | undefined;
}

export function CheckoutCardForm({ form, setField, handleCardNumber, handleExpiry, handleCvv, goToStep, isSubmitting, error, submit, totalPrice }: CheckoutCardFormProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit();
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-background">
      <div className="space-y-1.5">
        <Label className={LABEL_CLS}>Número de tarjeta</Label>
        <div className="relative">
          <Input value={form.numeroTarjeta} onChange={handleCardNumber} placeholder="0000 0000 0000 0000" className={`pl-10 font-mono tracking-widest ${INPUT_CLS}`} inputMode="numeric" required />
          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className={LABEL_CLS}>Nombre en la tarjeta</Label>
        <Input value={form.nombreTarjeta} onChange={setField("nombreTarjeta")} placeholder="JUAN PEREZ" className={`uppercase ${INPUT_CLS}`} required />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className={LABEL_CLS}>Vencimiento</Label>
          <Input value={form.expiry} onChange={handleExpiry} placeholder="MM/AA" className={`font-mono ${INPUT_CLS}`} inputMode="numeric" required />
        </div>
        <div className="space-y-1.5">
          <Label className={LABEL_CLS}>CVV</Label>
          <div className="relative">
            <Input value={form.cvv} onChange={handleCvv} placeholder="•••" className={`font-mono pr-9 ${INPUT_CLS}`} inputMode="numeric" type="password" required />
            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/30" />
          </div>
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive bg-destructive/8 border border-destructive/20 px-3 py-2.5 rounded-xl">
          {error}
        </p>
      )}

      <div className="pt-1 space-y-3">
        <WompiVerifiedBanner />
        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={() => goToStep(0)} className="flex-1 rounded-xl h-11 border-border/60 font-semibold gap-2" disabled={isSubmitting}>
            <ArrowLeft className="w-4 h-4" /> Atrás
          </Button>
          <Button type="submit" className="flex-1 rounded-xl h-11 font-bold bg-primary hover:bg-primary/90 text-primary-foreground gap-2 shadow-[0_4px_14px_rgba(47,161,253,0.30)] hover:shadow-[0_6px_20px_rgba(47,161,253,0.40)] transition-all" disabled={isSubmitting}>
            {isSubmitting
              ? <><Loader2 className="w-4 h-4 animate-spin" />Procesando...</>
              : <><Lock className="w-4 h-4" />Pagar ${totalPrice}</>}
          </Button>
        </div>
      </div>
    </form>
  );
}
