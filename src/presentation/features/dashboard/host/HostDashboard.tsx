"use client";

import { useState } from "react";
import { AlertCircle, Info } from "lucide-react";
import { useHostDashboard } from "./hooks";
import { AddSpaceWizard, AddSpaceWizardMobile } from "./components/actions/add-space";
import { EditSpaceDialog } from "./components/actions/edit-space";
import { SpaceCards, SpacesToolbar, SpaceFilter } from "./components/spaces";
import { useMediaQuery } from "@/presentation/hooks/useMediaQuery";

export function HostDashboard() {
  const isMobile = useMediaQuery("(max-width: 639px)");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<SpaceFilter>("all");
  const {
    spaces, isLoading, isCreating, isDeleting, isUpdating,
    isDialogOpen, setIsDialogOpen, newSpace, updateNewSpace,
    handleAddSpace, handleDeleteSpace, handleUpdateStatus, handleEditSpace, handleSaveEdit,
    editingSpace, isEditDialogOpen, setIsEditDialogOpen,
    isFormValid, recommendedPrice,
    actionError, clearActionError, actionNotice, clearActionNotice,
  } = useHostDashboard();

  const query = search.trim().toLowerCase();
  const visible = spaces.filter(
    (s) =>
      (filter === "all" || s.status === filter) &&
      (!query || s.title.toLowerCase().includes(query) || s.city?.toLowerCase().includes(query)),
  );

  const wizardProps = {
    onOpenChange: setIsDialogOpen,
    newSpace,
    onUpdateNewSpace: updateNewSpace,
    onAddSpace: handleAddSpace,
    isCreating,
    isFormValid,
    recommendedPrice,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <SpacesToolbar spaces={spaces} search={search} onSearchChange={setSearch} filter={filter} onFilterChange={setFilter} />
        <div className="shrink-0">
          {isMobile ? (
            <AddSpaceWizardMobile isOpen={isDialogOpen} {...wizardProps} />
          ) : (
            <AddSpaceWizard isOpen={isDialogOpen} {...wizardProps} />
          )}
        </div>
      </div>

      {actionError && (
        <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{actionError}</span>
          <button onClick={clearActionError} className="ml-auto text-xs underline">Cerrar</button>
        </div>
      )}

      {actionNotice && (
        <div className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">
          <Info className="h-4 w-4 shrink-0" />
          <span>{actionNotice}</span>
          <button onClick={clearActionNotice} className="ml-auto text-xs underline">Cerrar</button>
        </div>
      )}

      <SpaceCards
        spaces={visible}
        isLoading={isLoading}
        emptyText={spaces.length === 0 ? "Aún no tienes espacios. Usa «Agregar espacio» para publicar el primero." : "Ningún espacio coincide con tu búsqueda"}
        isDeleting={isDeleting}
        isUpdating={isUpdating}
        onDeleteSpace={handleDeleteSpace}
        onUpdateStatus={handleUpdateStatus}
        onEditSpace={handleEditSpace}
      />

      <EditSpaceDialog
        space={editingSpace}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleSaveEdit}
        isSaving={isUpdating}
      />
    </div>
  );
}
