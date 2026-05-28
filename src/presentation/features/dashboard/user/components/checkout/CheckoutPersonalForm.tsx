import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";
import { WompiVerifiedBanner } from "@/presentation/components/shared/WompiVerifiedBanner";
import { SV_REGIONS } from "@/presentation/shared/constants/sv-regions";
import type { CheckoutForm } from "../../hooks/useWompiCheckout";

const INPUT_CLS = "rounded-xl h-11 border-border/60 focus-visible:ring-primary/30 bg-card text-sm";
const LABEL_CLS = "text-xs font-semibold text-foreground/60";

interface CheckoutPersonalFormProps {
  form: CheckoutForm;
  setField: (field: keyof CheckoutForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  goToStep: (n: number) => void;
  onCancel: () => void;
}

export function CheckoutPersonalForm({ form, setField, goToStep, onCancel }: CheckoutPersonalFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goToStep(1);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-background">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className={LABEL_CLS}>Nombre</Label>
          <Input value={form.nombre} onChange={setField("nombre")} placeholder="Juan" className={INPUT_CLS} required />
        </div>
        <div className="space-y-1.5">
          <Label className={LABEL_CLS}>Apellido</Label>
          <Input value={form.apellido} onChange={setField("apellido")} placeholder="Pérez" className={INPUT_CLS} required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className={LABEL_CLS}>Correo electrónico</Label>
          <Input value={form.email} onChange={setField("email")} placeholder="juan@email.com" type="email" className={INPUT_CLS} required />
        </div>
        <div className="space-y-1.5">
          <Label className={LABEL_CLS}>Teléfono</Label>
          <Input value={form.telefono} onChange={setField("telefono")} placeholder="7000-0000" inputMode="tel" className={INPUT_CLS} required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className={LABEL_CLS}>Dirección</Label>
          <Input value={form.direccion} onChange={setField("direccion")} placeholder="Calle, colonia, número" className={INPUT_CLS} required />
        </div>
        <div className="space-y-1.5">
          <Label className={LABEL_CLS}>Ciudad</Label>
          <Input value={form.ciudad} onChange={setField("ciudad")} placeholder="San Salvador" className={INPUT_CLS} required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className={LABEL_CLS}>Departamento</Label>
          <div className="relative">
            <select value={form.idRegion} onChange={setField("idRegion")} required className="w-full h-11 pl-3 pr-10 rounded-xl border border-border/60 bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none">
              <option value="">Seleccionar departamento</option>
              {SV_REGIONS.map(r => <option key={r.id} value={r.id}>{r.nombre}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40 pointer-events-none" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className={LABEL_CLS}>Código postal</Label>
          <Input value={form.codigoPostal} onChange={setField("codigoPostal")} placeholder="01101" inputMode="numeric" className={INPUT_CLS} required />
        </div>
      </div>

      <div className="pt-1 space-y-3">
        <WompiVerifiedBanner />
        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1 rounded-xl h-11 border-border/60 font-semibold">Cancelar</Button>
          <Button type="submit" className="flex-1 rounded-xl h-11 font-bold bg-primary hover:bg-primary/90 text-primary-foreground gap-2 shadow-[0_4px_14px_rgba(47,161,253,0.30)]">
            Continuar <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </form>
  );
}
