"use client";

import Image from "next/image";
import { User, Star, Calendar, MessageCircle, Shield } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";

interface SpaceHostCardProps {
  hostId: string;
}

export function SpaceHostCard({ hostId }: SpaceHostCardProps) {
  // Mock host data - in real app, fetch from API
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
      
      <div className="p-6 rounded-2xl border bg-card">
        {/* Host Info */}
        <div className="flex items-start gap-4">
          <div className="relative">
            {host.avatar ? (
              <Image
                src={host.avatar}
                alt={host.name}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
            )}
            {host.verified && (
              <div className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 rounded-full">
                <Shield className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">{host.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-medium">{host.rating}</span>
              <span className="text-muted-foreground">({host.reviewCount} reseñas)</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{host.reviewCount}</p>
            <p className="text-xs text-muted-foreground">Reseñas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{host.responseRate}%</p>
            <p className="text-xs text-muted-foreground">Respuesta</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{host.responseTime}</p>
            <p className="text-xs text-muted-foreground">Tiempo resp.</p>
          </div>
        </div>

        {/* Member Since */}
        <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>Miembro desde {host.memberSince}</span>
        </div>

        {/* Contact Button */}
        <Button aria-label="Contactar al anfitrión" className="w-full mt-6 gap-2">
          <MessageCircle className="w-4 h-4" />
          Contactar al anfitrión
        </Button>
      </div>
    </div>
  );
}
