import { Calendar, MapPin, DollarSign, ArrowRight, MessageSquare, CheckCircle2, XCircle, Loader2, KeyRound, User } from "lucide-react";
import { Reservation, ReservationStatus, EvidenceStage } from "@/core/domain/entities/Reservation";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Breadcrumb } from "@/presentation/components/shared/Breadcrumb";
import { STATUS_CONFIG } from "@/presentation/shared/constants/reservation-status";
import { Button } from "@/presentation/components/ui/button";
import { SiteEvidenceSection } from "@/presentation/components/shared/SiteEvidenceSection";
import { useAuth } from "@/presentation/providers/auth-context";

interface HostReservationDetailPageProps {
  reservation: Reservation | null;
  onBack: () => void;
  updatingId: string | null;
  onStatusUpdate: (id: string, status: ReservationStatus) => Promise<void>;
  onSubmitEvidence: (id: string, stage: EvidenceStage, photos: File[], note: string) => Promise<unknown>;
  isSubmittingEvidence: boolean;
}

export function HostReservationDetailPage({
  reservation,
  onBack,
  updatingId,
  onStatusUpdate,
  onSubmitEvidence,
  isSubmittingEvidence,
}: HostReservationDetailPageProps) {
  const { user } = useAuth();
  if (!reservation) return null;

  const statusCfg = STATUS_CONFIG[reservation.status] || STATUS_CONFIG.pending;
  const StatusIcon = statusCfg.icon;
  const isPending = reservation.status === "pending";
  const isUpdating = updatingId === reservation.id;

  const handleAction = async (status: ReservationStatus) => {
    await onStatusUpdate(reservation.id, status);
    onBack();
  };

  return (
    <div className="space-y-5">
      <Breadcrumb
        items={[
          { label: "Reservaciones", onClick: onBack },
          { label: reservation.space?.title ?? "Reservación" },
        ]}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold mb-1.5 ${statusCfg.color}`}>
            <StatusIcon className="w-3 h-3" />
            {statusCfg.label}
          </span>
          <h1 className="text-2xl font-bold text-foreground leading-tight">{reservation.space?.title}</h1>
          {reservation.space?.location && (
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              {reservation.space.location.city}, {reservation.space.location.state}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Columna principal */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {reservation.space?.images?.[0] && (
            <div className="h-56 sm:h-72 w-full rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
              <img src={reservation.space.images[0]} alt={reservation.space.title} className="w-full h-full object-cover" />
            </div>
          )}

          {reservation.notes && (
            <div className="p-4 bg-muted/30 rounded-2xl border border-border/40">
              <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1 mb-1">
                <MessageSquare className="w-3 h-3" /> Mensaje del cliente
              </p>
              <p className="text-sm text-foreground">{reservation.notes}</p>
            </div>
          )}

          <hr className="border-t border-border/60" />

          {(reservation.status === "confirmed" || reservation.status === "completed") && (
            <SiteEvidenceSection
              reservation={reservation}
              currentUserId={user?.id}
              isSubmitting={isSubmittingEvidence}
              onSubmit={(stage, photos, note) => onSubmitEvidence(reservation.id, stage, photos, note)}
            />
          )}
        </div>

        {/* Sidebar resumen */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24 flex flex-col gap-4">
            {isPending && (
              <div className="bg-white dark:bg-card border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.07)] rounded-2xl p-5 space-y-3">
                <p className="text-sm font-bold text-foreground">Esta solicitud espera tu respuesta</p>
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleAction("accepted")}
                    disabled={isUpdating}
                    className="flex-1 rounded-xl gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                    Aceptar
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleAction("rejected")}
                    disabled={isUpdating}
                    className="flex-1 rounded-xl gap-2 text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-950/20"
                  >
                    <XCircle className="w-4 h-4" />
                    Rechazar
                  </Button>
                </div>
              </div>
            )}

            <div className="bg-white dark:bg-card border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.07)] rounded-2xl p-5 space-y-4">
              <h2 className="text-lg font-semibold tracking-tight text-foreground">Detalle de la reserva</h2>

              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-primary shrink-0" />
                <span className="font-medium">{format(reservation.startDate, "d MMM yyyy", { locale: es })}</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="font-medium">{format(reservation.endDate, "d MMM yyyy", { locale: es })}</span>
              </div>

              {reservation.client && (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {reservation.client.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <User className="w-3 h-3" />Cliente
                    </p>
                    <p className="font-semibold text-sm truncate">{reservation.client.name}</p>
                  </div>
                </div>
              )}

              <hr className="border-t border-border/50" />

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Precio</span>
                <div className="text-right">
                  <span className="font-bold text-xl flex items-center gap-0.5 text-emerald-600">
                    <DollarSign className="w-4 h-4" />{reservation.totalPrice}
                  </span>
                  <p className="text-[11px] text-muted-foreground">Base ${reservation.basePrice}</p>
                </div>
              </div>
            </div>

            {reservation.eventCode && (
              <div className="rounded-2xl bg-violet-600 dark:bg-violet-700 p-5 text-center text-white shadow-[0_4px_16px_rgba(124,58,237,0.25)]">
                <p className="text-xs font-semibold text-violet-100 flex items-center justify-center gap-1.5 uppercase tracking-wide">
                  <KeyRound className="w-3.5 h-3.5" />Código de entrega/retiro
                </p>
                <p className="text-3xl font-bold tracking-[0.2em] mt-2">{reservation.eventCode}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
