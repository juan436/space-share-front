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
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-amber-300 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 px-5 py-4">
      <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-foreground">
          {pending ? "Tu verificación está en revisión" : status === "rejected" ? "Tu verificación fue rechazada" : "Verifica tu identidad"}
        </p>
        <p className="text-sm text-muted-foreground">
          {pending ? "Te avisaremos cuando termine la revisión." : "La necesitas para reservar y publicar espacios."}
        </p>
      </div>
      <button onClick={onAction} className="h-10 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
        {pending ? "Ver estado" : status === "rejected" ? "Volver a enviar" : "Verificar ahora"}
      </button>
    </div>
  );
}
