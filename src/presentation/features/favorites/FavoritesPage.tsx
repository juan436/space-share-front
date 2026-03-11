"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Search, ArrowRight } from "lucide-react";
import { ExploreHeader } from "@/presentation/features/explore/components/desktop/ExploreHeader";
import { MobileHeader } from "@/presentation/features/explore/components/mobile/MobileHeader";
import { SpaceCard } from "@/presentation/features/explore/components/desktop/SpaceCard";
import { MobileSpaceCard } from "@/presentation/features/explore/components/mobile/MobileSpaceCard";
import { mockSpaces } from "@/presentation/features/explore/data/mockSpaces";

export function FavoritesPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // For demonstration, let's pretend the user has 3 favorite spaces. 
  // In a real app, this would be fetched from the backend.
  // To test the empty state, you can set this to empty array: []
  const [favorites, setFavorites] = useState(mockSpaces.slice(0, 3));

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      {isMobile ? <MobileHeader /> : <ExploreHeader />}

      {/* Main Content */}
      <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 sm:px-6 py-8 md:py-12">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-rose-500/10 rounded-xl">
                <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                Guardados
              </h1>
            </div>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
              Tus espacios de interés guardados para alquilar más tarde. Revisa disponibilidad y completa tu reserva cuando estés listo.
            </p>
          </div>
          
          <Link 
            href="/explore"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-border/60 text-foreground font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-sm active:scale-95 shrink-0"
          >
            Explorar espacios
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Content Section */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {favorites.map((space) => (
              <div key={space.id} className="relative group/fav">
                {isMobile ? (
                  <MobileSpaceCard 
                    space={space} 
                    isFavorite={true}
                    onToggleFavorite={(id) => setFavorites(favorites.filter(s => s.id !== id))}
                    onClick={() => {}}
                    returnPath="/favorites"
                  />
                ) : (
                  <SpaceCard 
                    space={space} 
                    isFavorite={true}
                    onToggleFavorite={(id) => setFavorites(favorites.filter(s => s.id !== id))}
                    returnPath="/favorites"
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-muted/20 border border-border/50 rounded-3xl">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6 ring-8 ring-muted/30">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Aún no tienes espacios guardados
            </h2>
            <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
              Explora nuestra colección y guarda los espacios que más te gusten haciendo clic en el ícono del corazón. Aquí podrás compararlos fácilmente.
            </p>
            <Link 
              href="/explore"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-foreground text-background font-semibold rounded-xl hover:bg-foreground/90 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              Explorar espacios
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
