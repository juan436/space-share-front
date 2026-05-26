import { MessageCircle, Mail, Phone, Clock } from "lucide-react";

const contactOptions = [
  {
    icon: Mail,
    title: "Email",
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
  {
    icon: MessageCircle,
    title: "Chat",
    description: "Respuesta inmediata en horario laboral",
    action: "Iniciar chat",
    detail: "Lun–Vie, 8am–6pm",
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
            className="flex flex-col gap-3 p-6 rounded-2xl bg-white dark:bg-card border border-border/50 hover:border-primary/20 hover:shadow-md transition-all duration-300 group"
          >
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-0.5">{opt.title}</h3>
              <p className="text-sm text-muted-foreground">{opt.description}</p>
            </div>
            <p className="text-sm font-semibold text-primary mt-auto">{opt.action}</p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {opt.detail}
            </div>
          </div>
        );
      })}
    </div>
  );
}
