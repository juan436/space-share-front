"use client";

import { Thermometer, Video, DoorOpen, Shield, Clock, Wifi, Car, Lock } from "lucide-react";
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
    color: "text-blue-600 bg-blue-50",
  },
  {
    key: "securityCamera",
    label: "Cámara de seguridad",
    description: "Vigilancia 24/7",
    icon: Video,
    color: "text-green-600 bg-green-50",
  },
  {
    key: "privateEntrance",
    label: "Entrada privada",
    description: "Acceso independiente",
    icon: DoorOpen,
    color: "text-purple-600 bg-purple-50",
  },
];

const additionalFeatures = [
  { icon: Shield, label: "Seguro incluido", color: "text-emerald-600 bg-emerald-50" },
  { icon: Clock, label: "Acceso 24/7", color: "text-orange-600 bg-orange-50" },
  { icon: Lock, label: "Candado propio", color: "text-slate-600 bg-slate-50" },
];

export function SpaceAmenities({ amenities }: SpaceAmenitiesProps) {
  const activeAmenities = amenityConfig.filter(
    (amenity) => amenities[amenity.key as keyof typeof amenities]
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Características del espacio</h2>
      
      {/* Main Amenities */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeAmenities.map((amenity) => {
          const Icon = amenity.icon;
          return (
            <div
              key={amenity.key}
              className="flex items-start gap-4 p-4 rounded-xl border bg-card hover:shadow-md transition-shadow"
            >
              <div className={`p-3 rounded-lg ${amenity.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{amenity.label}</h3>
                <p className="text-sm text-muted-foreground">{amenity.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Features */}
      {activeAmenities.length > 0 && (
        <div className="pt-4 border-t">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">También incluye</h3>
          <div className="flex flex-wrap gap-2">
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg ${feature.color}`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{feature.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeAmenities.length === 0 && (
        <p className="text-muted-foreground">
          Este espacio no tiene características especiales listadas.
        </p>
      )}
    </div>
  );
}
