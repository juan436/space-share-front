import { Button } from "@/presentation/components/ui/button";
import { DialogHeader, DialogTitle } from "@/presentation/components/ui/dialog";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/presentation/utils/cn";

interface WizardHeaderProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
  progress: number;
  onBack: () => void;
  onClose: () => void;
}

export function WizardHeader({
  currentStep,
  totalSteps,
  stepTitle,
  progress,
  onBack,
  onClose,
}: WizardHeaderProps) {
  return (
    <div className="border-b bg-background">
      <DialogHeader className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => (currentStep === 1 ? onClose() : onBack())}
            className={cn(
              "px-2",
              currentStep === 1 && "text-orange-600 hover:text-orange-700 hover:bg-orange-50"
            )}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="text-center">
            <DialogTitle className="text-base font-semibold leading-tight">
              Publicar espacio
            </DialogTitle>
            <p className="text-xs text-muted-foreground">
              Paso {currentStep} de {totalSteps} · {stepTitle}
            </p>
          </div>

          <div className="w-9" />
        </div>

        <div className="mt-3">
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </DialogHeader>
    </div>
  );
}
