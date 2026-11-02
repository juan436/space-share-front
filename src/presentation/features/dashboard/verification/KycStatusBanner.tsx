import { ShieldCheck, Clock, XCircle, ShieldAlert } from "lucide-react";

type KycStatus = "none" | "pending" | "approved" | "rejected";

const CONFIG: Record<KycStatus, { icon: typeof ShieldCheck; title: string; text: string; box: string; icon_: string }> = {
  none: {
    icon: ShieldAlert,
    title: "Aún no estás verificado",
    text: "Verifica tu identidad para reservar y publicar espacios.",
    box: "bg-muted/40 border-border/60",
    icon_: "bg-muted text-muted-foreground",
  },
  pending: {
    icon: Clock,
    title: "Estamos revisando tus documentos",
    text: "Te avisaremos cuando termine la revisión.",
    box: "bg-amber-50 border-amber-200/70 dark:bg-amber-950/20 dark:border-amber-900/40",
    icon_: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  },
  approved: {
    icon: ShieldCheck,
    title: "Identidad verificada",
    text: "Ya puedes reservar y publicar espacios.",
    box: "bg-emerald-50 border-emerald-200/70 dark:bg-emerald-950/20 dark:border-emerald-900/40",
    icon_: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  },
  rejected: {
    icon: XCircle,
    title: "No pudimos verificar tu identidad",
    text: "Vuelve a enviar tus documentos.",
    box: "bg-red-50 border-red-200/70 dark:bg-red-950/20 dark:border-red-900/40",
    icon_: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
  },
};

interface KycStatusBannerProps {
  status: KycStatus;
  rejectionReason?: string;
}

export function KycStatusBanner({ status, rejectionReason }: KycStatusBannerProps) {
  const c = CONFIG[status] ?? CONFIG.none;
  const Icon = c.icon;
  return (
    <div className={`flex items-start gap-4 p-5 rounded-2xl border ${c.box}`}>
      <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${c.icon_}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <p className="text-base font-bold text-foreground">{c.title}</p>
        <p className="text-sm text-muted-foreground mt-0.5">{c.text}</p>
        {status === "rejected" && rejectionReason && (
          <p className="text-sm text-foreground mt-2">
            <span className="font-semibold">Motivo:</span> {rejectionReason}
          </p>
        )}
      </div>
    </div>
  );
}
