"use client";

/**
 * UserReservations
 *
 * Qué hace: Vista de todas las reservaciones del usuario con filtros por status y paginación.
 * Recibe:   nada — obtiene datos via useUserReservations (React Query)
 * Genera:   tabs de filtro, grid de UserReservationCard, paginación, ReviewDialog y ReservationDetailsDialog
 * Procesa:  filteredReservations y tabs memoizados; labels derivados de STATUS_CONFIG
 */
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Calendar, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { ReservationStatus } from "@/core/domain/entities/Reservation";
import { Button } from "@/presentation/components/ui/button";
import { ReviewDialog, ReservationDetailsDialog, UserReservationCard } from "../components";
import { STATUS_CONFIG } from "@/presentation/shared/constants/reservation-status";
import { useUserReservations } from "../hooks/useUserReservations";

type FilterTab = "all" | ReservationStatus;

const PAGE_SIZE = 4;

export function UserReservations() {
  const { reservations, isLoading, isError, errorMessage, reviewedIds, simulatingPaymentId, submitReview, simulatePayment } = useUserReservations();
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [detailsId, setDetailsId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredReservations = useMemo(() =>
    activeTab === "all"
      ? reservations
      : activeTab === "awaiting_payment"
        ? reservations.filter((r) => r.status === "awaiting_payment" || r.status === "accepted")
        : reservations.filter((r) => r.status === activeTab),
    [reservations, activeTab]
  );

  const totalPages = Math.ceil(filteredReservations.length / PAGE_SIZE);

  const paginatedReservations = useMemo(() =>
    filteredReservations.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [filteredReservations, currentPage]
  );

  const tabs: { key: FilterTab; label: string; count: number }[] = useMemo(() => [
    { key: "all",              label: "Todas",                                 count: reservations.length },
    { key: "pending",          label: STATUS_CONFIG.pending.tabLabel,          count: reservations.filter((r) => r.status === "pending").length },
    { key: "awaiting_payment", label: STATUS_CONFIG.awaiting_payment.tabLabel, count: reservations.filter((r) => r.status === "awaiting_payment" || r.status === "accepted").length },
    { key: "confirmed",        label: STATUS_CONFIG.confirmed.tabLabel,        count: reservations.filter((r) => r.status === "confirmed").length },
    { key: "completed",        label: STATUS_CONFIG.completed.tabLabel,        count: reservations.filter((r) => r.status === "completed").length },
    { key: "rejected",         label: STATUS_CONFIG.rejected.tabLabel,         count: reservations.filter((r) => r.status === "rejected").length },
  ], [reservations]);

  const handleSubmitReview = async (rating: number, comment: string) => {
    if (!reviewingId) return;
    setReviewSubmitting(true);
    setReviewError(null);
    try {
      await submitReview(reviewingId, rating, comment);
      setReviewingId(null);
    } catch (error: unknown) {
      setReviewError(error instanceof Error ? error.message : "Error al enviar la reseña");
    } finally {
      setReviewSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Mis Reservaciones</h1>
        <p className="text-muted-foreground">Historial y estado de tus solicitudes de reserva</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key); setCurrentPage(1); }}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === tab.key ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted/40 text-muted-foreground hover:bg-muted/60"
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${activeTab === tab.key ? "bg-primary-foreground/20" : "bg-background"}`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

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
              <p className="text-sm">Cuando reserves un espacio, aparecerá aquí</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            {paginatedReservations.map((reservation) => (
              <UserReservationCard
                key={reservation.id}
                reservation={reservation}
                reviewedIds={reviewedIds}
                simulatingPaymentId={simulatingPaymentId}
                onPay={simulatePayment}
                onDetails={setDetailsId}
                onReview={setReviewingId}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-muted-foreground">
                {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filteredReservations.length)} de {filteredReservations.length}
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled={currentPage <= 1} onClick={() => setCurrentPage((p) => p - 1)} className="rounded-xl">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Button key={p} variant={p === currentPage ? "default" : "outline"} size="sm" onClick={() => setCurrentPage(p)} className="rounded-xl w-9 h-9 p-0">{p}</Button>
                ))}
                <Button variant="outline" size="sm" disabled={currentPage >= totalPages} onClick={() => setCurrentPage((p) => p + 1)} className="rounded-xl">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      <ReviewDialog isOpen={!!reviewingId} onClose={() => { setReviewingId(null); setReviewError(null); }} onSubmit={handleSubmitReview} isSubmitting={reviewSubmitting} error={reviewError} />
      <ReservationDetailsDialog isOpen={!!detailsId} onClose={() => setDetailsId(null)} reservation={reservations.find((r) => r.id === detailsId) ?? null} />
    </div>
  );
}
