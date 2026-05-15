"use client";

import { Button } from "@/presentation/components/ui/button";
import { Check } from "lucide-react";
import { useBusinessSpaceForm } from "../hooks/useBusinessSpaceForm";
import { SpaceTypeSection } from "./business-form/SpaceTypeSection";
import { BasicInfoSection } from "./business-form/BasicInfoSection";
import { LocationSection } from "./business-form/LocationSection";
import { ServicesSection } from "./business-form/ServicesSection";
import { PricingSection } from "./business-form/PricingSection";
import { PhotosSection } from "./business-form/PhotosSection";

interface BusinessSpaceFormProps {
  onClose: () => void;
}

export function BusinessSpaceForm({ onClose }: BusinessSpaceFormProps) {
  const {
    formData, updateFormData, toggleService,
    images, handleImageUpload, removeImage,
    handleSubmit, isFormValid,
  } = useBusinessSpaceForm(onClose);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        <SpaceTypeSection
          spaceType={formData.spaceType}
          onSelect={(v) => updateFormData({ spaceType: v })}
        />
        <BasicInfoSection formData={formData} onUpdate={updateFormData} />
        <LocationSection formData={formData} onUpdate={updateFormData} />
        <ServicesSection services={formData.services} onToggle={toggleService} />
        <PricingSection formData={formData} onUpdate={updateFormData} />
        <PhotosSection images={images} onUpload={handleImageUpload} onRemove={removeImage} />
      </div>

      <div className="border-t p-4 flex justify-between items-center bg-background shrink-0">
        <Button
          variant="outline"
          onClick={onClose}
          className="border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600"
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="gap-2 bg-green-600 hover:bg-green-700"
        >
          Publicar Espacio Empresarial
          <Check className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
