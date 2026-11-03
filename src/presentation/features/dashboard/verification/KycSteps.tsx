import { Check } from "lucide-react";

type KycStatus = "none" | "pending" | "approved" | "rejected";

const STEPS = [
  { title: "Sube la foto de tu DUI", text: "Que se lea claro, sin reflejos ni recortes." },
  { title: "Sube una selfie", text: "Con tu rostro visible y buena iluminación." },
  { title: "Revisamos tus documentos", text: "Un administrador valida tu identidad." },
];

/** Cuántos pasos están completos según el estado de la verificación. */
function doneCount(status: KycStatus): number {
  if (status === "approved") return 3;
  if (status === "pending") return 2;
  return 0;
}

export function KycSteps({ status }: { status: KycStatus }) {
  const done = doneCount(status);

  return (
    <aside className="rounded-2xl bg-white dark:bg-card border border-border shadow-[0_2px_8px_rgba(0,0,0,0.07)] p-6">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">Cómo funciona</h2>
      <ol className="mt-5 space-y-5">
        {STEPS.map((step, i) => {
          const isDone = i < done;
          const isCurrent = i === done;
          return (
            <li key={step.title} className="flex gap-3">
              <span
                className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                  isDone
                    ? "bg-emerald-500 text-white"
                    : isCurrent
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {isDone ? <Check className="w-4 h-4" /> : i + 1}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">{step.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{step.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
      <p className="mt-6 pt-5 border-t border-border text-xs text-muted-foreground">
        Tus documentos solo se usan para verificar tu identidad y los revisa el equipo de SpaceShare.
      </p>
    </aside>
  );
}
