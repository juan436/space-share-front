"use client";

import { useState } from "react";
import { Button } from "@/presentation/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/presentation/components/ui/dialog";
import { Plus, ArrowLeft } from "lucide-react";
import { NewSpaceFormData, ListingTypeValue } from "@/presentation/types/spaces";
import { BusinessSpaceForm } from "../../forms/business/BusinessSpaceForm";
import { SpaceTypeSelector, SpaceMode, SpaceWizard, ListingTypeSelector } from "../../forms/wizard";

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
  const [listingType, setListingType] = useState<ListingTypeValue | null>(null);
  const [spaceMode, setSpaceMode] = useState<SpaceMode>(null);

  const handleReset = () => {
    setListingType(null);
    setSpaceMode(null);
  };

  const handleSelectListingType = (choice: ListingTypeValue) => {
    setListingType(choice);
    if (choice === "lodging") {
      onUpdateNewSpace({ listingType: "lodging", type: "other", capacity: 1 });
    } else if (choice === "garage") {
      onUpdateNewSpace({ listingType: "garage", type: "other", capacity: 1 });
    } else {
      onUpdateNewSpace({ listingType: "storage" });
    }
  };

  const hasSubtypeStep = listingType === "storage" || listingType === "lodging";
  const isSelectorStep = listingType === null || (hasSubtypeStep && spaceMode === null);

  const handleSpaceWizardBack = () => {
    if (hasSubtypeStep) {
      setSpaceMode(null);
    } else {
      handleReset();
    }
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
      <DialogContent
        className={
          isSelectorStep
            ? "w-[92vw] max-w-[760px] h-auto max-h-[85vh] flex flex-col overflow-hidden p-0 rounded-2xl"
            : "w-[95vw] max-w-[800px] h-[95vh] sm:h-[85vh] flex flex-col overflow-hidden p-0 rounded-2xl"
        }
      >
        {listingType === null && (
          <>
            <div className="border-b border-border/40 bg-white dark:bg-card">
              <DialogHeader className="px-4 py-4 sm:px-6">
                <DialogTitle className="text-xl font-semibold">
                  ¿Qué deseas publicar?
                </DialogTitle>
              </DialogHeader>
            </div>
            <ListingTypeSelector onSelect={handleSelectListingType} />
          </>
        )}

        {hasSubtypeStep && spaceMode === null && (
          <>
            <div className="border-b border-border/40 bg-white dark:bg-card">
              <DialogHeader className="px-4 py-4 sm:px-6">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setListingType(null)}
                    className="px-2 -ml-2 text-muted-foreground hover:text-foreground shrink-0"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <DialogTitle className="text-xl font-semibold">
                    ¿Qué tipo de espacio deseas publicar?
                  </DialogTitle>
                </div>
              </DialogHeader>
            </div>
            <SpaceTypeSelector listingType={listingType as "storage" | "lodging"} onSelectMode={setSpaceMode} />
          </>
        )}

        {hasSubtypeStep && spaceMode === "business" && (
          <BusinessSpaceForm listingType={listingType as "storage" | "lodging"} onClose={() => setSpaceMode(null)} />
        )}

        {(listingType === "garage" || (hasSubtypeStep && spaceMode === "normal")) && (
          <SpaceWizard
            newSpace={newSpace}
            onUpdateNewSpace={onUpdateNewSpace}
            onAddSpace={onAddSpace}
            onBack={handleSpaceWizardBack}
            isCreating={isCreating}
            isFormValid={isFormValid}
            recommendedPrice={recommendedPrice}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
