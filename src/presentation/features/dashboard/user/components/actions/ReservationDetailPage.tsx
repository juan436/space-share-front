import { Calendar, MapPin, DollarSign, CheckCircle2, ArrowRight, KeyRound } from "lucide-react";
import { Reservation, EvidenceStage } from "@/core/domain/entities/Reservation";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Breadcrumb } from "@/presentation/components/shared/Breadcrumb";
import { SiteEvidenceSection } from "@/presentation/components/shared/SiteEvidenceSection";
import { useAuth } from "@/presentation/providers/auth-context";

interface ReservationDetailPageProps {
  reservation: Reservation | null;
  onBack: () => void;
  onSubmitEvidence: (id: string, stage: EvidenceStage, photos: File[], note: string) => Promise<unknown>;
  isSubmittingEvidence: boolean;
}

export function ReservationDetailPage({
  reservation,
  onBack,
  onSubmitEvidence,
  isSubmittingEvidence,
}: ReservationDetailPageProps) {
  const { user } = useAuth();
  if (!reservation) return null;

  return (
    <div className="space-y-4">
      <Breadcrumb
        items={[
          { label: "Mis Reservaciones", onClick: onBack },
          { label: reservation.space?.title ?? "Reservación" },
        ]}
      />

      <div className="bg-white dark:bg-card border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.07)] rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <h2 className="text-xl font-bold text-foreground">Reserva Confirmada</h2>
        </div>
        <p className="text-sm text-muted-foreground -mt-3">
          Tu espacio está reservado. Aquí tienes los detalles para tu estadía.
        </p>

        {reservation.space?.images?.[0] && (
          <div className="h-48 w-full rounded-xl overflow-hidden">
            <img
              src={reservation.space.images[0]}
              alt={reservation.space.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="space-y-3">
          <h3 className="font-bold text-lg">{reservation.space?.title}</h3>

          {reservation.space?.location && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>
                {reservation.space.location.city}, {reservation.space.location.state}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm bg-muted/30 border border-border/40 rounded-xl p-3">
            <Calendar className="w-4 h-4 text-primary shrink-0" />
            <span className="font-medium">
              {format(reservation.startDate, "d MMM yyyy", { locale: es })}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="font-medium">
              {format(reservation.endDate, "d MMM yyyy", { locale: es })}
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {reservation.host && (
              <div className="flex-1 min-w-[180px] flex items-center gap-3 p-3 bg-muted/30 rounded-xl border border-border/40">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {reservation.host.name?.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Anfitrión</p>
                  <p className="font-semibold text-sm truncate">{reservation.host.name}</p>
                </div>
              </div>
            )}

            <div className="flex-1 min-w-[140px] p-3 bg-muted/30 rounded-xl border border-border/40">
              <p className="text-xs text-muted-foreground">Total pagado</p>
              <p className="font-bold text-lg flex items-center gap-1 text-emerald-600">
                <DollarSign className="w-4 h-4" />
                {reservation.totalPrice}
              </p>
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

          <p className="text-xs text-muted-foreground text-center bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 p-2.5 rounded-lg font-medium">
            ✓ Pago recibido · Tu espacio está asegurado para estas fechas
          </p>

          <SiteEvidenceSection
            reservation={reservation}
            currentUserId={user?.id}
            isSubmitting={isSubmittingEvidence}
            onSubmit={(stage, photos, note) => onSubmitEvidence(reservation.id, stage, photos, note)}
          />
        </div>
      </div>
    </div>
  );
}
