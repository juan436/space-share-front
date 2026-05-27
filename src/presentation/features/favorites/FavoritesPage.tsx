"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Search, ArrowRight, Compass } from "lucide-react";
import { ExploreHeader } from "@/presentation/features/explore/components/desktop/ExploreHeader";
import { MobileHeader } from "@/presentation/features/explore/components/mobile/MobileHeader";
import { SpaceCard } from "@/presentation/features/explore/components/desktop/SpaceCard";
import { MobileSpaceCard } from "@/presentation/features/explore/components/mobile/MobileSpaceCard";
import { MainFooter } from "@/presentation/components/shared/layout/MainFooter";
import { PaginationBar } from "@/presentation/components/shared/PaginationBar";
import { useFavoriteSpaces } from "./hooks/useFavoriteSpaces";
import { useMediaQuery } from "@/presentation/hooks/useMediaQuery";

const PAGE_SIZE = 12;

export function FavoritesPage() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { spaces, isLoading, isFavorite, handleToggleFavorite } = useFavoriteSpaces();
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(spaces.length / PAGE_SIZE);
  const pagedSpaces = spaces.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handlePageChange = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-background flex flex-col">
      {isMobile ? <MobileHeader /> : <ExploreHeader />}

      <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 sm:px-6 py-8 md:py-12 pb-24 md:pb-12">

        {/* Hero */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 md:mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-card border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.07)] flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">Guardados</h1>
                {!isLoading && spaces.length > 0 && (
                  <span className="text-xs font-semibold bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400 px-2.5 py-0.5 rounded-full border border-rose-200/60 dark:border-rose-800/40">
                    {spaces.length} {spaces.length === 1 ? "espacio" : "espacios"}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-0.5 max-w-lg">
                Espacios que guardaste para revisar o reservar más tarde
              </p>
            </div>
          </div>

          <Link
            href="/explore"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white dark:bg-card border border-border/60 shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.09)] text-foreground font-semibold rounded-xl transition-all active:scale-95 shrink-0 text-sm"
          >
            <Compass className="w-4 h-4" />
            Explorar espacios
          </Link>
        </div>

        {/* Contenido */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-card rounded-2xl border border-border/30 shadow-[0_8px_32px_rgba(0,0,0,0.10)] overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-gradient-to-r from-muted/80 via-muted/40 to-muted/80" />
                <div className="p-3 space-y-2">
                  <div className="h-4 w-3/4 bg-muted/60 rounded-lg" />
                  <div className="h-3 w-1/2 bg-muted/50 rounded-md" />
                  <div className="flex items-center justify-between pt-1">
                    <div className="h-4 w-16 bg-muted/60 rounded-md" />
                    <div className="h-7 w-7 bg-muted/50 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        ) : spaces.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {pagedSpaces.map((space) => (
                <div key={space.id}>
                  {isMobile ? (
                    <MobileSpaceCard
                      space={space}
                      isFavorite={true}
                      onToggleFavorite={handleToggleFavorite}
                      onClick={() => {}}
                      returnPath="/favorites"
                    />
                  ) : (
                    <SpaceCard
                      space={space}
                      isFavorite={true}
                      onToggleFavorite={handleToggleFavorite}
                      returnPath="/favorites"
                    />
                  )}
                </div>
              ))}
            </div>

            <PaginationBar
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className="mt-8"
            />
          </>

        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white dark:bg-card border border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.07)] rounded-2xl">
            <div className="w-16 h-16 rounded-2xl bg-muted/60 flex items-center justify-center mb-5">
              <Search className="w-7 h-7 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Aún no tienes espacios guardados</h2>
            <p className="text-sm text-muted-foreground max-w-sm mb-7 leading-relaxed">
              Explora nuestra colección y guarda los espacios que más te gusten tocando el ícono del corazón.
            </p>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-semibold rounded-xl hover:bg-foreground/90 transition-all shadow-md hover:shadow-lg active:scale-95 text-sm"
            >
              <Compass className="w-4 h-4" />
              Explorar espacios
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </main>

      {!isMobile && <MainFooter />}
    </div>
  );
}
