import { MapPin } from "lucide-react";

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
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6">Preguntas frecuentes</h2>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="p-5 rounded-xl bg-card border border-border/40 hover:border-primary/15 transition-colors">
            <h4 className="font-semibold text-foreground mb-2 text-sm">{faq.q}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 p-5 rounded-xl bg-primary/5 border border-primary/15 flex items-start gap-3">
        <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-foreground">Oficina central</p>
          <p className="text-sm text-muted-foreground mt-0.5">San Salvador, El Salvador</p>
        </div>
      </div>
    </div>
  );
}
