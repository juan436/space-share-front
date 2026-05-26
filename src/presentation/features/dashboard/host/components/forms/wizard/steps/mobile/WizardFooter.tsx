import { Button } from "@/presentation/components/ui/button";
import { Check, ChevronRight, Loader2 } from "lucide-react";

interface WizardFooterProps {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  isCreating: boolean;
  isFormValid: boolean;
  onNext: () => void;
  onSubmit: () => void;
}

export function WizardFooter({ currentStep, totalSteps, canProceed, isCreating, isFormValid, onNext, onSubmit }: WizardFooterProps) {
  return (
    <div className="border-t border-border/40 bg-white dark:bg-card p-4">
      {currentStep === totalSteps ? (
        <Button
          onClick={onSubmit}
          disabled={isCreating || !isFormValid}
          className="w-full h-11 gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
        >
          {isCreating ? (
            <><Loader2 className="h-4 w-4 animate-spin" />Publicando...</>
          ) : (
            <><Check className="h-4 w-4" />Finalizar</>
          )}
        </Button>
      ) : (
        <Button onClick={onNext} disabled={!canProceed} className="w-full h-11 gap-2 rounded-xl font-semibold">
          Continuar
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
