"use client";

import { useState } from "react";
import { FilterBar } from "@/presentation/components/shared/panel/FilterBar";
import { Calendar } from "lucide-react";
import { ReservationsSkeleton } from "@/presentation/components/shared/skeletons/ReservationCardSkeleton";
import { PaginationBar } from "@/presentation/components/shared/PaginationBar";
import { ReservationStatus } from "@/core/domain/entities/Reservation";
import { STATUS_CONFIG } from "@/presentation/shared/constants/reservation-status";
import { HostReservationCard, HostReservationDetailPage } from "../components";
import { useHostReservations } from "../hooks";
import { usePaginatedReservations } from "@/presentation/hooks/usePaginatedReservations";

const PAGE_SIZE = 6;

export function HostReservations() {
  const { reservations, isLoading, isError, errorMessage, updateStatus, updatingId, submitEvidence, isSubmittingEvidence } = useHostReservations();
  const [searchQuery, setSearchQuery] = useState("");

  const searchedReservations = searchQuery.trim()
    ? reservations.filter((r) =>
        r.space?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.client?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : reservations;
  const { activeTab, currentPage, setCurrentPage, handleTabChange, filteredReservations, paginatedReservations, totalPages, tabs } = usePaginatedReservations(searchedReservations, PAGE_SIZE);
  const [detailsId, setDetailsId] = useState<string | null>(null);

  const handleStatusUpdate = async (id: string, status: ReservationStatus): Promise<void> => {
    await updateStatus({ id, status });
  };

  if (detailsId) {
    return (
      <div className="space-y-6">
        <HostReservationDetailPage
          reservation={reservations.find((r) => r.id === detailsId) ?? null}
          onBack={() => setDetailsId(null)}
          updatingId={updatingId}
          onStatusUpdate={handleStatusUpdate}
          onSubmitEvidence={(id, stage, photos, note) => submitEvidence({ id, stage, photos, note })}
          isSubmittingEvidence={isSubmittingEvidence}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <FilterBar
        search={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Buscar espacio o cliente"
        options={tabs}
        active={activeTab}
        onChange={handleTabChange}
      />

      {isLoading ? (
        <ReservationsSkeleton />
      ) : isError ? (
        <div className="rounded-xl border border-dashed border-border bg-white dark:bg-card py-16 px-8 text-center text-muted-foreground">
          <Calendar className="mx-auto h-10 w-10 mb-4 opacity-40" />
          <p className="text-base font-semibold text-foreground">Error al cargar las reservaciones</p>
          <p className="text-sm mt-1">{errorMessage ?? "Intenta recargar la página"}</p>
        </div>
      ) : filteredReservations.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-white dark:bg-card py-16 px-8 text-center text-muted-foreground">
          <Calendar className="mx-auto h-10 w-10 mb-4 opacity-40" />
          <p className="text-base font-semibold text-foreground">No tienes reservaciones {activeTab !== "all" ? STATUS_CONFIG[activeTab]?.label.toLowerCase() + "s" : "aún"}</p>
          <p className="text-sm mt-1">Cuando alguien reserve tus espacios, aparecerá aquí</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {paginatedReservations.map((reservation) => (
              <HostReservationCard
                key={reservation.id}
                reservation={reservation}
                onDetails={setDetailsId}
              />
            ))}
          </div>

          <PaginationBar page={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} className="pt-4" />
        </>
      )}
    </div>
  );
}
