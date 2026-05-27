"use client";

import Image from "next/image";
import { User, Star, Calendar, MessageCircle, Shield } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";

interface SpaceHostCardProps {
  hostId: string;
}

export function SpaceHostCard({ hostId }: SpaceHostCardProps) {
  const host = {
    name: "Carlos Martínez",
    avatar: null,
    rating: 4.9,
    reviewCount: 47,
    memberSince: "2023",
    responseRate: 98,
    responseTime: "1 hora",
    verified: true,
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Conoce al anfitrión</h2>

      <div className="p-5 rounded-2xl bg-white dark:bg-card border border-border/60 shadow-[0_4px_16px_rgba(0,0,0,0.10)]">
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            {host.avatar ? (
              <Image src={host.avatar} alt={host.name} width={56} height={56} className="w-14 h-14 rounded-full object-cover" />
            ) : (
              <div className="w-14 h-14 rounded-full bg-muted/60 flex items-center justify-center">
                <User className="w-7 h-7 text-muted-foreground" />
              </div>
            )}
            {host.verified && (
              <div className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 rounded-full">
                <Shield className="w-3 h-3 text-white" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-foreground">{host.name}</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium text-foreground">{host.rating}</span>
              <span className="text-xs text-muted-foreground">({host.reviewCount} reseñas)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-border/40">
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">{host.reviewCount}</p>
            <p className="text-xs text-muted-foreground">Reseñas</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">{host.responseRate}%</p>
            <p className="text-xs text-muted-foreground">Respuesta</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">{host.responseTime}</p>
            <p className="text-xs text-muted-foreground">Tiempo resp.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          <span>Miembro desde {host.memberSince}</span>
        </div>

        <Button aria-label="Contactar al anfitrión" className="w-full mt-4 gap-2 rounded-xl h-10">
          <MessageCircle className="w-4 h-4" />
          Contactar al anfitrión
        </Button>
      </div>
    </div>
  );
}
