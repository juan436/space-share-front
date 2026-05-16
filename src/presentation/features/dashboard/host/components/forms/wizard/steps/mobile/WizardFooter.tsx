/**
 * WizardFooter (mobile)
 *
 * Qué hace: Footer del wizard mobile. Botón único de acción: "Continuar" o "Finalizar" según el paso.
 * Recibe:   currentStep, totalSteps, canProceed, isCreating, isFormValid, onNext, onSubmit
 * Genera:   botón full-width deshabilitado según validación del paso actual
 */
import { Button } from "@/presentation/components/ui/button";
import { Check, ChevronRight } from "lucide-react";

interface WizardFooterProps {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  isCreating: boolean;
  isFormValid: boolean;
  onNext: () => void;
  onSubmit: () => void;
}

export function WizardFooter({
  currentStep,
  totalSteps,
  canProceed,
  isCreating,
  isFormValid,
  onNext,
  onSubmit,
}: WizardFooterProps) {
  return (
    <div className="border-t bg-background p-4 flex gap-3 items-center">
      {currentStep === totalSteps ? (
        <Button
          onClick={onSubmit}
          disabled={isCreating || !isFormValid}
          className="w-full gap-2 bg-green-600 hover:bg-green-700"
        >
          {isCreating ? "Publicando..." : "Finalizar"}
          <Check className="h-4 w-4" />
        </Button>
      ) : (
        <Button onClick={onNext} disabled={!canProceed} className="w-full gap-2 h-11">
          Continuar
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
