"use client";

import { useState } from "react";
import { Ruler, Calendar, CheckCircle2, Users, TrendingUp, Clock } from "lucide-react";

const DESCRIPTION_TRUNCATE_LENGTH = 220;

interface SpaceDescriptionProps {
  description: string;
  squareMeters: number;
  capacity: number;
  bookingsCount?: number;
  createdAt: Date;
}

function getTimeAgo(date: Date): string {
  const months = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24 * 30));
  if (months < 1) return "Este mes";
  if (months < 12) return `Hace ${months} ${months === 1 ? "mes" : "meses"}`;
  const years = Math.floor(months / 12);
  return `Hace ${years} ${years === 1 ? "año" : "años"}`;
}

export function SpaceDescription({ description, squareMeters, capacity, bookingsCount, createdAt }: SpaceDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const needsTruncation = description.length > DESCRIPTION_TRUNCATE_LENGTH;

  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
        <div className="flex items-start gap-4">
          <Ruler className="w-7 h-7 text-foreground shrink-0 mt-0.5" />
          <div>
            <p className="text-[17px] font-semibold text-foreground">{squareMeters} m²</p>
            <p className="text-sm text-muted-foreground">Tamaño del espacio</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Calendar className="w-7 h-7 text-foreground shrink-0 mt-0.5" />
          <div>
            <p className="text-[17px] font-semibold text-foreground">Duración flexible</p>
            <p className="text-sm text-muted-foreground">Renta por el tiempo que necesites</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-[17px] font-semibold text-foreground">Verificado por SpaceShare</p>
            <p className="text-sm text-muted-foreground">Este espacio fue revisado por nuestro equipo</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Users className="w-7 h-7 text-foreground shrink-0 mt-0.5" />
          <div>
            <p className="text-[17px] font-semibold text-foreground">{capacity} {capacity === 1 ? "espacio" : "espacios"}</p>
            <p className="text-sm text-muted-foreground">Capacidad disponible</p>
          </div>
        </div>

        {Boolean(bookingsCount) && (
          <div className="flex items-start gap-4">
            <TrendingUp className="w-7 h-7 text-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-[17px] font-semibold text-foreground">{bookingsCount} {bookingsCount === 1 ? "reserva" : "reservas"}</p>
              <p className="text-sm text-muted-foreground">Reservas completadas</p>
            </div>
          </div>
        )}

        <div className="flex items-start gap-4">
          <Clock className="w-7 h-7 text-foreground shrink-0 mt-0.5" />
          <div>
            <p className="text-[17px] font-semibold text-foreground">{getTimeAgo(createdAt)}</p>
            <p className="text-sm text-muted-foreground">Publicado en SpaceShare</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-6">Descripción</h2>
        <p
          className={`text-[17px] font-medium text-muted-foreground leading-relaxed whitespace-pre-line ${
            needsTruncation && !expanded ? "line-clamp-4" : ""
          }`}
        >
          {description}
        </p>
        {needsTruncation && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-2 text-sm font-semibold text-foreground underline underline-offset-2 hover:text-muted-foreground transition-colors"
          >
            {expanded ? "Ver menos" : "Ver más"}
          </button>
        )}
      </div>
    </div>
  );
}
