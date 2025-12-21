import { useAuth } from "@/presentation/providers/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/presentation/components/ui/card";
import { Building2 } from "lucide-react";
import { useEffect } from "react";
import { useHostDashboard } from "./hooks";
import { AddSpaceWizard } from "./components/AddSpaceWizard";
import { AddSpaceWizardMobile } from "./components/AddSpaceWizardMobile";
import { SpacesTable } from "./components/SpacesTable";
import { SpacesListMobile } from "./components/SpacesListMobile";
import { useMediaQuery } from "@/presentation/hooks/useMediaQuery";

export function HostDashboard() {
  const { user } = useAuth();
  const isMobile = useMediaQuery("(max-width: 639px)");
  const {
    spaces,
    activeSpacesCount,
    isLoading,
    isCreating,
    isDeleting,
    isDialogOpen,
    setIsDialogOpen,
    newSpace,
    updateNewSpace,
    handleAddSpace,
    handleDeleteSpace,
    isFormValid,
    recommendedPrice,
  } = useHostDashboard();

  useEffect(() => {
    if (isDialogOpen) {
      setIsDialogOpen(false);
    }
  }, [isMobile]);

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full sm:w-auto">
          {isMobile ? (
            <AddSpaceWizardMobile
              isOpen={isDialogOpen}
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
              isOpen={isDialogOpen}
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
            <SpacesListMobile
              spaces={spaces}
              isLoading={isLoading}
              isDeleting={isDeleting}
              onDeleteSpace={handleDeleteSpace}
            />
          ) : (
            <SpacesTable
              spaces={spaces}
              isLoading={isLoading}
              isDeleting={isDeleting}
              onDeleteSpace={handleDeleteSpace}
            />
          )}
        </CardContent>
      </Card>
    </div> 
  );
}
