"use client";

import { useMemo, useState } from "react";
import { Button } from "@/presentation/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/presentation/components/ui/dialog";
import {
  FileText,
  ImageIcon,
  MapPin,
  Plus,
  Thermometer,
  Eye,
} from "lucide-react";
import { NewSpaceFormData } from "@/presentation/types/spaces";
import { useLocationData } from "@/presentation/hooks/useLocationData";
import {
  DescriptionStep,
  ImagesStep,
  AmenitiesStep,
  LocationStep,
  PreviewStep,
  WizardHeader,
  WizardFooter,
} from "../../forms/wizard/steps/mobile";
import { canProceed } from "../../forms/wizard/validation";

interface AddSpaceWizardMobileProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newSpace: NewSpaceFormData;
  onUpdateNewSpace: (updates: Partial<NewSpaceFormData>) => void;
  onAddSpace: () => void;
  isCreating: boolean;
  isFormValid: boolean;
  recommendedPrice: number;
}

const STEPS = [
  { id: 1, title: "Descripción", icon: FileText },
  { id: 2, title: "Imágenes", icon: ImageIcon },
  { id: 3, title: "Comodidades", icon: Thermometer },
  { id: 4, title: "Ubicación", icon: MapPin },
  { id: 5, title: "Finalizar", icon: Eye },
] as const;

type StepId = (typeof STEPS)[number]["id"];

export function AddSpaceWizardMobile({
  isOpen,
  onOpenChange,
  newSpace,
  onUpdateNewSpace,
  onAddSpace,
  isCreating,
  isFormValid,
  recommendedPrice,
}: AddSpaceWizardMobileProps) {
  const [currentStep, setCurrentStep] = useState<StepId>(1);
  const [images, setImages] = useState<string[]>([]);

  const { countries, states, cities } = useLocationData(newSpace.country, newSpace.state);

  const stepIndex = currentStep - 1;
  const progress = useMemo(() => {
    return Math.round((currentStep / STEPS.length) * 100);
  }, [currentStep]);

  const handleCountryChange = (value: string) => {
    onUpdateNewSpace({ country: value, state: "", city: "" });
  };

  const handleStateChange = (value: string) => {
    onUpdateNewSpace({ state: value, city: "" });
  };

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep((currentStep + 1) as StepId);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((currentStep - 1) as StepId);
  };

  const handleImageUpload = () => {
    const mockImages = [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&h=400&fit=crop",
    ];
    setImages((prev) => [...prev, ...mockImages]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const stepTitle = STEPS[stepIndex]?.title ?? "";

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setCurrentStep(1);
        }
        onOpenChange(open);
      }}
    >
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto gap-2">
          <Plus className="h-4 w-4" />
          Agregar Espacio
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[92vw] max-w-[520px] h-[92dvh] max-h-[92dvh] p-0 overflow-hidden overflow-x-hidden rounded-2xl flex flex-col shadow-2xl">
        <WizardHeader
          currentStep={currentStep}
          totalSteps={STEPS.length}
          stepTitle={stepTitle}
          progress={progress}
          onBack={handleBack}
          onClose={() => onOpenChange(false)}
        />

        {/* Content mobile */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 bg-muted/20">
          {currentStep === 1 && (
            <DescriptionStep
              newSpace={newSpace}
              onUpdateNewSpace={onUpdateNewSpace}
              recommendedPrice={recommendedPrice}
            />
          )}

          {currentStep === 2 && (
            <ImagesStep
              images={images}
              onImageUpload={handleImageUpload}
              onRemoveImage={removeImage}
            />
          )}

          {currentStep === 3 && (
            <AmenitiesStep
              newSpace={newSpace}
              onUpdateNewSpace={onUpdateNewSpace}
            />
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

          {currentStep === 5 && (
            <PreviewStep
              newSpace={newSpace}
              images={images}
            />
          )}
        </div>

        <WizardFooter
          currentStep={currentStep}
          totalSteps={STEPS.length}
          canProceed={canProceed(currentStep, newSpace)}
          isCreating={isCreating}
          isFormValid={isFormValid}
          onNext={handleNext}
          onSubmit={onAddSpace}
        />
      </DialogContent>
    </Dialog>
  );
}
