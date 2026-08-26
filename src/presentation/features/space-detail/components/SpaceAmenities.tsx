"use client";

import { useState } from "react";
import {
  Thermometer, Video, DoorOpen, Clock,
  Wifi, ParkingCircle, Coffee, Printer, Bell, ShieldCheck, Wind,
  LucideIcon,
} from "lucide-react";
import { Space } from "@/core/domain/entities/Space";

interface SpaceAmenitiesProps {
  amenities: Space["amenities"];
  category?: Space["category"];
  services?: Space["services"];
}

interface AmenityRow {
  key: string;
  label: string;
  icon: LucideIcon;
  available: boolean;
}

const PREVIEW_COUNT = 6;

export function SpaceAmenities({ amenities, category, services }: SpaceAmenitiesProps) {
  const [expanded, setExpanded] = useState(false);

  const rows: AmenityRow[] = [
    { key: "climateControlled", label: "Clima controlado", icon: Thermometer, available: amenities.climateControlled },
    { key: "securityCamera", label: "Cámara de seguridad", icon: Video, available: amenities.securityCamera },
    { key: "privateEntrance", label: "Entrada privada", icon: DoorOpen, available: amenities.privateEntrance },
    ...(amenities.access247 !== undefined
      ? [{ key: "access247", label: "Acceso 24/7", icon: Clock, available: amenities.access247 }]
      : []),
  ];

  if (category === "business" && services) {
    rows.push(
      { key: "wifi", label: "Wifi", icon: Wifi, available: Boolean(services.wifi) },
      { key: "parking", label: "Parqueo", icon: ParkingCircle, available: Boolean(services.parking) },
      { key: "cafeteria", label: "Cafetería", icon: Coffee, available: Boolean(services.cafeteria) },
      { key: "printer", label: "Impresora", icon: Printer, available: Boolean(services.printer) },
      { key: "reception", label: "Recepción", icon: Bell, available: Boolean(services.reception) },
      { key: "security", label: "Seguridad", icon: ShieldCheck, available: Boolean(services.security) },
      { key: "airConditioning", label: "Aire acondicionado", icon: Wind, available: Boolean(services.airConditioning) }
    );
  }

  const visibleRows = expanded ? rows : rows.slice(0, PREVIEW_COUNT);
  const hasMore = rows.length > PREVIEW_COUNT;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Lo que este lugar ofrece</h2>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
        {visibleRows.map(({ key, label, icon: Icon, available }) => (
          <li
            key={key}
            className={`flex items-center gap-4 text-[17px] font-medium ${available ? "text-foreground" : "text-muted-foreground/60"}`}
          >
            <Icon className={`w-7 h-7 shrink-0 ${available ? "text-foreground" : "text-muted-foreground/50"}`} />
            <span className={available ? "" : "line-through"}>
              {available ? label : `No disponible: ${label}`}
            </span>
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="px-4 py-2.5 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-muted/40 transition-colors"
        >
          {expanded ? "Mostrar menos" : `Mostrar los ${rows.length} servicios`}
        </button>
      )}
    </div>
  );
}
