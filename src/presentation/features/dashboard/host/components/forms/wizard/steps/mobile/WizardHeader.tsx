import { Button } from "@/presentation/components/ui/button";
import { DialogHeader, DialogTitle } from "@/presentation/components/ui/dialog";
import { ArrowLeft } from "lucide-react";

interface WizardHeaderProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
  progress: number;
  onBack: () => void;
  onClose: () => void;
}

export function WizardHeader({ currentStep, totalSteps, stepTitle, progress, onBack, onClose }: WizardHeaderProps) {
  return (
    <div className="border-b border-border/40 bg-white dark:bg-card">
      <DialogHeader className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => (currentStep === 1 ? onClose() : onBack())}
            className="px-2 text-muted-foreground hover:text-foreground hover:bg-muted/60"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="text-center">
            <DialogTitle className="text-sm font-semibold leading-tight">
              Publicar espacio
            </DialogTitle>
            <p className="text-xs text-muted-foreground">
              Paso {currentStep} de {totalSteps} · {stepTitle}
            </p>
          </div>

          <div className="w-9" />
        </div>

        <div className="mt-3">
          <div className="h-1 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </DialogHeader>
    </div>
  );
}
