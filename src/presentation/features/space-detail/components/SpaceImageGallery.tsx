"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X, Images } from "lucide-react";

interface SpaceImageGalleryProps {
  images: string[];
  title: string;
}

export function SpaceImageGallery({ images, title }: SpaceImageGalleryProps) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const hasImages = images && images.length > 0;
  const displayImages = hasImages ? images : ["/placeholder-space.jpg"];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const lightboxPrev = useCallback(() => {
    setLightboxIndex((i) => (i === 0 ? displayImages.length - 1 : i - 1));
  }, [displayImages.length]);

  const lightboxNext = useCallback(() => {
    setLightboxIndex((i) => (i === displayImages.length - 1 ? 0 : i + 1));
  }, [displayImages.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") lightboxPrev();
      if (e.key === "ArrowRight") lightboxNext();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, lightboxPrev, lightboxNext]);

  return (
    <>
      {/* Main Gallery */}
      <div className="relative w-full mb-8">

        {/* Desktop: Grid Layout */}
        <div className="hidden md:grid md:grid-cols-12 md:grid-rows-2 gap-3 h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] group/gallery">
          {/* Main Hero Image */}
          <div
            className="col-span-8 row-span-2 relative group cursor-pointer"
            onClick={() => openLightbox(0)}
          >
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
                <Images aria-hidden="true" className="w-16 h-16 text-muted-foreground/20" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          {/* Secondary Stacked Images */}
          <div
            className="col-span-4 row-span-1 relative group cursor-pointer"
            onClick={() => openLightbox(1)}
          >
            {displayImages[1] ? (
              <Image
                src={displayImages[1]}
                alt={`${title} - 2`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-muted/40 flex items-center justify-center">
                <Images aria-hidden="true" className="w-8 h-8 text-muted-foreground/20" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          <div
            className="col-span-4 row-span-1 relative group cursor-pointer"
            onClick={() => openLightbox(2)}
          >
            {displayImages[2] ? (
              <Image
                src={displayImages[2]}
                alt={`${title} - 3`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-muted/50 flex items-center justify-center">
                <Images aria-hidden="true" className="w-8 h-8 text-muted-foreground/20" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          {/* Show All Button */}
          <button
            onClick={() => openLightbox(0)}
            className="absolute bottom-6 right-6 flex items-center gap-2 px-5 py-2.5 bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-xl border border-white/40 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-white dark:hover:bg-black hover:scale-105 active:scale-95 transition-all duration-300 text-[13px] font-bold tracking-wide"
          >
            <Expand className="w-4 h-4" />
            <span>Ver todas ({displayImages.length})</span>
          </button>
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden relative h-[300px] rounded-xl overflow-hidden">
          {hasImages ? (
            <Image
              src={displayImages[carouselIndex]}
              alt={`${title} - ${carouselIndex + 1}`}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Images aria-hidden="true" className="w-16 h-16 text-muted-foreground/30" />
            </div>
          )}

          {displayImages.length > 1 && (
            <>
              <button
                onClick={() => setCarouselIndex((i) => (i === 0 ? displayImages.length - 1 : i - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCarouselIndex((i) => (i === displayImages.length - 1 ? 0 : i + 1))}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {displayImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCarouselIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === carouselIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>

          <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 text-white text-sm rounded-full font-medium">
            {carouselIndex + 1} / {displayImages.length}
          </div>

          <button
            onClick={() => openLightbox(carouselIndex)}
            className="absolute top-4 left-4 p-2 bg-black/50 text-white rounded-full"
          >
            <Expand className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/95"
            onClick={closeLightbox}
          />

          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-10 p-2.5 text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 bg-white/10 text-white text-sm font-semibold rounded-full">
            {lightboxIndex + 1} / {displayImages.length}
          </div>

          {/* Prev */}
          {displayImages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
          )}

          {/* Image */}
          <div
            className="relative z-10 w-full h-full max-w-5xl max-h-[80vh] mx-16 pointer-events-none"
            onClick={(e) => e.stopPropagation()}
          >
            {hasImages ? (
              <Image
                key={lightboxIndex}
                src={displayImages[lightboxIndex]}
                alt={`${title} - ${lightboxIndex + 1}`}
                fill
                className="object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Images aria-hidden="true" className="w-24 h-24 text-white/20" />
              </div>
            )}
          </div>

          {/* Next */}
          {displayImages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          )}

          {/* Thumbnails */}
          {displayImages.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-2 max-w-[90vw] overflow-x-auto px-4 no-scrollbar">
              {displayImages.map((img, index) => (
                <button
                  key={index}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(index); }}
                  className={`relative w-14 h-14 rounded-lg overflow-hidden shrink-0 transition-all duration-200 ${
                    index === lightboxIndex
                      ? "ring-2 ring-white scale-110"
                      : "opacity-50 hover:opacity-80"
                  }`}
                >
                  {hasImages ? (
                    <Image src={img} alt="" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-white/10" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
