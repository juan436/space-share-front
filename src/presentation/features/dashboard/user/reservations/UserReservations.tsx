"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/presentation/components/ui/card";
import {
  Calendar, CheckCircle2, XCircle, Clock, Loader2,
  MapPin, DollarSign, ArrowRight, Star, ChevronLeft, ChevronRight,
} from "lucide-react";
import { Reservation, ReservationStatus } from "@/core/domain/entities/Reservation";
import { reservationRepository, reviewRepository } from "@/bootstrap/application";
import { Button } from "@/presentation/components/ui/button";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ReviewDialog } from "../components";


const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: "Pendiente", color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400", icon: Clock },
  accepted: { label: "Aceptada", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400", icon: CheckCircle2 },
  rejected: { label: "Rechazada", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400", icon: XCircle },
  cancelled: { label: "Cancelada", color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400", icon: XCircle },
  completed: { label: "Completada", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400", icon: CheckCircle2 },
};

type FilterTab = "all" | ReservationStatus;

export function UserReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewedIds, setReviewedIds] = useState<Set<string>>(new Set());
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await reservationRepository.findByClientId();
        setReservations(data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleSubmitReview = async (rating: number, comment: string) => {
    if (!reviewingId) return;
    const reservation = reservations.find((r) => r.id === reviewingId);
    if (!reservation) return;

    setReviewSubmitting(true);
    setReviewError(null);
    try {
      await reviewRepository.create({
        spaceId: reservation.spaceId,
        reservationId: reservation.id,
        rating,
        comment,
      });
      setReviewedIds((prev) => new Set(prev).add(reservation.id));
      setReviewingId(null);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Error al enviar reseña";
      setReviewError(typeof msg === "string" ? msg : msg[0]);
    } finally {
      setReviewSubmitting(false);
    }
  };

  const filteredReservations = activeTab === "all"
    ? reservations
    : reservations.filter((r) => r.status === activeTab);

  const totalPages = Math.ceil(filteredReservations.length / pageSize);
  const paginatedReservations = filteredReservations.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: "all", label: "Todas", count: reservations.length },
    { key: "pending", label: "Pendientes", count: reservations.filter((r) => r.status === "pending").length },
    { key: "accepted", label: "Aceptadas", count: reservations.filter((r) => r.status === "accepted").length },
    { key: "rejected", label: "Rechazadas", count: reservations.filter((r) => r.status === "rejected").length },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Mis Reservaciones</h1>
        <p className="text-muted-foreground">Historial y estado de tus solicitudes de reserva</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key); setCurrentPage(1); }}
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
          {paginatedReservations.map((reservation) => {
            const statusCfg = STATUS_CONFIG[reservation.status] || STATUS_CONFIG.pending;
            const StatusIcon = statusCfg.icon;

            return (
              <Card key={reservation.id} className="overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                {/* Image */}
                <div className="h-40 w-full bg-muted shrink-0 overflow-hidden">
                  {reservation.space?.images?.[0] ? (
                    <img
                      src={reservation.space.images[0]}
                      alt={reservation.space.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-muted-foreground/30" />
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold">{reservation.space?.title || "Espacio"}</h3>
                      {reservation.space?.location && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" />
                          {reservation.space.location.city}, {reservation.space.location.state}
                        </p>
                      )}
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 shrink-0 ${statusCfg.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {statusCfg.label}
                    </span>
                  </div>

                  {/* Dates */}
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">
                      {format(reservation.startDate, "d MMM yy", { locale: es })}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="font-medium">
                      {format(reservation.endDate, "d MMM yy", { locale: es })}
                    </span>
                  </div>

                  {/* Host */}
                  {reservation.host && (
                    <p className="text-xs text-muted-foreground">
                      Anfitrión: <span className="font-medium text-foreground">{reservation.host.name}</span>
                    </p>
                  )}

                  {/* Price */}
                  <div className="flex items-center justify-between pt-2 border-t border-border/40">
                    <span className="text-sm text-muted-foreground">Total</span>
                    <span className="font-bold text-lg flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-primary" />
                      {reservation.totalPrice}
                    </span>
                  </div>

                  {/* Status message */}
                  {reservation.status === "pending" && (
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-medium bg-amber-50 dark:bg-amber-950/20 p-2 rounded-lg">
                      Esperando respuesta del anfitrión...
                    </p>
                  )}
                  {reservation.status === "accepted" && (
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/20 p-2 rounded-lg">
                      Tu reserva ha sido aprobada
                    </p>
                  )}
                  {reservation.status === "rejected" && (
                    <p className="text-xs text-red-600 dark:text-red-400 font-medium bg-red-50 dark:bg-red-950/20 p-2 rounded-lg">
                      El anfitrión ha rechazado esta solicitud
                    </p>
                  )}

                  {/* Review Section */}
                  {(reservation.status === "accepted" || reservation.status === "completed") && !reviewedIds.has(reservation.id) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setReviewingId(reservation.id)}
                      className="w-full rounded-xl gap-2 mt-1"
                    >
                      <Star className="w-3.5 h-3.5" />
                      Dejar reseña
                    </Button>
                  )}
                  {reviewedIds.has(reservation.id) && (
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5 pt-2">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Reseña enviada
                    </p>
                  )}
                </div>
              </Card>
            );
          })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-muted-foreground">
                {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filteredReservations.length)} de {filteredReservations.length}
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
        </>
      )}

      {/* Review Dialog Modal */}
      <ReviewDialog
        isOpen={!!reviewingId}
        onClose={() => setReviewingId(null)}
        onSubmit={handleSubmitReview}
        isSubmitting={reviewSubmitting}
        error={reviewError}
      />
    </div>
  );
}
