"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

interface SpaceImageGalleryProps {
  images: string[];
  title: string;
}

export function SpaceImageGallery({ images, title }: SpaceImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const hasImages = images && images.length > 0;
  const displayImages = hasImages ? images : ["/placeholder-space.jpg"];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {/* Main Gallery */}
      <div className="relative w-full mb-8">
        {/* Desktop: Grid Layout */}
        <div className="hidden md:grid md:grid-cols-12 md:grid-rows-2 gap-3 h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] group/gallery">
          {/* Main Hero Image */}
          <div className="col-span-8 row-span-2 relative group cursor-pointer" onClick={() => setIsFullscreen(true)}>
            {hasImages ? (
              <Image
                src={displayImages[0]}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />
            ) : (
              <div className="w-full h-full bg-muted/30 flex items-center justify-center">
                <span className="text-6xl opacity-20">🏠</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          {/* Secondary Stacked Images */}
          <div className="col-span-4 row-span-1 relative group cursor-pointer" onClick={() => { setCurrentIndex(1); setIsFullscreen(true); }}>
            {displayImages[1] ? (
              <Image
                src={displayImages[1]}
                alt={`${title} - 2`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
               <div className="w-full h-full bg-muted/40 flex items-center justify-center">
                  <span className="text-3xl opacity-20">📷</span>
                </div>
            )}
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
          <div className="col-span-4 row-span-1 relative group cursor-pointer" onClick={() => { setCurrentIndex(2); setIsFullscreen(true); }}>
            {displayImages[2] ? (
              <Image
                src={displayImages[2]}
                alt={`${title} - 3`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
               <div className="w-full h-full bg-muted/50 flex items-center justify-center">
                  <span className="text-3xl opacity-20">📷</span>
                </div>
            )}
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          {/* Show All Button (Glassmorphism) */}
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute bottom-6 right-6 flex items-center gap-2 px-5 py-2.5 bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-xl border border-white/40 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-white dark:hover:bg-black hover:scale-105 active:scale-95 transition-all duration-300 text-[13px] font-bold tracking-wide"
          >
            <Expand className="w-4 h-4" />
            <span>Ver todas</span>
          </button>
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden relative h-[300px] rounded-xl overflow-hidden">
          {hasImages ? (
            <Image
              src={displayImages[currentIndex]}
              alt={`${title} - ${currentIndex + 1}`}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <span className="text-6xl">🏠</span>
            </div>
          )}

          {/* Navigation Arrows */}
          {displayImages.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {displayImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Image Counter */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 text-white text-sm rounded-full">
            {currentIndex + 1} / {displayImages.length}
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 p-3 text-white hover:bg-white/10 rounded-full transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div className="relative w-full h-full max-w-5xl max-h-[80vh] mx-4">
            {hasImages ? (
              <Image
                src={displayImages[currentIndex]}
                alt={`${title} - ${currentIndex + 1}`}
                fill
                className="object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-9xl">🏠</span>
              </div>
            )}
          </div>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Thumbnails */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto px-4">
            {displayImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative w-16 h-16 rounded-lg overflow-hidden shrink-0 transition-all ${
                  index === currentIndex ? "ring-2 ring-white scale-110" : "opacity-60 hover:opacity-100"
                }`}
              >
                {hasImages ? (
                  <Image src={img} alt="" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span>📷</span>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 text-white rounded-full">
            {currentIndex + 1} / {displayImages.length}
          </div>
        </div>
      )}
    </>
  );
}
