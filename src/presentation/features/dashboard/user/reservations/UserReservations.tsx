"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Calendar, Loader2, Search } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { PaginationBar } from "@/presentation/components/shared/PaginationBar";
import { ReviewDialog, ReservationDetailsDialog, UserReservationCard } from "../components";
import { useUserReservations } from "../hooks/useUserReservations";
import { usePaginatedReservations } from "@/presentation/hooks/usePaginatedReservations";
import { STATUS_CONFIG } from "@/presentation/shared/constants/reservation-status";
import { useToast } from "@/presentation/hooks/use-toast";

const PAGE_SIZE = 6;

export function UserReservations() {
  const { reservations, isLoading, isError, errorMessage, reviewedIds, initiatingPaymentId, submitReview, initiatePayment } = useUserReservations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  useEffect(() => {
    if (searchParams.get("payment") !== "result") return;
    queryClient.invalidateQueries({ queryKey: ["reservations", "user"] });
    toast({ title: "Pago procesado", description: "Verifica el estado de tu reservación." });
    router.replace("/dashboard/user/reservations");
  }, [searchParams, queryClient, toast, router]);
  const [searchQuery, setSearchQuery] = useState("");

  const searchedReservations = searchQuery.trim()
    ? reservations.filter((r) =>
        r.space?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.host?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : reservations;
  const { activeTab, currentPage, setCurrentPage, handleTabChange, filteredReservations, paginatedReservations, totalPages, tabs } = usePaginatedReservations(searchedReservations, PAGE_SIZE);
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [detailsId, setDetailsId] = useState<string | null>(null);

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

      {/* Search + Filters */}
      <div className="bg-white dark:bg-card border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.07)] rounded-2xl p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40 pointer-events-none" />
          <Input
            placeholder="Buscar espacio o anfitrión..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-sm rounded-xl bg-muted/30 border-border/40 focus-visible:ring-primary/20"
          />
        </div>
        <div className="h-px bg-border/40" />
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-0.5">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted/70"
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === tab.key ? "bg-primary-foreground/20" : "bg-muted"}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground mt-2">Cargando reservaciones...</p>
        </div>
      ) : isError ? (
        <div className="bg-white dark:bg-card border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.07)] rounded-2xl p-8 text-center text-muted-foreground">
          <Calendar className="mx-auto h-10 w-10 mb-4 opacity-40" />
          <p className="text-base font-semibold text-foreground">Error al cargar las reservaciones</p>
          <p className="text-sm mt-1">{errorMessage ?? "Intenta recargar la página"}</p>
        </div>
      ) : filteredReservations.length === 0 ? (
        <div className="bg-white dark:bg-card border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.07)] rounded-2xl p-8 text-center text-muted-foreground">
          <Calendar className="mx-auto h-10 w-10 mb-4 opacity-40" />
          <p className="text-base font-semibold text-foreground">No tienes reservaciones {activeTab !== "all" ? STATUS_CONFIG[activeTab]?.label.toLowerCase() + "s" : "aún"}</p>
          <p className="text-sm mt-1">Cuando reserves un espacio, aparecerá aquí</p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedReservations.map((reservation) => (
              <UserReservationCard
                key={reservation.id}
                reservation={reservation}
                reviewedIds={reviewedIds}
                initiatingPaymentId={initiatingPaymentId}
                onPay={initiatePayment}
                onDetails={setDetailsId}
                onReview={setReviewingId}
              />
            ))}
          </div>

          <PaginationBar page={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} className="pt-4" />
        </>
      )}

      <ReviewDialog isOpen={!!reviewingId} onClose={() => { setReviewingId(null); setReviewError(null); }} onSubmit={handleSubmitReview} isSubmitting={reviewSubmitting} error={reviewError} />
      <ReservationDetailsDialog isOpen={!!detailsId} onClose={() => setDetailsId(null)} reservation={reservations.find((r) => r.id === detailsId) ?? null} />
    </div>
  );
}
