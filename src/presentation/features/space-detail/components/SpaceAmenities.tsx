"use client";

import { Thermometer, Video, DoorOpen, Shield, Clock, Lock } from "lucide-react";
import { Space } from "@/core/domain/entities/Space";

interface SpaceAmenitiesProps {
  amenities: Space["amenities"];
}

const amenityConfig = [
  {
    key: "climateControlled",
    label: "Clima controlado",
    description: "Temperatura y humedad reguladas",
    icon: Thermometer,
    iconClass: "text-blue-600 bg-blue-50 dark:bg-blue-950/30",
  },
  {
    key: "securityCamera",
    label: "Cámara de seguridad",
    description: "Vigilancia 24/7",
    icon: Video,
    iconClass: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    key: "privateEntrance",
    label: "Entrada privada",
    description: "Acceso independiente",
    icon: DoorOpen,
    iconClass: "text-violet-600 bg-violet-50 dark:bg-violet-950/30",
  },
];

const additionalFeatures = [
  { icon: Shield, label: "Seguro incluido",  chipClass: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400" },
  { icon: Clock,  label: "Acceso 24/7",      chipClass: "bg-orange-50 text-orange-700 dark:bg-orange-950/20 dark:text-orange-400"   },
  { icon: Lock,   label: "Candado propio",   chipClass: "bg-muted text-muted-foreground"                                            },
];

export function SpaceAmenities({ amenities }: SpaceAmenitiesProps) {
  const activeAmenities = amenityConfig.filter(
    (amenity) => amenities[amenity.key as keyof typeof amenities]
  );

  if (activeAmenities.length === 0) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Características del espacio</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeAmenities.map((amenity) => {
          const Icon = amenity.icon;
          return (
            <div
              key={amenity.key}
              className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-card border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.09)] transition-shadow"
            >
              <div className={`p-2.5 rounded-xl shrink-0 ${amenity.iconClass}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground">{amenity.label}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{amenity.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t border-border/40">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">También incluye</p>
        <div className="flex flex-wrap gap-2">
          {additionalFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <span key={index} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${feature.chipClass}`}>
                <Icon className="w-3.5 h-3.5" />
                {feature.label}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
