"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Calendar } from "lucide-react";
import { ReservationsSkeleton } from "@/presentation/components/shared/skeletons/ReservationCardSkeleton";
import { FilterBar } from "@/presentation/components/shared/panel/FilterBar";
import { PaginationBar } from "@/presentation/components/shared/PaginationBar";
import { ReviewDialog, ReservationDetailPage, UserReservationCard, PaymentResultBanner } from "../components";
import { WompiCheckoutModal } from "../components/WompiCheckoutModal";
import { useUserReservations } from "../hooks/useUserReservations";
import { usePaginatedReservations } from "@/presentation/hooks/usePaginatedReservations";
import { STATUS_CONFIG } from "@/presentation/shared/constants/reservation-status";
import { useToast } from "@/presentation/hooks/use-toast";
import { useUseCases } from "@/presentation/providers/usecases-context";

interface PaymentResult {
  status: "APPROVED" | "DECLINED";
  reason?: string;
}

const PAGE_SIZE = 6;

export function UserReservations() {
  const { reservations, isLoading, isError, errorMessage, reviewedIds, checkoutReservation, openCheckout, closeCheckout, submitReview, submitEvidence, isSubmittingEvidence } = useUserReservations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { verifyCheckoutUseCase } = useUseCases();
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);

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
      .then(({ paymentStatus, declineReason }) => {
        queryClient.invalidateQueries({ queryKey: ["reservations", "user"] });
        setPaymentResult(
          paymentStatus === "APPROVED"
            ? { status: "APPROVED" }
            : { status: "DECLINED", reason: declineReason }
        );
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

  if (detailsId) {
    return (
      <div className="space-y-6">
        <ReservationDetailPage
          reservation={reservations.find((r) => r.id === detailsId) ?? null}
          onBack={() => setDetailsId(null)}
          onSubmitEvidence={(id, stage, photos, note) => submitEvidence({ id, stage, photos, note })}
          isSubmittingEvidence={isSubmittingEvidence}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {paymentResult && (
        <PaymentResultBanner
          status={paymentResult.status}
          reason={paymentResult.reason}
          onDismiss={() => setPaymentResult(null)}
        />
      )}

      <FilterBar
        search={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Buscar espacio o anfitrión"
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
          <p className="text-sm mt-1">Cuando reserves un espacio, aparecerá aquí</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8">
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
      <WompiCheckoutModal open={!!checkoutReservation} onOpenChange={(v) => { if (!v) closeCheckout(); }} reservation={checkoutReservation} />
    </div>
  );
}
