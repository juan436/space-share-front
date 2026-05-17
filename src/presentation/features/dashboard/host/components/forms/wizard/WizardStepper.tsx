/**
 * WizardStepper
 *
 * Qué hace: Barra de progreso visual del wizard desktop. Muestra los 5 pasos con iconos y estado.
 * Recibe:   currentStep (1-5)
 * Genera:   fila de pasos con indicador activo/completado/pendiente y líneas conectoras entre pasos
 * Procesa:  exporta WIZARD_STEPS para que SpaceWizard controle el total de pasos de forma centralizada
 */
import { Check, FileText, ImageIcon, Settings2, MapPin, Eye, LucideIcon } from "lucide-react";
import { cn } from "@/presentation/utils/cn";

interface Step {
  id: number;
  title: string;
  icon: LucideIcon;
}

export const WIZARD_STEPS: Step[] = [
  { id: 1, title: "Descripción", icon: FileText },
  { id: 2, title: "Imágenes", icon: ImageIcon },
  { id: 3, title: "Comodidades", icon: Settings2 },
  { id: 4, title: "Ubicación", icon: MapPin },
  { id: 5, title: "Finalizar", icon: Eye },
];

interface WizardStepperProps {
  currentStep: number;
  steps?: Step[];
}

export function WizardStepper({ currentStep, steps = WIZARD_STEPS }: WizardStepperProps) {
  return (
    <div className="px-2 sm:px-4 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200",
                    isActive && "bg-primary text-primary-foreground shadow-lg scale-110",
                    isCompleted && "bg-green-500 text-white",
                    !isActive && !isCompleted && "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-[10px] sm:text-xs mt-1 font-medium",
                    isActive && "text-primary",
                    isCompleted && "text-green-600",
                    !isActive && !isCompleted && "text-muted-foreground"
                  )}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-1 sm:mx-2",
                    isCompleted ? "bg-green-500" : "bg-muted"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
