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
  editMode?: boolean;
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
  editMode = false,
}: WizardFooterProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="border-t border-border/40 px-4 py-3 sm:px-6 sm:py-4 flex justify-between items-center bg-white dark:bg-card shrink-0">
      <Button
        variant="outline"
        onClick={onBack}
        className={cn(
          "gap-2 rounded-xl",
          isFirstStep && "border-border/60 text-muted-foreground hover:text-foreground"
        )}
      >
        <ChevronLeft className="h-4 w-4" />
        {isFirstStep ? "Volver" : "Anterior"}
      </Button>

      <div className="flex gap-2">
        {!isLastStep ? (
          <Button onClick={onNext} disabled={!canProceed} className="gap-2 rounded-xl">
            Siguiente
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={onSubmit}
            disabled={isCreating || !isFormValid}
            className="gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700"
          >
            {isCreating ? (editMode ? "Guardando..." : "Publicando...") : (editMode ? "Guardar cambios" : "Publicar espacio")}
            <Check className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
