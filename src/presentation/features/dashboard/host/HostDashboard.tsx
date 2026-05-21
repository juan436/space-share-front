import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/presentation/components/ui/card";
import { AlertCircle, Building2 } from "lucide-react";
import { useHostDashboard } from "./hooks";
import { AddSpaceWizard, AddSpaceWizardMobile } from "./components/actions/add-space";
import { EditSpaceDialog } from "./components/actions/edit-space";
import { SpacesTable, MobileSpacesList } from "./components/spaces";
import { useMediaQuery } from "@/presentation/hooks/useMediaQuery";

export function HostDashboard() {
  const isMobile = useMediaQuery("(max-width: 639px)");
  const {
    spaces,
    activeSpacesCount,
    isLoading,
    isCreating,
    isDeleting,
    isUpdating,
    isDialogOpen,
    setIsDialogOpen,
    newSpace,
    updateNewSpace,
    handleAddSpace,
    handleDeleteSpace,
    handleUpdateStatus,
    handleEditSpace,
    handleSaveEdit,
    editingSpace,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isFormValid,
    recommendedPrice,
    actionError,
    clearActionError,
  } = useHostDashboard();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Mis Espacios
          </h1>
          <p className="text-muted-foreground">
            Gestiona tus anuncios de espacios de almacenamiento
          </p>
        </div>
      </div>

      {actionError && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{actionError}</span>
          <button onClick={clearActionError} className="ml-auto text-xs underline">Cerrar</button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full sm:w-auto">
          {isMobile ? (
            <AddSpaceWizardMobile
              isOpen={isMobile && isDialogOpen}
              onOpenChange={setIsDialogOpen}
              newSpace={newSpace}
              onUpdateNewSpace={updateNewSpace}
              onAddSpace={handleAddSpace}
              isCreating={isCreating}
              isFormValid={isFormValid}
              recommendedPrice={recommendedPrice}
            />
          ) : (
            <AddSpaceWizard
              isOpen={!isMobile && isDialogOpen}
              onOpenChange={setIsDialogOpen}
              newSpace={newSpace}
              onUpdateNewSpace={updateNewSpace}
              onAddSpace={handleAddSpace}
              isCreating={isCreating}
              isFormValid={isFormValid}
              recommendedPrice={recommendedPrice}
            />
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mis Espacios</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{spaces.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeSpacesCount} activos
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mis Espacios</CardTitle>
          <CardDescription>
            Gestiona tus anuncios de espacios de almacenamiento
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isMobile ? (
            <MobileSpacesList
              spaces={spaces}
              isLoading={isLoading}
              isDeleting={isDeleting}
              isUpdating={isUpdating}
              onDeleteSpace={handleDeleteSpace}
              onUpdateStatus={handleUpdateStatus}
              onEditSpace={handleEditSpace}
            />
          ) : (
            <SpacesTable
              spaces={spaces}
              isLoading={isLoading}
              isDeleting={isDeleting}
              isUpdating={isUpdating}
              onDeleteSpace={handleDeleteSpace}
              onUpdateStatus={handleUpdateStatus}
              onEditSpace={handleEditSpace}
            />
          )}
        </CardContent>
      </Card>

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
