"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Space } from "@/core/domain/entities/Space";
import { Button } from "@/presentation/components/ui/button";
import { useFavorites } from "@/presentation/hooks/useFavorites";
import { useAuth } from "@/presentation/providers/auth-context";
import { resolveHostId } from "@/presentation/utils/resolveHostId";
import {
  SpaceImageGallery,
  SpaceDetailHeader,
  SpaceDescription,
  SpaceAmenities,
  SpaceLocationMap,
  SpaceHostCard,
  SpaceBookingSidebar,
  SpaceMobileBookingBar,
  SpaceReviews,
} from "./components";

interface SpaceDetailPageProps {
  space: Space;
  spaceTypeLabel: string;
  spaceTypeColor: string;
}

export function SpaceDetailPage({ space, spaceTypeLabel, spaceTypeColor }: SpaceDetailPageProps) {
  const [returnPath, setReturnPath] = useState("/explore");
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();
  const isOwner = user?.id === resolveHostId(space.hostId);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const fromParam = params.get("from");
      const ALLOWED_PREFIXES = ["/explore", "/favorites", "/dashboard"];
      if (fromParam && ALLOWED_PREFIXES.some((p) => fromParam.startsWith(p))) {
        setReturnPath(fromParam);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background pb-32 md:pb-12 font-sans selection:bg-primary/20">
      {/* Floating Navigation Bar */}
      <div className="fixed top-4 left-0 right-0 z-50 pointer-events-none px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex justify-between items-start">
        <Link href={returnPath} className="pointer-events-auto">
          <Button 
            variant="secondary" 
            size="sm" 
            className="gap-2.5 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-[0_4px_20px_rgb(0,0,0,0.08)] border border-black/5 dark:border-white/10 hover:scale-105 transition-transform duration-300 h-10 px-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline font-medium text-[13px] tracking-wide">Volver</span>
            <span className="sm:hidden font-medium text-[13px] tracking-wide">Volver</span>
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        {/* Image Gallery */}
        <SpaceImageGallery images={space.images} title={space.title} />

        {/* Content Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column - Details */}
          <div className="lg:col-span-8 flex flex-col gap-12 lg:gap-16">
            <SpaceDetailHeader
              space={space}
              spaceTypeLabel={spaceTypeLabel}
              spaceTypeColor={spaceTypeColor}
              isFavorite={isFavorite(space.id)}
              onToggleFavorite={() => toggleFavorite(space.id)}
            />
            
            <SpaceDescription
              description={space.description}
              squareMeters={space.squareMeters}
            />
            
            <SpaceAmenities amenities={space.amenities} />
            
            <SpaceLocationMap location={space.location} />
            
            <SpaceReviews spaceId={space.id} rating={space.rating} reviewCount={space.reviewCount} />

            <SpaceHostCard hostId={space.hostId} />
          </div>

          {/* Right Column - Booking Sidebar (Desktop) */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-28">
              {isOwner ? (
                <div className="p-8 rounded-[24px] bg-white dark:bg-zinc-900 shadow-[0_8px_30px_rgb(0,0,0,0.06)] ring-1 ring-black/5 dark:ring-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg">🏠</span>
                    </div>
                    <div>
                      <p className="font-bold text-foreground">Tu publicación</p>
                      <p className="text-xs text-muted-foreground">Eres el anfitrión de este espacio</p>
                    </div>
                  </div>
                  <Link href="/dashboard/host">
                    <Button className="w-full h-12 rounded-xl font-bold">
                      Ir al panel de gestión
                    </Button>
                  </Link>
                </div>
              ) : (
                <SpaceBookingSidebar space={space} />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Booking Bar / Owner Bar */}
      {isOwner ? (
        <div className="fixed bottom-4 left-4 right-4 md:hidden z-40 safe-area-bottom">
          <Link href="/dashboard/host">
            <div className="flex items-center justify-between gap-4 p-4 bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] ring-1 ring-black/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-base">🏠</span>
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground">Tu publicación</p>
                  <p className="text-[11px] text-muted-foreground">Eres el anfitrión</p>
                </div>
              </div>
              <Button size="sm" className="rounded-xl font-bold shrink-0">
                Panel de gestión
              </Button>
            </div>
          </Link>
        </div>
      ) : (
        <SpaceMobileBookingBar space={space} />
      )}
    </div>
  );
}
