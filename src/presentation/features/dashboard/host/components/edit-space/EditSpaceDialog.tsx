"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/presentation/components/ui/dialog";
import { NewSpaceFormData, SpaceViewModel, calculateRecommendedPriceForUI } from "@/presentation/types/spaces";
import { SpaceWizard } from "../wizard";

interface EditSpaceDialogProps {
  space: SpaceViewModel | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: string, data: NewSpaceFormData) => void;
  isSaving: boolean;
}

export function EditSpaceDialog({ space, isOpen, onOpenChange, onSave, isSaving }: EditSpaceDialogProps) {
  const [formData, setFormData] = useState<NewSpaceFormData>(toFormData(space));

  useEffect(() => {
    if (space && isOpen) {
      setFormData(toFormData(space));
    }
  }, [space, isOpen]);

  const updateFormData = (updates: Partial<NewSpaceFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleSubmit = () => {
    if (space) {
      onSave(space.id, formData);
    }
  };

  const isFormValid = Boolean(
    formData.title &&
    formData.squareMeters > 0 &&
    formData.pricePerMonth > 0 &&
    formData.address &&
    formData.city &&
    formData.country
  );

  const recommendedPrice = calculateRecommendedPriceForUI(formData.squareMeters);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[800px] h-[95vh] sm:h-[85vh] flex flex-col overflow-hidden p-0">
        <SpaceWizard
          newSpace={formData}
          onUpdateNewSpace={updateFormData}
          onAddSpace={handleSubmit}
          onBack={() => onOpenChange(false)}
          isCreating={isSaving}
          isFormValid={isFormValid}
          recommendedPrice={recommendedPrice}
          editMode
        />
      </DialogContent>
    </Dialog>
  );
}

function toFormData(space: SpaceViewModel | null): NewSpaceFormData {
  if (!space) {
    return {
      title: "", description: "", type: "garage", squareMeters: 0,
      pricePerMonth: 0, capacity: 1, climateControlled: false,
      securityCamera: false, privateEntrance: false, address: "",
      city: "", state: "", country: "",
    };
  }
  return {
    title: space.title,
    description: space.description,
    type: space.type,
    squareMeters: space.squareMeters,
    pricePerMonth: space.pricePerMonth,
    capacity: space.capacity || 1,
    climateControlled: space.climateControlled,
    securityCamera: space.securityCamera,
    privateEntrance: space.privateEntrance,
    address: space.address,
    city: space.city,
    state: space.state,
    country: space.country,
    images: space.images || [],
  };
}
