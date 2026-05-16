"use client";

/**
 * AddSpaceWizard
 *
 * Qué hace: Dialog desktop para dar de alta un espacio. Bifurca entre flujo normal (wizard 5 pasos) y empresarial (form single-page).
 * Recibe:   isOpen, onOpenChange, newSpace (formData), onUpdateNewSpace, onAddSpace, isCreating, isFormValid, recommendedPrice
 * Genera:   Dialog con SpaceTypeSelector → SpaceWizard (normal) o BusinessSpaceForm (empresarial)
 * Procesa:  resetea spaceMode al cerrar para volver al selector en la próxima apertura
 */
import { useState } from "react";
import { Button } from "@/presentation/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/presentation/components/ui/dialog";
import { Plus } from "lucide-react";
import { NewSpaceFormData } from "@/presentation/types/spaces";
import { BusinessSpaceForm } from "./BusinessSpaceForm";
import { SpaceTypeSelector, SpaceMode, SpaceWizard } from "../wizard";

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
      <DialogContent className="w-[95vw] max-w-[800px] h-[95vh] sm:h-[85vh] flex flex-col overflow-hidden p-0">
        {spaceMode === null && (
          <>
            <div className="border-b bg-muted/30">
              <DialogHeader className="p-4">
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
