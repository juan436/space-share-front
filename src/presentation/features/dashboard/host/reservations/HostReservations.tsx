"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/presentation/components/ui/card";
import { Button } from "@/presentation/components/ui/button";
import {
  Calendar, CheckCircle2, XCircle, Clock, Loader2,
  MapPin, User, MessageSquare, DollarSign, ChevronLeft, ChevronRight,
} from "lucide-react";
import { Reservation, ReservationStatus } from "@/core/domain/entities/Reservation";
import { reservationRepository } from "@/bootstrap/application";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: "Pendiente", color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400", icon: Clock },
  accepted: { label: "Aceptada", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400", icon: CheckCircle2 },
  rejected: { label: "Rechazada", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400", icon: XCircle },
  cancelled: { label: "Cancelada", color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400", icon: XCircle },
  completed: { label: "Completada", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400", icon: CheckCircle2 },
};

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
          {paginatedReservations.map((reservation) => {
            const statusCfg = STATUS_CONFIG[reservation.status] || STATUS_CONFIG.pending;
            const StatusIcon = statusCfg.icon;

            return (
              <Card key={reservation.id} className="overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="h-40 sm:h-auto sm:w-48 shrink-0 bg-muted overflow-hidden">
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

                  {/* Content */}
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="font-bold text-lg">{reservation.space?.title || "Espacio"}</h3>
                        {reservation.space?.location && (
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3.5 h-3.5" />
                            {reservation.space.location.city}, {reservation.space.location.state}
                          </p>
                        )}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shrink-0 ${statusCfg.color}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {statusCfg.label}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm mb-4">
                      <div>
                        <p className="text-muted-foreground text-xs font-medium">Cliente</p>
                        <p className="font-semibold flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-muted-foreground" />
                          {reservation.client?.name || "Usuario"}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs font-medium">Fechas</p>
                        <p className="font-semibold">
                          {format(reservation.startDate, "d MMM", { locale: es })} - {format(reservation.endDate, "d MMM yy", { locale: es })}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs font-medium">Ganancia</p>
                        <p className="font-semibold flex items-center gap-1">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                          ${reservation.basePrice}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs font-medium">Total cliente</p>
                        <p className="font-semibold">${reservation.totalPrice}</p>
                      </div>
                    </div>

                    {reservation.notes && (
                      <div className="p-3 rounded-lg bg-muted/30 border border-border/50 mb-4">
                        <p className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-1">
                          <MessageSquare className="w-3 h-3" /> Mensaje del cliente
                        </p>
                        <p className="text-sm">{reservation.notes}</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    {reservation.status === "pending" && (
                      <div className="flex gap-3">
                        <Button
                          size="sm"
                          onClick={() => handleStatusUpdate(reservation.id, "accepted")}
                          disabled={updatingId === reservation.id}
                          className="rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                          {updatingId === reservation.id ? (
                            <Loader2 className="w-4 h-4 animate-spin mr-1" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                          )}
                          Aceptar Reserva
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusUpdate(reservation.id, "rejected")}
                          disabled={updatingId === reservation.id}
                          className="rounded-xl font-bold text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-950/20"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Rechazar
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}

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
