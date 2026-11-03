import { Calendar, MapPin, DollarSign, ArrowRight, KeyRound, CheckCircle2, User } from "lucide-react";
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
    <div className="space-y-5">
      <Breadcrumb
        items={[
          { label: "Mis Reservaciones", onClick: onBack },
          { label: reservation.space?.title ?? "Reservación" },
        ]}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wide mb-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Reserva confirmada
          </div>
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
              <img
                src={reservation.space.images[0]}
                alt={reservation.space.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <hr className="border-t border-border/60" />

          <SiteEvidenceSection
            reservation={reservation}
            currentUserId={user?.id}
            isSubmitting={isSubmittingEvidence}
            onSubmit={(stage, photos, note) => onSubmitEvidence(reservation.id, stage, photos, note)}
          />
        </div>

        {/* Sidebar resumen */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24 flex flex-col gap-4">
            <div className="bg-white dark:bg-card border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.07)] rounded-2xl p-5 space-y-4">
              <h2 className="text-lg font-semibold tracking-tight text-foreground">Resumen de tu estadía</h2>

              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-primary shrink-0" />
                <span className="font-medium">{format(reservation.startDate, "d MMM yyyy", { locale: es })}</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="font-medium">{format(reservation.endDate, "d MMM yyyy", { locale: es })}</span>
              </div>

              {reservation.host && (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {reservation.host.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <User className="w-3 h-3" />Anfitrión
                    </p>
                    <p className="font-semibold text-sm truncate">{reservation.host.name}</p>
                  </div>
                </div>
              )}

              <hr className="border-t border-border/50" />

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total pagado</span>
                <span className="font-bold text-xl flex items-center gap-0.5 text-emerald-600">
                  <DollarSign className="w-4 h-4" />
                  {reservation.totalPrice}
                </span>
              </div>

              <p className="text-xs text-muted-foreground text-center bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 py-2 rounded-lg font-medium">
                Tu espacio está asegurado para estas fechas
              </p>
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
