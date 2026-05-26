import { Wifi, Car, Coffee, Printer, Phone, Shield, Snowflake, Check } from "lucide-react";
import { Checkbox } from "@/presentation/components/ui/checkbox";
import { cn } from "@/presentation/utils/cn";
import { BusinessSpaceData } from "../../../hooks/useBusinessSpaceForm";

const serviceOptions = [
  { key: "wifi",           label: "WiFi",              icon: Wifi      },
  { key: "parking",        label: "Estacionamiento",   icon: Car       },
  { key: "cafeteria",      label: "Cafetería",         icon: Coffee    },
  { key: "printer",        label: "Impresora",         icon: Printer   },
  { key: "reception",      label: "Recepción",         icon: Phone     },
  { key: "security",       label: "Seguridad 24/7",    icon: Shield    },
  { key: "airConditioning",label: "Aire Acondicionado",icon: Snowflake },
];

interface ServicesSectionProps {
  services: BusinessSpaceData["services"];
  onToggle: (key: keyof BusinessSpaceData["services"]) => void;
}

export function ServicesSection({ services, onToggle }: ServicesSectionProps) {
  return (
    <div className="rounded-2xl border border-border/50 bg-muted/20 p-4 space-y-3">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Servicios incluidos</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {serviceOptions.map((service) => {
          const Icon = service.icon;
          const isChecked = services[service.key as keyof BusinessSpaceData["services"]];
          return (
            <label
              key={service.key}
              className={cn(
                "flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all duration-200",
                "shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]",
                isChecked
                  ? "border-border bg-muted/40 dark:bg-muted/20"
                  : "border-border/60 bg-white dark:bg-card hover:border-border/80"
              )}
            >
              <Checkbox
                checked={isChecked}
                onCheckedChange={() => onToggle(service.key as keyof BusinessSpaceData["services"])}
                className="sr-only"
              />
              <Icon className={cn("h-4 w-4 shrink-0", isChecked ? "text-foreground" : "text-muted-foreground")} />
              <span className={cn("text-xs flex-1 min-w-0", isChecked ? "font-semibold text-foreground" : "text-muted-foreground")}>{service.label}</span>
              {isChecked && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
            </label>
          );
        })}
      </div>
    </div>
  );
}
