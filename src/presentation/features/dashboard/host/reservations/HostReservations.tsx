"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Button } from "@/presentation/components/ui/button";
import {
  Calendar, Loader2,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { Reservation, ReservationStatus } from "@/core/domain/entities/Reservation";
import { reservationRepository } from "@/bootstrap/application";
import { STATUS_CONFIG } from "@/presentation/shared/constants/reservation-status";
import { HostReservationCard } from "../components";

type FilterTab = "all" | ReservationStatus;

export function HostReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const fetchReservations = useCallback(async () => {
    try {
      const data = await reservationRepository.findByHostId();
      setReservations(data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const handleStatusUpdate = async (id: string, status: ReservationStatus) => {
    setUpdatingId(id);
    try {
      await reservationRepository.updateStatus(id, status);
      await fetchReservations();
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredReservations = activeTab === "all"
    ? reservations
    : activeTab === "awaiting_payment"
      ? reservations.filter((r) => r.status === "awaiting_payment" || r.status === "accepted")
      : reservations.filter((r) => r.status === activeTab);

  const totalPages = Math.ceil(filteredReservations.length / pageSize);
  const paginatedReservations = filteredReservations.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: "all",              label: "Todas",           count: reservations.length },
    { key: "pending",         label: "Pendientes",      count: reservations.filter((r) => r.status === "pending").length },
    { key: "awaiting_payment",label: "Esperando Pago",  count: reservations.filter((r) => r.status === "awaiting_payment" || r.status === "accepted").length },
    { key: "confirmed",       label: "Confirmadas",     count: reservations.filter((r) => r.status === "confirmed").length },
    { key: "completed",       label: "Completadas",     count: reservations.filter((r) => r.status === "completed").length },
    { key: "rejected",        label: "Rechazadas",      count: reservations.filter((r) => r.status === "rejected").length },
  ];

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
        </div>
      )}
    </div>
  );
}
