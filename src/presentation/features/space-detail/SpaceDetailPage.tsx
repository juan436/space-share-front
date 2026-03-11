"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Space } from "@/core/domain/entities/Space";
import { Button } from "@/presentation/components/ui/button";
import {
  SpaceImageGallery,
  SpaceDetailHeader,
  SpaceDescription,
  SpaceAmenities,
  SpaceLocationMap,
  SpaceHostCard,
  SpaceBookingSidebar,
  SpaceMobileBookingBar,
} from "./components";

interface SpaceDetailPageProps {
  space: Space;
  spaceTypeLabel: string;
  spaceTypeColor: string;
}

export function SpaceDetailPage({ space, spaceTypeLabel, spaceTypeColor }: SpaceDetailPageProps) {
  const [returnPath, setReturnPath] = useState("/explore");

  useEffect(() => {
    // Read the query params safely on client-side to determine the return path
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const fromParam = params.get("from");
      if (fromParam) {
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
            />
            
            <SpaceDescription
              description={space.description}
              squareMeters={space.squareMeters}
            />
            
            <SpaceAmenities amenities={space.amenities} />
            
            <SpaceLocationMap location={space.location} />
            
            <SpaceHostCard hostId={space.hostId} />
          </div>

          {/* Right Column - Booking Sidebar (Desktop) */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-28">
              <SpaceBookingSidebar space={space} />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Booking Bar */}
      <SpaceMobileBookingBar space={space} />
    </div>
  );
}
