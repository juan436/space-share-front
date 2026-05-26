"use client";

import { useState } from "react";
import { Plus, Minus, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";

const faqs = [
  {
    q: "¿Cómo sé que el espacio es seguro?",
    a: "Todos los espacios pasan por un proceso de verificación. Revisamos la identidad del anfitrión, las condiciones del espacio y validamos que cumpla con los estándares de la plataforma.",
  },
  {
    q: "¿Puedo cancelar una reserva?",
    a: "Sí. Puedes cancelar hasta 48 horas antes del inicio del período sin costo. Cancelaciones posteriores pueden aplicar una tarifa según la política del anfitrión.",
  },
  {
    q: "¿Qué pasa si el espacio no es como se describe?",
    a: "Tienes 24 horas desde el inicio de la reserva para reportar cualquier discrepancia. Nuestro equipo mediará y, si corresponde, procesará un reembolso completo.",
  },
  {
    q: "¿Cómo se realizan los pagos?",
    a: "Los pagos se procesan de forma segura a través de la plataforma. El dinero se libera al anfitrión solo después de que confirmes que todo está en orden.",
  },
];

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6">Preguntas frecuentes</h2>

      <div className="space-y-2">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-xl border border-border/40 bg-white dark:bg-card overflow-hidden transition-colors hover:border-primary/20"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm font-semibold text-foreground">{faq.q}</span>
                {isOpen
                  ? <Minus className="w-4 h-4 text-primary flex-shrink-0" />
                  : <Plus className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                }
              </button>
              {isOpen && (
                <div className="px-5 pb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-5 rounded-xl bg-primary/5 border border-primary/15 flex items-start gap-3">
        <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-foreground">Oficina central</p>
          <p className="text-sm text-muted-foreground mt-0.5">San Salvador, El Salvador</p>
        </div>
      </div>

      <div className="mt-4 p-5 rounded-xl bg-accent/8 border border-accent/15 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-foreground">¿No encontraste lo que buscabas?</p>
          <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
            Nuestros expertos están disponibles 24/7 para ayudarte de forma personalizada.
          </p>
        </div>
        <Button
          size="sm"
          className="flex-shrink-0 rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground gap-2 px-4"
        >
          <MessageCircle className="w-4 h-4" />
          Hablar al Equipo
        </Button>
      </div>
    </div>
  );
}
