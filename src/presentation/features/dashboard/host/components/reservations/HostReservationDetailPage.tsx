import { Calendar, MapPin, DollarSign, ArrowRight, MessageSquare, CheckCircle2, XCircle, Loader2, KeyRound } from "lucide-react";
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
    <div className="space-y-4">
      <Breadcrumb
        items={[
          { label: "Reservaciones", onClick: onBack },
          { label: reservation.space?.title ?? "Reservación" },
        ]}
      />

      <div className="bg-white dark:bg-card border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.07)] rounded-2xl p-5 space-y-4">
        <h2 className="text-xl font-bold text-foreground">Detalle de Reservación</h2>

        {reservation.space?.images?.[0] && (
          <div className="h-48 w-full rounded-xl overflow-hidden">
            <img src={reservation.space.images[0]} alt={reservation.space.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-lg leading-snug">{reservation.space?.title}</h3>
            <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 shrink-0 ${statusCfg.color}`}>
              <StatusIcon className="w-3 h-3" />
              {statusCfg.label}
            </span>
          </div>

          {reservation.space?.location && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{reservation.space.location.city}, {reservation.space.location.state}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm bg-muted/40 rounded-xl p-3">
            <Calendar className="w-4 h-4 text-primary shrink-0" />
            <span className="font-medium">{format(reservation.startDate, "d MMM yyyy", { locale: es })}</span>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="font-medium">{format(reservation.endDate, "d MMM yyyy", { locale: es })}</span>
          </div>

          <div className="flex flex-wrap gap-3">
            {reservation.client && (
              <div className="flex-1 min-w-[180px] flex items-center gap-3 p-3 bg-muted/30 rounded-xl border border-border/40">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {reservation.client.name?.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Cliente</p>
                  <p className="font-semibold text-sm truncate">{reservation.client.name}</p>
                </div>
              </div>
            )}

            <div className="flex-1 min-w-[140px] p-3 bg-muted/30 rounded-xl border border-border/40">
              <p className="text-xs text-muted-foreground">Precio</p>
              <p className="font-bold text-lg flex items-center gap-0.5 text-emerald-600">
                <DollarSign className="w-4 h-4" />{reservation.totalPrice}
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Base ${reservation.basePrice}</p>
            </div>

            {reservation.eventCode && (
              <div className="flex-1 min-w-[160px] p-3 rounded-xl bg-violet-50 dark:bg-violet-950/20 border border-violet-200/60 dark:border-violet-800/40">
                <p className="text-xs font-semibold text-violet-700 dark:text-violet-400 flex items-center gap-1">
                  <KeyRound className="w-3.5 h-3.5" />Código de entrega/retiro
                </p>
                <p className="text-lg font-bold tracking-wider text-violet-700 dark:text-violet-400">{reservation.eventCode}</p>
              </div>
            )}
          </div>

          {reservation.notes && (
            <div className="p-3 bg-muted/30 rounded-xl border border-border/40">
              <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1 mb-1">
                <MessageSquare className="w-3 h-3" /> Mensaje del cliente
              </p>
              <p className="text-sm text-foreground">{reservation.notes}</p>
            </div>
          )}

          {(reservation.status === "confirmed" || reservation.status === "completed") && (
            <SiteEvidenceSection
              reservation={reservation}
              currentUserId={user?.id}
              isSubmitting={isSubmittingEvidence}
              onSubmit={(stage, photos, note) => onSubmitEvidence(reservation.id, stage, photos, note)}
            />
          )}

          {isPending && (
            <div className="flex gap-3 pt-1">
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
          )}
        </div>
      </div>
    </div>
  );
}
