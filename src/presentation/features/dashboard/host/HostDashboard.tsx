"use client";

import { useState } from "react";
import { AlertCircle, Building2, CheckCircle2, Clock, DollarSign, Search } from "lucide-react";
import { useHostDashboard } from "./hooks";
import { AddSpaceWizard, AddSpaceWizardMobile } from "./components/actions/add-space";
import { EditSpaceDialog } from "./components/actions/edit-space";
import { SpacesTable, MobileSpacesList } from "./components/spaces";
import { useMediaQuery } from "@/presentation/hooks/useMediaQuery";
import { Input } from "@/presentation/components/ui/input";
import Link from "next/link";

const STATS_CONFIG = [
  {
    key: "total",
    label: "Total Espacios",
    sub: (activeCount: number) => `${activeCount} activos`,
    icon: Building2,
    iconClass: "text-slate-500",
    bgClass: "bg-slate-100 dark:bg-slate-800/40",
  },
  {
    key: "active",
    label: "Espacios Activos",
    sub: () => "publicados ahora",
    icon: CheckCircle2,
    iconClass: "text-emerald-600",
    bgClass: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    key: "pending",
    label: "Reservas Pendientes",
    sub: () => "sin confirmar",
    icon: Clock,
    iconClass: "text-amber-600",
    bgClass: "bg-amber-50 dark:bg-amber-950/30",
  },
  {
    key: "income",
    label: "Ingresos del mes",
    sub: () => "este período",
    icon: DollarSign,
    iconClass: "text-teal-600",
    bgClass: "bg-teal-50 dark:bg-teal-950/30",
  },
];

export function HostDashboard() {
  const isMobile = useMediaQuery("(max-width: 639px)");
  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredSpaces = searchQuery.trim()
    ? spaces.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.city?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : spaces;

  const statValues: Record<string, string | number> = {
    total: spaces.length,
    active: activeSpacesCount,
    pending: 0,
    income: "$0",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Mis Espacios</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Gestiona tus anuncios y visibilidad.</p>
        </div>
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

      {actionError && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{actionError}</span>
          <button onClick={clearActionError} className="ml-auto text-xs underline">Cerrar</button>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {STATS_CONFIG.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.key}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white dark:bg-card border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.07)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.10)] hover:border-border/80 transition-all duration-200"
            >
              <div className={`w-9 h-9 rounded-lg ${stat.bgClass} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-4 h-4 ${stat.iconClass}`} />
              </div>
              <div className="min-w-0">
                <p className="text-xl font-bold text-foreground tracking-tight leading-none">{statValues[stat.key]}</p>
                <p className="text-[11px] font-semibold text-muted-foreground mt-0.5 truncate">{stat.label}</p>
                <p className="text-[10px] text-muted-foreground/60 truncate">{stat.sub(activeSpacesCount)}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Table card */}
      <div className="rounded-2xl bg-white dark:bg-card border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.07)] overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-border/40">
          <h2 className="text-base font-semibold text-foreground">Listado de Espacios</h2>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 pointer-events-none" />
            <Input
              placeholder="Buscar por nombre o ubicación..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-sm rounded-xl bg-muted/30 border-border/40 focus-visible:ring-primary/20"
            />
          </div>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {isMobile ? (
            <MobileSpacesList
              spaces={filteredSpaces}
              isLoading={isLoading}
              isDeleting={isDeleting}
              isUpdating={isUpdating}
              onDeleteSpace={handleDeleteSpace}
              onUpdateStatus={handleUpdateStatus}
              onEditSpace={handleEditSpace}
            />
          ) : (
            <SpacesTable
              spaces={filteredSpaces}
              isLoading={isLoading}
              isDeleting={isDeleting}
              isUpdating={isUpdating}
              onDeleteSpace={handleDeleteSpace}
              onUpdateStatus={handleUpdateStatus}
              onEditSpace={handleEditSpace}
            />
          )}
        </div>
        {!isLoading && (
          <div className="px-6 py-3 border-t border-border/40">
            <p className="text-xs text-muted-foreground">
              Mostrando {filteredSpaces.length} de {spaces.length} espacios
            </p>
          </div>
        )}
      </div>

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
