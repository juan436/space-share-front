"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Calendar, Search } from "lucide-react";
import { ReservationsSkeleton } from "@/presentation/components/shared/skeletons/ReservationCardSkeleton";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { PaginationBar } from "@/presentation/components/shared/PaginationBar";
import { ReviewDialog, ReservationDetailsDialog, UserReservationCard } from "../components";
import { WompiCheckoutModal } from "../components/WompiCheckoutModal";
import { useUserReservations } from "../hooks/useUserReservations";
import { usePaginatedReservations } from "@/presentation/hooks/usePaginatedReservations";
import { STATUS_CONFIG } from "@/presentation/shared/constants/reservation-status";
import { useToast } from "@/presentation/hooks/use-toast";
import { useUseCases } from "@/presentation/providers/usecases-context";

const PAGE_SIZE = 6;

export function UserReservations() {
  const { reservations, isLoading, isError, errorMessage, reviewedIds, checkoutReservation, openCheckout, closeCheckout, submitReview } = useUserReservations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { verifyCheckoutUseCase } = useUseCases();

  useEffect(() => {
    if (searchParams.get("payment") !== "result") return;
    router.replace("/dashboard/user/reservations");

    const transactionId = sessionStorage.getItem("pendingWompiTransactionId");
    sessionStorage.removeItem("pendingWompiTransactionId");

    if (!transactionId) {
      queryClient.invalidateQueries({ queryKey: ["reservations", "user"] });
      return;
    }

    verifyCheckoutUseCase.execute(transactionId)
      .then(({ paymentStatus }) => {
        queryClient.invalidateQueries({ queryKey: ["reservations", "user"] });
        if (paymentStatus === "APPROVED") {
          toast({ title: "¡Pago aprobado!", description: "Tu reservación ha sido confirmada." });
        } else {
          toast({ title: "Pago no aprobado", description: "El pago fue rechazado. Intenta de nuevo.", variant: "destructive" });
        }
      })
      .catch(() => {
        queryClient.invalidateQueries({ queryKey: ["reservations", "user"] });
        toast({ title: "Pago procesado", description: "Verifica el estado de tu reservación." });
      });
  }, [searchParams, queryClient, toast, router, verifyCheckoutUseCase]);
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
        <ReservationsSkeleton />
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
                onPay={openCheckout}
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
      <WompiCheckoutModal open={!!checkoutReservation} onOpenChange={(v) => { if (!v) closeCheckout(); }} reservation={checkoutReservation} />
    </div>
  );
}
