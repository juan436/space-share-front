"use client";

import { useState, useCallback } from "react";
import { DialogHeader, DialogTitle } from "@/presentation/components/ui/dialog";
import { Home } from "lucide-react";
import { NewSpaceFormData } from "@/presentation/types/spaces";
import { useLocationData } from "@/presentation/hooks/useLocationData";
import { spaceRepository } from "@/bootstrap/application";
import { WizardStepper, WIZARD_STEPS } from "./WizardStepper";
import { WizardFooter } from "./WizardFooter";
import { DescriptionStep } from "./steps/DescriptionStep";
import { ImagesStep } from "./steps/ImagesStep";
import { AmenitiesStep } from "./steps/AmenitiesStep";
import { LocationStep } from "./steps/LocationStep";
import { PreviewStep } from "./steps/PreviewStep";

interface NormalSpaceWizardProps {
  newSpace: NewSpaceFormData;
  onUpdateNewSpace: (updates: Partial<NewSpaceFormData>) => void;
  onAddSpace: () => void;
  onBack: () => void;
  isCreating: boolean;
  isFormValid: boolean;
  recommendedPrice: number;
  editMode?: boolean;
}

export function NormalSpaceWizard({
  newSpace,
  onUpdateNewSpace,
  onAddSpace,
  onBack,
  isCreating,
  isFormValid,
  recommendedPrice,
  editMode = false,
}: NormalSpaceWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [images, setImages] = useState<string[]>(newSpace.images || []);
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
      const formData = new FormData();
      files.forEach((f) => formData.append("images", f));

      const response = await spaceRepository.uploadImages(formData);
      const newImages = [...images, ...response];
      setImages(newImages);
      onUpdateNewSpace({ images: newImages });
      return response;
    },
    [images, onUpdateNewSpace]
  );

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onUpdateNewSpace({ images: newImages });
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1:
        return Boolean(
          newSpace.title &&
          newSpace.description &&
          newSpace.type &&
          newSpace.squareMeters > 0 &&
          newSpace.pricePerMonth > 0
        );
      case 2:
        return true;
      case 3:
        return true;
      case 4:
        return Boolean(newSpace.country && newSpace.state && newSpace.city && newSpace.address);
      default:
        return true;
    }
  };

  return (
    <>
      {/* Header con Stepper */}
      <div className="border-b bg-muted/30">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Home className="h-5 w-5 text-blue-600" />
            {editMode ? "Editar Espacio" : "Publicar Espacio Normal"}
          </DialogTitle>
        </DialogHeader>
        <WizardStepper currentStep={currentStep} />
      </div>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
        {currentStep === 1 && (
          <DescriptionStep
            newSpace={newSpace}
            onUpdateNewSpace={onUpdateNewSpace}
            recommendedPrice={recommendedPrice}
          />
        )}
        {currentStep === 2 && (
          <ImagesStep images={images} onFilesSelected={handleFilesSelected} onRemove={removeImage} />
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
        {currentStep === 5 && <PreviewStep newSpace={newSpace} images={images} />}
      </div>

      {/* Footer */}
      <WizardFooter
        currentStep={currentStep}
        totalSteps={WIZARD_STEPS.length}
        canProceed={canProceed()}
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
