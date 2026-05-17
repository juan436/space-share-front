"use client";

/**
 * HostReservations
 *
 * Qué hace: Vista de todas las reservaciones del host con filtros por status y paginación.
 * Recibe:   nada — obtiene datos via useHostReservations (React Query)
 * Genera:   tabs de filtro, grid de HostReservationCard, paginación y dialogs de detalle
 * Procesa:  filteredReservations y tabs memoizados; updateStatus con invalidación de cache automática
 */
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Button } from "@/presentation/components/ui/button";
import { Calendar, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { ReservationStatus } from "@/core/domain/entities/Reservation";
import { STATUS_CONFIG } from "@/presentation/shared/constants/reservation-status";
import { HostReservationCard } from "../components";
import { useHostReservations } from "../hooks";
import { usePaginatedReservations } from "@/presentation/hooks/usePaginatedReservations";

const PAGE_SIZE = 3; // host ve tarjetas más densas (info de cliente + acciones) → caben menos por página

export function HostReservations() {
  const { reservations, isLoading, isError, errorMessage, updateStatus, updatingId } = useHostReservations();
  const { activeTab, currentPage, setCurrentPage, handleTabChange, filteredReservations, paginatedReservations, totalPages, tabs } = usePaginatedReservations(reservations, PAGE_SIZE);

  const handleStatusUpdate = async (id: string, status: ReservationStatus): Promise<void> => {
    await updateStatus({ id, status });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reservaciones</h1>
        <p className="text-muted-foreground">Gestiona las solicitudes de reserva de tus espacios</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === tab.key
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted/40 text-muted-foreground hover:bg-muted/60"
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${
                activeTab === tab.key ? "bg-primary-foreground/20" : "bg-background"
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="text-center py-12">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground mt-2">Cargando reservaciones...</p>
        </div>
      ) : isError ? (
        <Card>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p className="text-lg font-medium">Error al cargar las reservaciones</p>
              <p className="text-sm">{errorMessage ?? "Intenta recargar la página"}</p>
            </div>
          </CardContent>
        </Card>
      ) : filteredReservations.length === 0 ? (
        <Card>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p className="text-lg font-medium">No tienes reservaciones {activeTab !== "all" ? STATUS_CONFIG[activeTab]?.label.toLowerCase() + "s" : "aún"}</p>
              <p className="text-sm">Cuando alguien reserve tus espacios, aparecerá aquí</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {paginatedReservations.map((reservation) => (
            <HostReservationCard
              key={reservation.id}
              reservation={reservation}
              updatingId={updatingId}
              onStatusUpdate={handleStatusUpdate}
            />
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-muted-foreground">
                {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filteredReservations.length)} de {filteredReservations.length}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="rounded-xl"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Button
                    key={p}
                    variant={p === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(p)}
                    className="rounded-xl w-9 h-9 p-0"
                  >
                    {p}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="rounded-xl"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
