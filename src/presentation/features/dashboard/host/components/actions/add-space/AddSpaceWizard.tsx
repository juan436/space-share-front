"use client";

import { useState } from "react";
import { Button } from "@/presentation/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/presentation/components/ui/dialog";
import { Plus } from "lucide-react";
import { NewSpaceFormData } from "@/presentation/types/spaces";
import { BusinessSpaceForm } from "../../forms/business/BusinessSpaceForm";
import { SpaceTypeSelector, SpaceMode, SpaceWizard } from "../../forms/wizard";

interface AddSpaceWizardProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newSpace: NewSpaceFormData;
  onUpdateNewSpace: (updates: Partial<NewSpaceFormData>) => void;
  onAddSpace: () => void;
  isCreating: boolean;
  isFormValid: boolean;
  recommendedPrice: number;
}

export function AddSpaceWizard({
  isOpen,
  onOpenChange,
  newSpace,
  onUpdateNewSpace,
  onAddSpace,
  isCreating,
  isFormValid,
  recommendedPrice,
}: AddSpaceWizardProps) {
  const [spaceMode, setSpaceMode] = useState<SpaceMode>(null);

  const handleReset = () => {
    setSpaceMode(null);
  };

  const handleClose = () => {
    handleReset();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        handleReset();
      }
      onOpenChange(open);
    }}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Agregar Espacio
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[800px] h-[95vh] sm:h-[85vh] flex flex-col overflow-hidden p-0 rounded-2xl">
        {spaceMode === null && (
          <>
            <div className="border-b border-border/40 bg-white dark:bg-card">
              <DialogHeader className="px-4 py-4 sm:px-6">
                <DialogTitle className="text-xl font-semibold">
                  ¿Qué tipo de espacio deseas publicar?
                </DialogTitle>
              </DialogHeader>
            </div>
            <SpaceTypeSelector onSelectMode={setSpaceMode} />
          </>
        )}

        {spaceMode === "business" && (
          <BusinessSpaceForm onClose={handleClose} />
        )}

        {spaceMode === "normal" && (
          <SpaceWizard
            newSpace={newSpace}
            onUpdateNewSpace={onUpdateNewSpace}
            onAddSpace={onAddSpace}
            onBack={handleReset}
            isCreating={isCreating}
            isFormValid={isFormValid}
            recommendedPrice={recommendedPrice}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
