"use client";

import Link from "next/link";
import { Heart, Search, ArrowRight, Loader2 } from "lucide-react";
import { ExploreHeader } from "@/presentation/features/explore/components/desktop/ExploreHeader";
import { MobileHeader } from "@/presentation/features/explore/components/mobile/MobileHeader";
import { SpaceCard } from "@/presentation/features/explore/components/desktop/SpaceCard";
import { MobileSpaceCard } from "@/presentation/features/explore/components/mobile/MobileSpaceCard";
import { useFavoriteSpaces } from "./hooks/useFavoriteSpaces";
import { useMediaQuery } from "@/presentation/hooks/useMediaQuery";

export function FavoritesPage() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { spaces, isLoading, isFavorite, handleToggleFavorite } = useFavoriteSpaces();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {isMobile ? <MobileHeader /> : <ExploreHeader />}

      <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 sm:px-6 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-rose-500/10 rounded-xl">
                <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">Guardados</h1>
            </div>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
              Tus espacios de interés guardados para alquilar más tarde. Revisa disponibilidad y completa tu reserva cuando estés listo.
            </p>
          </div>
          <Link href="/explore" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white dark:bg-zinc-900 border border-border/60 text-foreground font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all shadow-sm active:scale-95 shrink-0">
            Explorar espacios
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-3" />
            <p className="text-sm text-muted-foreground">Cargando favoritos...</p>
          </div>
        ) : spaces.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {spaces.map((space) => (
              <div key={space.id} className="relative group/fav">
                {isMobile ? (
                  <MobileSpaceCard space={space} isFavorite={true} onToggleFavorite={handleToggleFavorite} onClick={() => {}} returnPath="/favorites" />
                ) : (
                  <SpaceCard space={space} isFavorite={true} onToggleFavorite={handleToggleFavorite} returnPath="/favorites" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-muted/20 border border-border/50 rounded-3xl">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6 ring-8 ring-muted/30">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Aún no tienes espacios guardados</h2>
            <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
              Explora nuestra colección y guarda los espacios que más te gusten haciendo clic en el ícono del corazón.
            </p>
            <Link href="/explore" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-foreground text-background font-semibold rounded-xl hover:bg-foreground/90 transition-all shadow-md hover:shadow-lg active:scale-95">
              Explorar espacios
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
