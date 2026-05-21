import { Wifi, Car, Coffee, Printer, Phone, Shield, Snowflake, Check } from "lucide-react";
import { Checkbox } from "@/presentation/components/ui/checkbox";
import { cn } from "@/presentation/utils/cn";
import { BusinessSpaceData } from "../../../hooks/useBusinessSpaceForm";

const serviceOptions = [
  { key: "wifi", label: "WiFi", icon: Wifi },
  { key: "parking", label: "Estacionamiento", icon: Car },
  { key: "cafeteria", label: "Cafetería", icon: Coffee },
  { key: "printer", label: "Impresora", icon: Printer },
  { key: "reception", label: "Recepción", icon: Phone },
  { key: "security", label: "Seguridad 24/7", icon: Shield },
  { key: "airConditioning", label: "Aire Acondicionado", icon: Snowflake },
];

interface ServicesSectionProps {
  services: BusinessSpaceData["services"];
  onToggle: (key: keyof BusinessSpaceData["services"]) => void;
}

export function ServicesSection({ services, onToggle }: ServicesSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Wifi className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Servicios Incluidos</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {serviceOptions.map((service) => {
          const Icon = service.icon;
          const isChecked = services[service.key as keyof BusinessSpaceData["services"]];
          return (
            <label
              key={service.key}
              className={cn(
                "flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all",
                isChecked ? "border-primary bg-primary/5" : "border-muted hover:border-muted-foreground/30"
              )}
            >
              <Checkbox
                checked={isChecked}
                onCheckedChange={() => onToggle(service.key as keyof BusinessSpaceData["services"])}
                className="sr-only"
              />
              <Icon className={cn("h-4 w-4", isChecked ? "text-primary" : "text-muted-foreground")} />
              <span className={cn("text-sm", isChecked && "text-primary font-medium")}>{service.label}</span>
              {isChecked && <Check className="h-4 w-4 text-primary ml-auto" />}
            </label>
          );
        })}
      </div>
    </div>
  );
}
