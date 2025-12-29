import { Button } from "@/presentation/components/ui/button";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { cn } from "@/presentation/utils/cn";

interface WizardFooterProps {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  isCreating: boolean;
  isFormValid: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export function WizardFooter({
  currentStep,
  totalSteps,
  canProceed,
  isCreating,
  isFormValid,
  onBack,
  onNext,
  onSubmit,
}: WizardFooterProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="border-t p-3 sm:p-4 flex justify-between items-center bg-background shrink-0">
      <Button
        variant="outline"
        onClick={onBack}
        className={cn(
          "gap-2",
          isFirstStep && "border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600"
        )}
      >
        <ChevronLeft className="h-4 w-4" />
        {isFirstStep ? "Volver" : "Anterior"}
      </Button>

      <div className="flex gap-2">
        {!isLastStep ? (
          <Button onClick={onNext} disabled={!canProceed} className="gap-2">
            Siguiente
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={onSubmit}
            disabled={isCreating || !isFormValid}
            className="gap-2 bg-green-600 hover:bg-green-700"
          >
            {isCreating ? "Publicando..." : "Publicar espacio"}
            <Check className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
