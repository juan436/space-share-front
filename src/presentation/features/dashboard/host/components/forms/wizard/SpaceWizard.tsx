"use client";

import { useState, useCallback } from "react";
import { DialogHeader, DialogTitle } from "@/presentation/components/ui/dialog";
import { NewSpaceFormData } from "@/presentation/types/spaces";
import { useLocationData } from "@/presentation/hooks/useLocationData";
import { useUseCases } from "@/presentation/providers/usecases-context";
import { WizardStepper, WIZARD_STEPS } from "./WizardStepper";
import { WizardFooter } from "./WizardFooter";
import { canProceed } from "./validation";
import { DescriptionStep } from "./steps/DescriptionStep";
import { ImagesStep } from "./steps/ImagesStep";
import { AmenitiesStep } from "./steps/AmenitiesStep";
import { LocationStep } from "./steps/LocationStep";
import { PreviewStep } from "./steps/PreviewStep";

interface SpaceWizardProps {
  newSpace: NewSpaceFormData;
  onUpdateNewSpace: (updates: Partial<NewSpaceFormData>) => void;
  onAddSpace: () => void;
  onBack: () => void;
  isCreating: boolean;
  isFormValid: boolean;
  recommendedPrice: number;
  editMode?: boolean;
}

export function SpaceWizard({
  newSpace,
  onUpdateNewSpace,
  onAddSpace,
  onBack,
  isCreating,
  isFormValid,
  recommendedPrice,
  editMode = false,
}: SpaceWizardProps) {
  const { uploadSpaceImagesUseCase } = useUseCases();
  const [currentStep, setCurrentStep] = useState(1);
  const { countries, states, cities } = useLocationData(newSpace.country, newSpace.state);

  const handleCountryChange = (value: string) => {
    onUpdateNewSpace({ country: value, state: "", city: "" });
  };

  const handleStateChange = (value: string) => {
    onUpdateNewSpace({ state: value, city: "" });
  };

  const handleNext = () => {
    if (currentStep < WIZARD_STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleFilesSelected = useCallback(
    async (files: File[]): Promise<string[]> => {
      const response = await uploadSpaceImagesUseCase.execute(files);
      const newImages = [...(newSpace.images || []), ...response];
      onUpdateNewSpace({ images: newImages });
      return response;
    },
    [newSpace.images, onUpdateNewSpace]
  );

  const removeImage = (index: number) => {
    onUpdateNewSpace({ images: (newSpace.images || []).filter((_, i) => i !== index) });
  };


  return (
    <>
      {/* Header con Stepper */}
      <div className="border-b border-border/40 bg-white dark:bg-card">
        <DialogHeader className="px-4 pt-5 pb-1 sm:px-6">
          <DialogTitle className="text-xl font-semibold text-foreground">
            {editMode ? "Editar Espacio" : "Publicar Espacio"}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Paso {currentStep} de {WIZARD_STEPS.length} — completa cada sección
          </p>
        </DialogHeader>
        <WizardStepper currentStep={currentStep} />
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-6 sm:px-6 overflow-y-auto">
        {currentStep === 1 && (
          <DescriptionStep
            newSpace={newSpace}
            onUpdateNewSpace={onUpdateNewSpace}
            recommendedPrice={recommendedPrice}
          />
        )}
        {currentStep === 2 && (
          <ImagesStep images={newSpace.images || []} onFilesSelected={handleFilesSelected} onRemove={removeImage} />
        )}
        {currentStep === 3 && (
          <AmenitiesStep newSpace={newSpace} onUpdateNewSpace={onUpdateNewSpace} />
        )}
        {currentStep === 4 && (
          <LocationStep
            newSpace={newSpace}
            onUpdateNewSpace={onUpdateNewSpace}
            countries={countries}
            states={states}
            cities={cities}
            onCountryChange={handleCountryChange}
            onStateChange={handleStateChange}
          />
        )}
        {currentStep === 5 && <PreviewStep newSpace={newSpace} images={newSpace.images || []} />}
      </div>

      {/* Footer */}
      <WizardFooter
        currentStep={currentStep}
        totalSteps={WIZARD_STEPS.length}
        canProceed={canProceed(currentStep, newSpace)}
        isCreating={isCreating}
        isFormValid={isFormValid}
        onBack={handleBack}
        onNext={handleNext}
        onSubmit={onAddSpace}
        editMode={editMode}
      />
    </>
  );
}
