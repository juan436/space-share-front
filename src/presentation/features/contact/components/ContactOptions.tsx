import { MessageCircle, Mail, Phone, Clock } from "lucide-react";

const contactOptions = [
  {
    icon: MessageCircle,
    title: "Chat en vivo",
    description: "Respuesta inmediata en horario laboral",
    action: "Iniciar chat",
    detail: "Lun–Vie, 8am–6pm",
  },
  {
    icon: Mail,
    title: "Correo electrónico",
    description: "Te respondemos en menos de 24 horas",
    action: "soporte@spaceshare.sv",
    detail: "Siempre disponible",
  },
  {
    icon: Phone,
    title: "Teléfono",
    description: "Habla directamente con nuestro equipo",
    action: "+503 2222-3333",
    detail: "Lun–Vie, 8am–5pm",
  },
];

export function ContactOptions() {
  return (
    <div className="grid md:grid-cols-3 gap-5 mb-16">
      {contactOptions.map((opt) => {
        const Icon = opt.icon;
        return (
          <div
            key={opt.title}
            className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-md transition-all duration-300 group"
          >
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">{opt.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{opt.description}</p>
            <p className="text-sm font-medium text-primary">{opt.action}</p>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {opt.detail}
            </div>
          </div>
        );
      })}
    </div>
  );
}
