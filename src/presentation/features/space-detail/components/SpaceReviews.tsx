"use client";

import { useState, useEffect } from "react";
import { Star, User } from "lucide-react";
import { Review, CreateReviewInput } from "@/core/domain/entities/Review";
import { reviewRepository } from "@/bootstrap/application";
import { useAuth } from "@/presentation/providers/auth-context";
import { Button } from "@/presentation/components/ui/button";

interface SpaceReviewsProps {
  spaceId: string;
  rating?: number;
  reviewCount?: number;
}

export function SpaceReviews({ spaceId, rating, reviewCount }: SpaceReviewsProps) {
  const { user, isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    reviewRepository
      .findBySpaceId(spaceId)
      .then(setReviews)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [spaceId]);

  const handleDelete = async (reviewId: string) => {
    try {
      await reviewRepository.delete(reviewId);
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
        <h2 className="text-2xl font-bold text-foreground">
          {rating && rating > 0 ? (
            <>
              {rating} <span className="text-muted-foreground font-normal text-lg">· {reviewCount} {reviewCount === 1 ? "reseña" : "reseñas"}</span>
            </>
          ) : (
            "Reseñas"
          )}
        </h2>
      </div>

      {/* Reviews List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse space-y-2">
              <div className="h-4 bg-muted rounded w-1/3" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-5 rounded-2xl border border-border/50 bg-card/50 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    {review.client?.avatar ? (
                      <img src={review.client.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <User className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      {review.client?.name || "Usuario"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {review.createdAt.toLocaleDateString("es", { month: "long", year: "numeric" })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
              {review.comment && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {review.comment}
                </p>
              )}
              {isAuthenticated && user?.id === review.clientId && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-destructive hover:text-destructive"
                  onClick={() => handleDelete(review.id)}
                >
                  Eliminar
                </Button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">
          Este espacio aún no tiene reseñas.
        </p>
      )}
    </div>
  );
}
