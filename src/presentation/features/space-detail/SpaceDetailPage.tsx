"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
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
  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/explore">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Volver a explorar</span>
                <span className="sm:hidden">Volver</span>
              </Button>
            </Link>
            
            <Link href="/" className="text-xl font-bold">
              <span className="text-primary">Space</span>
              <span className="text-accent">Share</span>
            </Link>
            
            <div className="w-24" /> {/* Spacer for centering */}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Image Gallery */}
        <SpaceImageGallery images={space.images} title={space.title} />

        {/* Content Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            <SpaceDetailHeader
              space={space}
              spaceTypeLabel={spaceTypeLabel}
              spaceTypeColor={spaceTypeColor}
            />
            
            <hr className="border-border" />
            
            <SpaceDescription
              description={space.description}
              squareMeters={space.squareMeters}
            />
            
            <hr className="border-border" />
            
            <SpaceAmenities amenities={space.amenities} />
            
            <hr className="border-border" />
            
            <SpaceLocationMap location={space.location} />
            
            <hr className="border-border" />
            
            <SpaceHostCard hostId={space.hostId} />
          </div>

          {/* Right Column - Booking Sidebar (Desktop) */}
          <div className="hidden lg:block">
            <SpaceBookingSidebar space={space} />
          </div>
        </div>
      </main>

      {/* Mobile Booking Bar */}
      <SpaceMobileBookingBar space={space} />
    </div>
  );
}
