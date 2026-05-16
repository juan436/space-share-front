"use client";

/**
 * BusinessSpaceForm
 *
 * Qué hace: Wizard de 4 pasos para alta y edición de espacio empresarial. Autocontenido: incluye título, stepper, contenido y footer.
 * Recibe:   onClose — callback al cancelar o completar; initialData — SpaceViewModel si es edición; spaceId — id si es edición
 * Genera:   DialogHeader con título + stepper + contenido del paso actual + WizardFooter
 * Procesa:  delega estado y submit a useBusinessSpaceForm; valida cada paso antes de avanzar
 */
import { useState } from "react";
import { Building2, MapPin, Wifi, ImageIcon, Check } from "lucide-react";
import { DialogHeader, DialogTitle } from "@/presentation/components/ui/dialog";
import { cn } from "@/presentation/utils/cn";
import { useBusinessSpaceForm } from "../../hooks/useBusinessSpaceForm";
import { SpaceTypeSection } from "../business-form/SpaceTypeSection";
import { BasicInfoSection } from "../business-form/BasicInfoSection";
import { LocationSection } from "../business-form/LocationSection";
import { ServicesSection } from "../business-form/ServicesSection";
import { PricingSection } from "../business-form/PricingSection";
import { ImagesStep } from "../wizard/steps/ImagesStep";
import { WizardFooter } from "../wizard/WizardFooter";
import type { SpaceViewModel } from "@/presentation/types/spaces";

const STEPS = [
  { id: 1, label: "Descripción", icon: Building2 },
  { id: 2, label: "Ubicación",   icon: MapPin     },
  { id: 3, label: "Servicios",   icon: Wifi       },
  { id: 4, label: "Fotos",       icon: ImageIcon  },
] as const;

interface BusinessSpaceFormProps {
  onClose: () => void;
  initialData?: SpaceViewModel;
  spaceId?: string;
}

export function BusinessSpaceForm({ onClose, initialData, spaceId }: BusinessSpaceFormProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const {
    formData, updateFormData, toggleService,
    images, handleFilesSelected, removeImage,
    handleSubmit, isFormValid, canProceedStep,
    isSubmitting,
  } = useBusinessSpaceForm({ onClose, initialData, spaceId });

  const handleBack = () => {
    if (currentStep === 1) onClose();
    else setCurrentStep((s) => s - 1);
  };

  const handleNext = () => setCurrentStep((s) => s + 1);

  return (
    <>
      {/* Header: título + stepper */}
      <div className="border-b bg-muted/30">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Building2 className="h-5 w-5 text-purple-600" />
            {spaceId ? "Editar Espacio Empresarial" : "Publicar Espacio Empresarial"}
          </DialogTitle>
        </DialogHeader>
        <div className="px-2 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive    = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200",
                      isActive    && "bg-primary text-primary-foreground shadow-lg scale-110",
                      isCompleted && "bg-green-500 text-white",
                      !isActive && !isCompleted && "bg-muted text-muted-foreground"
                    )}
                  >
                    {isCompleted
                      ? <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                      : <Icon  className="h-4 w-4 sm:h-5 sm:w-5" />
                    }
                  </div>
                  <span
                    className={cn(
                      "text-[10px] sm:text-xs mt-1 font-medium",
                      isActive    && "text-primary",
                      isCompleted && "text-green-600",
                      !isActive && !isCompleted && "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div className={cn("flex-1 h-0.5 mx-1 sm:mx-2", isCompleted ? "bg-green-500" : "bg-muted")} />
                )}
              </div>
            );
          })}
        </div>
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 min-h-0">
        {currentStep === 1 && (
          <>
            <SpaceTypeSection
              spaceType={formData.spaceType}
              onSelect={(v) => updateFormData({ spaceType: v })}
            />
            <BasicInfoSection formData={formData} onUpdate={updateFormData} />
          </>
        )}

        {currentStep === 2 && (
          <LocationSection formData={formData} onUpdate={updateFormData} />
        )}

        {currentStep === 3 && (
          <>
            <ServicesSection services={formData.services} onToggle={toggleService} />
            <PricingSection  formData={formData}          onUpdate={updateFormData} />
          </>
        )}

        {currentStep === 4 && (
          <ImagesStep
            images={images}
            onFilesSelected={handleFilesSelected}
            onRemove={removeImage}
          />
        )}
      </div>

      {/* Footer */}
      <WizardFooter
        currentStep={currentStep}
        totalSteps={STEPS.length}
        canProceed={canProceedStep(currentStep)}
        isCreating={isSubmitting}
        isFormValid={isFormValid}
        editMode={!!spaceId}
        onBack={handleBack}
        onNext={handleNext}
        onSubmit={handleSubmit}
      />
    </>
  );
}
