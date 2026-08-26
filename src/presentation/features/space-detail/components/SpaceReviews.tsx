"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Trash2 } from "lucide-react";
import { Review } from "@/core/domain/entities/Review";
import { useUseCases } from "@/presentation/providers/usecases-context";
import { useAuth } from "@/presentation/providers/auth-context";

interface SpaceReviewsProps {
  spaceId: string;
  rating?: number;
  reviewCount?: number;
}

export function SpaceReviews({ spaceId, rating, reviewCount }: SpaceReviewsProps) {
  const { getSpaceReviewsUseCase, deleteReviewUseCase } = useUseCases();
  const { user, isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
    getSpaceReviewsUseCase
      .execute(spaceId)
      .then(setReviews)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [spaceId]);

  const handleDelete = async (reviewId: string) => {
    try {
      await deleteReviewUseCase.execute(reviewId);
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    } catch {
      // silently fail
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
        <h2 className="text-xl font-semibold text-foreground">
          {rating && rating > 0 ? (
            <>
              {rating} <span className="text-muted-foreground font-normal text-base">· {reviewCount} {reviewCount === 1 ? "reseña" : "reseñas"}</span>
            </>
          ) : (
            "Reseñas"
          )}
        </h2>
      </div>

      {/* Reviews List */}
      {isError ? (
        <p className="text-sm text-muted-foreground">No se pudieron cargar las reseñas.</p>
      ) : isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse space-y-2">
              <div className="h-4 bg-muted rounded w-1/3" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          {reviews.map((review) => {
            const initials = (review.client?.name || "U")
              .split(" ")
              .map((part) => part[0])
              .slice(0, 2)
              .join("")
              .toUpperCase();

            return (
              <div key={review.id} className="group flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  {review.client?.avatar ? (
                    <Image
                      src={review.client.avatar}
                      alt={review.client.name ?? "Avatar"}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {initials}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-semibold text-base text-foreground truncate">
                      {review.client?.name || "Usuario"}
                    </p>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <div className="flex items-center" aria-label={`Calificación: ${review.rating} de 5 estrellas`}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            aria-hidden="true"
                            className={`w-3 h-3 ${
                              i < review.rating
                                ? "fill-foreground text-foreground"
                                : "text-muted-foreground/30"
                            }`}
                          />
                        ))}
                      </div>
                      <span>·</span>
                      <span>{review.createdAt.toLocaleDateString("es", { month: "long", year: "numeric" })}</span>
                    </div>
                  </div>
                </div>
                {review.comment && (
                  <p className="text-[17px] font-medium text-foreground/80 leading-relaxed line-clamp-4">
                    {review.comment}
                  </p>
                )}
                {isAuthenticated && user?.id === review.clientId && (
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="self-start flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Eliminar
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">
          Este espacio aún no tiene reseñas.
        </p>
      )}
    </div>
  );
}
