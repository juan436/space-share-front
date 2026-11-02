import { ShieldAlert, Clock } from "lucide-react";

interface KycNoticeProps {
  status: "none" | "pending" | "approved" | "rejected";
  onAction: () => void;
}

export function KycNotice({ status, onAction }: KycNoticeProps) {
  if (status === "approved") return null;
  const pending = status === "pending";
  const Icon = pending ? Clock : ShieldAlert;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-border bg-white dark:bg-card px-6 py-5">
      <Icon className="w-7 h-7 text-foreground shrink-0" strokeWidth={1.5} />
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-semibold text-foreground">
          {pending ? "Estamos revisando tu verificación" : status === "rejected" ? "No pudimos verificar tu identidad" : "Verifica tu identidad"}
        </p>
        <p className="text-sm text-muted-foreground">
          {pending ? "Te avisaremos cuando termine la revisión." : "La necesitas para reservar y publicar espacios."}
        </p>
      </div>
      <button onClick={onAction} className="h-11 px-6 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
        {pending ? "Ver estado" : status === "rejected" ? "Volver a enviar" : "Empezar"}
      </button>
    </div>
  );
}
