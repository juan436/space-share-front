"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Space } from "@/core/domain/entities/Space";
import { Button } from "@/presentation/components/ui/button";
import { MainHeader } from "@/presentation/components/shared/layout/MainHeader";
import { CompactSearchFilters } from "@/presentation/features/explore/components/desktop/CompactSearchFilters";
import { useFavorites } from "@/presentation/hooks/useFavorites";
import { useAuth } from "@/presentation/providers/auth-context";
import { resolveHostId } from "@/presentation/utils/resolveHostId";
import {
  SpaceImageGallery,
  SpaceTitleBar,
  SpaceDetailHeader,
  SpaceRatingSummary,
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
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [spaceType, setSpaceType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sizeRange, setSizeRange] = useState("all");
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();
  const isOwner = user?.id === resolveHostId(space.hostId);

  const goToExplore = (overrides: Partial<{ q: string; type: string; price: string; size: string }> = {}) => {
    const params = new URLSearchParams();
    const q = overrides.q ?? searchQuery;
    const type = overrides.type ?? spaceType;
    const price = overrides.price ?? priceRange;
    const size = overrides.size ?? sizeRange;
    if (q) params.set("q", q);
    if (type !== "all") params.set("type", type);
    if (price !== "all") params.set("price", price);
    if (size !== "all") params.set("size", size);
    const qs = params.toString();
    router.push(qs ? `/explore?${qs}` : "/explore");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background pb-32 md:pb-12 font-sans selection:bg-primary/20">
      <MainHeader
        showCompactSlot
        hideOnScroll
        scrollCompactSlot={
          <CompactSearchFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearchSubmit={() => goToExplore()}
            spaceType={spaceType}
            onSpaceTypeChange={(v) => { setSpaceType(v); goToExplore({ type: v }); }}
            priceRange={priceRange}
            onPriceRangeChange={(v) => { setPriceRange(v); goToExplore({ price: v }); }}
            sizeRange={sizeRange}
            onSizeRangeChange={(v) => { setSizeRange(v); goToExplore({ size: v }); }}
          />
        }
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {/* Title + acciones */}
        <SpaceTitleBar
          title={space.title}
          description={space.description}
          isFavorite={isFavorite(space.id)}
          onToggleFavorite={() => toggleFavorite(space.id)}
        />

        {/* Image Gallery */}
        <div className="mt-6">
          <SpaceImageGallery images={space.images} title={space.title} />
        </div>

        {/* Content Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column - Details */}
          <div className="lg:col-span-8 flex flex-col gap-8 lg:gap-10">
            <div className="flex flex-col gap-5">
              <SpaceDetailHeader
                space={space}
                spaceTypeLabel={spaceTypeLabel}
                spaceTypeColor={spaceTypeColor}
              />

              <SpaceRatingSummary
                rating={space.rating}
                reviewCount={space.reviewCount}
                host={space.host}
              />
            </div>

            <SpaceDescription
              description={space.description}
              squareMeters={space.squareMeters}
              capacity={space.capacity}
              bookingsCount={space.bookingsCount}
              createdAt={space.createdAt}
            />

            <hr className="border-t-2 border-border" />

            <SpaceAmenities amenities={space.amenities} category={space.category} services={space.services} />

            <hr className="border-t-2 border-border" />

            <SpaceLocationMap location={space.location} />

            <hr className="border-t-2 border-border" />

            <SpaceReviews spaceId={space.id} rating={space.rating} reviewCount={space.reviewCount} />

            <hr className="border-t-2 border-border" />

            <SpaceHostCard host={space.host} />
          </div>

          {/* Right Column - Booking Sidebar (Desktop) */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-28">
              {isOwner ? (
                <div className="p-6 rounded-2xl bg-white dark:bg-card border border-border/60 shadow-[0_4px_16px_rgba(0,0,0,0.10)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center">
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
            <div className="flex items-center justify-between gap-4 p-4 bg-white dark:bg-card border border-border/60 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.10)]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-muted/60 flex items-center justify-center shrink-0">
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
