import { Check, LucideIcon } from "lucide-react";
import { cn } from "@/presentation/utils/cn";

interface Step {
  id: number;
  title: string;
  icon: LucideIcon;
}

export const WIZARD_STEPS: Step[] = [
  { id: 1, title: "Descripción", icon: Check },
  { id: 2, title: "Imágenes",    icon: Check },
  { id: 3, title: "Comodidades", icon: Check },
  { id: 4, title: "Ubicación",   icon: Check },
  { id: 5, title: "Finalizar",   icon: Check },
];

interface WizardStepperProps {
  currentStep: number;
  steps?: Step[];
}

export function WizardStepper({ currentStep, steps = WIZARD_STEPS }: WizardStepperProps) {
  return (
    <div className="px-4 sm:px-6 py-4">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const isActive    = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <div key={step.id} className="flex items-center flex-1 min-w-0">
              <div className="flex flex-col items-center gap-1 shrink-0">
                <div className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2",
                  isActive    && "bg-primary border-primary text-primary-foreground scale-110 shadow-md",
                  isCompleted && "bg-emerald-500 border-emerald-500 text-white",
                  !isActive && !isCompleted && "bg-white dark:bg-card border-border/60 text-muted-foreground"
                )}>
                  {isCompleted ? <Check className="h-3.5 w-3.5" /> : step.id}
                </div>
                <span className={cn(
                  "text-[9px] font-medium leading-none hidden sm:block whitespace-nowrap",
                  isActive    && "text-primary",
                  isCompleted && "text-emerald-600",
                  !isActive && !isCompleted && "text-muted-foreground/50"
                )}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                  "flex-1 h-px mx-2 mb-3.5",
                  isCompleted ? "bg-emerald-400" : "bg-border/40"
                )} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
