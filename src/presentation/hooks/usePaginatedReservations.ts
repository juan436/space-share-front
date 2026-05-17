import { useState, useMemo } from "react";
import { Reservation, ReservationStatus } from "@/core/domain/entities/Reservation";
import { STATUS_CONFIG } from "@/presentation/shared/constants/reservation-status";

type FilterTab = "all" | ReservationStatus;

export function usePaginatedReservations(reservations: Reservation[], pageSize: number) {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredReservations = useMemo(() =>
    activeTab === "all"
      ? reservations
      : activeTab === "awaiting_payment"
        ? reservations.filter((r) => r.status === "awaiting_payment" || r.status === "accepted")
        : reservations.filter((r) => r.status === activeTab),
    [reservations, activeTab]
  );

  const totalPages = Math.ceil(filteredReservations.length / pageSize);

  const paginatedReservations = useMemo(() =>
    filteredReservations.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [filteredReservations, currentPage, pageSize]
  );

  const tabs: { key: FilterTab; label: string; count: number }[] = useMemo(() => [
    { key: "all",              label: "Todas",                                 count: reservations.length },
    { key: "pending",          label: STATUS_CONFIG.pending.tabLabel,          count: reservations.filter((r) => r.status === "pending").length },
    { key: "awaiting_payment", label: STATUS_CONFIG.awaiting_payment.tabLabel, count: reservations.filter((r) => r.status === "awaiting_payment" || r.status === "accepted").length },
    { key: "confirmed",        label: STATUS_CONFIG.confirmed.tabLabel,        count: reservations.filter((r) => r.status === "confirmed").length },
    { key: "completed",        label: STATUS_CONFIG.completed.tabLabel,        count: reservations.filter((r) => r.status === "completed").length },
    { key: "rejected",         label: STATUS_CONFIG.rejected.tabLabel,         count: reservations.filter((r) => r.status === "rejected").length },
  ], [reservations]);

  const handleTabChange = (tab: FilterTab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return {
    activeTab,
    currentPage,
    setCurrentPage,
    handleTabChange,
    filteredReservations,
    paginatedReservations,
    totalPages,
    tabs,
  };
}
