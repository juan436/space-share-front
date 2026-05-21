"use client";

import { useState } from "react";
import { AlertCircle, Building2, MapPin, Wifi, ImageIcon } from "lucide-react";
import { DialogHeader, DialogTitle } from "@/presentation/components/ui/dialog";
import { useBusinessSpaceForm } from "../../../hooks/useBusinessSpaceForm";
import { SpaceTypeSection } from "./SpaceTypeSection";
import { BasicInfoSection } from "./BasicInfoSection";
import { LocationSection } from "./LocationSection";
import { ServicesSection } from "./ServicesSection";
import { PricingSection } from "./PricingSection";
import { ImagesStep } from "../wizard/steps/ImagesStep";
import { WizardFooter } from "../wizard/WizardFooter";
import { WizardStepper } from "../wizard/WizardStepper";
import type { SpaceViewModel } from "@/presentation/types/spaces";

const STEPS = [
  { id: 1, title: "Descripción", icon: Building2 },
  { id: 2, title: "Ubicación",   icon: MapPin     },
  { id: 3, title: "Servicios",   icon: Wifi       },
  { id: 4, title: "Fotos",       icon: ImageIcon  },
];

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
    isSubmitting, submitError,
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
        <WizardStepper currentStep={currentStep} steps={STEPS} />
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 min-h-0">
        {submitError && (
          <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{submitError}</span>
          </div>
        )}
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
