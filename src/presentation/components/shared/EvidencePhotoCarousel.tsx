"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface EvidencePhotoCarouselProps {
  photos: string[];
  index: number;
  onIndexChange: (index: number) => void;
}

export function EvidencePhotoCarousel({ photos, index, onIndexChange }: EvidencePhotoCarouselProps) {
  if (photos.length === 0) return null;

  const prev = () => onIndexChange(index === 0 ? photos.length - 1 : index - 1);
  const next = () => onIndexChange(index === photos.length - 1 ? 0 : index + 1);

  return (
    <div className="relative">
      <a href={photos[index]} target="_blank" rel="noreferrer" className="block">
        <img
          src={photos[index]}
          alt="Evidencia"
          className="w-full h-80 sm:h-96 object-cover rounded-2xl cursor-zoom-in"
        />
      </a>

      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 dark:bg-black/70 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 dark:bg-black/70 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/60 text-white text-xs font-semibold rounded-full">
            {index + 1} / {photos.length}
          </div>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onIndexChange(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === index ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
